import { WHITE } from "../../../constants";

export class AlienLaser {
    public x: number;
    public y: number;
    public width: number = 3;
    public height: number = 15;

    public update(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.draw(ctx);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = WHITE;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
