import * as React from "react";
import { connect } from "react-redux";

import { Stage } from "../stage/Stage";
import { StageObservable, StageObservableEvent, StageObserverTypes } from "../stage/StageObservables";

import { IncrementScore } from "./Score/reducer";
import { RemoveLife } from "./Lives/reducer";

import { AlienRow } from "./Aliens/AlienRow";
import { Player } from "./Player/Player";

interface MapDispatchToProps {
    incrementScore(score: number): void;
    removeLife(): void;
}

type RenderGameProps = MapDispatchToProps;

class RenderGame extends React.Component<RenderGameProps> {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    private stage: Stage;

    public componentDidMount(): void {
        if (this.canvas.current) {
            this.stage = new Stage(this.canvas.current);

            const gameBounds = this.canvas.current.getBoundingClientRect();
            const alienRows = new AlienRow(gameBounds);
            const player = new Player(gameBounds);

            this.stage.registerObserver(this.observer);
            this.stage.registerObserver(alienRows.observer);
            this.stage.registerObserver(player.observer);

            this.stage.stageElementMap.addElement(alienRows.alienLaserMap);
            this.stage.stageElementMap.addElement(player);
            this.stage.stageElementMap.addElement(player.laserMap);
            this.stage.stageElementMap.addElement(alienRows);
        }
    }

    private togglePause = (): void => {
        window.cancelAnimationFrame(this.stage.animationId);
    };

    private observer = new StageObservable((event: StageObservableEvent): void => {
        switch (event.type) {
            case StageObserverTypes.ALIEN_KILL:
                this.props.incrementScore(event.alien.scoreValue);
                break;

            case StageObserverTypes.PLAYER_DEATH:
                this.props.removeLife();
                break;
        }
    });

    public render(): JSX.Element {
        return (
            <>
                <canvas style={{ backgroundColor: "black" }} ref={this.canvas} />
                <button onClick={this.togglePause}>pause</button>
            </>
        );
    }
}

export const RenderGameConnected = connect<null, MapDispatchToProps>(null, dispatch => ({
    incrementScore(score): void {
        dispatch(new IncrementScore(score));
    },
    removeLife(): void {
        dispatch(new RemoveLife());
    }
}))(RenderGame);
