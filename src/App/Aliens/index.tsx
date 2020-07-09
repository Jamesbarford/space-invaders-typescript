import * as React from "react";
import { connect } from "react-redux";

import { Stage } from "./Stage";
import { IncrementScore } from "../Score/reducer";
import { Player } from "./Characters/Player";
import { AlienRow } from "./AlienRow/AlienRow";
import { Subscriber, Subscription, SubscriptionTypes } from "./models/StageSubscribers";
import { RemoveLife } from "../Lives/reducer";

interface MapDispatchToProps {
    incrementScore(score: number): void;
    removeLife(): void;
}

type RenderAliensProps = MapDispatchToProps;

class RenderAliens extends React.Component<RenderAliensProps> {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    private stage: Stage;

    public componentDidMount(): void {
        if (this.canvas.current) {
            this.stage = new Stage(this.canvas.current);

            const gameBounds = this.canvas.current.getBoundingClientRect();
            const alienRows = new AlienRow(gameBounds);
            const player = new Player(gameBounds);

            this.stage.subscribe(this.subscriber);
            this.stage.subscribe(alienRows.subscriber);
            this.stage.subscribe(player.subscriber);

            this.stage.stageElementMap.addElement(alienRows.alienLaserMap);
            this.stage.stageElementMap.addElement(player);
            this.stage.stageElementMap.addElement(player.laserMap);
            this.stage.stageElementMap.addElement(alienRows);
        }
    }

    private togglePause = (): void => {
        window.cancelAnimationFrame(this.stage.animationId);
    };

    private subscriber = new Subscriber((subscription: Subscription): void => {
        switch (subscription.type) {
            case SubscriptionTypes.ALIEN_KILL:
                this.props.incrementScore(subscription.alien.scoreValue);
                break;

            case SubscriptionTypes.PLAYER_DEATH:
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

export const RenderAliensConnected = connect<null, MapDispatchToProps>(null, dispatch => ({
    incrementScore(score) {
        dispatch(new IncrementScore(score));
    },
    removeLife() {
        dispatch(new RemoveLife());
    }
}))(RenderAliens);
