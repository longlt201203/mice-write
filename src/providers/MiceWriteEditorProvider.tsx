import MiceWriteEditorContext from "@/contexts/mice-write-editor.context";
import { PropsWithChildren, useState } from "react";

export default function MiceWriteEditorProvider(props: PropsWithChildren) {
    const [currentText, setCurrentText] = useState<string>("");
    const [isLocked, setIsLocked] = useState<boolean>(false);

    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);

    return (
        <MiceWriteEditorContext.Provider value={{ currentText, setCurrentText, isLocked, lock, unlock }}>
            {props.children}
        </MiceWriteEditorContext.Provider>
    );
}