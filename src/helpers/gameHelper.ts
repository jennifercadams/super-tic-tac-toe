import { BoardState, Move, MoveResult, Player, Winner } from "~types";

const processMove = (move: Move, localPlayer: (Player | null)): MoveResult => {
    const nextMove = move.currentMove + 1;

    const updatedBoards = updateBoards(move);
    const nextBoards = setPlayableSquares(updatedBoards, move.squareIndex, nextMove, localPlayer);

    const winners = nextBoards.map(board => board.winner);
    const nextWinner = checkForWinner(winners);
    const nextPlayer = getPlayer(nextMove);
    const nextStatus = getStatus(nextWinner, nextPlayer);

    return { nextMove, nextBoards, nextStatus, nextWinner };
};

const updateBoards = (move: Move): BoardState[] => {
    return move.boards.map((board, i) => {
        if (move.boardIndex === i)
        {
            const nextSquares = move.boards[move.boardIndex].squares.slice();
            nextSquares[move.squareIndex] = getPlayer(move.currentMove);
            return {
                ...board,
                squares: nextSquares,
                winner: checkForWinner(nextSquares),
            };
        }
        else
        {
            return {
                ...board,
                squares: board.squares.slice(),
            };
        }
    });
};

const setPlayableSquares = (
    boards: BoardState[], 
    squareIndex: number, 
    nextMove: number, 
    localPlayer: (Player | null),
): BoardState[] => {
    const restrictPlayable = !boards[squareIndex].winner;
    const isLocalPlayerTurn = localPlayer !== null ? getPlayer(nextMove) === localPlayer : true;

    return boards.map((board, i) => {
        return {
            ...board,
            playable: isLocalPlayerTurn && !board.winner && (!restrictPlayable || squareIndex === i),
        };
    });
};

const getStatus = (nextWinner: (string | null), nextPlayer: Player) => {
    if (!nextWinner) {
        return `Player Turn: ${nextPlayer}`;
    }
    else if (nextWinner === Winner.Draw) {
        return "Draw";
    }
    else {
        return `Winner: ${nextWinner}`;
    }
};

const getPlayer = (move: number) => {
    return move % 2 === 0 ? Player.X : Player.O;
};

const checkForWinner = (squares: (string | null)[]) => {
    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winStates.length; i++) {
        const [a, b, c] = winStates[i];
        if ([squares[a], squares[a], squares[c]].some(winner => winner === Winner.Draw))
            continue;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    if (squares.every((square) => square))
        return Winner.Draw;

    return null;
};

export { checkForWinner, processMove };
