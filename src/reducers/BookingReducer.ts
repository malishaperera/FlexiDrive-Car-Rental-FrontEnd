import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


//remember temporary haduve
interface BookingModel {
    bookingId?: string;
    customerId: string;
    carIds: string[];
    pickupLocation: string;
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
    totalPrice: number;
    status: string;
}

interface BookingState {
    selectedBooking: BookingModel | null;
    bookings: BookingModel[];
}
const initialState: BookingState = {
    selectedBooking: null,
    bookings: [],
};
const api = axios.create({
    baseURL: "http://localhost:3003/api/booking",
});

const getToken = () => localStorage.getItem("authToken");

//  create a booking
export const createBooking = createAsyncThunk<BookingModel, BookingModel>(
    "booking/createBooking",
    async (booking, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.post("/carBooking", booking, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking created successfully.");
            return response.data as BookingModel;
        } catch (error) {
            console.error("Booking creation error:", error);
            toast.error("Error creating booking");
            return rejectWithValue("Failed to create booking");
        }

    }
);

// booking by ID
export const getBookingById = createAsyncThunk<BookingModel, string>(
    "booking/getBookingById",
    async (bookingId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get(`/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as BookingModel;
        } catch (error) {
            console.error("Error fetching booking details:", error);
            return rejectWithValue("Error retrieving booking.");
        }
    }
);

// all bookings
export const getAllBookings = createAsyncThunk<BookingModel[], void>(
    "booking/getAllBookings",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get("/view", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as BookingModel[];
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            return rejectWithValue("Failed to fetch bookings");
        }
    }
);

export const updateBooking = createAsyncThunk<BookingModel, BookingModel>(
    "booking/updateBooking",
    async (booking, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.put(`/${booking.bookingId}`, booking, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking updated successfully.");
            return response.data as BookingModel;
        } catch (error) {
            toast.error("Error updating booking");
            console.error("Error updating booking:", error);
            return rejectWithValue("Failed to update booking");
        }
    }
);

// Add the deleteBooking action
export const deleteBooking = createAsyncThunk<void, string>(
    "booking/deleteBooking",
    async (bookingId, { rejectWithValue }) => {
        try {
            const token = getToken();
            await api.delete(`/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking deleted successfully.");
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Error deleting booking");
            return rejectWithValue("Failed to delete booking");
        }
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.fulfilled, (state, action: PayloadAction<BookingModel>) => {
                state.bookings.push(action.payload);
            })
            .addCase(getBookingById.fulfilled, (state, action: PayloadAction<BookingModel>) => {
                state.selectedBooking = action.payload;
            })
            .addCase(getAllBookings.fulfilled, (state, action: PayloadAction<BookingModel[]>) => {
                state.bookings = action.payload;
            })
            .addCase(updateBooking.fulfilled, (state, action: PayloadAction<BookingModel>) => {
                state.bookings = state.bookings.map((booking) =>
                    booking.bookingId === action.payload.bookingId ? action.payload : booking
                );
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter(
                    (booking) => booking.bookingId !== action.meta.arg // Removes the deleted booking from state
                );
            });
    },
});

export default bookingSlice.reducer;