import * as React from "react";
import { BaseSyntheticEvent, Dispatch, RefObject, SetStateAction } from "react";
import { Player, User } from "~types";
import useRoomPanel from "./useRoomPanel";
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
    const {
        roomCode,
        errorMessage,
        handleCreateRoom,
        handleJoinRoom,
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
        localUser,
        remoteUser,
    } = useRoomPanel(props);

    const roomStart = !roomCode && !isCreating && !isJoining;
    const roomCreate = !roomCode && isCreating && !isJoining;
    const roomJoin = !roomCode && !isCreating && isJoining;
    const player = `${localUser?.name} (${localUser?.player})`;
    const opponent = remoteUser ? 
        `${remoteUser.name} (${remoteUser.player})` : 
        remoteDisconnected ?
        "Opponent disconnected" :
        "Waiting for opponent...";

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
