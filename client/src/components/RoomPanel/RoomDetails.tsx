import * as React from "react";

export type RoomDetailsProps = {
    roomCode: (string | null);
    status: string;
    handleLeaveRoom: () => void;
    remoteDisconnected: boolean;
    player: string;
    opponent: string;
};

const RoomDetails = (props: RoomDetailsProps) => {
    const {
        roomCode,
        status,
        handleLeaveRoom,
        remoteDisconnected,
        player,
        opponent,
    } = props;

    return (
        <div className="room-details">
            <div className="game-details">
                <p className="label">Room Code: </p>
                <p className="room-code">{roomCode}</p>
                <p className="label">User Name: </p>
                <p className="player">{player}</p>
                <p className="label">Opponent: </p>
                <p className={`opponent${remoteDisconnected ? " disconnected" : ""}`}>{opponent}</p>
            </div>
            <div className="game-status">
                <p className="status">{status}</p>
                <button className="ui-button" onClick={handleLeaveRoom}>Leave Room</button>
            </div>
        </div>
    );
};

export default RoomDetails;
