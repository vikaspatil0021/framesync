import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    downloadMediaCount: 0 as number
}

const downloadMedia = createSlice({
    name: 'downloadMediaCount',
    initialState,
    reducers: {
        updateDownloadMediaData: (state, action) => {
            switch (action?.payload?.type) {
                case "add":
                    state.downloadMediaCount++;
                    break;
                case "remove":
                    state.downloadMediaCount--;
                    break;
            }
        }
    }
});

export const { updateDownloadMediaData } = downloadMedia.actions;

export default downloadMedia.reducer;

