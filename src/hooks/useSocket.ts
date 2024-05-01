import SocketContext from "@/contexts/socket.context";
import { useContext } from "react";

export default function useSocket() {
    const context = useContext(SocketContext);
    if (!context) throw new Error("SocketProvider not found!");
    return context;
}