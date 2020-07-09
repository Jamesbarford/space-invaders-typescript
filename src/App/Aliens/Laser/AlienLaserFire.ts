import { AlienLaser } from "./AlienLaser";
import { BaseAlien } from "../Characters/BaseAlien";

export class AlienLaserFire {
    public alienLaser: AlienLaser = new AlienLaser();

    public constructor(public readonly x: number, public y: number, public id: string) {}

    public update(ctx: CanvasRenderingContext2D): void {
        this.alienLaser.update(ctx, this.x, (this.y += 4));
    }

    public static create(alien: BaseAlien): AlienLaserFire {
        return new AlienLaserFire(alien.x, alien.y, alien.id);
    }
}
