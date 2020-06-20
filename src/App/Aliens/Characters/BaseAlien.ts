export type AlienConstructor = new (
    x: number,
    y: number,
    size: number,
    color: string,
    id: string,
    scoreValue: number
) => BaseAlien;

export abstract class BaseAlien {
    public abstract width: number;
    public abstract height: number;
    protected FRAME_SPEED: number = 8;

    public constructor(
        public x: number,
        public y: number,
        public size: number,
        public color: string,
        public id: string,
        public scoreValue: number
    ) {}

    public abstract draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    public incrementFrameSpeed(increment: number): void {
        this.FRAME_SPEED -= increment;
    }
}
