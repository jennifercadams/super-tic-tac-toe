import * as React from "react";
import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import { Player } from "~types";

export type RoomCreateProps = {
    errorMessage: string;
    handleCreateRoom: (arg1: string, arg2: Player) => void;
    setIsCreating: Dispatch<SetStateAction<boolean>>;
    nameInput: string;
    setNameInput: Dispatch<SetStateAction<string>>;
    playerInput: Player;
    setPlayerInput: Dispatch<SetStateAction<Player>>;
};

const RoomCreate = (props: RoomCreateProps) => {
    const { 
        errorMessage,
        handleCreateRoom,
        setIsCreating,
        nameInput,
        setNameInput,
        playerInput,
        setPlayerInput,
    } = props;
    
    return (
        <div className="room-create">
            <h2>New Game</h2>
            <label htmlFor="name-input">
                Name
                <input
                    type="text"
                    id="name-input"
                    name="display-name"
                    autoComplete="on"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    maxLength={20}
                />
            </label>
            <fieldset onChange={e => setPlayerInput((e as BaseSyntheticEvent).target.value)}>
                <legend>Select X or O:</legend>
                <input type="radio" id="select-x" name="player" value={Player.X} defaultChecked={playerInput === Player.X} />
                <label htmlFor="select-x">X</label>
                <input type="radio" id="select-o" name="player" value={Player.O} defaultChecked={playerInput === Player.O} />
                <label htmlFor="select-o">O</label>
            </fieldset>
            <p className="error">{errorMessage}</p>
            <button className="ui-button" disabled={!nameInput} onClick={() => handleCreateRoom(nameInput, playerInput)}>
                Create
            </button>
            <button className="ui-button" onClick={() => setIsCreating(false)}>Go Back</button>
        </div>
    );
};

export default RoomCreate;
