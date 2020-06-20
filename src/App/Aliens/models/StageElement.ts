import { StageId } from "../Stage";

export interface StageElement {
    id: StageId;
    update(ctx: CanvasRenderingContext2D): void;
}
