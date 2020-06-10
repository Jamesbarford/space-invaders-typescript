import { StageId } from "../Stage";

export interface StageElement {
    id: StageId;
    update(): void;
    setContext(context: CanvasRenderingContext2D): void;
}
