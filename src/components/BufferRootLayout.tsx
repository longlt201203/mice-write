"use client"

import MiceWriteEditorProvider from "@/providers/MiceWriteEditorProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import SocketProvider from "@/providers/SocketProvider";
import { PropsWithChildren } from "react";

export default function BufferRootLayout(props: PropsWithChildren) {
    return (
        <ReduxProvider>
            <MiceWriteEditorProvider>
                <SocketProvider>
                    {props.children}
                </SocketProvider>
            </MiceWriteEditorProvider>
        </ReduxProvider>
    );
}