import { useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Player } from "~types";

const useSuperGameRoom = () => {
    const socket = useMemo(() => io("http://localhost:3000"), []);
    const [ player, setPlayer ] = useState<Player | null>(null);

    return {
        socket,
        player,
    };
};

export default useSuperGameRoom;
