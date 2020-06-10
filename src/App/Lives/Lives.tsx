import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLivesState } from "./reducer";
import { AppState } from "../../store";

interface MapStateToProps {
    lives: number;
}

type LivesProps = MapStateToProps;

const Lives: React.FC<LivesProps> = props => (
    <div>
        <h1>Lives: {props.lives}</h1>
    </div>
);

export const LivesConnected = connect<MapStateToProps>(() =>
    createStructuredSelector<AppState, MapStateToProps>({
        lives: selectLivesState()
    })
)(Lives);
