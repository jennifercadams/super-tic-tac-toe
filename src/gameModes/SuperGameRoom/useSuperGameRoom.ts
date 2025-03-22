import { useEffect, useMemo, useState } from "react";
import { SocketService } from "~services/SocketService";
import { Player, User } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ roomCode, setRoomCode ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<User | null>(null);
    const [ remoteUser, setRemoteUser ] = useState<User | null>(null);

    useEffect(() => {
        const handleCreateSuccess = (e: Event) => onCreateSuccess((e as CustomEvent).detail);
        document.addEventListener("onCreateSuccess", handleCreateSuccess);

        return () => {
            window.removeEventListener("onCreateSuccess", handleCreateSuccess);
        };
    }, []);

    const handleCreateRoom = (name: string, player: Player) => {
        const user: User = { name, player };
        socketService.createRoom(user);
    };

    const onCreateSuccess = (response: {roomCode: string, user: User}) => {
        setRoomCode(response.roomCode);
        setLocalUser(response.user);
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
