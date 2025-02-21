import {useState} from "react";

export function Header() {

        const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <header className="flex top-0 left-0 w-full  justify-between items-center px-10 py-5 bg-blue-950 shadow-md transition-colors fixed z-50">
            <h1 className="text-2xl font-bold text-[#252828]">Flexi-Drive</h1>
            <nav className="flex space-x-6 text-white">
                <a href="#" className="hover:text-[#40b6f0]">Home</a>
                <a href="#" className="hover:text-[#40b6f0]">Rent Car</a>
                <a href="#" className="hover:text-[#40b6f0]">Business Consulting</a>
                <a href="#" className="hover:text-[#40b6f0]">About Us</a>
                <a href="#" className="hover:text-[#40b6f0]">Blog</a>
            </nav>
            <div className="space-x-4">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="border border-[#40b6f0] text-[#40b6f0] px-4 py-2 rounded-md hover:bg-[#40b6f0] hover:text-white"
                            onClick={() => setIsLoggedIn(true)}
                        >
                            Log in
                        </button>
                        <button className="bg-[#40b6f0] text-white px-4 py-2 rounded-md hover:bg-[#3598d7]">
                            Sign Up
                        </button>
                    </>
                ) : (
                    <img
                        src="/Logo1.svg" // Replace with actual user profile image
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#40b6f0]"
                    />
                )}
            </div>
        </header>
    )
}