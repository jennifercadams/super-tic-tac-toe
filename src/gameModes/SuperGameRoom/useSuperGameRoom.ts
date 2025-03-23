import { useEffect, useMemo, useState } from "react";
import { SocketService } from "~services/SocketService";
import { Player, User } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ roomCode, setRoomCode ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<User | null>(null);
    const [ remoteUser, setRemoteUser ] = useState<User | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        const handleCreateSuccess = (e: Event) => onCreateSuccess((e as CustomEvent).detail);
        document.addEventListener("onCreateSuccess", handleCreateSuccess);
        const handleOnJoinSuccess = (e: Event) => onJoinSuccess((e as CustomEvent).detail);
        document.addEventListener("onJoinSuccess", handleOnJoinSuccess);
        const handleOnJoinFailure = (e: Event) => onJoinFailure((e as CustomEvent).detail);
        document.addEventListener("onJoinFailure", handleOnJoinFailure);
        const handleOpponentJoined = (e: Event) => onOpponentJoined((e as CustomEvent).detail);
        document.addEventListener("onOpponentJoined", handleOpponentJoined);

        return () => {
            document.removeEventListener("onCreateSuccess", handleCreateSuccess);
            document.removeEventListener("onJoinSuccess", handleOnJoinSuccess);
            document.removeEventListener("onJoinFailure", handleOnJoinFailure);
            document.removeEventListener("onOpponentJoined", handleOpponentJoined);
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

    const handleJoinRoom = (roomCode: string, name: string) => {
        socketService.joinRoom(roomCode, name);
    };

    const onJoinSuccess = (response: {roomCode: string, user: User, opponent: User}) => {
        setRoomCode(response.roomCode);
        setLocalUser(response.user);
        setRemoteUser(response.opponent);
    };

    const onJoinFailure = (message: string) => {
        setErrorMessage(message);
    };

    const onOpponentJoined = (user: User) => {
        setRemoteUser(user);
    };

    return {
        socketService,
        roomCode,
        localUser,
        remoteUser,
        errorMessage,
        handleCreateRoom,
        handleJoinRoom,
    };
};

export default useSuperGameRoom;
