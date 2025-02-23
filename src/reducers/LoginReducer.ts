import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-hot-toast";


const api = axios.create({
    baseURL:'http://localhost:3003/api/auth/login',
})

export const loginUser = createAsyncThunk(
    "user/login",
    async (formData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/userLogin',formData);
            toast.success("Login Successful!");
            return response.data; // Assuming the response contains user data & token
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

const loginSlice = createSlice({
    name: "userLogin",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default loginSlice.reducer;