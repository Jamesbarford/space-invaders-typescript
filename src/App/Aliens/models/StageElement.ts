import { StageId } from "../Stage";

export interface StageElement {
    id: StageId;
    update(): void;
}
