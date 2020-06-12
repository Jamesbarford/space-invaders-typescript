import { StageElement } from "./StageElement";
import { StageId } from "../Stage";
import { GameComponent } from "./GameComponent";
import { updateGameComponent } from "../../../lib/gameUtil";
import { StageService } from "../StageService";

export class PlayerLaser implements StageElement {
    public readonly id = StageId.LASER;
    private laser: Maybe<GameComponent>;
    public x: number;
    public y: number;
    public width: number;

    public constructor(private readonly stageService: StageService) {}

    public update(): void {
        if (this.laser) updateGameComponent(this.stageService.getContext(), this.laser);
        this.move();
    }

    private move(): void {
        if (this.laser) {
            this.x = this.laser.x;
            this.y = this.laser.y;
            if (this.laser.y <= 0) this.laser = null;
            else this.laser.updatePosition(this.laser.x, (this.laser.y -= 10));
        }
    }

    public shoot(c: GameComponent): void {
        this.laser = new GameComponent(
            2,
            20,
            c.x + c.width / 2,
            this.stageService.GAME_BOUNDS.height - c.height,
            "pink",
            "player-laser"
        );
        this.width = 2;
        this.x = this.laser.x;
        this.y = this.laser.y;
    }
}
