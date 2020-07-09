import { StageElement } from "../../stage/StageElement";
import { StageId } from "../../stage/Stage";
import { forEach } from "../../lib/util";
import { BaseAlien } from "./Models/BaseAlien";
import { createAliens } from "./createAliens";
import { StageObservable, StageObservableEvent, StageObserverTypes } from "../../stage/StageObservables";
import { AlienLaserMap } from "./Laser/AlienLaserMap";
import { AlienLaserFire } from "./Laser/AlienLaserFire";
import { Directions } from "../../constants";

export class AlienRow implements StageElement {
    public readonly id: StageId = StageId.ALIENS;
    public readonly aliens: Record<number, Array<BaseAlien>> = createAliens();
    public readonly alienLaserMap: AlienLaserMap;
    private dir: Directions = Directions.RIGHT;
    private SPEED: number = 0.5;
    private timerId: NodeJS.Timeout | undefined;

    public constructor(private GAME_BOUNDS: DOMRect) {
        this.alienLaserMap = new AlienLaserMap(GAME_BOUNDS, 5);
        this.occasionallyShoot();
    }

    private occasionallyShoot(): void {
        if (!this.timerId) {
            const rng = ~~(Math.random() * 5000);

            this.timerId = setInterval(() => {
                const alien = this.selectRandomAlien();
                if (!alien) {
                    clearInterval(<number | undefined>this.timerId);
                    this.timerId = undefined;
                } else {
                    if (alien) this.alienLaserMap.add(AlienLaserFire.create(alien));
                    this.timerId = undefined;
                }
            }, rng);
        }
    }

    private selectRandomAlien(): Maybe<BaseAlien> {
        const randomRowId = ~~(Math.random() * 5);
        const row: Maybe<Array<BaseAlien>> = this.aliens?.[randomRowId];

        if (row) return row?.[~~(Math.random() * row.length)];
    }

    public observer = new StageObservable((event: StageObservableEvent): void => {
        switch (event.type) {
            case StageObserverTypes.ALIEN_KILL: {
                const row: BaseAlien[] = this.aliens?.[event.rowNumber] || [];
                const rowIndex = row.findIndex(alien => alien.id === event.alien.id);

                if (rowIndex !== -1) {
                    row?.splice(rowIndex, 1);

                    if (row?.length === 0) delete this.aliens[event.rowNumber];
                }
                break;
            }

            default:
                break;
        }
    });

    public update(ctx: CanvasRenderingContext2D): void {
        this.moveLoop(ctx);
        this.alienLaserMap.update(ctx);
    }

    private moveLoop(ctx: CanvasRenderingContext2D): void {
        const speed = this.dir === Directions.RIGHT ? +this.SPEED : -this.SPEED;
        forEach(this.aliens, row => forEach(row, this.changeXPosition(speed, ctx)));
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
            forEach(row, baseAlien => {
                baseAlien.draw(ctx, baseAlien.x, baseAlien.y + 15);
                // c.incrementFrameSpeed(0.2)
            })
        );
        this.SPEED += 0.05;
    }
}
