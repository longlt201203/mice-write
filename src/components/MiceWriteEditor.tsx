"use client"

import useMiceWriteEditor from '@/hooks/useMiceWriteEditor';
import useSocket from '@/hooks/useSocket';
import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import Button from './Button';
import langs from '@/etc/langs';
import DisplayOnlyEditor from './DisplayOnlyEditor';
import { useAppSelector } from '@/redux/store';
import { socketCurrentTextChunkSelector, socketModeSelector } from '@/redux/socket.reducer';

interface MiceWriteEditorProps {
}

export default function MiceWriteEditor({ }: MiceWriteEditorProps) {
    const { currentText, setCurrentText } = useMiceWriteEditor();
    const [isLocked, setIsLocked] = useState(false);
    const [editorState, setEditorState] = useState<EditorState>();
    const [langCode, setLangCode] = useState<string>(langs[0].id);
    const { callForHelp, translate } = useSocket();
    const [displayText, setDisplayText] = useState<string>("");
    // const [audioSrc, setAudioSrc] = useState<string>();
    const audioRef = useRef<HTMLAudioElement>(null);

    const socketCurrentTextChunk = useAppSelector(socketCurrentTextChunkSelector);
    const socketMode = useAppSelector(socketModeSelector);

    useEffect(() => {
        if (socketMode == "idle") {
            setIsLocked(false);
        } else {
            setIsLocked(true);
        }
    }, [socketMode]);

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

    useEffect(() => {
        switch (socketMode) {
            case "suggesting": {
                setCurrentText((prev) => prev + socketCurrentTextChunk);
                break;
            }
            case "translating": {
                setDisplayText((prev) => prev + socketCurrentTextChunk);
                break;
            }
        }
    }, [socketCurrentTextChunk]);

    const handleOnChange = (editorState: EditorState) => {
        if (!isLocked) {
            setCurrentText(editorState.getCurrentContent().getPlainText());
            setEditorState(editorState);
        }
    }

    const handleTranslate = () => {
        setDisplayText("");
        translate(langCode);
    }

    const handleTextToSpeech = async () => {
        setIsLocked(true);
        const res = await fetch("/api/ai/text-to-speech", {
            method: "POST",
            body: JSON.stringify({ text: currentText }),
        });
        const audioSrc = URL.createObjectURL(new Blob([await res.arrayBuffer()]));
        if (audioRef.current) {
            audioRef.current.src = audioSrc;
            audioRef.current.play();
        }
        setIsLocked(false);
    }

    return (
        <>
            {editorState && (
                <div className="p-3 border rounded flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-1">
                        <Button disabled={isLocked} onClick={handleHelpMe}>{isLocked && <Loader />}Help Me!</Button>
                        <div className='flex flex-row gap-x-1'>
                            <Button disabled={isLocked} onClick={() => handleTranslate()}>{isLocked && <Loader />}Translate To</Button>
                            <select className='border rounded' value={langCode} onChange={(e) => setLangCode(e.target.value)}>
                                {langs.map((lang) => (
                                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                        <Button disabled={isLocked} onClick={handleTextToSpeech}>{isLocked && <Loader />}Text To Speech</Button>
                        <audio ref={audioRef}></audio>
                    </div>
                    <div className='p-1 border rounded'>
                        <Editor editorState={editorState} onChange={handleOnChange} />
                    </div>
                    <DisplayOnlyEditor text={displayText} />
                </div>
            )}
        </>
    );
}