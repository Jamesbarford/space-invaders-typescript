import { v4 as uuid } from "uuid";

import { Alien } from "./models/Alien";
import { deleteInDict, isNil } from "../../lib/util";

export type AlienState = Record<number, Record<string, Alien>>;

function createInitial(): AlienState {
    return {
        0: createAlienMap(4),
        1: createAlienMap(3),
        2: createAlienMap(3),
        3: createAlienMap(2),
        4: createAlienMap(2),
    }
}

function createAlienMap(scoreValue: number): Record<string, Alien> {
    const dict: Record<string, Alien> = {}

    let i: number = 12;
    while (--i > 0) {
        const id = uuid();
        dict[id] = new Alien(id, scoreValue, true);
    }

    return dict;
}

const enum AlienActionType {
    KillAlien = "AlienAction.KillAlien"
}

export class KillAlien {
    public readonly type = AlienActionType.KillAlien;
    public constructor(public readonly rowNumber: number, public alienId: string) { }
}

export type AlienActions = KillAlien;

export function aliensReducer(state: AlienState = createInitial(), action: AlienActions): AlienState {
    switch (action.type) {
        case AlienActionType.KillAlien:
            const row = state[action.rowNumber];

            if (isNil(row)) return state;

            return {
                ...state,
                [action.rowNumber]: deleteInDict(row, action.alienId)
            }

        default:
            return state;
    }
}
