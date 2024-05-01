import { Dispatch, SetStateAction, createContext } from "react";


export interface MiceWriteEditorContextProps {
    currentText: string;
    setCurrentText: Dispatch<SetStateAction<string>>;
    isLocked: boolean;
    lock: () => void;
    unlock: () => void;
}

const MiceWriteEditorContext = createContext<MiceWriteEditorContextProps | null>(null);

export default MiceWriteEditorContext;