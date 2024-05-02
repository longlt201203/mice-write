import { createContext } from "react";
import { io } from "socket.io-client";

export const createSocket = () => io({ autoConnect: false });

export type SocketWriteMode = "writing" | "translating";

export interface SocketContextProps {
    callForHelp: () => void;
    translate: (langCode: string) => void;
    strData: string;
    chunkData: string;
    mode: SocketWriteMode;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export default SocketContext;