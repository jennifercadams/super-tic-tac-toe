enum Player {
    X = "X",
    O = "O"
}

enum Winner {
    X = "X",
    O = "O",
    Draw = "DRAW"
}

type BoardState = {
    squares: string[];
    winner: string | null;
};

export { Player, Winner, BoardState };
