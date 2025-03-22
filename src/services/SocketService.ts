import { io, Socket } from "socket.io-client";
import { Move, User } from "~types";

export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3000");
        this.socket.on("create-success", (roomCode: string, user: User) => {
            const createSuccessEvent = new CustomEvent("onCreateSuccess", { detail: { roomCode, user } } );
            document.dispatchEvent(createSuccessEvent);
        });
        this.socket.on("move", (move: Move) => {
            const moveEvent = new CustomEvent("onMove", { detail: move } );
            document.dispatchEvent(moveEvent);
        });
    }

    public createRoom(user: User) {
        this.socket.emit("create", user);
    }

    public sendMove(move: Move) {
        this.socket.emit("move", move);
    }
}
