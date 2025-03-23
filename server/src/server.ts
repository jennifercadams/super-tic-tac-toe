import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { Server, Socket } from "socket.io";
import { generateRoomCode } from "./helpers/roomCodeHelper.js";
import { Move, Player, Room, User } from "./types/index.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
    connectionStateRecovery: {},
});

const dirname = fileURLToPath(new URL(".", import.meta.url));
const filePath = join(dirname, "../../client/dist");
app.use(express.static(filePath));

app.get("/", (req, res) => {
    res.sendFile(filePath);
});

const rooms: { [key: string]: Room; } = {};

const onMove = (roomCode: string, move: Move) => {
    rooms[roomCode].lastMove = move;
    io.to(roomCode).emit("move", move);
};

const onDisconnect = (socket: Socket, roomCode: string) => {
    socket.broadcast.to(roomCode).emit("opponent-left");
};

io.on("connection", (socket: Socket) => {
    socket.on("create", (user: User) => {
        try {
            user.id = socket.id;

            const roomCode = generateRoomCode(rooms);
            socket.join(roomCode);

            rooms[roomCode] = { users: [ user ], lastMove: null };

            socket.on("move", (move: Move) => onMove(roomCode, move));
            socket.on("disconnect", () => onDisconnect(socket, roomCode));

            socket.emit("create-success", { roomCode, user });
        } catch (error) {
            const jsonUser = JSON.stringify(user);
            console.error(`Error creating room for user ${jsonUser}:`, error);
            socket.emit("create-failure", "Unknown error");
        }
    });

    socket.on("join", (roomCode: string, userName: string) => {
        if (!(roomCode in rooms)) {
            socket.emit("join-failure", "Room not found");
            return;
        }

        if (rooms[roomCode].users.length > 1) {
            socket.emit("join-failure", "Room is full");
            return;
        }

        try {
            socket.join(roomCode);

            const opponent = rooms[roomCode].users[0];
            const user: User = {
                id: socket.id,
                name: userName,
                player: opponent.player === Player.X ? Player.O : Player.X,
            };
            rooms[roomCode].users.push(user);

            socket.on("move", (move: Move) => onMove(roomCode, move));
            socket.on("disconnect", () => onDisconnect(socket, roomCode));

            const lastMove = rooms[roomCode].lastMove;
            socket.emit("join-success", { roomCode, user, opponent, lastMove });
            socket.broadcast.to(roomCode).emit("opponent-joined", user);
        } catch (error) {
            console.error(`Error joining room ${roomCode}:`, error);
            socket.emit("join-failure", "Unknown error");
        }
    });
});

io.of("/").adapter.on("leave-room", (room: string, id: string) => {
    if (room in rooms) {
        rooms[room].users = rooms[room].users.filter(r => r.id !== id);
    }
});

io.of("/").adapter.on("delete-room", (room: string) => {
    delete rooms[room];
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
