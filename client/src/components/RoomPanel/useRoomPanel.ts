import { useEffect, useState } from "react";
import { Player } from "~types";
import { RoomPanelProps } from "./RoomPanel";

const useRoomPanel = (props: RoomPanelProps) => {
    const [ isCreating, setIsCreating ] = useState<boolean>(false);
    const [ isJoining, setIsJoining ] = useState<boolean>(false);
    const [ nameInput, setNameInput ] = useState<string>("");
    const [ playerInput, setPlayerInput ] = useState<Player>(Player.X);
    const [ roomCodeInput, setRoomCodeInput ] = useState<string>("");
    const [ remoteDisconnected, setRemoteDisconnected ] = useState<boolean>(false);

    const {
        roomCode,
        remoteUser,
        prevRemoteUser,
        setErrorMessage,
    } = props;

    useEffect(() => {
        setErrorMessage("");
    }, [isCreating, isJoining, nameInput, playerInput, roomCodeInput ]);

    useEffect(() => {
        if (roomCode) {
            setIsCreating(false);
            setIsJoining(false);
        }

        setNameInput("");
        setPlayerInput(Player.X);
        setRoomCodeInput("");
    }, [isCreating, isJoining, roomCode]);

    useEffect(() => {
        if (remoteUser)
            setRemoteDisconnected(false);
        else if (!remoteUser && prevRemoteUser.current)
            setRemoteDisconnected(true);
    }, [remoteUser]);

    return {
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
    };
};

export default useRoomPanel;
