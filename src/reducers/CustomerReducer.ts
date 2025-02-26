import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// temporary haduve
interface CustomerModel {
    customerId: string;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    nic: string | null;
    nicPhoto1: string | null;
    nicPhoto2: string | null;
    driverLicenseNum: string | null;
    driverLicensePhoto: string | null;
}


interface CustomerState {
    selectedCustomer: CustomerModel | null;
    customers: CustomerModel[];
}

// Initial State
export const initialState: CustomerState = {
    selectedCustomer: null,
    customers: [],
};

// API Instance
const api = axios.create({
    baseURL: "http://localhost:3003/api/customer",
});

const getToken = () => localStorage.getItem("authToken");

//  save customer
export const saveCustomer = createAsyncThunk<CustomerModel, CustomerModel>(
    "customer/saveCustomer",
    async (customer, { rejectWithValue }) => {
        try {
            const response = await api.post("/customerRegister", customer);
            toast.success("Customer saved successfully.");
            return response.data as CustomerModel;
        } catch (error) {
            toast.error("Error saving customer");
            console.error("Error saving customer:", error);
            return rejectWithValue("Failed to save customer");
        }
    }
);

//  customer by ID
export const customerGetId = createAsyncThunk<CustomerModel, string>(
    "customer/getCustomerById",
    async (customerId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get(`/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as CustomerModel;
        } catch (error) {
            console.error("Error fetching customer details:", error);
            return rejectWithValue("Error retrieving customer.");
        }
    }
);

//  all customers
export const getAllCustomers = createAsyncThunk<CustomerModel[], void>(
    "customer/getCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get("/view", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as CustomerModel[];
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            return rejectWithValue("Failed to fetch customers");
        }
    }
);

// update customer
export const updateCustomer = createAsyncThunk<CustomerModel, CustomerModel>(
    "customer/updateCustomer",
    async (customer, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.put(`/${customer.customerId}`, customer, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Customer updated successfully.");
            return response.data as CustomerModel;
        } catch (error) {
            toast.error("Error updating customer");
            console.error("Error updating customer:", error);
            return rejectWithValue("Failed to update customer");
        }
    }
);

// Redux Slice
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer(state, action: PayloadAction<CustomerModel>) {
            state.customers.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                state.customers.push(action.payload);
            })
            .addCase(customerGetId.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                state.selectedCustomer = action.payload;
            })
            .addCase(getAllCustomers.fulfilled, (state, action: PayloadAction<CustomerModel[]>) => {
                state.customers = action.payload;
            })
            .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                // Update `selectedCustomer` after a successful update
                if (state.selectedCustomer?.customerId === action.payload.customerId) {
                    state.selectedCustomer = action.payload;
                }
                // Update in customers array (if this ->>?)
                state.customers = state.customers.map((customer) =>
                    customer.customerId === action.payload.customerId ? action.payload : customer
                );
            });
    },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
