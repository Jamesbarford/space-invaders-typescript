import { StageElement } from "../models/StageElement";
import { StageId } from "../Stage";
import { forEach } from "../../../lib/util";
import { BaseAlien } from "../Characters/BaseAlien";
import { Directions } from "../models/Directions";

export class AlienRow implements StageElement {
    public id: StageId = StageId.ALIENS;
    private dir: Directions = Directions.RIGHT;
    private SPEED: number = 1;

    public constructor(public aliens: Record<number, Array<BaseAlien>>, private GAME_BOUNDS: DOMRect) {}

    public update(ctx: CanvasRenderingContext2D): void {
        this.moveLoop(ctx);
    }

    private moveLoop(ctx: CanvasRenderingContext2D): void {
        if (this.dir === Directions.RIGHT) {
            forEach(this.aliens, row => forEach(row, this.changeXPosition(+this.SPEED, ctx)));
        } else {
            forEach(this.aliens, row => forEach(row, this.changeXPosition(-this.SPEED, ctx)));
        }
    }

    private changeXPosition(speed: number, ctx: CanvasRenderingContext2D): (c: BaseAlien) => void {
        return (c: BaseAlien): void => {
            const newXPosition: number = (c.x += speed);

            this.changeDirection(newXPosition, ctx);
            c.draw(ctx, newXPosition, c.y);
        };
    }

    private changeDirection(xPosition: number, ctx: CanvasRenderingContext2D): void {
        switch (this.dir) {
            case Directions.LEFT:
                const shouldGoRight: boolean = xPosition <= this.GAME_BOUNDS.left - 5;
                if (shouldGoRight) {
                    this.dir = Directions.RIGHT;
                    this.lowerRow(ctx);
                }

            case Directions.RIGHT:
                const shouldGoLeft: boolean = xPosition + 40 >= this.GAME_BOUNDS.right - 5;
                if (shouldGoLeft) {
                    this.dir = Directions.LEFT;
                    this.lowerRow(ctx);
                }
        }
    }

    private lowerRow(ctx: CanvasRenderingContext2D): void {
        forEach(this.aliens, row => forEach(row, c => c.draw(ctx, c.x, c.y + 2)));
    }
}
