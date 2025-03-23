import { customAlphabet  } from "nanoid/non-secure";
import { Room } from "../types/index.js";

const alphabet = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";

export const generateRoomCode = (rooms: { [key: string]: Room; }): string => {
    const nanoid = customAlphabet(alphabet, 8);
    let roomCode: string;

    while (!roomCode) {
        const id = nanoid();
        if (!(id in rooms))
            roomCode = id;
    }

    return roomCode;
};
