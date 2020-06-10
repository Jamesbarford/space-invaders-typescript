import { StageElement } from "./StageElement";
import { GameComponent } from "./GameComponent";
import { v4 } from "uuid";
import { isMouseEvent, updateGameComponent } from "../../../lib/gameUtil";
import { fromEvent } from "rxjs";
import { Stage, StageId } from "../Stage";

export class DebugComponent implements StageElement {
    public gameComponent: GameComponent;
    private context: CanvasRenderingContext2D;
    public id: StageId = StageId.DEBUG;
    public constructor(stage: Stage) {
        this.gameComponent = new GameComponent(100, 40, 20, 10, "blue", v4());
        fromEvent(stage.canvas, "mousemove").subscribe(e => {
            if (!isMouseEvent(e)) return void 0;
            console.log({
                x: e.clientX,
                y: e.clientY,
                gameComponent: this.gameComponent
            });
        });
    }

    public update(): void {
        updateGameComponent(this.context, this.gameComponent);
    }

    public setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
    }
}
