import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTeam: {
        id:'',
        name:''
    }
}

const currentTeamSlice = createSlice({
    name: 'currentTeam',
    initialState,
    reducers: {
        updateTeam: (state, action) => {
            state.currentTeam = action.payload
        }
    }
});

export const { updateTeam } = currentTeamSlice.actions;

export default currentTeamSlice.reducer;

export type CurrentTeam = typeof initialState