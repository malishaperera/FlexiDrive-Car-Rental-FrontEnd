import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { CustomerModel } from "../../models/CustomerModel.tsx";
import { saveCustomer } from "../../reducers/CustomerReducer.ts";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/home/Header.tsx";

export function CustomerRegister() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        nic: "",
        nicPhoto1: null,  // This could be a file or URL
        nicPhoto2: null,  // This could be a file or URL
        driverLicenseNum: "",
        driverLicensePhoto: null, // This could be a file or URL
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        console.log("Form Submitted:", formData);

        // Create a new CustomerModel with all required fields
        const newCustomer = new CustomerModel(
            "",  // customerId will be generated later (or left empty if handled by the backend)
            formData.name,
            formData.email,
            formData.password,
            formData.phoneNumber,
            formData.address,
            formData.nic,
            formData.nicPhoto1,
            formData.nicPhoto2,
            formData.driverLicenseNum,
            formData.driverLicensePhoto
        );

        // Dispatch the saveCustomer action to store the new customer
        dispatch(saveCustomer(newCustomer));

        // Redirect to the home page or another route
        navigate("/");
    };

    return (
        <>
            <Header />

            <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center relative mt-20 my-header"
                style={{ backgroundImage: "url('/car1.jpg')" }}
            >
                <div className="relative flex w-[500px] max-w-4xl bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden overflow-y-auto mb-20">
                    <div className="w-full flex flex-col justify-center items-center p-8">
                        <form className="w-full space-y-4" onSubmit={handleSubmit}>
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
                                <label className="block text-sm font-medium text-gray-200">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                    placeholder="Confirm your password"
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
        </>
    );
}
