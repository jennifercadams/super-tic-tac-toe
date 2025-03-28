import * as React from "react";
import { Link } from "react-router";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1>Super Tic Tac Toe</h1>
            <Link className="ui-button" to="/local-pass-and-play">Local Pass And Play</Link>
            <Link className="ui-button" to="/online-multiplayer">Online Multiplayer</Link>
        </div>
    );
};

export default LandingPage;
