import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Media = {
    mediaType: string;
    id: number;
};

interface ModalState {
    open: boolean;
    media: Media | null;
    trailerUrl: string | null;
}
const initialState: ModalState = { open: false, media: null, trailerUrl: null };

const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Media>) => {
            state = { ...state, open: true, media: action.payload };
            return state;
        },
        closeModal: (state) => {
            state = initialState;
            return state;
        },
        setTrailerUrl: (state, action: PayloadAction<string>) => {
            state = { ...state, trailerUrl: action.payload };
            return state;
        },
    },
});

export default modal.reducer;
export const { openModal, closeModal, setTrailerUrl} = modal.actions;
