import MiceWriteEditorContext from "@/contexts/mice-write-editor.context"
import { useContext } from "react"

export default function useMiceWriteEditor() {
    const context = useContext(MiceWriteEditorContext);
    if (!context) throw new Error("MiceWriteEditorContext not found!");
    return context;
}