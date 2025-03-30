import * as React from "react";
import { Link } from "react-router";
import "./HowToPlay.css";

const HowToPlay = () => {
    return (
        <div className="how-to-play static-page">
            <h2>How To Play</h2>
            <div className="content">
                <p>Super Tic Tac Toe is played similarly to traditional tic tac toe, except each square of a super tic tac toe board contains its own tic tac toe board.</p>
                <p>Here&apos;s how the game is played:</p>
                <ul>
                    <li>X plays first and can play in any square.</li>
                    <li>Each turn, players must play on the board that corresponds to the position of the previous move within its small board.</li>
                    <li>Win a small board by marking 3 squares in a row.</li>
                    <li>Once a small board is won, that square is marked for the winning player on the large board.</li>
                    <li>If a player would be sent to a small board that has been won or drawn, they may play in any square.</li>
                    <li>Gameplay continues until one player has won 3 boards in a row or each small board is won or drawn.</li>
                </ul>
                <p>Have fun!</p>
            </div>
            <Link className="ui-button" to="/">Home</Link>
        </div>
    );
};

export default HowToPlay;
