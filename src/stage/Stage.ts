import { StageElementMap } from "./StageElementMap";
import { isNil } from "../lib/util";
import { StageObservable, StageObservables } from "./StageObservables";
import { StageEvents } from "./StageEvents";

export const enum StageId {
    ALIENS,
    LASER,
    ALIEN_LASER,
    BONUS,
    PLAYER,
    DEBUG
}

export class Stage {
    public animationId: number;
    public readonly context: CanvasRenderingContext2D;
    public readonly stageElementMap: StageElementMap;
    public readonly stageEvents: StageEvents = new StageEvents();
    private readonly observables: StageObservables = new StageObservables();

    public constructor(public readonly canvas: HTMLCanvasElement) {
        this.canvas.width = 800;
        this.canvas.height = 500;
        const context: Maybe<CanvasRenderingContext2D> = this.canvas.getContext("2d");

        if (!isNil(context)) this.context = context;
        else throw new Error("Canvas context not found");

        this.stageElementMap = new StageElementMap(context);

        this.updateCanvas();
    }

    public registerObserver(observable: StageObservable): void {
        this.observables.registerObserver(observable);
    }

    private updateCanvas = (): void => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stageElementMap.update();
        this.stageEvents.trackPlayerLaser(this.stageElementMap, this.observables);
        this.stageEvents.trackAlienLaser(this.stageElementMap, this.observables);
        this.animationId = window.requestAnimationFrame(this.updateCanvas);
    };
}
