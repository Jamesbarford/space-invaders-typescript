import { v4 as uuid } from "uuid";

import { EggAlien } from "./Characters/EggAlien";
import { AlienConstructor, BaseAlien } from "./Characters/BaseAlien";
import { BottomAlien } from "./Characters/BottomAlien";
import { MiddleAlien } from "./Characters/MiddleAlien";
import { ORANGE, WHITE, PIXEL_SIZE } from "../../constants";

export function createAliens(): Record<number, Array<BaseAlien>> {
    return {
        4: createAlienList(BottomAlien, 120, 10, WHITE),
        3: createAlienList(BottomAlien, 90, 10, ORANGE),
        2: createAlienList(MiddleAlien, 60, 20, ORANGE, 2),
        1: createAlienList(EggAlien, 30, 20, WHITE, 6),
        0: createAlienList(EggAlien, 0, 40, WHITE, 6)
    };
}

function createAlienList(
    AlienClass: AlienConstructor,
    yPosition: number,
    scoreValue: number,
    color: string,
    xOffset: number = 0
): Array<BaseAlien> {
    const alienList: Array<BaseAlien> = [];

    let i: number = 12,
        lastX: number = xOffset;

    while (--i > 0) {
        alienList.push(new AlienClass(lastX, yPosition, PIXEL_SIZE, color, uuid(), scoreValue));
        lastX += 60;
    }

    return alienList;
}
