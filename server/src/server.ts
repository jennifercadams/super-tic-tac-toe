import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { generateRoomCode } from "./helpers/roomCodeHelper.js";
import { Move, Player, Room, User } from "./types/index.js";

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://super-tic-tac-toe-skai.onrender.com",
    },
    connectionStateRecovery: {},
});

const rooms: { [key: string]: Room; } = {};

const onMove = (roomCode: string, move: Move) => {
    rooms[roomCode].lastMove = move;
    io.to(roomCode).emit("move", move);
};

const onDisconnect = (socket: Socket, roomCode: string) => {
    socket.broadcast.to(roomCode).emit("opponent-left");
};

const onLeaveRoom = (socket: Socket, roomCode: string) => {
    removeEventListeners(socket);
    socket.leave(roomCode);
    socket.broadcast.to(roomCode).emit("opponent-left");
};

const addEventListeners = (socket: Socket, roomCode: string) => {
    socket.on("move", (move: Move) => onMove(roomCode, move));
    socket.on("disconnect", () => onDisconnect(socket, roomCode));
    socket.on("leave-room", () => onLeaveRoom(socket, roomCode));
};

const removeEventListeners = (socket: Socket) => {
    socket.removeAllListeners("move");
    socket.removeAllListeners("disconnect");
    socket.removeAllListeners("leave-room");
};

io.on("connection", (socket: Socket) => {
    let roomCode: string;

    socket.on("create", (user: User) => {
        try {
            user.id = socket.id;

            roomCode = generateRoomCode(rooms);
            socket.join(roomCode);

            rooms[roomCode] = { users: { [user.id]: user }, lastMove: null };

            addEventListeners(socket, roomCode);

            socket.emit("create-success", { roomCode, user });
        } catch (error) {
            const jsonUser = JSON.stringify(user);
            console.error(`Error creating room for user ${jsonUser}:`, error);
            socket.emit("create-failure", "Unknown error");
        }
    });

    socket.on("join", (roomCodeInput: string, userName: string) => {
        if (!(roomCodeInput in rooms)) {
            socket.emit("join-failure", "Room not found");
            return;
        }

        if (Object.keys(rooms[roomCodeInput].users).length > 1) {
            socket.emit("join-failure", "Room is full");
            return;
        }

        try {
            roomCode = roomCodeInput;
            socket.join(roomCode);

            const opponentId = Object.keys(rooms[roomCode].users)[0];
            const opponent = rooms[roomCode].users[opponentId];
            const user: User = {
                id: socket.id,
                name: userName,
                player: opponent.player === Player.X ? Player.O : Player.X,
            };
            rooms[roomCode].users[user.id] = user;

            addEventListeners(socket, roomCode);

            const lastMove = rooms[roomCode].lastMove;
            socket.emit("join-success", { roomCode, user, opponent, lastMove });
            socket.broadcast.to(roomCode).emit("opponent-joined", user);
        } catch (error) {
            console.error(`Error joining room ${roomCode}:`, error);
            socket.emit("join-failure", "Unknown error");
        }
    });

    socket.on("rejoin", (roomCodeInput: string, user: User, opponent: (User | null), lastMove: (Move | null)) => {
        if (roomCodeInput in socket.rooms)
            return;

        try {
            roomCode = roomCodeInput;
            socket.join(roomCode);

            user.id = socket.id;
            if (roomCode in rooms) {
                rooms[roomCode].users[user.id] = user;
                if (!rooms[roomCode].lastMove || rooms[roomCode].lastMove.currentMove < lastMove.currentMove) {
                    rooms[roomCode].lastMove = lastMove;
                }
            } else {
                rooms[roomCode] = { users: { [user.id]: user }, lastMove: lastMove };
            }

            addEventListeners(socket, roomCode);
            socket.emit("join-success", { roomCode, user, opponent, lastMove });
            socket.broadcast.to(roomCode).emit("opponent-joined", user);
        } catch (error) {
            console.error(`Error rejoining room ${roomCode}:`, error);
        }
    });
});

io.of("/").adapter.on("leave-room", (room: string, id: string) => {
    if (room in rooms) {
        delete rooms[room].users[id];
    }
});

io.of("/").adapter.on("delete-room", (room: string) => {
    delete rooms[room];
});

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
