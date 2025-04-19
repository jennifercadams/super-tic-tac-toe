import { io, Socket } from "socket.io-client";
import { DisconnectDescription } from "socket.io-client/build/esm/socket";
import { Move, User } from "~types";
import { CreateResponse, JoinResponse } from "./types";

export class SocketService {
    socket: Socket;

    constructor() {
        const url = import.meta.env.DEV ? "http://localhost:3000" : "https://super-tic-tac-toe-l11z.onrender.com";
        this.socket = io(url);
        this.registerEventListeners();
    }

    public get isConnected() {
        return this.socket.connected;
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

    public leaveRoom() {
        this.socket.emit("leave-room");
    }

    public reJoinRoom(roomCode: string, localUser: User, remoteUser: (User | null), lastMove: (Move | null)) {
        this.socket.emit("rejoin", roomCode, localUser, remoteUser, lastMove);
    }

    private registerEventListeners() {
        this.socket.on("connect", this.dispatchOnConnect);

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

        this.socket.on("opponent-left", () => 
            this.dispatchOnOpponentLeft());

        this.socket.on("move", (move: Move) =>
            this.dispatchOnMove(move));

        this.socket.on("disconnect", (reason: string, details: (DisconnectDescription | undefined)) =>
            this.dispatchOnDisconnect(reason, details));
    }

    private dispatchOnConnect() {
        const connectEvent = new CustomEvent("onConnect");
        document.dispatchEvent(connectEvent);
    }

    private dispatchOnCreateSuccess(response: CreateResponse) {
        const createSuccessEvent = new CustomEvent("onCreateSuccess", { detail: response });
        document.dispatchEvent(createSuccessEvent);
    }

    private dispatchOnJoinSuccess(response: JoinResponse) {
        const joinSuccessEvent = new CustomEvent("onJoinSuccess", { detail: response });
        document.dispatchEvent(joinSuccessEvent);
    }

    private dispatchOnOpponentJoined(user: User) {
        const opponentJoinEvent = new CustomEvent("onOpponentJoined", { detail: user });
        document.dispatchEvent(opponentJoinEvent);
    }

    private dispatchOnOpponentLeft() {
        const opponentLeftEvent = new CustomEvent("onOpponentLeft");
        document.dispatchEvent(opponentLeftEvent);
    }

    private dispatchOnMove(move: Move) {
        const moveEvent = new CustomEvent("onMove", { detail: move } );
        document.dispatchEvent(moveEvent);
    }

    private dispatchOnError(errorMessage: string) {
        const errorEvent = new CustomEvent("onError", { detail: errorMessage });
        document.dispatchEvent(errorEvent);
    }

    private dispatchOnDisconnect(reason: string, details: (DisconnectDescription | undefined)) {
        let description: string;
        if (!details) {
            description = "unknown error";
        } else if ("description" in details) {
            description = details.description;
        } else {
            description = details.toString();
        }
        console.log(`Socket disconnect: ${reason} - ${description}`);

        const disconnectEvent = new CustomEvent("onDisconnect");
        document.dispatchEvent(disconnectEvent);
    }
}
