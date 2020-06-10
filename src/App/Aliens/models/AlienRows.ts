import { List, Map } from "immutable";

import { StageElement } from "./StageElement";
import { inRange, isNil } from "../../../lib/util";
import { StageId } from "../Stage";
import { GameComponent } from "./GameComponent";
import { updateGameComponent } from "../../../lib/gameUtil";
import { PlayerLaser } from "./PlayerLaser";
import { LaserHit } from "./LaserHit";

export class AlienRows implements StageElement {
    private context: CanvasRenderingContext2D;
    public id: StageId = StageId.ALIENS;
    private dir: "left" | "right" = "right";

    public constructor(private alienRows: Map<number, List<GameComponent>>) {}

    public setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
        this.move();
    }

    public remove(gameComponentId: string, foundRowId: number): void {
        this.alienRows = this.alienRows.set(
            foundRowId,
            this.alienRows.get(foundRowId, List()).filter(arg => arg.id !== gameComponentId)
        );
    }

    public update(): void {
        this.alienRows.forEach(row => row.forEach(c => updateGameComponent(this.context, c)));
        this.move();
    }

    private move(): void {
        const { firstComponent, lastComponent } = this.getFirstAndLast();
        console.log(firstComponent, lastComponent);
        if (!isNil(firstComponent) && !isNil(lastComponent)) {
            this.moveLoop(firstComponent, lastComponent, this.context.canvas.getBoundingClientRect());
        }
    }

    public detectHit(laser: PlayerLaser): Maybe<LaserHit> {
        let laserHit: Maybe<LaserHit> = null;

        this.alienRows.forEach((row, rowId) =>
            row.forEach(gameComponent => {
                const horizontallyNear: boolean = inRange(
                    laser.x + laser.width,
                    gameComponent.x,
                    gameComponent.x + gameComponent.width
                );

                const verticallyNear: boolean = inRange(
                    laser.y + laser.width,
                    gameComponent.y,
                    gameComponent.y + gameComponent.height
                );

                if (horizontallyNear && verticallyNear) laserHit = new LaserHit(gameComponent, rowId);
            })
        );

        return laserHit;
    }

    private moveLoop(
        firstComponent: GameComponent,
        lastComponent: GameComponent,
        domRect: DOMRect
    ): void {
        if (this.dir === "right") {
            if (lastComponent.x + lastComponent.width >= domRect.right - 5) this.dir = "left";
            this.alienRows.forEach(row => row.forEach(c => c.updatePosition((c.x += 1), c.y)));
        } else {
            if (firstComponent.x <= domRect.left + 5) this.dir = "right";
            this.alienRows.forEach(row => row.forEach(c => c.updatePosition((c.x -= 1), c.y)));
        }
    }

    private getFirstAndLast(): {
        firstComponent: Maybe<GameComponent>;
        lastComponent: Maybe<GameComponent>;
    } {
        return {
            firstComponent: this.alienRows.first(List<GameComponent>()).first(null),
            lastComponent: this.alienRows.last(List<GameComponent>()).last(null)
        };
    }
}
