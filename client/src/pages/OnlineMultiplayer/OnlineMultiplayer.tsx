import * as React from "react";
import LoadingOverlay from "~components/LoadingOverlay/LoadingOverlay";
import RoomPanel, { RoomPanelProps } from "~components/RoomPanel/RoomPanel";
import OnlineSuperGame, { OnlineSuperGameProps } from "~gameModes/OnlineSuperGame/OnlineSuperGame";
import useOnlineMultiplayer from "./useOnlineMultiplayer";
import "./OnlineMultiplayer.css";

const OnlineMultiplayer = () => {
    const {
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
    } = useOnlineMultiplayer();

    const roomPanelProps: RoomPanelProps = { 
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        errorMessage,
        setErrorMessage,
        status,
        handleCreateRoom,
        handleJoinRoom,
        handleLeaveRoom,
    };

    const onlineSuperGameProps: OnlineSuperGameProps = { 
        socketService,
        roomCode,
        localPlayer: localUser?.player || null,
        localReconnected,
        setLocalReconnected,
        isRemoteUserConnected: remoteUser !== null,
        lastMove,
        setLastMove,
        setStatus,
    };

    return (
        <div className="online-multiplayer">
            <div className="game-container">
                <RoomPanel {...roomPanelProps} />
                <OnlineSuperGame {...onlineSuperGameProps} />
            </div>
            {loading && <LoadingOverlay />}
        </div>
    );
};

export default OnlineMultiplayer;
