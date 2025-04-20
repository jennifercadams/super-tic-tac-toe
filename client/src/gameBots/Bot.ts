import { BoardState, Move } from "~types";

export class Bot {
    constructor() {
        if (this.constructor == Bot) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    public getFirstMove(_boards: BoardState[]): Move {
        throw new Error("Method 'getFirstMove()' must be implemented.");
    }

    public getNextMove(_currentMove: number, _boards: BoardState[]): Move {
        throw new Error("Method 'getNextMove()' must be implemented.");
    }
}
