import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customerName, setCustomerName] = useState<string | null>("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const name = localStorage.getItem("customerName");

        if (token && name) {
            setIsLoggedIn(true);
            setCustomerName(name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("customerName");
        setIsLoggedIn(false);
        setCustomerName(null);
        navigate("/login");
    };

    const handleScrollAndNavigate = (id: string, route: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        navigate(route);
    };

    const handleComingSoon = () => {
        toast("Coming soon...", {
            position: "top-center",
            duration: 1000,
        });
    };

    return (
        <header className="flex top-0 left-0 w-[99%] justify-between items-center px-10 py-5 bg-blue-950 shadow-md transition-colors fixed z-50">
            <h1 className="text-2xl font-bold text-[#3598d7]">Flexi-Drive</h1>
            <nav className="flex space-x-6 text-white">
                <button
                    onClick={() => handleScrollAndNavigate("hero-section", "/")}
                    className="hover:text-[#40b6f0]"
                >
                    Home
                </button>

                <button
                    onClick={() => handleScrollAndNavigate("latest-section", "/")}
                    className="hover:text-[#40b6f0]"
                >
                    Latest Car
                </button>
                <button
                    onClick={() => handleScrollAndNavigate("about-section", "/")}
                    className="hover:text-[#40b6f0]"
                >
                    About Us
                </button>
                <a href="#" className="hover:text-[#40b6f0]" onClick={handleComingSoon}>Business Consulting</a>
                <a href="#" className="hover:text-[#40b6f0]" onClick={handleComingSoon}>Blog</a>
            </nav>
            <div className="space-x-4">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="border border-[#40b6f0] text-[#40b6f0] px-4 py-2 rounded-md hover:bg-[#40b6f0] hover:text-white"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log in
                        </button>
                        <button
                            className="bg-[#40b6f0] text-white px-4 py-2 rounded-md hover:bg-[#3598d7]"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <div className="flex items-center space-x-3 relative">
                         <span className="text-white bg-[#40b6f0] rounded-full w-10 h-10 flex items-center justify-center group">
                            {customerName?.charAt(0).toUpperCase()}
                            <span className="absolute left-0 top-full mt-2 text-white bg-black text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                {customerName}
                            </span>
                         </span>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
