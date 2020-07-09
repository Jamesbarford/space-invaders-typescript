import { forEach } from "../../lib/util";
import { StageId } from "./Stage";
import { StageElementMap } from "./StageElementMap";
import { AlienRow } from "./AlienRow/AlienRow";
import { hitDetection } from "../../lib/gameUtil";
import { AlienKill, PlayerDeath, RemovePlayerLaser, StageSubscribers } from "./models/StageSubscribers";
import { Player } from "./Characters/Player";
import { AlienLaserMap } from "./Laser/AlienLaserMap";
import { PlayerLaserMap } from "./Laser/PlayerLaserMap";

export class StageEvents {
    public trackAlienLaser(stageElementMap: StageElementMap, subscribers: StageSubscribers): void {
        const alienLaserMap = stageElementMap.get(StageId.ALIEN_LASER);
        const player = stageElementMap.get(StageId.PLAYER);

        if (
            !(alienLaserMap instanceof AlienLaserMap) ||
            !(player instanceof Player) ||
            alienLaserMap.size === 0
        )
            return;

        alienLaserMap.forEach(alienLaserFire => {
            if (hitDetection(alienLaserFire.alienLaser, player.getShip())) {
                subscribers.notifySubscribers(new PlayerDeath());
                return alienLaserMap.delete(alienLaserFire.id);
            }
        });
    }

    public trackPlayerLaser(stageElementMap: StageElementMap, subscribers: StageSubscribers): void {
        const playerLaserMap = stageElementMap.get(StageId.LASER);
        const alienRows = stageElementMap.get(StageId.ALIENS);

        if (!(playerLaserMap instanceof PlayerLaserMap) || !(alienRows instanceof AlienRow)) return;

        playerLaserMap.forEach(laser => {
            if (laser.y < 0) subscribers.notifySubscribers(new RemovePlayerLaser());
            else forEach(alienRows.aliens, (row, _, rowNumber) =>
                forEach(row, alien => {
                    if (hitDetection(laser, alien)) {
                        subscribers.notifySubscribers(new RemovePlayerLaser());
                        subscribers.notifySubscribers(new AlienKill(alien, rowNumber));
                        return true;
                    }
                })
            );
        });
    }
}
