import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarModel } from "../models/CarModel";

const api = axios.create({
    baseURL: "http://localhost:3003/api/car",
});

const getToken = () => localStorage.getItem("authToken");

export const getAllCars = createAsyncThunk<CarModel[], void>(
    "car/getAllCars",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/", {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data as CarModel[];
        } catch (err) {
            console.error("Error fetching cars:", err);
            return rejectWithValue("Failed to fetch cars");
        }
    }
);

const initialState: {
    cars: CarModel[];
    loading: boolean;
    error: string | null;
} = {
    cars: [],
    loading: false,
    error: null,
};

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCars.fulfilled, (state, action: PayloadAction<CarModel[]>) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default carSlice.reducer;