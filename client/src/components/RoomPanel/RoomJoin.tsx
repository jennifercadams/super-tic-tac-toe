import * as React from "react";
import { Dispatch, SetStateAction } from "react";

export type RoomJoinProps = {
    errorMessage: string;
    handleJoinRoom: (arg1: string, arg2: string) => void;
    setIsJoining: Dispatch<SetStateAction<boolean>>;
    nameInput: string;
    setNameInput: Dispatch<SetStateAction<string>>;
    roomCodeInput: string;
    setRoomCodeInput: React.Dispatch<React.SetStateAction<string>>;
};

const RoomJoin = (props: RoomJoinProps) => {
    const {
        errorMessage,
        handleJoinRoom,
        setIsJoining,
        nameInput,
        setNameInput,
        roomCodeInput,
        setRoomCodeInput,
    } = props;

    return (
        <div className="room-join">
            <h2>Join Game</h2>
            <label htmlFor="room-code-input">
                Room Code
                <input type="text" id="room-code-input" value={roomCodeInput} onChange={e => setRoomCodeInput(e.target.value)} />
            </label>
            <label htmlFor="name-input">
                Name
                <input type="text" id="name-input" value={nameInput} onChange={e => setNameInput(e.target.value)} />
            </label>
            <p className="error">{errorMessage}</p>
            <button className="ui-button" disabled={!nameInput} onClick={() => handleJoinRoom(roomCodeInput, nameInput)}>
                Join
            </button>
            <button className="ui-button" onClick={() => setIsJoining(false)}>Go Back</button>
        </div>
    );
};

export default RoomJoin;
