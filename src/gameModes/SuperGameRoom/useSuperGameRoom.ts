import { useMemo, useState } from "react";
import { SocketService } from "~services/SocketService";
import { Player, User } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ roomCode, setRoomCode ] = useState<string | null>("test-1234");
    const [ localUser, setLocalUser ] = useState<User | null>({ name: "Player 1", player: Player.X});
    const [ remoteUser, setRemoteUser ] = useState<User | null>({ name: "Player 2", player: Player.O});

    return {
        socketService,
        roomCode,
        localUser,
        remoteUser,
    };
};

export default useSuperGameRoom;
