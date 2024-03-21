import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploadStatus: {
        uploadProgress: 0,
        name: '',
        size: 0,
        stage:'none'
    }
}

const uploadProgressSlice = createSlice({
    name: 'uploadProgress',
    initialState,
    reducers: {
        updateProgress: (state, action) => {
            state.uploadStatus = action.payload
        }
    }
});

export const { updateProgress } = uploadProgressSlice.actions;

export default uploadProgressSlice.reducer;

