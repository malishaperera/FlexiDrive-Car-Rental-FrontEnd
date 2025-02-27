import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarModel } from "../models/CarModel";

const api = axios.create({
    baseURL: "http://localhost:3003/api/car",
});

const getToken = () => localStorage.getItem("authToken");

export const getAllAvailableCars = createAsyncThunk<CarModel[], void>(
    "car/getAllAvailableCars",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/available", {
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
            console.error("Error fetching all cars:", err);
            return rejectWithValue("Failed to fetch all cars");
        }
    }
);


export const updateCar = createAsyncThunk<CarModel, CarModel>(
    "car/updateCar",
    async (car: CarModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/${car.carId}`, car, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data as CarModel;
        } catch (err) {
            console.error("Error updating car:", err);
            return rejectWithValue("Failed to update car");
        }
    }
);


export const deleteCar = createAsyncThunk<string, string>(
    'car/deleteCar',
    async (carId: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3003/api/car/${carId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Include token in headers
                },
            });
            return carId; // Return the carId on success
        } catch (error) {
            console.error("Error deleting car:", error);
            return rejectWithValue(error.response?.data || "Failed to delete car");
        }
    }
);

// New Thunk for Car Registration
export const createCar = createAsyncThunk<CarModel, CarModel>(
    "car/createCar",
    async (car: CarModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/carRegister", car, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data as CarModel;
        } catch (err) {
            console.error("Error registering car:", err);
            return rejectWithValue("Failed to register car");
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
            .addCase(getAllAvailableCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAvailableCars.fulfilled, (state, action: PayloadAction<CarModel[]>) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(getAllAvailableCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //  Add getAllCars API handling
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
            })
            // Handling updateCar API call
            .addCase(updateCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCar.fulfilled, (state, action: PayloadAction<CarModel>) => {
                state.loading = false;
                state.cars = state.cars.map((car) =>
                    car.carId === action.payload.carId ? action.payload : car
                );
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handling the deleteCar API
            .addCase(deleteCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCar.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.cars = state.cars.filter((car) => car.carId !== action.payload);
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handle createCar API call
            .addCase(createCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCar.fulfilled, (state, action: PayloadAction<CarModel>) => {
                state.loading = false;
                state.cars.push(action.payload); // Add the new car to the cars list
            })
            .addCase(createCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });






    },
});

export default carSlice.reducer;