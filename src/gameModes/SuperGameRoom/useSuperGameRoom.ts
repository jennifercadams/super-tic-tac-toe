import { useMemo, useState } from "react";
import { SocketService } from "~services/SocketService";
import { Player, User } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ roomCode, setRoomCode ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<User | null>({ name: "Player 1", player: Player.X});
    const [ remoteUser, setRemoteUser ] = useState<User | null>({ name: "Player 2", player: Player.O});

    const handleCreateRoom = (nameInput: string, playerInput: Player) => {
        console.log("create room: ", nameInput, playerInput);
    };

    const handleJoinRoom = (roomCodeInput: string, nameInput: string) => {
        console.log("join room: ", roomCodeInput, nameInput);
    };

    return {
        socketService,
        roomCode,
        localUser,
        remoteUser,
        handleCreateRoom,
        handleJoinRoom,
    };
};

export default useSuperGameRoom;
