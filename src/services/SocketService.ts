import { io, Socket } from "socket.io-client";
import { Move } from "~types";

export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3000");
        this.socket.on("move", (move: Move) => {
            const moveEvent = new CustomEvent("onMove", { detail: move } );
            document.dispatchEvent(moveEvent);
        });
    }

    public sendMove(move: Move) {
        this.socket.emit("move", move);
    }
}
