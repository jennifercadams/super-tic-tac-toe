import { useMemo, useState } from "react";
import { SocketService } from "~services/SocketService";
import { Player } from "~types";

const useSuperGameRoom = () => {
    const socketService = useMemo(() => new SocketService(), []);
    const [ player, setPlayer ] = useState<Player | null>(null);

    return {
        socketService,
        player,
    };
};

export default useSuperGameRoom;
