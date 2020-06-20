import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Stage } from "./Stage";
import { IncrementScore } from "../Score/reducer";
import { generateAliens, selectAlienState } from "./selectors";
import { AppState } from "../../store";
import { Player } from "./Characters/Player";
import { AlienState, KillAlien } from "./reducer";
import { AlienRow } from "./AlienRow/AlienRow";
import { BaseAlien } from "./Characters/BaseAlien";

interface MapDispatchToProps {
    incrementScore(score: number): void;
    killAlien(rowNumber: number, alienId: string): void;
}

interface MapStateToProps {
    alienStageElement: Record<number, Array<BaseAlien>>;
    alienState: AlienState;
}

type RenderAliensProps = MapDispatchToProps & MapStateToProps;

class RenderAliens extends React.Component<RenderAliensProps> {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    private stage: Stage;

    public componentDidMount() {
        if (this.canvas.current) {
            this.stage = new Stage(this.canvas.current);
            const gameBounds = this.canvas.current.getBoundingClientRect();
            this.stage.stageElementMap.addElement(new Player(gameBounds));
            this.stage.stageElementMap.addElement(new AlienRow(this.props.alienStageElement, gameBounds))
        }
    }

    private togglePause = () => {
        window.cancelAnimationFrame(this.stage.animationId);
    };

    public render(): JSX.Element {
        return (
            <>
                <canvas style={{ backgroundColor: "black" }} ref={this.canvas} />
                <button onClick={this.togglePause}>pause</button>
            </>
        );
    }
}

export const RenderAliensConnected = connect<MapStateToProps, MapDispatchToProps>(
    () =>
        createStructuredSelector<AppState, MapStateToProps>({
            alienStageElement: generateAliens(),
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
