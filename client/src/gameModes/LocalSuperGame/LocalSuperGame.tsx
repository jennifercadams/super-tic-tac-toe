import * as React from "react";
import SuperBoard, { SuperBoardProps } from "~components/SuperBoard/SuperBoard";
import useSuperGame from "./useLocalSuperGame";
import "./LocalSuperGame.css";

const LocalSuperGame = () => {
    const {
        boards,
        lastMove,
        status,
        winner,
        handleClick,
        handleRestart,
    } = useSuperGame();

    const superBoardProps: SuperBoardProps = { boards, lastMove, handleClick };

    return (
        <div className="local-super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
            <button className="ui-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default LocalSuperGame;
