import { StageId } from "../Stage";
import { StageService } from "../StageService";

export interface StageElement {
    id: StageId;
    update(): void;
    setStageService(stageService: StageService): void
}
