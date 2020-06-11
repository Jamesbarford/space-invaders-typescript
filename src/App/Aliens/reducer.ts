import { Map } from "immutable";
import { v4 as uuid } from "uuid";

import { Alien } from "./models/Alien";

export type AlienState = Map<number, Map<string, Alien>>;

function createInitial(): AlienState {
    return Map([
        [0, createAlienMap(4)],
        [1, createAlienMap(3)],
        [2, createAlienMap(3)],
        [3, createAlienMap(2)],
        [4, createAlienMap(2)]
    ]);
}

function createAlienMap(scoreValue: number): Map<string, Alien> {
    const map: Map<string, Alien> = Map();

    return map.withMutations(m => {
        let i: number = 12;
        while (--i > 0) {
            const id = uuid();
            m.set(id, new Alien(id, scoreValue, true));
        }
    });
}

const enum AlienActionType {
    KillAlien = "AlienAction.KillAlien"
}

export class KillAlien {
    public readonly type = AlienActionType.KillAlien;
    public constructor(public readonly rowNumber: number, public alienId: string) {}
}

export type AlienActions = KillAlien;

export function aliensReducer(state: AlienState = createInitial(), action: AlienActions): AlienState {
    switch (action.type) {
        case AlienActionType.KillAlien:
            return state.deleteIn([action.rowNumber, action.alienId]);

        default:
            return state;
    }
}
