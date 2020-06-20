import * as React from "react";
import { connect } from "react-redux";

import { Stage, Subscription } from "./Stage";
import { IncrementScore } from "../Score/reducer";
import { Player } from "./Characters/Player";
import { AlienRow } from "./AlienRow/AlienRow";

interface MapDispatchToProps {
    incrementScore(score: number): void;
}

type RenderAliensProps = MapDispatchToProps;

class RenderAliens extends React.Component<RenderAliensProps> {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    private stage: Stage;

    public componentDidMount(): void {
        if (this.canvas.current) {
            this.stage = new Stage(this.canvas.current);
            this.stage.subscribe(this.subscriber);
            const gameBounds = this.canvas.current.getBoundingClientRect();
            this.stage.stageElementMap.addElement(new Player(gameBounds));
            this.stage.stageElementMap.addElement(new AlienRow(gameBounds));
        }
    }

    private togglePause = (): void => {
        window.cancelAnimationFrame(this.stage.animationId);
    };

    private subscriber = (arg: Subscription): void => {
        if(!arg.detail) return
        this.props.incrementScore(arg.detail.alien.scoreValue);
    }

    public render(): JSX.Element {
        return (
            <>
                <canvas style={{ backgroundColor: "black" }} ref={this.canvas} />
                <button onClick={this.togglePause}>pause</button>
            </>
        );
    }
}

export const RenderAliensConnected = connect<null, MapDispatchToProps>(
 null,
    dispatch => ({
        incrementScore(score): void {
            dispatch(new IncrementScore(score));
        }
    })
)(RenderAliens);
