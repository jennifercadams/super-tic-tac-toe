import { useEffect, useMemo, useRef, useState } from "react";
import { SocketService } from "~services/SocketService";
import { JoinResponse } from "~services/types";
import { Move, Player, User } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ roomCode, setRoomCode ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<User | null>(null);
    const [ remoteUser, setRemoteUser ] = useState<User | null>(null);
    const prevRemoteUser = useRef<User | null>(null);
    const [ lastMove, setLastMove ] = useState<Move | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ status, setStatus ] = useState<string>("Player Turn: X");

    useEffect(() => {
        const handleCreateSuccess = (e: Event) => onCreateSuccess((e as CustomEvent).detail);
        document.addEventListener("onCreateSuccess", handleCreateSuccess);
        const handleOnJoinSuccess = (e: Event) => onJoinSuccess((e as CustomEvent).detail);
        document.addEventListener("onJoinSuccess", handleOnJoinSuccess);
        const handleOpponentJoined = (e: Event) => onOpponentJoined((e as CustomEvent).detail);
        document.addEventListener("onOpponentJoined", handleOpponentJoined);
        const handleOpponentLeft = onOpponentLeft;
        document.addEventListener("onOpponentLeft", handleOpponentLeft);
        const handleOnError = (e: Event) => onError((e as CustomEvent).detail);
        document.addEventListener("onError", handleOnError);

        return () => {
            document.removeEventListener("onCreateSuccess", handleCreateSuccess);
            document.removeEventListener("onJoinSuccess", handleOnJoinSuccess);
            document.removeEventListener("onOpponentJoined", handleOpponentJoined);
            document.removeEventListener("onOpponentLeft", handleOpponentLeft);
            document.removeEventListener("onError", handleOnError);
        };
    }, []);

    useEffect(() => {
        prevRemoteUser.current = remoteUser;
    }, [remoteUser]);

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

    const onJoinSuccess = (response: JoinResponse) => {
        setRoomCode(response.roomCode);
        setLocalUser(response.user);
        setRemoteUser(response.opponent);

        if (response.lastMove) {
            setLastMove(response.lastMove);
        }
    };

    const onOpponentJoined = (user: User) => {
        setRemoteUser(user);
    };

    const onOpponentLeft = () => {
        setRemoteUser(null);
    };

    const onError = (message: string) => {
        setErrorMessage(message);
    };

    const handleLeaveRoom = () => {
        socketService.leaveRoom();
        setRoomCode(null);
        setRemoteUser(null);
        prevRemoteUser.current = null;
        setLastMove(null);
        setStatus("Player Turn: X");
    };

    return {
        socketService,
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        lastMove,
        setLastMove,
        errorMessage,
        setErrorMessage,
        status,
        setStatus,
        handleCreateRoom,
        handleJoinRoom,
        handleLeaveRoom,
    };
};

export default useSuperGameRoom;
