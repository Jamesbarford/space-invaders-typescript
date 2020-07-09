import { forEach } from "../../../lib/util";
import { StageElement } from "../models/StageElement";
import { StageId } from "../Stage";
import { AlienLaserFire } from "./AlienLaserFire";

export class AlienLaserMap implements StageElement {
    private map: Record<string, AlienLaserFire> = {};
    private _size: number = 0;
    public id = StageId.ALIEN_LASER;

    public constructor(private GAME_BOUNDS: DOMRect, private LASER_LIMIT: number) {}

    public add(a: AlienLaserFire): void {
        if (a.id in this.map || this._size === this.LASER_LIMIT) return;

        this.map[a.id] = a
        this._size += 1;
    }

    public has(id: string): boolean {
        return id in this.map;
    }

    public forEach(cb: (alienLaserFire: AlienLaserFire) => boolean | void): void {
        forEach(this.map, cb);
    }

    public delete(id: string): boolean {
        const success = delete this.map[id];
        this._size -= 1;
        if (!success) this._size += 1;

        return success;
    }

    public get size(): number {
        return this._size;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        forEach(this.map, laser => {
            if (laser.y > this.GAME_BOUNDS.height) {
                this.delete(laser.id);
            }
            laser.update(ctx);
        });
    }
}
