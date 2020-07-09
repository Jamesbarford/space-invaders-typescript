import { BaseAlien } from "./BaseAlien";

export class BottomAlien extends BaseAlien {
    private frame: number = 0;

    public update(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(ctx, x, y);
    }

    public get width(): number {
        return this.size * 17;
    }

    public get height(): number {
        return this.size;
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.x = x;
        this.y = y;
        ctx.fillStyle = this.color;
        this.drawBody(ctx);
        if (this.frame === 1) {
            this.legsFrame1(ctx);
            if (Number.isInteger(~~x / ~~this.FRAME_SPEED)) this.frame = 0;
        } else {
            this.legsFrame2(ctx);
            if (Number.isInteger(~~x / ~~this.FRAME_SPEED)) this.frame = 1;
        }
        ctx.fillStyle = "";
    }

    private drawBody(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        ctx.fillRect(x + size * 3, y, size * 6, size);

        ctx.fillRect(x + size, y + size, size * 10, size);
        ctx.fillRect(x, y + size * 2, size * 12, size);

        const eyeRow = y + size * 3;
        ctx.fillRect(x, eyeRow, size * 12, size);
        ctx.clearRect(x + size * 3, eyeRow, size * 2, size);
        ctx.clearRect(x + size * 7, eyeRow, size * 2, size);

        ctx.fillRect(x, y + size * 4, size * 12, size);
    }

    private legsFrame1(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        const legRowTop = y + size * 5;
        const legRowMiddle = y + size * 6;
        const legRowBottom = y + size * 7;
        const WIDTH = size * 2;

        ctx.fillRect(x + size * 3, legRowTop, WIDTH, size);
        ctx.fillRect(x + size * 7, legRowTop, WIDTH, size);

        ctx.fillRect(x + size * 2, legRowMiddle, WIDTH, size);
        ctx.fillRect(x + size * 5, legRowMiddle, WIDTH, size);
        ctx.fillRect(x + size * 8, legRowMiddle, WIDTH, size);

        ctx.fillRect(x, legRowBottom, WIDTH, size);
        ctx.fillRect(x + size * 10, legRowBottom, WIDTH, size);
    }

    private legsFrame2(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        const legRowTop = y + this.size * 5;
        const legRowMiddle = y + size * 6;
        const legRowBottom = y + size * 7;
        const WIDTH = size * 2;

        ctx.fillRect(x + size * 7, legRowTop, WIDTH + size, size);
        ctx.fillRect(x + size * 2, legRowTop, WIDTH + size, size);

        ctx.fillRect(x + size * 9, legRowMiddle, WIDTH, size);
        ctx.fillRect(x + size, legRowMiddle, WIDTH, size);
        ctx.fillRect(x + size * 5, legRowMiddle, WIDTH, size);

        ctx.fillRect(x + size * 2, legRowBottom, WIDTH, size);
        ctx.fillRect(x + size * 8, legRowBottom, WIDTH, size);
    }
}
