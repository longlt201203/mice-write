import useSocket from "@/hooks/useSocket";
import { ContentState, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";

export default function DisplayOnlyEditor() {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const { mode, strData } = useSocket();
    
    const handleChange = (newEditorState: EditorState) => {

    }

    useEffect(() => {
        if (mode == "translating") {
            setEditorState(EditorState.set(editorState, { currentContent: ContentState.createFromText(strData) }));
        }
    }, [strData]);

    return (
        <div className="p-1 border rounded">
            <Editor editorState={editorState} onChange={handleChange} />
        </div>
    )
}