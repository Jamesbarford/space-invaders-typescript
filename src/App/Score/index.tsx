import * as React from "react";
import { connect } from "react-redux";

import { selectScoreState } from "./reducer";
import { AppState } from "../../store";

interface MapStateToProps {
    score: number;
}

type ScoreProps = MapStateToProps;

const Score: React.FC<ScoreProps> = props => (
    <div>
        <h1>Score: {props.score}</h1>
    </div>
);

export const ScoreConnected = connect<MapStateToProps>((appState: AppState) => ({
    score: selectScoreState(appState)
}))(Score);
