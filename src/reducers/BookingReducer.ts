// import axios from "axios";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
//
//
// //remember temporary haduve
// interface BookingModel {
//     bookingId?: string;
//     customerId: string;
//     carIds: string[];
//     pickupLocation: string;
//     pickupDate: string;
//     returnDate: string;
//     pickupTime: string;
//     returnTime: string;
//     totalPrice: number;
//     status: string;
// }
// interface BookingModels{
//     bookingId: string;
//     customerId: string;
//     pickupLocation: string;
//     pickupDate: string;
//     returnDate: string;
//     totalAmount: number;
//     status: string;
//     bookingCar?: {
//         carId: string;
//         model?: string;
//         licensePlate?: string;
//     }[];
// }
//
// interface BookingState {
//     selectedBooking: BookingModel | null;
//     bookings: BookingModel[];
// }
// const initialState: BookingState = {
//     selectedBooking: null,
//     // bookings: [],
//     bookings: [] as Booking[],
// };
// const api = axios.create({
//     baseURL: "http://localhost:3003/api/booking",
// });
//
// const getToken = () => localStorage.getItem("authToken");
//
// //  create a booking
// export const createBooking = createAsyncThunk<BookingModel, BookingModel>(
//     "booking/createBooking",
//     async (booking, { rejectWithValue }) => {
//         try {
//             const token = getToken();
//             const response = await api.post("/carBooking", booking, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             toast.success("Booking created successfully.");
//             return response.data as BookingModel;
//         } catch (error) {
//             console.error("Booking creation error:", error);
//             toast.error("Error creating booking");
//             return rejectWithValue("Failed to create booking");
//         }
//
//     }
// );
//
// // booking by ID
// export const getBookingById = createAsyncThunk<BookingModel, string>(
//     "booking/getBookingById",
//     async (bookingId, { rejectWithValue }) => {
//         try {
//             const token = getToken();
//             const response = await api.get(`/${bookingId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return response.data as BookingModel;
//         } catch (error) {
//             console.error("Error fetching booking details:", error);
//             return rejectWithValue("Error retrieving booking.");
//         }
//     }
// );
//
// // all bookings
// // export const getAllBookings = createAsyncThunk<BookingModels[], void>(
// //     "booking/getAllBookings",
// //     async (_, { rejectWithValue }) => {
// //         try {
// //             const token = getToken();
// //             const response = await api.get("/view", {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             // API response structure අනුව bookings array එක ලබා ගන්න
// //             return response.data.bookings.map((booking: any) => ({
// //                 ...booking,
// //                 totalAmount: Number(booking.totalAmount) // String -> Number පරිවර්තනය
// //             })) as BookingModel[];
// //         } catch (error) {
// //             return rejectWithValue("Failed to fetch bookings");
// //         }
// //     }
// // );
// export const getAllBookings = createAsyncThunk<Booking[], void>(
//     "booking/getAllBookings",
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = getToken();
//             const response = await api.get<{ bookings: any[] }>("/view", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//
//             return response.data.bookings.map(booking => ({
//                 ...booking,
//                 totalAmount: Number(booking.totalAmount),
//                 carIds: booking.bookingCar?.map(car => car.carId) || []
//             })) as Booking[];
//         } catch (error) {
//             return rejectWithValue("Failed to fetch bookings");
//         }
//     }
// );
//
// export const updateBooking = createAsyncThunk<BookingModel, BookingModel>(
//     "booking/updateBooking",
//     async (booking, { rejectWithValue }) => {
//         try {
//             const token = getToken();
//             const response = await api.put(`/${booking.bookingId}`, booking, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             toast.success("Booking updated successfully.");
//             return response.data as BookingModel;
//         } catch (error) {
//             toast.error("Error updating booking");
//             console.error("Error updating booking:", error);
//             return rejectWithValue("Failed to update booking");
//         }
//     }
// );
//
// // Add the deleteBooking action
// export const deleteBooking = createAsyncThunk<void, string>(
//     "booking/deleteBooking",
//     async (bookingId, { rejectWithValue }) => {
//         try {
//             const token = getToken();
//             await api.delete(`/${bookingId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             toast.success("Booking deleted successfully.");
//         } catch (error) {
//             console.error("Error deleting booking:", error);
//             toast.error("Error deleting booking");
//             return rejectWithValue("Failed to delete booking");
//         }
//     }
// );
//
// const bookingSlice = createSlice({
//     name: "booking",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(createBooking.fulfilled, (state, action: PayloadAction<BookingModel>) => {
//                 state.bookings.push(action.payload);
//             })
//             .addCase(getBookingById.fulfilled, (state, action: PayloadAction<BookingModel>) => {
//                 state.selectedBooking = action.payload;
//             })
//             .addCase(getAllBookings.fulfilled, (state, action: PayloadAction<BookingModel[]>) => {
//                 state.bookings = action.payload;
//             })
//             .addCase(updateBooking.fulfilled, (state, action: PayloadAction<BookingModel>) => {
//                 state.bookings = state.bookings.map((booking) =>
//                     booking.bookingId === action.payload.bookingId ? action.payload : booking
//                 );
//             })
//             .addCase(deleteBooking.fulfilled, (state, action) => {
//                 state.bookings = state.bookings.filter(
//                     (booking) => booking.bookingId !== action.meta.arg // Removes the deleted booking from state
//                 );
//             });
//     },
// });
//
// export default bookingSlice.reducer;
////
// BookingReducer.ts
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface Booking {
    bookingId: string;
    customerId: string;
    pickupLocation: string;
    pickupDate: string;
    returnDate: string;
    totalAmount: number;
    status: string;
    bookingCar?: {
        carId: string;
        model?: string;
        licensePlate?: string;
    }[];
    pickupTime?: string;
    returnTime?: string;
    carIds?: string[];
}

interface BookingState {
    selectedBooking: Booking | null;
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    selectedBooking: null,
    bookings: [],
    loading: false,
    error: null,
};

const api = axios.create({
    baseURL: "http://localhost:3003/api/booking",
});

const getToken = () => localStorage.getItem("authToken");

// Create a booking
export const createBooking = createAsyncThunk<Booking, Omit<Booking, "bookingId">>(
    "booking/createBooking",
    async (booking, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.post("/carBooking", booking, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking created successfully.");
            return response.data as Booking;
        } catch (error) {
            console.error("Booking creation error:", error);
            toast.error("Error creating booking");
            return rejectWithValue("Failed to create booking");
        }
    }
);

// Get booking by ID
export const getBookingById = createAsyncThunk<Booking, string>(
    "booking/getBookingById",
    async (bookingId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get(`/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as Booking;
        } catch (error) {
            console.error("Error fetching booking details:", error);
            return rejectWithValue("Error retrieving booking");
        }
    }
);

// Get all bookings
export const getAllBookings = createAsyncThunk<Booking[], void>(
    "booking/getAllBookings",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get<{ bookings: any[] }>("/view", {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data.bookings.map(booking => ({
                ...booking,
                totalAmount: Number(booking.totalAmount),
                carIds: booking.bookingCar?.map((car: any) => car.carId) || [],
                pickupTime: booking.pickupTime || "",
                returnTime: booking.returnTime || ""
            })) as Booking[];
        } catch (error) {
            console.error("Error fetching booking details:", error);
            return rejectWithValue("Failed to fetch bookings");
        }
    }
);

// Update booking
export const updateBooking = createAsyncThunk<Booking, Booking>(
    "booking/updateBooking",
    async (booking, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.put(`/${booking.bookingId}`, booking, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking updated successfully.");
            return response.data as Booking;
        } catch (error) {
            toast.error("Error updating booking");
            console.error("Error updating booking:", error);
            return rejectWithValue("Failed to update booking");
        }
    }
);

// Delete booking
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
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.bookings.push(action.payload);
                state.loading = false;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getBookingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookingById.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.selectedBooking = action.payload;
                state.loading = false;
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.bookings = state.bookings.map(booking =>
                    booking.bookingId === action.payload.bookingId ? action.payload : booking
                );
                state.loading = false;
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter(
                    booking => booking.bookingId !== action.meta.arg
                );
                state.loading = false;
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default bookingSlice.reducer;