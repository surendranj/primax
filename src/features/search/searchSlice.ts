import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        openSearch: (state, action: PayloadAction<string>) => {
            state = action.payload;
            return state;
        },
        closeSearch: (state) => {
            state = "";
            return state;
        },
    },
});

export default search.reducer;
export const { closeSearch, openSearch } = search.actions;
