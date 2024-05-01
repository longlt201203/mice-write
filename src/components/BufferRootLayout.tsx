"use client"

import MiceWriteEditorProvider from "@/providers/MiceWriteEditorProvider";
import SocketProvider from "@/providers/SocketProvider";
import { PropsWithChildren } from "react";
import { io } from "socket.io-client";

const socket = io({ autoConnect: false });

export default function BufferRootLayout(props: PropsWithChildren) {
    return (
        <MiceWriteEditorProvider>
            <SocketProvider socket={socket}>
                {props.children}
            </SocketProvider>
        </MiceWriteEditorProvider>
    );
}