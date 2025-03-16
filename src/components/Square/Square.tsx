import * as React from "react";
import "./Square.css";

export type SquareProps = {
    value: string;
    onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Square = (props: SquareProps) => {
    const { value, onSquareClick } = props;

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

export default Square;
