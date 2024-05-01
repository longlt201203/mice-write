import SocketContext, { SocketWriteMode } from "@/contexts/socket.context";
import { TextSuggestionStreamParams, TranslateTextParams } from "@/etc/dto";
import SocketEvents from "@/etc/socket-events";
import useMiceWriteEditor from "@/hooks/useMiceWriteEditor";
import { PropsWithChildren, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export default function SocketProvider(props: PropsWithChildren<{
    socket: Socket
}>) {
    const { currentText, setCurrentText, lock, unlock } = useMiceWriteEditor();
    const [socket, setSocket] = useState(props.socket);
    const [strData, setStrData] = useState<string>("");
    const [chunkData, setChunkData] = useState<string>("");
    const [mode, setMode] = useState<SocketWriteMode>("writing");

    const getMode = () => {
        return mode;
    }

    useEffect(() => {
        const handleChunkIsComing = (chunk: string) => {
            setChunkData(chunk);
            setStrData((prev) => prev+chunk);
            console.log(mode, getMode());
            if (getMode() == "writing") setCurrentText((prev) => prev+chunk);
        }

        const handleHetCuu = () => {
            unlock();
        }

        socket.connect();

        socket.on(SocketEvents.CHUNK_IS_COMING, handleChunkIsComing);
        socket.on(SocketEvents.HET_CUU, handleHetCuu);

        return () => {
            socket.off(SocketEvents.CHUNK_IS_COMING, handleChunkIsComing);
            socket.off(SocketEvents.HET_CUU, handleHetCuu);

            socket.disconnect();
        };
    }, []);

    const callForHelp = () => {
        lock();
        setMode("writing");
        setStrData("");
        setChunkData("");

        const data: TextSuggestionStreamParams = {
            text: currentText
        }

        socket.emit(SocketEvents.SEND_THE_AMBULANCE, data);
    }

    const translate = (langCode: string) => {
        lock();
        setMode("translating");
        setStrData("");
        setChunkData("");

        const data: TranslateTextParams = {
            langCode: langCode,
            text: currentText
        }

        socket.emit(SocketEvents.TRANSLATE_TEXT, data);
    }

    return (
        <SocketContext.Provider value={{ callForHelp, translate, strData, chunkData, mode }}>
            {props.children}
        </SocketContext.Provider>
    )
}