import { Laser } from "./Laser";
import { BaseAlien } from "../Characters/BaseAlien";
import { WHITE } from "../../../constants";

export class AlienLaserFire {
    public alienLaser: Laser = new Laser(WHITE);

    private constructor(public readonly x: number, public y: number, public id: string) {}

    public update(ctx: CanvasRenderingContext2D): void {
        this.alienLaser.update(ctx, this.x, (this.y += 4));
    }

    public static create(alien: BaseAlien): AlienLaserFire {
        return new AlienLaserFire(alien.x, alien.y, alien.id);
    }
}
