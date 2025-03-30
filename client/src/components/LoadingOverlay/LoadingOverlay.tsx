import * as React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-message">
                <div className="loading-animation" />
                <p>Connecting to the multiplayer server.</p>
                <p>Loading may take up to a minute.</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
