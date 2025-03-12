import { Outlet } from "react-router-dom";
import {Sidebar} from "./Sidebar.tsx";


export function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* ✅ Sidebar Stays Fixed */}
            <Sidebar />

            {/* ✅ Dynamic Content Changes, Sidebar Stays */}
            <main className="flex-grow bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
}
