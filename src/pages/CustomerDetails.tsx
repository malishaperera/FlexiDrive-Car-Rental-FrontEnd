import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { customerGetId } from "../reducers/CustomerReducer.ts";
import { AppDispatch } from "../store/store.tsx";

interface DecodedToken {
    id: string;
}

export function CustomerDetails() {
    const { state } = useLocation();
    const { car, pickupLocation, pickupDate, returnDate, pickupTime, returnTime, totalPrice } = state || {};

    const token = localStorage.getItem("authToken");
    const decodedToken: DecodedToken | null = token ? jwtDecode<DecodedToken>(token) : null;
    const customerId = decodedToken?.id || null;

    const dispatch = useDispatch<AppDispatch>();
    const customer = useSelector((state: RootState) => state.customer.selectedCustomer);

    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        nic: "",
        nicPhoto_FrontEnd: null as File | null,
        nicPhoto_BackEnd: null as File | null,
        driverLicenseNum: "",
        driverLicensePhoto: null as File | null,
    });

    useEffect(() => {
        if (customerId) {
            dispatch(customerGetId(customerId));
        }
    }, [dispatch, customerId]);

    useEffect(() => {
        if (customer) {
            setCustomerData((prevData) => ({
                ...prevData,
                name: customer.name || "",
                email: customer.email || "",
                phone: customer.phone || "",
                address: customer.address || "",
                nic: customer.nic || "",
                driverLicenseNum: customer.driverLicenseNum || "",
            }));
        }
    }, [customer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files) {
            setCustomerData((prevData) => ({ ...prevData, [fieldName]: e.target.files[0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(customerData);
    };

    return (
        <div className="container mx-auto p-8 mt-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Booking Details</h2>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h3 className="text-xl font-semibold">Booking Information</h3>
                <p>{car?.brand} {car?.model} ({car?.year})</p>
                <p>Pick-up Location: {pickupLocation}</p>
                <p>Pick-up Date & Time: {pickupDate} {pickupTime}</p>
                <p>Return Date & Time: {returnDate} {returnTime}</p>
                <p>Total Price: ${totalPrice}</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h3 className="text-lg font-medium">Personal Information</h3>

                {Object.entries(customerData).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        {key.includes("Photo") ? (
                            <input
                                type="file"
                                name={key}
                                onChange={(e) => handleFileChange(e, key)}
                                className="w-full p-3 border rounded-lg"
                            />
                        ) : (
                            <input
                                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                                name={key}
                                value={typeof value === "string" ? value : ""}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-[#40b6f0] text-white py-3 px-8 rounded-lg hover:bg-[#3598d7] transition"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}
