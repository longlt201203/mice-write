import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SuggestionReducerProps {
    text: string;
}

const initialState: SuggestionReducerProps = {
    text: ""
}

const suggestionSlice = createSlice({
    name: "suggestion",
    initialState,
    reducers: {
        appendSuggestionText: (state, action: PayloadAction<string>) => {
            state.text += action.payload;
        }
    }
});

export const { appendSuggestionText } = suggestionSlice.actions;

export const suggestionTextSelector = (state: RootState) => state.suggestionReducer.text;

export default suggestionSlice.reducer;