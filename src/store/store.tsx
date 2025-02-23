import {configureStore} from "@reduxjs/toolkit";
import CustomerReducer from "../reducers/CustomerReducer.ts";
import LoginReducer from "../reducers/LoginReducer.ts";


export const store = configureStore({
    reducer: {
        customer:CustomerReducer,
        login:LoginReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;