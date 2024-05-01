"use client"

import useMiceWriteEditor from '@/hooks/useMiceWriteEditor';
import useSocket from '@/hooks/useSocket';
import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Button from './Button';
import langs from '@/etc/langs';
import DisplayOnlyEditor from './DisplayOnlyEditor';

interface MiceWriteEditorProps {
}

export default function MiceWriteEditor({ }: MiceWriteEditorProps) {
    const { isLocked, currentText, setCurrentText } = useMiceWriteEditor();
    const [editorState, setEditorState] = useState<EditorState>();
    const [langCode, setLangCode] = useState<string>(langs[0].id);

    const { callForHelp, translate } = useSocket();

    const handleHelpMe = () => {
        if (!isLocked) callForHelp();
    }

    useEffect(() => {
        setEditorState(EditorState.createEmpty());
    }, []);

    useEffect(() => {
        if (editorState && isLocked) {
            let newContentState = ContentState.createFromText(currentText);
            setEditorState(EditorState.moveFocusToEnd(EditorState.set(editorState, { currentContent: newContentState })));
        }
    }, [currentText]);

    const handleOnChange = (editorState: EditorState) => {
        if (!isLocked) {
            setCurrentText(editorState.getCurrentContent().getPlainText());
            setEditorState(editorState);
        }
    }

    return (
        <>
            {editorState && (
                <div className="p-3 border rounded flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-1">
                        <Button disabled={isLocked} onClick={handleHelpMe}>{isLocked && <Loader />}Help Me!</Button>
                        <div className='flex flex-row gap-x-1'>
                            <Button disabled={isLocked} onClick={() => translate(langCode)}>{isLocked && <Loader />}Translate To</Button>
                            <select className='border rounded' value={langCode} onChange={(e) => setLangCode(e.target.value)}>
                                {langs.map((lang) => (
                                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='p-1 border rounded'>
                        <Editor editorState={editorState} onChange={handleOnChange} />
                    </div>
                    <DisplayOnlyEditor/>
                </div>
            )}
        </>

    );
}