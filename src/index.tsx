import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import { ScoreConnected } from "./App/Score";
import { LivesConnected } from "./App/Lives/Lives";
import { RenderAliensConnected } from "./App/Aliens";
import "./style.scss";

const App: React.FC = () => (
    <Provider store={store}>
        <ScoreConnected />
        <LivesConnected />
        <RenderAliensConnected />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
