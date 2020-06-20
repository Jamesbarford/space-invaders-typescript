import { AppState } from "../../store";

const enum LivesActionTypes {
    AddLife = "LivesAction.AddLife",
    RemoveLife = "LivesAction.RemoveLife"
}

export class AddLife {
    public readonly type = LivesActionTypes.AddLife;
}

export class RemoveLife {
    public readonly type = LivesActionTypes.RemoveLife;
}

type LivesActions = AddLife | RemoveLife;

export function selectLivesState(appState: AppState): number {
    return appState.lives;
}

export function livesReducer(state: number = 3, action: LivesActions): number {
    switch (action.type) {
        case LivesActionTypes.AddLife:
            return state + 1;

        case LivesActionTypes.RemoveLife:
            return state - 1;

        default:
            return state;
    }
}
