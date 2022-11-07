import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import userReducer from "../features/user/userSlice";
import searchReducer from "../features/search/searchSlice";
import userNavReducer from "../features/userNav/userNavSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        userNav: userNavReducer,
        modal: modalReducer,
        search: searchReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
