import * as React from "react";
import { Dispatch, SetStateAction } from "react";

export type RoomStartProps = {
    setIsCreating: Dispatch<SetStateAction<boolean>>;
    setIsJoining: Dispatch<SetStateAction<boolean>>;
};

const RoomStart = (props: RoomStartProps) => {
    const { setIsCreating, setIsJoining } = props;

    return (
        <div className="room-start">
            <button className="ui-button" onClick={() => setIsCreating(true)}>New Game</button>
            <button className="ui-button" onClick={() => setIsJoining(true)}>Join Game</button>
        </div>
    );
};

export default RoomStart;
