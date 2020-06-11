import { Map } from "immutable";

import { StageElement } from "./models/StageElement";
import { PlayerLaser } from "./models/PlayerLaser";
import { AlienRows } from "./models/AlienRows";
import { LaserHit } from "./models/LaserHit";

export const enum StageId {
    ALIENS,
    LASER,
    BONUS,
    PLAYER,
    DEBUG
}

export class Stage {
    public animationId: number;
    public stageElementMap: Map<StageId, StageElement> = Map();
    private readonly context: CanvasRenderingContext2D;
    private readonly GAME_BOUNDS: DOMRect;

    public constructor(public readonly canvas: HTMLCanvasElement) {
        this.canvas.width = 800;
        this.canvas.height = 500;
        const context = this.canvas.getContext("2d");

        if (context) this.context = context;
        else throw new Error("Canvas context not found");

        this.GAME_BOUNDS = canvas.getBoundingClientRect();

        this.updateCanvas = this.updateCanvas.bind(this);
        this.addElement = this.addElement.bind(this);

        this.updateCanvas();
    }

    public addElement(stageElement: StageElement): void {
        stageElement.setContext(this.context);
        this.stageElementMap = this.stageElementMap.set(stageElement.id, stageElement);
    }

    public has(stageId: StageId): boolean {
        return this.stageElementMap.has(stageId);
    }

    public get(stageId: StageId): Maybe<StageElement> {
        return this.stageElementMap.get(stageId, null);
    }

    public getGameBounds(): DOMRect {
        return this.GAME_BOUNDS;
    }

    private shotDetection(): void {
        const laser = this.stageElementMap.get(StageId.LASER, null);
        if (!(laser instanceof PlayerLaser)) return void 0;

        const aliens = this.stageElementMap.get(StageId.ALIENS);
        if (!(aliens instanceof AlienRows)) return void 0;

        const laserHit: Maybe<LaserHit> = aliens.detectHit(laser);

        if (laserHit instanceof LaserHit) {
            aliens.remove(laserHit.gameComponent.id, laserHit.rowId);
            this.stageElementMap = this.stageElementMap.set(StageId.ALIENS, aliens);
            this.stageElementMap = this.stageElementMap.delete(StageId.LASER);
            window.dispatchEvent(new CustomEvent("hit", { detail: laserHit }));
        }

        if (laser.y <= 0) this.stageElementMap = this.stageElementMap.delete(StageId.LASER);
    }

    private updateCanvas(): void {
        this.shotDetection();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stageElementMap.forEach(stageElement => stageElement.update());
        this.animationId = window.requestAnimationFrame(this.updateCanvas);
    }
}
