import { BoardLocation, BoardState, Player } from "~types";
import { Bot } from "./Bot";

export class RandomBot extends Bot {
    constructor(humanPlayer: Player) {
        super(humanPlayer);
    }

    public getFirstMove(): BoardLocation {
        return this.getRandomFirstMove();
    }

    public getNextMove(boards: BoardState[]): BoardLocation {
        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { boardIndex, squareIndex };
    }
}
