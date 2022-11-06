import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
    email: string;
};

interface InitialState {
    user?: boolean;
    userInfo: null | UserInfo;
}

const initialState: InitialState = { userInfo: null };

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<UserInfo>) => {
            state = { user: true, userInfo: action.payload };
            return state;
        },
        signOutUser: (state) => {
            state = { user: false, userInfo: null };
            return state;
        },
    },
});

export default user.reducer;
export const { signInUser, signOutUser } = user.actions;
