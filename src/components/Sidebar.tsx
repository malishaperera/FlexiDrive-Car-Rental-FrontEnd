import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Home, Users, Package, ShoppingCart, User } from "react-feather";
import { IoIosLogOut } from "react-icons/io";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("customerName");
        navigate("/login");
    };

    return (
        <div className={`bg-[#3598d7] text-white h-screen ${isSidebarOpen ? "w-64" : "w-26"} transition-all duration-300`}>
            <div className="p-4 flex flex-col h-full">
                {/* Sidebar Toggle Button */}
                <button onClick={toggleSidebar} className="text-white focus:outline-none mb-4">
                    <MenuIcon className={`w-6 h-6 transform transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
                </button>

                {isSidebarOpen && <h1 className="text-center text-2xl font-bold mb-6">Admin Panel</h1>}

                {/* Sidebar Links */}
                <ul className="flex flex-col space-y-4">
                    <li>
                        <Link to="/adminDashboard" className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700">
                            <Home className="w-6 h-6" />
                            {isSidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminDashboard/adminManage" className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700">
                            <User className="w-6 h-6" />
                            {isSidebarOpen && <span>Admin</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminDashboard/adminCustomer" className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700">
                            <Users className="w-6 h-6" />
                            {isSidebarOpen && <span>Customer</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminDashboard/adminCar" className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700">
                            <Package className="w-6 h-6" />
                            {isSidebarOpen && <span>Car</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminDashboard/adminBooking" className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700">
                            <ShoppingCart className="w-6 h-6" />
                            {isSidebarOpen && <span>Booking</span>}
                        </Link>
                    </li>
                </ul>

                {/* Logout Button */}
                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 mt-4 bg-red-500 hover:bg-red-600  text-white flex items-center justify-center space-x-2 rounded-3xl"
                    >
                        <IoIosLogOut className="w-6 h-6" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
