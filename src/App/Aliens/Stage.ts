import { fromEvent } from "rxjs";
import { StageElementMap } from "./StageElementMap";
import { forEach, get, isNil } from "../../lib/util";
import { GAME_EVENT, GameAction, GameActions, GameEvent, PlayerLaserFire } from "./GameEvent";
import { AlienRow } from "./AlienRow/AlienRow";
import { hitDetection } from "../../lib/gameUtil";

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

    public constructor(public readonly canvas: HTMLCanvasElement) {
        this.canvas.width = 800;
        this.canvas.height = 500;
        const context: Maybe<CanvasRenderingContext2D> = this.canvas.getContext("2d");

        if (!isNil(context)) this.context = context;
        else throw new Error("Canvas context not found");

        this.stageElementMap = new StageElementMap(context);

        this.updateCanvas = this.updateCanvas.bind(this);
        this.addGameListeners();
        this.updateCanvas();
    }

    private addGameListeners(): void {
        fromEvent(document, GAME_EVENT).subscribe(e => {
            const action: Maybe<GameActions> = get(e, "detail");
            if (!(action instanceof GameAction)) return void 0;

            switch (action.type) {
                case GameEvent.ALIEN_LASER_FIRE:
                    break;

                case GameEvent.PLAYER_LASER_FIRE:
                    if (this.stageElementMap.has(StageId.LASER)) break;
                    this.stageElementMap.addElement(action);
                    break;
            }
        });
    }

    private playerLaserTracker(): void {
        const playerLaserFire = this.stageElementMap.get(StageId.LASER);
        const alienRows = this.stageElementMap.get(StageId.ALIENS);
        if (!(playerLaserFire instanceof PlayerLaserFire) || !(alienRows instanceof AlienRow)) return;

        if (playerLaserFire.y < 0) this.stageElementMap.delete(StageId.LASER);

        forEach(alienRows.aliens, row => forEach(row, alien => {
            if (hitDetection(playerLaserFire.playerLaser, alien)) {
                this.stageElementMap.delete(StageId.LASER);
            }
        }));

    }

    private updateCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stageElementMap.update();
        this.playerLaserTracker();
        this.animationId = window.requestAnimationFrame(this.updateCanvas);
    }
}
