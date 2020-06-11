// just a test
import { List, Map } from "immutable";

import { AppState } from "../../store";
import { AlienState } from "./reducer";
import { aliensToComponents } from "./converters/aliensToComponents";
import { Alien } from "./models/Alien";
import { StageElement } from "./models/StageElement";
import { AlienRows } from "./models/AlienRows";
import { GameComponent } from "./models/GameComponent";

export function selectAlienState() {
    return function (appState: AppState): AlienState {
        return appState.aliens;
    };
}

export function selectAliensAsStageElement() {
    return function (appState: AppState): StageElement {
        const alienState: AlienState = selectAlienState()(appState);

        const m = Map<number, List<GameComponent>>().withMutations(map =>
            map
                .set(4, toComponents(alienState, 4, 120, "blue"))
                .set(3, toComponents(alienState, 3, 90, "white"))
                .set(2, toComponents(alienState, 2, 60, "green"))
                .set(1, toComponents(alienState, 1, 30, "white"))
                .set(0, toComponents(alienState, 0, 0, "white"))
        );

        return new AlienRows(m);
    };
}

function toComponents(alienState: AlienState, key: any, y: number, color: string): List<GameComponent> {
    const alien: Maybe<Map<string, Alien>> = alienState.get(key);
    if (alien) return aliensToComponents(alien, y, color);
    return List();
}
