import { forEach, fromEvent, get } from "../../lib/util";
import { GAME_EVENT, GameAction, GameActions, GameEvent, PlayerLaserFire } from "./GameEvent";
import { StageId } from "./Stage";
import { StageElementMap } from "./StageElementMap";
import { AlienRow } from "./AlienRow/AlienRow";
import { hitDetection } from "../../lib/gameUtil";
import { AlienKill, StageSubscribers } from "./models/StageSubscribers";

export class StageEvents {
    public addGameListeners(stageElementMap: StageElementMap): void {
        fromEvent(document, GAME_EVENT).subscribe(e => {
            const action: Maybe<GameActions> = get(e, "detail");
            if (!(action instanceof GameAction)) return void 0;

            switch (action.type) {
                case GameEvent.ALIEN_LASER_FIRE:
                    break;

                case GameEvent.PLAYER_LASER_FIRE:
                    if (stageElementMap.has(StageId.LASER)) break;
                    stageElementMap.addElement(action);
                    break;
            }
        });
    }

    public trackPlayerLaser(stageElementMap: StageElementMap, subscribers: StageSubscribers): void {
        const playerLaserFire = stageElementMap.get(StageId.LASER);
        const alienRows = stageElementMap.get(StageId.ALIENS);

        if (!(playerLaserFire instanceof PlayerLaserFire) || !(alienRows instanceof AlienRow)) return;
        if (playerLaserFire.y < 0) stageElementMap.delete(StageId.LASER);

        forEach(alienRows.aliens, (row, _, rowNumber) =>
            forEach(row, alien => {
                if (hitDetection(playerLaserFire.playerLaser, alien)) {
                    subscribers.notifySubscribers(new AlienKill(alien, rowNumber));
                    return stageElementMap.delete(StageId.LASER);
                }
            })
        );
    }
}
