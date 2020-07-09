import { StageElement } from "./models/StageElement";
import { StageId } from "./Stage";
import { PlayerLaser } from "./Laser/PlayerLaser";

export const GAME_EVENT = "game-event";

export const enum GameEvent {
    PLAYER_LASER_FIRE = "0",
}

export abstract class GameAction {
    protected constructor(public readonly type: GameEvent) {}
}

export class PlayerLaserFire extends GameAction implements StageElement {
    public playerLaser: PlayerLaser = new PlayerLaser();
    public id = StageId.LASER;

    public constructor(public readonly x: number, public y: number) {
        super(GameEvent.PLAYER_LASER_FIRE);
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.playerLaser.update(ctx, this.x, (this.y -= 7));
    }

    public static dispatch(x: number, y: number): PlayerLaserFire {
        const playerLaserFire = new PlayerLaserFire(x, y);
        dispatchGameEvent(playerLaserFire);
        return playerLaserFire;
    }
}

export type GameActions = PlayerLaserFire;

function dispatchGameEvent(action: GameAction): void {
    document.dispatchEvent(new CustomEvent(GAME_EVENT, { detail: action }));
}
