import { useNavigate} from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast";

export function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const handleComingSoon = () => {
        toast("Coming soon...",{
            position:"top-center",
            duration:3000
        })
    };

    return (
        <header className="flex top-0 left-0 w-full justify-between items-center px-10 py-5 bg-blue-950 shadow-md transition-colors fixed z-50 ">
            <h1 className="text-2xl font-bold text-[#252828]">Flexi-Drive</h1>
            <nav className="flex space-x-6 text-white">
                {/*<a href="#" className="hover:text-[#40b6f0]">Home</a>*/}
                {/*<a href="#" className="hover:text-[#40b6f0]">Rent Car</a>*/}
                {/*<a href="#" className="hover:text-[#40b6f0]">Business Consulting</a>*/}
                {/*<a href="#about" className="hover:text-[#40b6f0]">About Us</a>*/}
                {/*<a href="#" className="hover:text-[#40b6f0]">Blog</a>*/}
                <button onClick={() => handleScroll("hero-section")} className="hover:text-[#40b6f0]">Home</button>
                <button onClick={() => handleScroll("rent-section")} className="hover:text-[#40b6f0]">Rent Car</button>
                <button onClick={() => handleScroll("about-section")} className="hover:text-[#40b6f0]">About Us</button>
                <a
                    href="#"
                    className="hover:text-[#40b6f0]"
                    onClick={handleComingSoon}
                >
                    Business Consulting
                </a>
                <a
                    href="#"
                    className="hover:text-[#40b6f0]"
                    onClick={handleComingSoon}
                >
                    Blog
                </a>

            </nav>
            <div className="space-x-4">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="border border-[#40b6f0] text-[#40b6f0] px-4 py-2 rounded-md hover:bg-[#40b6f0] hover:text-white"
                            onClick={() => {
                                // setIsLoggedIn(true)
                                navigate("/login")
                            }}
                        >
                            Log in
                        </button>
                        <button
                            className="bg-[#40b6f0] text-white px-4 py-2 rounded-md hover:bg-[#3598d7]"
                            onClick={() => {
                                navigate("/register")
                            }} // ✅ This should work now
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <img
                        src="/Logo1.svg"
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#40b6f0]"
                    />
                )}
            </div>
        </header>
    );
}
