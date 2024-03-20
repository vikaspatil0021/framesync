import { configureStore } from "@reduxjs/toolkit";

import currentTeamReducer from "./slices/currentTeamSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            currentTeam: currentTeamReducer
        }
    })

}


export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']