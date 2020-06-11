import { List, Map } from "immutable";

import { StageElement } from "./StageElement";
import { inRange } from "../../../lib/util";
import { StageId } from "../Stage";
import { GameComponent } from "./GameComponent";
import { updateGameComponent } from "../../../lib/gameUtil";
import { PlayerLaser } from "./PlayerLaser";
import { LaserHit } from "./LaserHit";

export class AlienRows implements StageElement {
    private context: CanvasRenderingContext2D;
    public id: StageId = StageId.ALIENS;
    private dir: "left" | "right" = "right";
    private GAME_BOUNDS: DOMRect;

    public constructor(private alienRows: Map<number, List<GameComponent>>) {}

    public setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
        this.GAME_BOUNDS = this.context.canvas.getBoundingClientRect();
        this.moveLoop();
    }

    public remove(gameComponentId: string, foundRowId: number): void {
        this.alienRows = this.alienRows.set(
            foundRowId,
            this.alienRows.get(foundRowId, List()).filter(arg => arg.id !== gameComponentId)
        );

        const row: Maybe<List<GameComponent>> = this.alienRows.get(foundRowId);
        if (row && row.isEmpty()) this.alienRows = this.alienRows.delete(foundRowId);
    }

    public update(): void {
        this.alienRows.forEach(row => row.forEach(c => updateGameComponent(this.context, c)));
        this.moveLoop();
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

    private moveLoop(): void {
        let prevDir = this.dir;
        if (this.dir === "right") {
            this.alienRows.forEach(row =>
                row.forEach(c => {
                    const newX = (c.x += 1);
                    if (newX + 40 >= this.GAME_BOUNDS.right - 5) this.dir = "left";
                    c.updatePosition(newX, c.y);
                })
            );
        } else {
            this.alienRows.forEach(row =>
                row.forEach(c => {
                    const newX = (c.x -= 1);
                    if (newX <= this.GAME_BOUNDS.left - 5) this.dir = "right";
                    c.updatePosition(newX, c.y);
                })
            );
        }

        if (prevDir !== this.dir) this.lowerRow();
    }

    private lowerRow() {
        this.alienRows.forEach(row => row.forEach(c => c.updatePosition(c.x, c.y + c.height / 2)));
    }
}
