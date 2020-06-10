import { immerable } from "immer";

export class Alien {
    [immerable] = true;

    public constructor(public id: string, public scoreValue: number, public isAlive: boolean) {}
}
