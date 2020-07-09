import { forEach } from "../lib/util";
import { StageId } from "./Stage";
import { StageElementMap } from "./StageElementMap";
import { AlienRow } from "../App/Aliens/AlienRow";
import { hitDetection } from "../lib/gameUtil";
import { AlienKill, PlayerDeath, RemovePlayerLaser, StageObservables } from "./StageObservables";
import { Player } from "../App/Player/Player";
import { AlienLaserMap } from "../App/Aliens/Laser/AlienLaserMap";
import { PlayerLaserMap } from "../App/Player/Laser/PlayerLaserMap";

export class StageEvents {
    public trackAlienLaser(stageElementMap: StageElementMap, subscribers: StageObservables): void {
        const alienLaserMap = <Maybe<AlienLaserMap>>stageElementMap.get(StageId.ALIEN_LASER);
        const player = <Maybe<Player>>stageElementMap.get(StageId.PLAYER);

        alienLaserMap?.forEach(alienLaserFire => {
            if (player && hitDetection(alienLaserFire.alienLaser, player.getShip())) {
                subscribers.notifyObservers(new PlayerDeath());
                return alienLaserMap.delete(alienLaserFire.id);
            }
        });
    }

    public trackPlayerLaser(stageElementMap: StageElementMap, subscribers: StageObservables): void {
        const playerLaserMap = <Maybe<PlayerLaserMap>>stageElementMap.get(StageId.LASER);
        const alienRows = <Maybe<AlienRow>>stageElementMap.get(StageId.ALIENS);

        playerLaserMap?.forEach(laser => {
            if (laser.y < 0) subscribers.notifyObservers(new RemovePlayerLaser());
            else forEach(alienRows?.aliens || [], (row, _, rowNumber) =>
                forEach(row, alien => {
                    if (hitDetection(laser, alien)) {
                        subscribers.notifyObservers(new RemovePlayerLaser());
                        subscribers.notifyObservers(new AlienKill(alien, rowNumber));
                        return true;
                    }
                })
            );
        });
    }
}
