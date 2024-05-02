"use client"

import SocketContext, { SocketWriteMode, createSocket } from "@/contexts/socket.context";
import { TextSuggestionStreamParams, TranslateTextParams } from "@/etc/dto";
import SocketEvents from "@/etc/socket-events";
import useMiceWriteEditor from "@/hooks/useMiceWriteEditor";
import { setSocketCurrentTextChunk, setSocketMode } from "@/redux/socket.reducer";
import { useAppDispatch } from "@/redux/store";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export default function SocketProvider(props: PropsWithChildren) {
    const { currentText } = useMiceWriteEditor();
    const [socket, setSocket] = useState<Socket>();
    const [strData, setStrData] = useState<string>("");
    const [chunkData, setChunkData] = useState<string>("");
    const [mode, setMode] = useState<SocketWriteMode>("writing");

    const dispatch = useAppDispatch();

    const getMode = () => {
        return mode;
    }

    useEffect(() => {
        setSocket(createSocket());
    }, []);

    useEffect(() => {
        if (socket) {
            const handleChunkIsComing = (chunk: string) => {
                // setChunkData(chunk);
                // setStrData((prev) => prev + chunk);
                dispatch(setSocketCurrentTextChunk(chunk));
                // if (getMode() == "writing") setCurrentText((prev) => prev + chunk);
            }

            const handleHetCuu = () => {
                dispatch(setSocketMode("idle"));
            }

            socket.connect();

            socket.on(SocketEvents.CHUNK_IS_COMING, handleChunkIsComing);
            socket.on(SocketEvents.HET_CUU, handleHetCuu);

            return () => {
                socket.off(SocketEvents.CHUNK_IS_COMING, handleChunkIsComing);
                socket.off(SocketEvents.HET_CUU, handleHetCuu);

                socket.disconnect();
            };
        }
    }, [socket]);

    const callForHelp = () => {
        if (socket) {
            dispatch(setSocketMode("suggesting"));
            dispatch(setSocketCurrentTextChunk(""));

            const data: TextSuggestionStreamParams = {
                text: currentText
            }

            socket.emit(SocketEvents.SEND_THE_AMBULANCE, data);
        }
    }

    const translate = (langCode: string) => {
        if (socket) {
            dispatch(setSocketMode("translating"));
            dispatch(setSocketCurrentTextChunk(""));

            const data: TranslateTextParams = {
                langCode: langCode,
                text: currentText
            }

            socket.emit(SocketEvents.TRANSLATE_TEXT, data);
        }
    }

    return (
        <SocketContext.Provider value={{ callForHelp, translate, strData, chunkData, mode }}>
            {props.children}
        </SocketContext.Provider>
    )
}