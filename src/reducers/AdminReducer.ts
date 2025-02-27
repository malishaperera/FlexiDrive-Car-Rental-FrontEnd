import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Admin Model
interface AdminModel {
    adminId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

interface AdminState {
    selectedAdmin: AdminModel | null;
    admins: AdminModel[];
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: AdminState = {
    selectedAdmin: null,
    admins: [],
    loading: false,
    error: null,
};

interface DeleteAdminResponse {
    message: string;
}

// API Instance
const api = axios.create({
    baseURL: "http://localhost:3003/api/auth/admin",
});

const getToken = () => localStorage.getItem("authToken");

// Save Admin
export const saveAdmin = createAsyncThunk<AdminModel, AdminModel>(
    "admin/saveAdmin",
    async (admin, { rejectWithValue }) => {
        try {
            const response = await api.post("/adminRegister", admin);
            toast.success("Admin saved successfully.");
            return response.data as AdminModel;
        } catch (error) {
            toast.error("Error saving admin");
            console.error("Error saving admin:", error);
            return rejectWithValue("Failed to save admin");
        }
    }
);

// Get Admin by ID
export const getAdminById = createAsyncThunk<AdminModel, string>(
    "admin/getAdminById",
    async (adminId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get(`/${adminId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as AdminModel;
        } catch (error) {
            console.error("Error fetching admin details:", error);
            return rejectWithValue("Error retrieving admin.");
        }
    }
);

// Get All Admins
export const getAllAdmins = createAsyncThunk<AdminModel[], void>(
    "admin/getAdmins",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.get("/view", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data as AdminModel[];
        } catch (error) {
            return rejectWithValue("Failed to fetch admins",error);
        }
    }
);

// Update Admin
export const updateAdmin = createAsyncThunk<AdminModel, AdminModel>(
    "admin/updateAdmin",
    async (admin, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.put(`/${admin.adminId}`, admin, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Admin updated successfully.");
            return response.data as AdminModel;
        } catch (error) {
            toast.error("Error updating admin");
            console.error("Error updating admin:", error);
            return rejectWithValue("Failed to update admin");
        }
    }
);

// Delete Admin
export const deleteAdmin = createAsyncThunk<string, string, { rejectValue: string }>(
    "admin/deleteAdmin",
    async (adminId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await api.delete<DeleteAdminResponse>(`/${adminId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Admin deleted successfully.");
            return response.data.message;
        } catch (error) {
            toast.error("Error deleting admin");
            console.error("Error deleting admin:", error);
            return rejectWithValue("Failed to delete admin");
        }
    }
);

// Redux Slice
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveAdmin.fulfilled, (state, action: PayloadAction<AdminModel>) => {
                state.loading = false;
                state.admins.push(action.payload);
            })
            .addCase(saveAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAdminById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminById.fulfilled, (state, action: PayloadAction<AdminModel>) => {
                state.loading = false;
                state.selectedAdmin = action.payload;
            })
            .addCase(getAdminById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllAdmins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAdmins.fulfilled, (state, action: PayloadAction<AdminModel[]>) => {
                state.loading = false;
                state.admins = action.payload;
            })
            .addCase(getAllAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdmin.fulfilled, (state, action: PayloadAction<AdminModel>) => {
                state.loading = false;
                state.admins = state.admins.map((admin) =>
                    admin.adminId === action.payload.adminId ? action.payload : admin
                );
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.admins = state.admins.filter((admin) => admin.adminId !== action.payload);
            })
            .addCase(deleteAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adminSlice.reducer;
