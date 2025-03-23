import { io, Socket } from "socket.io-client";
import { Move, User } from "~types";
import { CreateResponse, JoinResponse } from "./types";

export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3000");
        this.registerEventListeners();
    }

    public createRoom(user: User) {
        this.socket.emit("create", user);
    }

    public joinRoom(roomCode: string, userName: string) {
        this.socket.emit("join", roomCode, userName);
    }

    public sendMove(move: Move) {
        this.socket.emit("move", move);
    }

    private registerEventListeners() {
        this.socket.on("create-success", (response: CreateResponse) =>
            this.dispatchOnCreateSuccess(response));

        this.socket.on("create-failure", (errorMessage: string) =>
            this.dispatchOnError(errorMessage));

        this.socket.on("join-success", (response: JoinResponse) =>
            this.dispatchOnJoinSuccess(response));

        this.socket.on("join-failure", (errorMessage: string) =>
            this.dispatchOnError(errorMessage));

        this.socket.on("opponent-joined", (user: User) =>
            this.dispatchOnOpponentJoined(user));

        this.socket.on("move", (move: Move) =>
            this.dispatchOnMove(move));
    }

    private dispatchOnCreateSuccess({ roomCode, user }: CreateResponse) {
        const createSuccessEvent = new CustomEvent("onCreateSuccess", { detail: { roomCode, user } });
        document.dispatchEvent(createSuccessEvent);
    }

    private dispatchOnJoinSuccess({roomCode, user, opponent, lastMove}: JoinResponse) {
        const joinSuccessEvent = new CustomEvent("onJoinSuccess", { detail: { roomCode, user, opponent } });
        document.dispatchEvent(joinSuccessEvent);

        if (lastMove) 
            this.dispatchOnMove(lastMove);
    }

    private dispatchOnOpponentJoined(user: User) {
        const opponentJoinEvent = new CustomEvent("onOpponentJoined", { detail: user });
        document.dispatchEvent(opponentJoinEvent);
    }

    private dispatchOnMove(move: Move) {
        const moveEvent = new CustomEvent("onMove", { detail: move } );
        document.dispatchEvent(moveEvent);
    }

    private dispatchOnError(errorMessage: string) {
        const createErrorEvent = new CustomEvent("onError", { detail: errorMessage });
        document.dispatchEvent(createErrorEvent);
    }
}
