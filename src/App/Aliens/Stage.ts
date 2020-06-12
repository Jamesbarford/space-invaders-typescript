import { PlayerLaser } from "./models/PlayerLaser";
import { AlienRows } from "./models/AlienRows";
import { LaserHit } from "./models/LaserHit";
import { StageService } from "./StageService";
import { isNil } from "../../lib/util";

export const enum StageId {
    ALIENS,
    LASER,
    BONUS,
    PLAYER,
    DEBUG
}

export class Stage {
    public animationId: number;
    private readonly context: CanvasRenderingContext2D;
    public readonly stageService: StageService

    public constructor(public readonly canvas: HTMLCanvasElement) {
        this.canvas.width = 800;
        this.canvas.height = 500;
        const context: Maybe<CanvasRenderingContext2D> = this.canvas.getContext("2d");

        if (!isNil(context)) this.context = context;
        else throw new Error("Canvas context not found");

        this.stageService = new StageService(canvas.getBoundingClientRect(), context);

        this.updateCanvas = this.updateCanvas.bind(this);

        this.updateCanvas();
    }

    private shotDetection(): void {
        const laser = this.stageService.get(StageId.LASER);
        if (!(laser instanceof PlayerLaser)) return void 0;

        const aliens = this.stageService.get(StageId.ALIENS);
        if (!(aliens instanceof AlienRows)) return void 0;

        const laserHit: Maybe<LaserHit> = aliens.detectHit(laser);

        if (laserHit instanceof LaserHit) {
            aliens.remove(laserHit.gameComponent.id, laserHit.rowId);
            this.stageService.addElement(aliens);
            this.stageService.delete(StageId.LASER);

            window.dispatchEvent(new CustomEvent("hit", { detail: laserHit }));
        }

        if (laser.y <= 0) this.stageService.delete(StageId.LASER);
    }

    private updateCanvas(): void {
        this.shotDetection();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stageService.update();
        this.animationId = window.requestAnimationFrame(this.updateCanvas);
    }
}
