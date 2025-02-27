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
    loading: boolean;
    error: string | null;
}

interface DeleteCustomerResponse {
    message: string;
}


// Initial State
export const initialState: CustomerState = {
    selectedCustomer: null,
    customers: [],
    loading: false,
    error: null,
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

export const getAllCustomers = createAsyncThunk<CustomerModel[], void>(
    "customer/getCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await api.get("/view", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as CustomerModel[];
        } catch (error) {
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

// delete customer
export const deleteCustomer = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "customer/deleteCustomer",
    async (customerId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.delete<DeleteCustomerResponse>(`/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Customer deleted successfully.");
            return response.data.message;
        } catch (error) {
            toast.error("Error deleting customer");
            console.error("Error deleting customer:", error);
            return rejectWithValue("Failed to delete customer");
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
            .addCase(saveCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveCustomer.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                state.loading = false;
                state.customers.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(customerGetId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(customerGetId.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                state.loading = false;
                state.selectedCustomer = action.payload;
            })
            .addCase(customerGetId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCustomers.fulfilled, (state, action: PayloadAction<CustomerModel[]>) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<CustomerModel>) => {
                state.loading = false;
                if (state.selectedCustomer?.customerId === action.payload.customerId) {
                    state.selectedCustomer = action.payload;
                }
                state.customers = state.customers.map((customer) =>
                    customer.customerId === action.payload.customerId ? action.payload : customer
                );
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle delete customer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.customers = state.customers.filter(
                    (customer) => customer.customerId !== action.payload
                );
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;