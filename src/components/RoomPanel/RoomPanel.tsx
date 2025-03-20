import * as React from "react";
import { User } from "~types";
import "./RoomPanel.css";

export type RoomPanelProps = {
    roomCode: (string | null);
    localUser: (User | null);
    remoteUser: (User | null);
};

const RoomPanel = (props: RoomPanelProps) => {
    const { roomCode, localUser, remoteUser } = props;

    return (
        <div className="room-panel">
            <p className="label">Room Code: </p>
            <p className="room-code">{roomCode}</p>
            <p className="label">User Name: </p>
            <p className="player">{`${localUser?.name} (${localUser?.player})`}</p>
            <p className="label">Opponent: </p>
            <p className="opponent">{`${remoteUser?.name} (${remoteUser?.player})`}</p>
        </div>
    );
};

export default RoomPanel;
