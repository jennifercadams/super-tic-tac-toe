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

type MoveResult = {
    nextMove: number;
    nextBoards: BoardState[];
    nextStatus: string;
    nextWinner: (string | null);
}

type User = {
    id?: string;
    name: string;
    player: Player;
}

export { BoardState, Move, MoveResult, Player, User, Winner };
