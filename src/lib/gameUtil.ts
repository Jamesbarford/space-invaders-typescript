import { inRange } from "./util";

export function isLeftKey(e: Event): boolean {
    if (!isKeyBoardEvent(e)) return false;
    return e.keyCode === 37;
}

export function isRightKey(e: Event): boolean {
    if (!isKeyBoardEvent(e)) return false;
    return e.keyCode === 39;
}

export function isSpaceBar(e: Event) {
    if (!isKeyBoardEvent(e)) return false;
    return e.keyCode === 32;
}

function isKeyBoardEvent(e: any): e is KeyboardEvent {
    return e instanceof KeyboardEvent;
}

export function isMouseEvent(e: any): e is MouseEvent {
    return e instanceof MouseEvent;
}

export function hitDetection(
    projectile: { x: number; y: number; height: number; width: number },
    target: { x: number; y: number; height: number; width: number }
): boolean {
    return (
        inRange(projectile.x, target.x - 4, target.x + target.width) &&
        inRange(projectile.y, target.y - 5, target.y + target.height)
    );
}
