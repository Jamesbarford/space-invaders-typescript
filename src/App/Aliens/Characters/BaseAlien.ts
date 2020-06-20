export type AlienConstructor = new (
    x: number,
    y: number,
    size: number,
    color: string,
    id: string
) => BaseAlien;

export abstract class BaseAlien {
    public abstract width: number;
    public abstract height: number;

    public constructor(
        public x: number,
        public y: number,
        public size: number,
        public color: string,
        public id: string
    ) {}

    public abstract draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;

}
