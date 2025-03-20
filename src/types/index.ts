enum Player {
    X = "X",
    O = "O"
};

enum Winner {
    X = "X",
    O = "O",
    Draw = "DRAW"
};

type BoardState = {
    playable: boolean;
    squares: string[];
    winner: string | null;
};

type Move = {
    currentMove: number;
    boardIndex: number;
    squareIndex: number;
    boards: BoardState[];
};

export { BoardState, Move, Player, Winner };
