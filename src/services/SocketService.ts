import { io, Socket } from "socket.io-client";
import { Move, User } from "~types";

export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3000");
        this.socket.on("create-success", (roomCode: string, user: User) => {
            const createSuccessEvent = new CustomEvent("onCreateSuccess", { detail: { roomCode, user } });
            document.dispatchEvent(createSuccessEvent);
        });
        this.socket.on("create-failure", (errorMessage: string) => {
            const createFailureEvent = new CustomEvent("onError", { detail: errorMessage });
            document.dispatchEvent(createFailureEvent);
        });
        this.socket.on("join-success", (roomCode: string, user: User, opponent: User) => {
            const joinSuccessEvent = new CustomEvent("onJoinSuccess", { detail: { roomCode, user, opponent } });
            document.dispatchEvent(joinSuccessEvent);
        });
        this.socket.on("join-failure", (errorMessage: string) => {
            const joinFailureEvent = new CustomEvent("onError", { detail: errorMessage });
            document.dispatchEvent(joinFailureEvent);
        });
        this.socket.on("opponent-joined", (user: User) => {
            const opponentJoinEvent = new CustomEvent("onOpponentJoined", { detail: user });
            document.dispatchEvent(opponentJoinEvent);
        });
        this.socket.on("move", (move: Move) => {
            const moveEvent = new CustomEvent("onMove", { detail: move } );
            document.dispatchEvent(moveEvent);
        });
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
}
