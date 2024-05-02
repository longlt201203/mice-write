import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SocketReducerProps {
    mode: string;
    currentTextChunk: string;
}

const initialState: SocketReducerProps = {
    mode: "idle",
    currentTextChunk: ""
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocketMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
        },
        setSocketCurrentTextChunk: (state, action: PayloadAction<string>) => {
            state.currentTextChunk = action.payload;
        }
    }
});

export const { setSocketMode, setSocketCurrentTextChunk } = socketSlice.actions;

export const socketModeSelector = (state: RootState) => state.socketReducer.mode;
export const socketCurrentTextChunkSelector = (state: RootState) => state.socketReducer.currentTextChunk;

export default socketSlice.reducer;