import * as React from "react";
import SuperBoard from "~components/SuperBoard/SuperBoard";
import useOnlineSuperGame from "./useOnlineSuperGame";

const OnlineSuperGame = () => {
    const {
        boards,
        status,
        winner,
        handleClick,
        handleRestart,
    } = useOnlineSuperGame();

    const superBoardProps = { boards, handleClick };

    return (
        <div className="online-super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
            <button className="restart-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default OnlineSuperGame;
