import { configureStore } from "@reduxjs/toolkit";

import currentTeamReducer from "./slices/currentTeamSlice";
import newUploadsMediaData from "./slices/newUploadsMediaData";
import mediaOrderOptions from "./slices/mediaOrderOptions";
import downloadMediaReducer from "./slices/downloadMediaSlice";
import videoPlayerInfoReducer from "./slices/videoPlayerInfoSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            currentTeam: currentTeamReducer,
            newUploadsMediaData,
            mediaOrderOptions,
            downloadMediaReducer,
            videoPlayerInfoReducer
        }
    })

}


export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']