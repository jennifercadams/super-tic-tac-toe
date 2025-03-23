import * as React from "react";
import { BaseSyntheticEvent, Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { Player, User } from "~types";
import "./RoomPanel.css";

export type RoomPanelProps = {
    roomCode: (string | null);
    localUser: (User | null);
    remoteUser: (User | null);
    prevRemoteUser: RefObject<User | null>;
    errorMessage: string;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    handleCreateRoom: (arg1: string, arg2: Player) => void;
    handleJoinRoom: (arg1: string, arg2: string) => void;
};

const RoomPanel = (props: RoomPanelProps) => {
    const [ isCreating, setIsCreating ] = useState<boolean>(false);
    const [ isJoining, setIsJoining ] = useState<boolean>(false);
    const [ nameInput, setNameInput ] = useState<string>("");
    const [ playerInput, setPlayerInput ] = useState<Player>(Player.X);
    const [ roomCodeInput, setRoomCodeInput ] = useState<string>("");
    const [ remoteDisconnected, setRemoteDisconnected ] = useState<boolean>(false);

    const {
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        errorMessage,
        setErrorMessage,
        handleCreateRoom,
        handleJoinRoom,
    } = props;

    const roomStart = !roomCode && !isCreating && !isJoining;
    const roomCreate = !roomCode && isCreating && !isJoining;
    const roomJoin = !roomCode && !isCreating && isJoining;
    const player = `${localUser?.name} (${localUser?.player})`;
    const opponent = remoteUser ? 
        `${remoteUser.name} (${remoteUser.player})` : 
        remoteDisconnected ?
        "Opponent disconnected" :
        "Waiting for opponent...";

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

    return (
        <div className="room-panel">
            {roomStart && <div className="room-start">
                <button className="ui-button" onClick={() => setIsCreating(true)}>New Game</button>
                <button className="ui-button" onClick={() => setIsJoining(true)}>Join Game</button>
            </div>}
            {roomCreate && <div className="room-create">
                <h2>New Game</h2>
                <label htmlFor="name-input">
                    Name
                    <input type="text" id="name-input" value={nameInput} onChange={e => setNameInput(e.target.value)} />
                </label>
                <fieldset onChange={e => setPlayerInput((e as BaseSyntheticEvent).target.value)}>
                    <legend>Select X or O:</legend>
                    <input type="radio" id="select-x" name="select-x-or-o" value={Player.X} defaultChecked={playerInput === Player.X} />
                    <label htmlFor="select-x">X</label>
                    <input type="radio" id="select-o" name="select-x-or-o" value={Player.O} defaultChecked={playerInput === Player.O} />
                    <label htmlFor="select-o">O</label>
                </fieldset>
                <p className="error">{errorMessage}</p>
                <button className="ui-button" disabled={!nameInput} onClick={() => handleCreateRoom(nameInput, playerInput)}>
                    Create
                </button>
                <button className="ui-button" onClick={() => setIsCreating(false)}>Go Back</button>
            </div>}
            {roomJoin && <div className="room-join">
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
            </div>}
            {roomCode && <div className="room-details">
                <p className="label">Room Code: </p>
                <p className="room-code">{roomCode}</p>
                <p className="label">User Name: </p>
                <p className="player">{player}</p>
                <p className="label">Opponent: </p>
                <p className={`opponent${remoteDisconnected ? " disconnected" : ""}`}>{opponent}</p>
            </div>}
        </div>
    );
};

export default RoomPanel;
