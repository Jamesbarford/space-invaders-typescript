import { List, Map } from "immutable";

import { StageElement } from "./StageElement";
import { inRange } from "../../../lib/util";
import { StageId } from "../Stage";
import { GameComponent } from "./GameComponent";
import { updateGameComponent } from "../../../lib/gameUtil";
import { PlayerLaser } from "./PlayerLaser";
import { LaserHit } from "./LaserHit";
import { Directions } from "./Directions";
import { StageService } from "../StageService";

export class AlienRows implements StageElement {
    public id: StageId = StageId.ALIENS;
    private dir: Directions = Directions.RIGHT;
    private SPEED: number = 1;

    public constructor(
        private alienRows: Map<number, List<GameComponent>>,
        private readonly stageService: StageService
    ) {
        this.moveLoop();
        this.changeXPosition = this.changeXPosition.bind(this);
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
        this.alienRows.forEach(row => row.forEach(c => updateGameComponent(this.stageService.getContext(), c)));
        this.moveLoop();
    }

    public detectHit(laser: PlayerLaser): Maybe<LaserHit> {
        let laserHit: Maybe<LaserHit> = null;

        this.alienRows.forEach((row, rowId) =>
            row.forEach(gameComponent => {
                const { x, y, width, height } = gameComponent;
                if (
                    inRange(laser.x + laser.width, x, x + width) &&
                    inRange(laser.y + laser.width, y, y + height)
                ) {
                    laserHit = new LaserHit(gameComponent, rowId);
                    return false;
                }
            })
        );

        return laserHit;
    }

    private moveLoop(): void {
        let prevDir = this.dir;

        if (this.dir === Directions.RIGHT) {
            this.alienRows.forEach(row => row.forEach(this.changeXPosition(+this.SPEED)));
        } else {
            this.alienRows.forEach(row => row.forEach(this.changeXPosition(-this.SPEED)));
        }

        if (prevDir !== this.dir) this.lowerRow();
    }

    private changeXPosition(speed: number) {
        return (c: GameComponent): void => {
            const newXPosition: number = (c.x += speed);

            this.changeDirection(newXPosition);
            c.updatePosition(newXPosition, c.y);
        };
    }

    private changeDirection(xPosition: number) {
        switch (this.dir) {
            case Directions.LEFT:
                const shouldGoRight: boolean = xPosition <= this.stageService.GAME_BOUNDS.left - 5;
                if (shouldGoRight) this.dir = Directions.RIGHT;

            case Directions.RIGHT:
                const shouldGoLeft: boolean = xPosition + 40 >= this.stageService.GAME_BOUNDS.right - 5;
                if (shouldGoLeft) this.dir = Directions.LEFT;
        }
    }

    private lowerRow(): void {
        this.alienRows.forEach(row => row.forEach(c => c.updatePosition(c.x, c.y + c.height / 2)));
    }
}
