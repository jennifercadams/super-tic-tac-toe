import * as React from "react";
import OnlineSuperGame from "~gameModes/OnlineSuperGame/OnlineSuperGame";
import useSuperGameRoom from "./useSuperGameRoom";

const SuperGameRoom = () => {
    const {
        socket,
        player,
    } = useSuperGameRoom();

    const onlineSuperGameProps = { socket, player};

    return (
        <div className="super-game-room">
            <OnlineSuperGame {...onlineSuperGameProps} />
        </div>
    );
};

export default SuperGameRoom;
