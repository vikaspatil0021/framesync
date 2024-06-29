import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startTime: 0
}

const videoPlayerInfoSlice = createSlice({
    name: 'videoPlayerInfo',
    initialState,
    reducers: {
        updateCurrentPlayerTime: (state, action) => {
            state.startTime = action.payload
        }
    }
});

export const { updateCurrentPlayerTime } = videoPlayerInfoSlice.actions;

export default videoPlayerInfoSlice.reducer;

