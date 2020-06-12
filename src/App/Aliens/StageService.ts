import { Map } from "immutable";

import { StageElement } from "./models/StageElement";
import { StageId } from "./Stage";

export class StageService {
    private stageElementMap: Map<StageId, StageElement> = Map();

    public constructor(
        public readonly GAME_BOUNDS: DOMRect,
        private readonly context: CanvasRenderingContext2D
    ) {}

    public addElement(stageElement: StageElement): void {
        stageElement.setStageService(this);
        this.stageElementMap = this.stageElementMap.set(stageElement.id, stageElement);
    }

    public has(stageId: StageId): boolean {
        return this.stageElementMap.has(stageId);
    }

    public get(stageId: StageId): Maybe<StageElement> {
        return this.stageElementMap.get(stageId, null);
    }

    public delete(stageId: StageId) {
        this.stageElementMap = this.stageElementMap.delete(stageId);
    }

    public update(): void {
        this.stageElementMap.forEach(stageElement => stageElement.update());
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }
}
