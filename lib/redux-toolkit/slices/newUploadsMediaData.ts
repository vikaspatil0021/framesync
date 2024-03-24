import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newUploadsMediaData: [] as any[]
}

const newUploadsMediaDataSlice = createSlice({
    name: 'newUploadsMediaData',
    initialState,
    reducers: {
        deleteUploadMediaData: (state, action) => {
            state.newUploadsMediaData = state.newUploadsMediaData.filter((each) => {
                if (each.key !== action.payload.key) {
                    return each;
                }
            })
        },
        addOrUpdateNewUploadData: (state, action) => {

            let newUploadExists = false;

            state.newUploadsMediaData = state.newUploadsMediaData.map((each) => {

                if (each.key === action.payload.key) {

                    newUploadExists = true
                    return action.payload
                } else {

                    return each
                }
            });

            if (!newUploadExists) {

                state.newUploadsMediaData = [action.payload, ...state.newUploadsMediaData];
            }

        }
    }
});

export const { addOrUpdateNewUploadData, deleteUploadMediaData } = newUploadsMediaDataSlice.actions;

export default newUploadsMediaDataSlice.reducer;

