import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import { ScoreConnected } from "./App/Score";
import { LivesConnected } from "./App/Lives/Lives";
import { RenderGameConnected } from "./App";
import "./style.scss";

const App: React.FC = () => (
    <Provider store={store}>
        <ScoreConnected />
        <LivesConnected />
        <RenderGameConnected />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
