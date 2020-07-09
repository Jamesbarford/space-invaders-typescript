import { BaseAlien } from "../Characters/BaseAlien";
import { forEach } from "../../../lib/util";

export class StageSubscribers {
    private readonly subscribers: Array<Subscriber> = [];

    public notifySubscribers(subscription: Subscription): void {
        forEach(this.subscribers, subscriber => subscriber.observe(subscription));
    }

    public addSubscriber(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }
}

export const enum SubscriptionTypes {
    ALIEN_KILL,
    PLAYER_DEATH,
    REMOVE_PLAYER_LASER
}

export interface SubscriptionAction {
    type: SubscriptionTypes;
}

export class Subscriber {
    public constructor(public readonly observe: (subscription: Subscription) => void) {}
}

export class AlienKill implements SubscriptionAction {
    public readonly type = SubscriptionTypes.ALIEN_KILL;
    public constructor(public readonly alien: BaseAlien, public readonly rowNumber: number) {}
}

export class PlayerDeath implements SubscriptionAction {
    public readonly type = SubscriptionTypes.PLAYER_DEATH;
}

export class RemovePlayerLaser implements SubscriptionAction {
    public readonly type = SubscriptionTypes.REMOVE_PLAYER_LASER;
}

export type Subscription = AlienKill | PlayerDeath | RemovePlayerLaser;
