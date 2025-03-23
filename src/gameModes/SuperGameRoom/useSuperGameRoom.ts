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
        const handleOpponentJoined = (e: Event) => onOpponentJoined((e as CustomEvent).detail);
        document.addEventListener("onOpponentJoined", handleOpponentJoined);
        const handleOnError = (e: Event) => onError((e as CustomEvent).detail);
        document.addEventListener("onError", handleOnError);

        return () => {
            document.removeEventListener("onCreateSuccess", handleCreateSuccess);
            document.removeEventListener("onJoinSuccess", handleOnJoinSuccess);
            document.removeEventListener("onOpponentJoined", handleOpponentJoined);
            document.removeEventListener("onError", handleOnError);
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

    const onOpponentJoined = (user: User) => {
        setRemoteUser(user);
    };

    const onError = (message: string) => {
        setErrorMessage(message);
    };

    return {
        socketService,
        roomCode,
        localUser,
        remoteUser,
        errorMessage,
        setErrorMessage,
        handleCreateRoom,
        handleJoinRoom,
    };
};

export default useSuperGameRoom;
