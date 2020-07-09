import { StageElement } from "./StageElement";
import { StageId } from "./Stage";
import { forEach, get } from "../lib/util";

export class StageElementMap {
    private stageElementMap: Record<StageId, StageElement> = <Record<StageId, StageElement>>{};

    public constructor(private readonly context: CanvasRenderingContext2D) {}

    public addElement(stageElement: StageElement): void {
        this.stageElementMap[stageElement.id] = stageElement;
    }

    public has(stageId: StageId): boolean {
        return stageId in this.stageElementMap;
    }

    public get(stageId: StageId): Maybe<StageElement> {
        return get(this.stageElementMap, stageId);
    }

    public delete(stageId: StageId): boolean {
        return delete this.stageElementMap[stageId];
    }

    public update(): void {
        forEach(this.stageElementMap, arg => arg.update(this.context));
    }
}
