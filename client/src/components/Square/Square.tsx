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
            {value}
        </button>
    );
};

export default Square;
