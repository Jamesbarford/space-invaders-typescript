import { BaseAlien } from "../App/Aliens/Models/BaseAlien";
import { forEach } from "../lib/util";

export class StageObservables {
    private readonly observables: Array<StageObservable> = [];

    public notifyObservers(event: StageObservableEvent): void {
        forEach(this.observables, observable => observable.observe(event));
    }

    public registerObserver(subscriber: StageObservable): void {
        this.observables.push(subscriber);
    }
}

export class StageObservable {
    public constructor(public readonly observe: (event: StageObservableEvent) => void) {}
}

export const enum StageObserverTypes {
    ALIEN_KILL,
    PLAYER_DEATH,
    REMOVE_PLAYER_LASER
}

export interface StageObserverAction {
    type: StageObserverTypes;
}

export class AlienKill implements StageObserverAction {
    public readonly type = StageObserverTypes.ALIEN_KILL;
    public constructor(public readonly alien: BaseAlien, public readonly rowNumber: number) {}
}

export class PlayerDeath implements StageObserverAction {
    public readonly type = StageObserverTypes.PLAYER_DEATH;
}

export class RemovePlayerLaser implements StageObserverAction {
    public readonly type = StageObserverTypes.REMOVE_PLAYER_LASER;
}

export type StageObservableEvent = AlienKill | PlayerDeath | RemovePlayerLaser;
