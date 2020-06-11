import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fromEvent } from "rxjs";

import { Stage, StageId } from "./Stage";
import { IncrementScore } from "../Score/reducer";
import { selectAliensAsStageElement, selectAlienState } from "./selectors";
import { AppState } from "../../store";
import { StageElement } from "./models/StageElement";
import { Player } from "./models/Player";
import { isSpaceBar } from "../../lib/gameUtil";
import { PlayerLaser } from "./models/PlayerLaser";
import { AlienState, KillAlien } from "./reducer";
import { LaserHit } from "./models/LaserHit";
import { Alien } from "./models/Alien";

interface MapDispatchToProps {
    incrementScore(score: number): void;
    killAlien(rowNumber: number, alienId: string): void;
}

interface MapStateToProps {
    alienStageElement: StageElement;
    alienState: AlienState;
}

type RenderAliensProps = MapDispatchToProps & MapStateToProps;

class RenderAliens extends React.Component<RenderAliensProps> {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    private stage: Stage;

    public componentDidMount() {
        if (this.canvas.current) {
            this.stage = new Stage(this.canvas.current);
            this.stage.start();
            this.stage.addElement(this.props.alienStageElement);
            this.stage.addElement(new Player());
        }

        fromEvent(document, "keydown").subscribe(e => {
            if (isSpaceBar(e)) this.shoot();
        });

        fromEvent(window, "hit").subscribe(e => {
            if (e instanceof CustomEvent && e.detail instanceof LaserHit) {
                const alien: Maybe<Alien> = this.props.alienState.getIn(
                    [e.detail.rowId, e.detail.gameComponent.id],
                    null
                );

                if (alien instanceof Alien) {
                    this.props.incrementScore(alien.scoreValue);
                    this.props.killAlien(e.detail.rowId, alien.id);
                }
            }
        });
    }

    private shoot() {
        const player: Maybe<StageElement> = this.stage.get(StageId.PLAYER);

        if (!(player instanceof Player) || this.stage.has(StageId.LASER)) return void 0;

        const laser: PlayerLaser = new PlayerLaser();

        this.stage.addElement(laser);
        laser.shoot(player.gameComponent);
    }

    private togglePause = () => {
        window.cancelAnimationFrame(this.stage.animationId);
    };

    public render(): JSX.Element {
        return (
            <>
                <canvas
                    style={{ backgroundColor: "black" }}
                    ref={this.canvas}
                />
                <button onClick={this.togglePause}>pause</button>
            </>
        );
    }
}

export const RenderAliensConnected = connect<MapStateToProps, MapDispatchToProps>(
    () =>
        createStructuredSelector<AppState, MapStateToProps>({
            alienStageElement: selectAliensAsStageElement(),
            alienState: selectAlienState()
        }),
    dispatch => ({
        incrementScore(score): void {
            dispatch(new IncrementScore(score));
        },
        killAlien(rowNumber, alienId) {
            dispatch(new KillAlien(rowNumber, alienId));
        }
    })
)(RenderAliens);
