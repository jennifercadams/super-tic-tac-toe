import * as React from "react";
import SuperBoard, { SuperBoardProps } from "~components/SuperBoard/SuperBoard";
import useBotSuperGame from "./useBotSuperGame";
import { Player } from "~types";
import "./BotSuperGame.css";

const BotSuperGame = () => {
    const {
        boards,
        lastMove,
        status,
        winner,
        handleClick,
        handleRestart,
    } = useBotSuperGame(Player.X);

    const superBoardProps: SuperBoardProps = { boards, lastMove, handleClick };

    return (
        <div className="bot-super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
            <button className="ui-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default BotSuperGame;
