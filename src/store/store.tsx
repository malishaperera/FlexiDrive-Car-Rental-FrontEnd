import {configureStore} from "@reduxjs/toolkit";
import CustomerReducer from "../reducers/CustomerReducer.ts";
import LoginReducer from "../reducers/LoginReducer.ts";
import CarReducer from "../reducers/CarReducer.ts";
import BookingReducer from "../reducers/BookingReducer.ts";
import AdminReducer from "../reducers/AdminReducer.ts";

export const store = configureStore({
    reducer: {
        customer:CustomerReducer,
        login:LoginReducer,
        car:CarReducer,
        booking:BookingReducer,
        admin:AdminReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;