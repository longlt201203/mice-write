import useSocket from "@/hooks/useSocket";
import { ContentState, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";

export interface DisplayOnlyEditorProps {
    text?: string;
}

export default function DisplayOnlyEditor(props: DisplayOnlyEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(ContentState.createFromText(props.text || "")));

    const handleChange = (newEditorState: EditorState) => {

    }

    useEffect(() => {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(props.text || "")));  
    }, [props.text]);

    return (
        <div className="p-1 border rounded">
            <Editor editorState={editorState} onChange={handleChange} />
        </div>
    )
}