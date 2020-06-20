import { GameComponent } from "../App/Aliens/models/GameComponent";
import { inRange } from "./util";

export function updateGameComponent(context: CanvasRenderingContext2D, c: GameComponent): void {
    context.fillStyle = c.color;
    context.fillRect(c.x, c.y, c.size, c.size);
    context.fillStyle = "";
}

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
    const hasHit = inRange(projectile.x + projectile.width, target.x, target.x + target.width) &&
        inRange(projectile.y, target.y, target.y + target.height);

    return hasHit
}
