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

enum Player {
    X = "X",
    O = "O"
};

type User = {
    id: string;
    name: string;
    player: Player;
}

type Room = {
    users: { [key: string]: User; };
    lastMove: Move | null;
}

export { Move, Player, Room, User };
