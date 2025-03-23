import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { customerGetId, updateCustomer } from "../../reducers/CustomerReducer";
import { AppDispatch } from "../../store/store";
import { toast } from "react-hot-toast";
import { createBooking } from "../../reducers/BookingReducer";
import { Header } from "../../components/home/Header";
import mediaUpload from "../../utils/mediaUpload";
import { useNavigate } from "react-router-dom";
interface DecodedToken {
    id: string;
}

interface CustomerData {
    name: string;
    email: string;
    phone: string;
    address: string;
    nic: string;
    nicPhoto1: string;
    nicPhoto2: string;
    driverLicenseNum: string;
    driverLicensePhoto: string;
}

export function CustomerDetails() {
    const { state } = useLocation();
    const { car, pickupLocation, pickupDate, returnDate, pickupTime, returnTime, totalPrice } = state || {};
    const token = localStorage.getItem("authToken");
    const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;
    const customerId = decodedToken?.id || null;
    const dispatch = useDispatch<AppDispatch>();
    const customer = useSelector((state: RootState) => state.customer.selectedCustomer);
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploading, setUploading] = useState(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);

    const [customerData, setCustomerData] = useState<CustomerData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        nic: "",
        nicPhoto1: "",
        nicPhoto2: "",
        driverLicenseNum: "",
        driverLicensePhoto: ""
    });

    const requiredFields = [
        'address',
        'nic',
        'nicPhoto1',
        'nicPhoto2',
        'driverLicenseNum',
        'driverLicensePhoto'
    ];

    useEffect(() => {
        if (customerId) dispatch(customerGetId(customerId));
    }, [dispatch, customerId]);

    useEffect(() => {
        if (customer) {
            const newData = {
                name: customer.name || "",
                email: customer.email || "",
                phone: customer.phone || "",
                address: customer.address || "",
                nic: customer.nic || "",
                nicPhoto1: customer.nicPhoto1 || "",
                nicPhoto2: customer.nicPhoto2 || "",
                driverLicenseNum: customer.driverLicenseNum || "",
                driverLicensePhoto: customer.driverLicensePhoto || ""
            };

            setCustomerData(newData);

            const missing = requiredFields.filter(field =>
                !customer[field as keyof CustomerData] ||
                customer[field as keyof CustomerData] === ""
            );
            setMissingFields(missing);
        }
    }, [customer]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        missingFields.forEach(field => {
            if (!customerData[field as keyof CustomerData]) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed");
            return;
        }

        try {
            setUploading(true);
            const url = await mediaUpload(file);
            setCustomerData(prev => ({
                ...prev,
                [field]: url
            }));
            setErrors(prev => ({ ...prev, [field]: "" }));
        } catch (error: unknown) {
            toast.error("File upload failed");
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const formatBookingDate = (dateString: string) => {
        try {
            return new Date(dateString).toISOString();
        } catch (error) {
            console.error("Invalid date format:", dateString, error);
            return dateString;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        if (!validateForm() || uploading) return;

        try {
            if (!customerId) throw new Error("Customer authentication failed");
            if (!car?.carId) throw new Error("Vehicle information missing");

            if (missingFields.length > 0) {
                await dispatch(updateCustomer({
                    ...customerData,
                    customerId
                })).unwrap();
            }

            // const bookingPayload = {
            //     customerId,
            //     carIds: [car.carId],
            //     pickupLocation,
            //     pickupDate: formatBookingDate(pickupDate),
            //     returnDate: formatBookingDate(returnDate),
            //     pickupTime,
            //     returnTime,
            //     totalPrice: Number(totalPrice),
            //     status: "pending"
            // };
            const bookingPayload = {
                customerId,
                carIds: [car.carId],
                pickupLocation,
                pickupDate: formatBookingDate(pickupDate),
                returnDate: formatBookingDate(returnDate),
                pickupTime,
                returnTime,
                totalAmount: Number(totalPrice),  // Changed from totalPrice to totalAmount
                status: "pending"
            };


            const result =await dispatch(createBooking(bookingPayload)).unwrap();
            navigate("/bookingState", {
                state: {
                    booking: result,
                    carDetails: car,
                    pickupDetails: {
                        location: pickupLocation,
                        date: pickupDate,
                        time: pickupTime
                    },
                    returnDetails: {
                        date: returnDate,
                        time: returnTime
                    }
                }
            });

        } catch (error: unknown) {
            console.error("Full error details:", error);
            let errorMessage = "Booking creation failed";

            if (typeof error === "object" && error !== null) {
                // Check for Redux Thunk error format
                if ("data" in error && typeof error.data === "object" && error.data !== null) {
                    const data = error.data as { message?: string };
                    errorMessage = data.message || errorMessage;
                }

                // Check for standard Error format
                if ("message" in error && typeof error.message === "string") {
                    errorMessage = error.message;
                }
            }

            setApiError(errorMessage);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-8 mt-20">
                <h2 className="text-2xl font-semibold mb-8">Complete Your Booking</h2>

                {apiError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        Error: {apiError}
                    </div>
                )}

                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><span className="font-medium">Vehicle:</span> {car?.brand} {car?.model}</p>
                        <p><span className="font-medium">Year:</span> {car?.year}</p>
                        <p><span className="font-medium">Pickup:</span> {pickupDate} {pickupTime}</p>
                        <p><span className="font-medium">Return:</span> {returnDate} {returnTime}</p>
                        <p className="col-span-2"><span className="font-medium">Total Price:</span> ${totalPrice?.toFixed(2)}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Your Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Name</label>
                            <input
                                value={customerData.name}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                value={customerData.email}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Phone</label>
                            <input
                                value={customerData.phone}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100"
                            />
                        </div>
                    </div>

                    {missingFields.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold">Missing Information</h3>
                            {missingFields.map((field) => (
                                <div key={field} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600 capitalize">
                                        {field.replace(/([A-Z])/g, ' $1')}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    {field.includes("Photo") ? (
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, field)}
                                                className="w-full p-2 border rounded-lg"
                                                disabled={uploading}
                                            />
                                            {errors[field] && (
                                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                            )}
                                            {customerData[field as keyof CustomerData] && (
                                                <img
                                                    src={customerData[field as keyof CustomerData]}
                                                    className="h-20 w-auto border rounded mt-2"
                                                    alt="Uploaded document"
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                value={customerData[field as keyof CustomerData]}
                                                onChange={(e) => setCustomerData(prev => ({
                                                    ...prev,
                                                    [field]: e.target.value
                                                }))}
                                                className={`w-full p-3 border rounded-lg ${
                                                    errors[field] ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors[field] && (
                                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                        disabled={uploading}
                    >
                        {uploading ? "Processing..." : missingFields.length > 0 ? "Update Information & Book" : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </>
    );
}