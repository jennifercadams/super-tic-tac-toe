import * as React from "react";
import "./Square.css";

export type SquareProps = {
    value: string;
};

const Square = (props: SquareProps) => {
    return (
        <button className="square">{props.value}</button>
    );
};

export default Square;
