export class GameComponent {
    public constructor(
        public size: number,
        public x: number,
        public y: number,
        public color: string,
        public id: string
    ) {}

    public updatePosition(x: number, y: number): any {
        this.x = x;
        this.y = y;
    }
}
