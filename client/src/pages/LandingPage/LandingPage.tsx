import * as React from "react";
import { Link } from "react-router";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Link className="ui-button" to="/local-pass-and-play">Local Pass And Play</Link>
            <Link className="ui-button" to="/online-multiplayer">Online Multiplayer</Link>
            <Link className="ui-button" to="/how-to-play">How To Play</Link>
            <Link className="ui-button" to="/about">About</Link>
        </div>
    );
};

export default LandingPage;
