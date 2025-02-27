import {Navigate, Outlet} from "react-router-dom";
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

    return (

        <>
            <div className="flex h-screen overflow-hidden">

                <Sidebar />
                {/*162556*/}
                {/*via-green-400 to-green-300*/}
                <main className="flex-grow bg-gradient-to-b from-white bg-[#162556] p-6 h-screen">
                    <div className="bg-gray-100 shadow-md rounded-lg h-full p-6 overflow-hidden">
                        <Outlet />
                    </div>
                </main>
        </div>
        </>
    );
}
