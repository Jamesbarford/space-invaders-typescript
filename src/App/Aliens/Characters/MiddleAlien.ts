import { BaseAlien } from "./BaseAlien";

export class MiddleAlien extends BaseAlien {
    private frame: number = 0;
    public update(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(ctx, x, y);
    }

    public get width() {
        return this.size * 11;
    }

    public get height() {
        return this.size;
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.x = x;
        this.y = y;
        ctx.fillStyle = this.color;
        if (this.frame === 1) {
            this.drawBody(ctx);
            this.legsFrame1(ctx);
            if (Number.isInteger(~~x / ~~this.FRAME_SPEED)) this.frame = 0;
        } else {
            this.drawBody2(ctx);
            this.legsFrame2(ctx);
            if (Number.isInteger(~~x / ~~this.FRAME_SPEED)) this.frame = 1;
        }
        ctx.fillStyle = "";
    }

    private drawBody(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        ctx.fillRect(x + size * 2, y, size, size);
        ctx.fillRect(x + size * 8, y, size, size);

        ctx.fillRect(x, y + size, size, size);
        ctx.fillRect(x + size * 3, y + size, size, size);

        ctx.fillRect(x + size * 7, y + size, size, size);
        ctx.fillRect(x + size * 10, y + size, size, size);

        ctx.fillRect(x + size * 2, y + size * 2, size * 7, size);

        ctx.fillRect(x, y + size * 2, size, size);
        ctx.fillRect(x + size * 10, y + size * 2, size, size);

        const eyeRow = y + size * 3;
        ctx.fillRect(x, eyeRow, size * 11, size);
        ctx.clearRect(x + size * 3, eyeRow, size, size);
        ctx.clearRect(x + size * 7, eyeRow, size, size);

        ctx.fillRect(x, y + size * 4, size * 11, size);
    }

    private drawBody2(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        ctx.fillRect(x + size * 2, y, size, size);
        ctx.fillRect(x + size * 8, y, size, size);

        ctx.fillRect(x + size * 3, y + size, size, size);
        ctx.fillRect(x + size * 7, y + size, size, size);
        ctx.fillRect(x + size * 2, y + size * 2, size * 7, size);

        const eyeRow = y + size * 3;
        ctx.fillRect(x + size, eyeRow, size * 9, size);
        ctx.clearRect(x + size * 3, eyeRow, size, size);
        ctx.clearRect(x + size * 7, eyeRow, size, size);

        ctx.fillRect(x, y + size * 4, size * 11, size);
    }

    private legsFrame1(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        const legRowTop = y + size * 5;
        const legRowMiddle = y + size * 6;
        const legRowBottom = y + size * 7;

        ctx.fillRect(x + size, legRowTop, size * 9, size);

        ctx.fillRect(x + size * 2, legRowMiddle, size, size);
        ctx.fillRect(x + size * 8, legRowMiddle, size, size);

        ctx.fillRect(x + size, legRowBottom, size, size);
        ctx.fillRect(x + size * 9, legRowBottom, size, size);
    }

    private legsFrame2(ctx: CanvasRenderingContext2D): void {
        const { x, y, size } = this;
        const legRowTop = y + size * 5;
        const legRowMiddle = y + size * 6;
        const legRowBottom = y + size * 7;

        ctx.fillRect(x, legRowTop, size, size);
        ctx.fillRect(x + size * 10, legRowTop, size, size);
        ctx.fillRect(x + size * 2, legRowTop, size * 7, size);

        ctx.fillRect(x, legRowMiddle, size, size);
        ctx.fillRect(x + size * 10, legRowMiddle, size, size);

        ctx.fillRect(x + size * 2, legRowMiddle, size, size);
        ctx.fillRect(x + size * 8, legRowMiddle, size, size);

        ctx.fillRect(x + size * 3, legRowBottom, size * 2, size);
        ctx.fillRect(x + size * 6, legRowBottom, size * 2, size);
    }
}
