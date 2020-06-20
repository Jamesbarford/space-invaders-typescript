import { GREEN } from "../../../constants";

export class PlayerShip {
    public x: number;
    public y: number

    public constructor(public size: number) {}

    public get width(): number {
        return this.size * 13;
    }

    public get height(): number {
        return this.size * 7;
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.draw(ctx, x, y);
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = GREEN;

        ctx.fillRect(x + this.size * 6, y, this.size, this.size);
        ctx.fillRect(x + this.size * 5, y + this.size, this.size * 3, this.size);
        ctx.fillRect(x + this.size * 5, y + this.size * 2, this.size * 3, this.size);

        ctx.fillRect(x + this.size, y + this.size * 3, this.size * 11, this.size);
        ctx.fillRect(x, y + this.size * 4, this.size * 13, this.size);
        ctx.fillRect(x, y + this.size * 5, this.size * 13, this.size);
        ctx.fillRect(x, y + this.size * 6, this.size * 13, this.size);
        ctx.fillRect(x, y + this.size * 7, this.size * 13, this.size);
    }
}
