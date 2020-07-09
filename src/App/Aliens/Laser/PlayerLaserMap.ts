import { Laser } from "./Laser";
import { GREEN } from "../../../constants";
import { PlayerShip } from "../Characters/PlayerShip";
import { StageElement } from "../models/StageElement";
import { StageId } from "../Stage";
import { isNil } from "../../../lib/util";

export class PlayerLaserMap implements StageElement {
    public readonly id = StageId.LASER;
    public playerLaser: Laser = new Laser(GREEN);
    private map: Array<Laser> = [];

    public add(playerShip: PlayerShip): void {
        if (this.map.length === 0) {
            this.playerLaser = new Laser(GREEN);
            this.playerLaser.y = playerShip.y - playerShip.size;
            this.playerLaser.x = playerShip.x + playerShip.width / 2
            this.map = [this.playerLaser];
        }
    }

    public delete(): boolean {
        this.map = []
        return true;
    }

    public forEach(cb: (playerLaserFire: Laser) => void): void {
        this.map[0] && cb(this.map[0]);
    }

    public get size(): number {
        return this.map.length;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        const playerLaser = this.map[0];
        if(!isNil(playerLaser)) playerLaser.update(ctx, playerLaser.x, playerLaser.y -= 7);
    }
}
