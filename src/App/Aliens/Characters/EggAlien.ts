import { BaseAlien } from "./BaseAlien";

export class EggAlien extends BaseAlien {
    private frame: number = 0;

    public update(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(ctx, x, y);
    }

    public get width(): number {
        return this.size * 7;
    }

    public get height(): number {
        return this.size;
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.drawBody(ctx);
        if (this.frame === 1) {
            this.legsFrame1(ctx);
            if (Number.isInteger(x / 8)) this.frame = 0
        }  else {
            this.legsFrame2(ctx);
            if (Number.isInteger(x / 8)) this.frame = 1
        }

    }

    private drawBody(ctx: CanvasRenderingContext2D): void {
        const { x, y } = this;
        ctx.fillStyle = this.color;
        ctx.fillRect(x + this.size * 3, y, this.size * 2, this.size);

        ctx.fillRect(x + this.size * 2, y + this.size, this.size * 4, this.size);
        ctx.fillRect(x + this.size, y + this.size * 2, this.size * 6, this.size);

        const eyeRow = y + this.size * 3;
        ctx.fillRect(x, eyeRow, this.size * 8, this.size);
        ctx.clearRect(x + (this.size * 2), eyeRow, this.size, this.size);
        ctx.clearRect(x + (this.size * 5), eyeRow, this.size, this.size);

        ctx.fillRect(x, y + this.size * 4, this.size * 8, this.size);
    }

    private legsFrame1(ctx: CanvasRenderingContext2D): void {
        const { x, y } = this;
        ctx.fillStyle = this.color;
        const legRowTop = y + this.size * 5;
        ctx.fillRect(x + this.size * 2, legRowTop, this.size, this.size);
        ctx.fillRect(x + this.size * 5, legRowTop, this.size, this.size);

        const legRowMiddle = y + this.size * 6;
        ctx.fillRect(x + this.size, legRowMiddle, this.size, this.size);
        ctx.fillRect(x + this.size * 3, legRowMiddle, this.size * 2, this.size);
        ctx.fillRect(x + this.size * 6, legRowMiddle, this.size, this.size);


        const legRowBottom = y + this.size * 7;
        ctx.fillRect(x, legRowBottom, this.size, this.size);
        ctx.fillRect(x + this.size * 7, legRowBottom, this.size, this.size);
        ctx.fillRect(x + this.size * 5, legRowBottom, this.size, this.size);
        ctx.fillRect(x + this.size * 2, legRowBottom, this.size, this.size);
    }

    private legsFrame2(ctx: CanvasRenderingContext2D): void {
        const { x, y } = this;
        const legRowTop = y + this.size * 5;
        ctx.fillRect(x + this.size * 3, legRowTop, this.size * 2, this.size);
        ctx.fillRect(x + this.size, legRowTop, this.size, this.size);
        ctx.fillRect(x + this.size * 6, legRowTop, this.size, this.size);

        const legRowMiddle = y + this.size * 6;
        ctx.fillRect(x, legRowMiddle, this.size, this.size);
        ctx.fillRect(x + this.size * 7, legRowMiddle, this.size, this.size);


        const legRowBottom = y + this.size * 7;
        ctx.fillRect(x + this.size, legRowBottom, this.size, this.size);
        ctx.fillRect(x + this.size * 6, legRowBottom, this.size, this.size);
    }
}
