import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KeepAliveService } from "~services/KeepAliveService";
import { SocketService } from "~services/SocketService";
import { JoinResponse } from "~services/types";
import { Move, Player, User } from "~types";

const useSuperGameRoom = () => {
    const keepAliveService = useMemo(() => new KeepAliveService(), []);
    const socketService = useMemo(() => new SocketService(), []);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ roomCode, setRoomCode ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<User | null>(null);
    const [ localReconnected, setLocalReconnected ] = useState<boolean>(false);
    const [ remoteUser, setRemoteUser ] = useState<User | null>(null);
    const prevRemoteUser = useRef<User | null>(null);
    const [ lastMove, setLastMove ] = useState<Move | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ status, setStatus ] = useState<string>("Player Turn: X");

    useEffect(() => {
        keepAliveService.start();

        const timeoutId = window.setTimeout(() => {
            if (!socketService.isConnected)
                setLoading(true);
        }, 250);

        const handleOnConnect = (id: number) => {
            window.clearTimeout(id);
            setLoading(false);
        };

        const handleCreateSuccess = (e: Event) => onCreateSuccess((e as CustomEvent).detail);
        const handleOnJoinSuccess = (e: Event) => onJoinSuccess((e as CustomEvent).detail);
        const handleOpponentJoined = (e: Event) => onOpponentJoined((e as CustomEvent).detail);
        const handleOpponentLeft = onOpponentLeft;
        const handleOnError = (e: Event) => onError((e as CustomEvent).detail);

        document.addEventListener("onConnect", () => handleOnConnect(timeoutId));
        document.addEventListener("onCreateSuccess", handleCreateSuccess);
        document.addEventListener("onJoinSuccess", handleOnJoinSuccess);
        document.addEventListener("onOpponentJoined", handleOpponentJoined);
        document.addEventListener("onOpponentLeft", handleOpponentLeft);
        document.addEventListener("onError", handleOnError);

        return () => {
            keepAliveService.stop();
            document.removeEventListener("onConnect", () => handleOnConnect(timeoutId));
            document.removeEventListener("onCreateSuccess", handleCreateSuccess);
            document.removeEventListener("onJoinSuccess", handleOnJoinSuccess);
            document.removeEventListener("onOpponentJoined", handleOpponentJoined);
            document.removeEventListener("onOpponentLeft", handleOpponentLeft);
            document.removeEventListener("onError", handleOnError);
        };
    }, []);

    const onDisconnect = useCallback(() => {
        setLoading(true);
        if (roomCode && localUser) {
            socketService.reJoinRoom(roomCode, localUser, remoteUser, lastMove);
        }
    }, [roomCode, localUser, remoteUser, lastMove]);

    useEffect(() => {
        const handleOnDisconnect = onDisconnect;
        document.addEventListener("onDisconnect", handleOnDisconnect);

        return () => {
            document.removeEventListener("onDisconnect", handleOnDisconnect);
        };
    }, [onDisconnect]);

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
            setLocalReconnected(true);
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
        setLocalReconnected(false);
        setRemoteUser(null);
        prevRemoteUser.current = null;
        setLastMove(null);
        setStatus("Player Turn: X");
    };

    return {
        socketService,
        loading,
        roomCode,
        localUser,
        localReconnected,
        setLocalReconnected,
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
