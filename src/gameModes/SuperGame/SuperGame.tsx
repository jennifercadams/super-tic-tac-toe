import * as React from "react";
import SuperBoard from "~components/SuperBoard/SuperBoard";
import useSuperGame from "./useSuperGame";

const SuperGame = () => {
    const {
        boards,
        status,
        winner,
        handleClick,
        handleRestart,
    } = useSuperGame();

    const superBoardProps = { boards, handleClick };

    return (
        <div className="super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
            <button className="restart-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default SuperGame;
