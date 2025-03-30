import * as React from "react";
import LoadingOverlay from "~components/LoadingOverlay/LoadingOverlay";
import RoomPanel, { RoomPanelProps } from "~components/RoomPanel/RoomPanel";
import OnlineSuperGame, { OnlineSuperGameProps } from "~gameModes/OnlineSuperGame/OnlineSuperGame";
import useSuperGameRoom from "./useSuperGameRoom";
import "./SuperGameRoom.css";

const SuperGameRoom = () => {
    const {
        socketService,
        socketIsConnected,
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
    } = useSuperGameRoom();

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
        <div className="super-game-room">
            <div className="game-container">
                <RoomPanel {...roomPanelProps} />
                <OnlineSuperGame {...onlineSuperGameProps} />
            </div>
            {!socketIsConnected && <LoadingOverlay />}
        </div>
    );
};

export default SuperGameRoom;
