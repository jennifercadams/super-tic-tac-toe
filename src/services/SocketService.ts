import { io, Socket } from "socket.io-client";
import { Move } from "~types";

export class SocketService {
    socket: Socket;
    onMove: (move: Move) => void;

    constructor(onMove: (move: Move) => void) {
        this.socket = io("http://localhost:3000");
        this.onMove = onMove;
        this.socket.on("move", (move: Move) => {
            onMove(move);
        });
    }

    public sendMove(move: Move) {
        this.socket.emit("move", move);
    }
}
