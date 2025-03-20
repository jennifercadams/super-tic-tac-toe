import { io, Socket } from "socket.io-client";
import { Move } from "~types";

export class SocketService {
    socket: Socket;
    onProcessMove: (move: Move) => void;

    constructor(onProcessMove: (move: Move) => void) {
        this.socket = io("http://localhost:3000");
        this.onProcessMove = onProcessMove;
        this.socket.on("move", (move: Move) => {
            onProcessMove(move);
        });
    }

    public sendMove(move: Move) {
        this.socket.emit("move", move);
    }
}
