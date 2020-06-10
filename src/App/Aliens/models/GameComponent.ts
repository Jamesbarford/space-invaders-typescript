export class GameComponent {
    public constructor(
        public width: number,
        public height: number,
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
