import {Navigate, Outlet, useLocation,} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { Sidebar } from "../../components/Sidebar.tsx";

export function AdminDashBoard() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("Please login!");
        return <Navigate to="/login" />;
    }

    const decoded: any = jwtDecode(token);
    if (decoded.role !== "ADMIN") {
        toast.error("No Administrator found!");
        return <Navigate to="/" />;
    }

    const location = useLocation();
    const isMainDashboard = location.pathname === "/adminDashboard"; // ✅ Only show on main dashboard

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-grow bg-gray-100">
                {/*/!* ✅ Top Bar *!/*/}
                {/*<div className="bg-[#40b6f0] p-4 flex justify-between items-center">*/}
                {/*    <div className="text-white text-xl font-bold">Admin Dashboard</div>*/}
                {/*    <div className="flex items-center space-x-4">*/}
                {/*        <button className="text-white hover:bg-blue-600 p-2 rounded-lg">Notifications</button>*/}
                {/*        <button className="text-white hover:bg-blue-600 p-2 rounded-lg">Profile</button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* ✅ Show this Section only on Main Dashboard */}
                {isMainDashboard && (
                    <div className="p-6">
                        <h2 className="text-3xl font-extrabold text-[#252828] mb-6">Dashboard Overview</h2>

                        {/* ✅ Statistics Cards */}
                        <div className="grid grid-cols-3 gap-6 mb-10">
                            {/* Car Count */}
                            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                                <h3 className="text-2xl font-bold text-[#252828]">Total Cars</h3>
                                <p className="text-4xl font-bold text-[#40b6f0]">75</p>
                            </div>

                            {/* Customer Count */}
                            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                                <h3 className="text-2xl font-bold text-[#252828]">Total Customers</h3>
                                <p className="text-4xl font-bold text-[#40b6f0]">150</p>
                            </div>

                            {/* Booking Count */}
                            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                                <h3 className="text-2xl font-bold text-[#252828]">Total Bookings</h3>
                                <p className="text-4xl font-bold text-[#40b6f0]">200</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ Other Admin Pages */}
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
