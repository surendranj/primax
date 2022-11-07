import { createSlice } from "@reduxjs/toolkit";

const userNav = createSlice({
    name: "userNav",
    initialState: false,
    reducers: {
        openUserNav: (state) => {
            state = true;
            return state;
        },
        closeUserNav: (state) => {
            state = false;
            return state;
        },
        toggleUserNav: (state) => {
            state = !state;
            return state;
        },
    },
});

export default userNav.reducer;
export const { openUserNav, closeUserNav, toggleUserNav } = userNav.actions;
