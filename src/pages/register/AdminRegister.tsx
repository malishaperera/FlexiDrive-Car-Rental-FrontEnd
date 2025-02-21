import { useState } from "react";

export function AdminRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center relative mt-20 my-header"
            style={{ backgroundImage: "url('/car1.jpg')" }}
        >
            {/* Overlay for better visibility */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Registration Form Container */}
            <div className="relative flex w-[500px] max-w-4xl bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden overflow-y-auto mb-20">
                {/* Right Side - Form Section */}
                <div className="w-full flex flex-col justify-center items-center p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
                        Admin Sign Up
                    </h2>
                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        {/* Form Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#40b6f0] text-white p-3 rounded-md hover:bg-[#3598d7] transition font-semibold"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-200 mt-4">
                        Already have an account?{" "}
                        <a href="#" className="text-[#40b6f0] hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
