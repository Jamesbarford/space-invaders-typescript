import { StageElement } from "../models/StageElement";
import { StageId } from "../Stage";
import { forEach, isNil } from "../../../lib/util";
import { BaseAlien } from "../Characters/BaseAlien";
import { Directions } from "../models/Directions";
import { createAliens } from "../createAliens";
import { AlienKill, Subscriber, Subscription } from "../models/StageSubscribers";

export class AlienRow implements StageElement {
    public readonly id: StageId = StageId.ALIENS;
    public readonly aliens: Record<number, Array<BaseAlien>> = createAliens();
    private dir: Directions = Directions.RIGHT;
    private SPEED: number = 0.3;

    public constructor(private GAME_BOUNDS: DOMRect) {}

    public subscriber = new Subscriber((subscription: Subscription): void => {
        if (!(subscription instanceof AlienKill)) return;

        const row = this.aliens[subscription.rowNumber];
        const rowIndex = row?.findIndex(alien => alien.id === subscription.alien.id);

        if (isNil(rowIndex) || rowIndex === -1 || isNil(row)) return void 0;

        row.splice(rowIndex, 1);

        if (row.length === 0) delete this.aliens[subscription.rowNumber];
    });

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
                break;

            case Directions.RIGHT:
                const shouldGoLeft: boolean = xPosition + 40 >= this.GAME_BOUNDS.right - 5;
                if (shouldGoLeft) {
                    this.dir = Directions.LEFT;
                    this.lowerRow(ctx);
                }
                break;
        }
    }

    private lowerRow(ctx: CanvasRenderingContext2D): void {
        forEach(this.aliens, row =>
            forEach(row, c => {
                c.draw(ctx, c.x, c.y + 15);
                // c.incrementFrameSpeed(0.2)
            })
        );
        // this.SPEED += 0.2;
    }
}
