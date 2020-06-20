import { createStore, combineReducers, Dispatch, AnyAction, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { Observable } from "rxjs";

import { isFunction } from "../lib/util";
import { livesReducer } from "../App/Lives/reducer";
import { scoreReducer } from "../App/Score/reducer";

export interface AppState {
    lives: number;
    score: number;
}

const middleware = applyMiddleware(
    stripClassActions,
    createLogger({
        collapsed(): boolean {
            return true;
        }
    })
);

const reducers = combineReducers<AppState, AnyAction>({
    lives: livesReducer,
    score: scoreReducer
});

const enhancers = compose(
    middleware,
    "__REDUX_DEVTOOLS_EXTENSION__" in window ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__() : void 0
);

function stripClassActions() {
    return (next: Dispatch) => (action: AnyAction) => {
        if (isFunction(action)) return next(action);
        return next(Object.assign({}, action));
    };
}

export const store = createStore(reducers, enhancers);
export const observableStore: Observable<{
    state: AppState;
    dispatch: Dispatch;
}> = new Observable(subscriber =>
    store.subscribe(() => subscriber.next({ state: store.getState(), dispatch: store.dispatch }))
);
