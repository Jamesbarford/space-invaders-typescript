import { List, Map } from "immutable";

import { Alien } from "../models/Alien";
import { GameComponent } from "../models/GameComponent";

export function aliensToComponents(
    a: Map<string, Alien>,
    y: number = 4,
    color: string
): List<GameComponent> {
    let lastX = 0;

    return List<GameComponent>().withMutations(list => {
        for (const alien of a.values()) {
            if (alien) {
                const component = new GameComponent(40, 20, lastX, y, color, alien.id);

                list.push(component);
            }

            lastX += 60;
        }
    });
}
