import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { Sidebar } from "../../components/Sidebar.tsx";
import BarChart from "../../components/Bar";


interface DecodedToken {
    role: string;
}

export function AdminDashBoard() {
    const token = localStorage.getItem("authToken");
    const location = useLocation();

    if (!token) {
        toast.error("Please login!");
        return <Navigate to="/login" />;
    }

    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.role !== "ADMIN") {
        toast.error("No Administrator found!");
        return <Navigate to="/" />;
    }
    
    const isMainDashboard = location.pathname === "/adminDashboard";

    return (
        <>
            <div className="flex h-screen overflow-hidden my-header">
                <Sidebar />
                <main className="flex-grow bg-gray-100">
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

                            {/* ✅ Graphs */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white shadow-lg rounded-lg p-6">
                                    <h3 className="text-2xl font-bold text-[#252828] mb-4">Statistics Overview</h3>
                                    {/* Pass data dynamically to the Bar chart */}
                                    <BarChart carCount={75} customerCount={150} bookingCount={200} />
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
        </>
    );
}
