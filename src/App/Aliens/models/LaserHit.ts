import { GameComponent } from "./GameComponent";

export class LaserHit {
    public constructor(public readonly gameComponent: GameComponent, public readonly rowId: number) {}
}
