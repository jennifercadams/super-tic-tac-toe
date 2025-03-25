import * as React from "react";
import { MouseEventHandler } from "react";
import "./Square.css";

export type SquareProps = {
    playable: boolean;
    value: string;
    onSquareClick: MouseEventHandler<HTMLButtonElement>;
};

const Square = (props: SquareProps) => {
    const { playable, value, onSquareClick } = props;

    return (
        <button className="square" onClick={onSquareClick} disabled={!playable}>
            <svg viewBox="0 0 16 16">
                <text x="50%" y="50%">{value}</text>
            </svg>
        </button>
    );
};

export default Square;
