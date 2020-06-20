import { fromEvent } from "rxjs";

import { StageElement } from "../models/StageElement";
import { StageId } from "../Stage";
import { isLeftKey, isRightKey, isSpaceBar } from "../../../lib/gameUtil";
import { PlayerLaserFire } from "../GameEvent";
import { PlayerShip } from "./PlayerShip";

export class Player implements StageElement {
    public readonly id: StageId = StageId.PLAYER;
    private readonly player: PlayerShip = new PlayerShip(4);
    private RIGHT: boolean = false;
    private LEFT: boolean = false;
    private SPEED: number = 12.5;

    public constructor(private readonly GAME_BOUNDS: DOMRect) {
        this.player.updatePosition(200, this.GAME_BOUNDS.height - this.player.height);
        this.addListeners();
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.move(ctx);
    }

    private move(ctx: CanvasRenderingContext2D): void {
        if (this.LEFT && this.player.x >= 5) {
            return this.player.update(ctx, (this.player.x -= this.SPEED), this.player.y);
        } else if (this.RIGHT && this.player.x < this.GAME_BOUNDS.width - this.player.width) {
            return this.player.update(ctx, (this.player.x += this.SPEED), this.player.y);
        } else {
            return this.player.update(ctx, this.player.x, this.player.y);
        }
    }

    private addListeners(): void {
        fromEvent(document, "keydown").subscribe(e => {
            if (isLeftKey(e)) this.LEFT = true;
            if (isRightKey(e)) this.RIGHT = true;
        });

        fromEvent(document, "keyup").subscribe(e => {
            if (isLeftKey(e)) this.LEFT = false;
            if (isRightKey(e)) this.RIGHT = false;
        });

        fromEvent(document, "keydown").subscribe(e => {
            if (isSpaceBar(e)) this.shoot();
        });
    }

    private shoot(): void {
        PlayerLaserFire.dispatch(this.player.x + this.player.width / 2, this.player.y - this.player.size);
    }
}
