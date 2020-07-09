import { StageElement } from "../../stage/StageElement";
import { StageId } from "../../stage/Stage";
import { StageObservable, StageObserverTypes } from "../../stage/StageObservables";

import { isLeftKey, isRightKey, isSpaceBar } from "../../lib/gameUtil";
import { fromEvent } from "../../lib/util";

import { PIXEL_SIZE } from "../../constants";

import { PlayerShip } from "./Models/PlayerShip";
import { PlayerLaserMap } from "./Laser/PlayerLaserMap";

export class Player implements StageElement {
    public readonly id: StageId = StageId.PLAYER;
    public readonly laserMap: PlayerLaserMap = new PlayerLaserMap();
    private readonly playerShip: PlayerShip = new PlayerShip(PIXEL_SIZE);
    private RIGHT: boolean = false;
    private LEFT: boolean = false;
    private SPEED: number = 8;

    public constructor(private readonly GAME_BOUNDS: DOMRect) {
        this.playerShip.updatePosition(200, this.GAME_BOUNDS.height - this.playerShip.height);
        this.addListeners();
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.move(ctx);
    }

    private move(ctx: CanvasRenderingContext2D): void {
        if (this.LEFT && this.playerShip.x >= 5) {
            return this.playerShip.update(ctx, (this.playerShip.x -= this.SPEED), this.playerShip.y);
        } else if (this.RIGHT && this.playerShip.x < this.GAME_BOUNDS.width - this.playerShip.width) {
            return this.playerShip.update(ctx, (this.playerShip.x += this.SPEED), this.playerShip.y);
        } else {
            return this.playerShip.update(ctx, this.playerShip.x, this.playerShip.y);
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
        this.laserMap.add(this.getShip());
    }

    public getShip(): PlayerShip {
        return this.playerShip;
    }

    public observer = new StageObservable(Oubscription => {
        switch (Oubscription.type) {
            case StageObserverTypes.PLAYER_DEATH:
                break;
            case StageObserverTypes.REMOVE_PLAYER_LASER:
                this.laserMap.delete();
                break;
        }
    });
}
