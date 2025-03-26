import * as React from "react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Player, User } from "~types";
import RoomCreate, { RoomCreateProps } from "./RoomCreate";
import RoomDetails, { RoomDetailsProps } from "./RoomDetails";
import RoomJoin, { RoomJoinProps } from "./RoomJoin";
import RoomStart, { RoomStartProps } from "./RoomStart";
import useRoomPanel from "./useRoomPanel";
import "./RoomPanel.css";

export type RoomPanelProps = {
    roomCode: (string | null);
    localUser: (User | null);
    remoteUser: (User | null);
    prevRemoteUser: RefObject<User | null>;
    errorMessage: string;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    status: string;
    handleCreateRoom: (arg1: string, arg2: Player) => void;
    handleJoinRoom: (arg1: string, arg2: string) => void;
    handleLeaveRoom: () => void;
};

const RoomPanel = (props: RoomPanelProps) => {
    const {
        roomCode,
        localUser,
        remoteUser,
        errorMessage,
        status,
        handleCreateRoom,
        handleJoinRoom,
        handleLeaveRoom,
    } = props;

    const {
        isCreating,
        setIsCreating,
        isJoining,
        setIsJoining,
        nameInput,
        setNameInput,
        playerInput,
        setPlayerInput,
        roomCodeInput,
        setRoomCodeInput,
        remoteDisconnected,
    } = useRoomPanel(props);

    const player = `${localUser?.name} (${localUser?.player})`;
    const opponent = remoteUser ? 
        `${remoteUser.name} (${remoteUser.player})` : 
        remoteDisconnected ?
        "Opponent disconnected" :
        "Waiting for opponent...";

    const roomDetailsProps: RoomDetailsProps = {
        roomCode,
        status,
        handleLeaveRoom,
        remoteDisconnected,
        player,
        opponent,
    };

    const roomCreateProps: RoomCreateProps = {
        errorMessage,
        handleCreateRoom,
        setIsCreating,
        nameInput,
        setNameInput,
        playerInput,
        setPlayerInput,
    };

    const roomJoinProps: RoomJoinProps = {
        errorMessage,
        handleJoinRoom,
        setIsJoining,
        nameInput,
        setNameInput,
        roomCodeInput,
        setRoomCodeInput,
    };

    const roomStartProps: RoomStartProps = { setIsCreating, setIsJoining };

    return (
        <div className="room-panel">
            {
                roomCode ? <RoomDetails {...roomDetailsProps} /> :
                isCreating ? <RoomCreate {...roomCreateProps} /> :
                isJoining ? <RoomJoin {...roomJoinProps} /> :
                <RoomStart {...roomStartProps} />
            }
        </div>
    );
};

export default RoomPanel;
