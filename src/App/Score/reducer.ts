import { AppState } from "../../store";

const enum ScoreActionTypes {
    IncrementScore = "ScoreAction.IncrementScore"
}

export class IncrementScore {
    public readonly type = ScoreActionTypes.IncrementScore;
    public constructor(public readonly increment: number) {}
}

type ScoreActions = IncrementScore;

export function selectScoreState() {
    return function (appState: AppState): number {
        return appState.score;
    };
}

export function scoreReducer(state: number = 0, action: ScoreActions): number {
    switch (action.type) {
        case ScoreActionTypes.IncrementScore:
            return state + action.increment;

        default:
            return state;
    }
}
