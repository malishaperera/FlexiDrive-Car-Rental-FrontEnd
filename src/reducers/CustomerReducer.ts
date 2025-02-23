import {CustomerModel} from "../models/CustomerModel.tsx";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-hot-toast";
//represent by empty array
export const initialState :CustomerModel[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3003/api/customer',
})

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer:CustomerModel)=>{
        try {
            const response = await api.post('/customerRegister',customer);
            toast.success("customer saved successfully.");
            return response.data;
        }catch(error){
            toast.error("Error saving customer");
            return console.log('error', error);
        }
    }
);


const customerSlice = createSlice({
    name:'customer',
    initialState,
    reducers:{
        addCustomer(state, action:PayloadAction<CustomerModel>){
            state.push(action.payload);
        }
    },
    extraReducers:(builder)=>{

        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Failed to save customer:", action.payload);
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.error("Pending");
            });
    }
})

export default customerSlice.reducer;