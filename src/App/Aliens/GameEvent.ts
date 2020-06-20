import { StageElement } from "./models/StageElement";
import { StageId } from "./Stage";
import { PlayerLaser } from "./Laser/PlayerLaser";

export const GAME_EVENT = "game-event";

export const enum GameEvent {
    PLAYER_LASER_FIRE = "0",
    PLAYER_LASER_HIT = "1",
    PLAYER_LOSE_LIFE = "2",
    PLAYER_LASER_OUT_OF_BOUNDS = "3",

    ALIEN_LASER_FIRE = "9",
    ALIEN_LASER_HIT = "10",
    ALIEN_DEATH = "11"
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
        this.playerLaser.update(ctx, this.x, this.y -= 7);
    }

    public static dispatch(x: number, y: number): void {
        const playerLaserFire = new PlayerLaserFire(x, y);
        dispatchGameEvent(playerLaserFire);
    }
}

class AlienLaserFire extends GameAction {
    public readonly type = GameEvent.ALIEN_LASER_FIRE;
    public constructor(public readonly x: number, public readonly y: number) {
        super(GameEvent.ALIEN_LASER_FIRE);
    }

    public static dispatch(x: number, y: number): void {
        const alienLaserFire = new AlienLaserFire(x, y);
        dispatchGameEvent(alienLaserFire);
    }
}

export type GameActions = PlayerLaserFire | AlienLaserFire;

function dispatchGameEvent(action: GameAction): void {
    document.dispatchEvent(new CustomEvent(GAME_EVENT, { detail: action }));
}
