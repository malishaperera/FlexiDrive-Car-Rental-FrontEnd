import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.tsx";
import { customerGetId, updateCustomer } from "../../reducers/CustomerReducer.ts";
import { AppDispatch } from "../../store/store.tsx";
import {toast} from "react-hot-toast";
import {createBooking} from "../../reducers/BookingReducer.ts";
import {BookingModel} from "../../models/BookingModel .tsx";
import {Header} from "../../components/home/Header.tsx";
// import {BookingModel} from "../models/BookingModel .tsx";
// import { BookingModel } from "../models/BookingModel.ts";



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
        nicPhoto1: null as string | null,
        nicPhoto2: null as string | null,
        driverLicenseNum: "",
        driverLicensePhoto: null as string | null,
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
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64File = reader.result as string;
                setCustomerData((prevData) => ({ ...prevData, [fieldName]: base64File }));
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     if (customerId) {
    //         dispatch(updateCustomer({ ...customerData, customerId }));
    //         toast.success('Customer has been updated');
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (customerId) {
            try {
                const updateResult = await dispatch(updateCustomer({ ...customerData, customerId })).unwrap();

                if (updateResult) {  // update success නම් booking create කරන්න
                    const bookingData: BookingModel = {
                        customerId,
                        carId: [car.carId],
                        pickupLocation,
                        pickupDate,
                        returnDate,
                        pickupTime,
                        returnTime,
                        totalPrice,
                        status: "pending",
                    };

                    if (!car || !car.carId) {
                        toast.error("Car ID is missing!");
                        return;
                    }


                    await dispatch(createBooking(bookingData));
                    toast.success("Booking created successfully!");
                }
            } catch (error) {
                toast.error("Something went wrong!");
                console.error(error);
            }
        }
    };

    return (

        <>

            <Header/>

        <div className="container mx-auto p-8 mt-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Booking Details</h2>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h3 className="text-xl font-semibold">Booking Information</h3>
                <p>{car?.brand} {car?.model} ({car?.year})</p>
                <p>{car?.carId} </p>
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
        </>
    );
}
