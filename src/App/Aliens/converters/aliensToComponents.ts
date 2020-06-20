import { Alien } from "../models/Alien";
import { forEach } from "../../../lib/util";
import { BaseAlien, AlienConstructor } from "../Characters/BaseAlien";

export function aliensToComponents(
    a: Record<string, Alien>,
    y: number,
    color: string,
    AlienClass: AlienConstructor
): Array<BaseAlien> {
    let lastX = 0;
    const list: Array<BaseAlien> = [];

    forEach(a, alien => {
        if (alien) list.push(new AlienClass(lastX, y, 3, color, alien.id));
        lastX += 60;
    })


    return list;
}
