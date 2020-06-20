import { AppState } from "../../store";
import { AlienState } from "./reducer";
import { aliensToComponents } from "./converters/aliensToComponents";
import { Alien } from "./models/Alien";
import { get } from "../../lib/util";
import { EggAlien } from "./Characters/EggAlien";
import { AlienConstructor, BaseAlien } from "./Characters/BaseAlien";
import { BottomAlien } from "./Characters/BottomAlien";
import { MiddleAlien } from "./Characters/MiddleAlien";

export function selectAlienState() {
    return function (appState: AppState): AlienState {
        return appState.aliens;
    };
}

function toComponents(
    alienState: AlienState,
    key: number,
    y: number,
    color: string,
    Alien: AlienConstructor
): Array<BaseAlien> {
    const alien: Maybe<Record<string, Alien>> = get(alienState, key);
    if (alien) return aliensToComponents(alien, y, color, Alien);
    return [];
}

export function generateAliens() {
    return function (appState: AppState): Record<number, Array<BaseAlien>> {
        const alienState: AlienState = selectAlienState()(appState);

        return {
            4: toComponents(alienState, 4, 120, "white", BottomAlien),
            3: toComponents(alienState, 3, 90, "white", BottomAlien),
            2: toComponents(alienState, 2, 60, "white", MiddleAlien),
            1: toComponents(alienState, 1, 30, "white", MiddleAlien),
            0: toComponents(alienState, 0, 0, "white", EggAlien)
        };
    };
}
