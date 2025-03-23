import { Move, User } from "~types";

type CreateResponse = {
    roomCode: string;
    user: User;
};

type JoinResponse = {
    roomCode: string;
    user: User;
    opponent: User;
    lastMove: (Move | null);
};

export { CreateResponse, JoinResponse };
