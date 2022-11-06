import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
