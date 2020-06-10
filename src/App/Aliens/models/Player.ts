import { fromEvent } from "rxjs";
import { v4 } from "uuid";

import { StageElement } from "./StageElement";
import { StageId } from "../Stage";
import { GameComponent } from "./GameComponent";
import { isLeftKey, isRightKey, updateGameComponent } from "../../../lib/gameUtil";

export class Player implements StageElement {
    public readonly id: StageId = StageId.PLAYER;
    private readonly player: GameComponent = new GameComponent(100, 40, 200, 0, "cyan", v4());
    private context: CanvasRenderingContext2D;
    private GAME_BOUNDS: DOMRect;
    private RIGHT: boolean = false;
    private LEFT: boolean = false;
    private SPEED: number = 12.5;

    public update(): void {
        updateGameComponent(this.context, this.player);
        this.move();
    }

    private move(): void {
        if (this.LEFT && this.player.x >= 0) {
            return this.player.updatePosition((this.player.x -= this.SPEED), this.player.y);
        }
        if (this.RIGHT && this.player.x < this.GAME_BOUNDS.width - this.player.width) {
            return this.player.updatePosition((this.player.x += this.SPEED), this.player.y);
        }
    }

    public get gameComponent(): GameComponent {
        return this.player;
    }

    public setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
        this.GAME_BOUNDS = this.context.canvas.getBoundingClientRect();
        this.player.updatePosition(this.player.x, this.GAME_BOUNDS.height - this.player.height);
        this.addListeners();
    }

    private addListeners(): void {
        fromEvent(document, "keydown").subscribe(e => {
            if (isLeftKey(e)) this.LEFT = true;
            if (isRightKey(e)) this.RIGHT = true;
        });

        fromEvent(document, "keyup").subscribe(e => {
            if (isLeftKey(e)) this.LEFT = false;
            if (isRightKey(e)) this.RIGHT = false;
        });
    }
}
