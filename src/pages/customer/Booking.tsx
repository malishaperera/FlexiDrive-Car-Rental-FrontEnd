import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    FaCarSide,
    FaGasPump,
    FaCogs,
    FaUserFriends,
    FaSnowflake,
    FaMapMarkerAlt,
    FaBluetooth,
    FaSun
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/home/Header.tsx";

export function Booking() {
    const { state } = useLocation();
    const { car, pickupLocation, pickupDate, returnDate, pickupTime, returnTime } = state || {};
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(car?.image1 || "");
    const carImages = [car?.image1, car?.image2, car?.image3].filter(img => img);

    const [pickupLocationState, setPickupLocationState] = useState(pickupLocation || "");
    const [pickupDateState, setPickupDateState] = useState(pickupDate || "");
    const [pickupTimeState, setPickupTimeState] = useState(pickupTime || "");
    const [returnDateState, setReturnDateState] = useState(returnDate || "");
    const [returnTimeState, setReturnTimeState] = useState(returnTime || "");
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (pickupDateState && returnDateState && car?.pricePerDay) {
            const startDate = new Date(pickupDateState + ' ' + pickupTimeState);
            const endDate = new Date(returnDateState + ' ' + returnTimeState);
            const timeDiff = endDate.getTime() - startDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setTotalPrice(daysDiff * car.pricePerDay);
        }
    }, [pickupDateState, returnDateState, pickupTimeState, returnTimeState, car?.pricePerDay]);

    const handleBookingRequest = () => {
        if (!car) return;

        navigate('/customerDetails', {
            state: {
                car,
                pickupLocation: pickupLocationState,
                pickupDate: pickupDateState,
                returnDate: returnDateState,
                pickupTime: pickupTimeState,
                returnTime: returnTimeState,
                totalPrice
            }
        });
    };

    if (!car) {
        return <div className="text-center mt-20">No car selected</div>;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-8 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Car Details Section */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Main Image */}
                    <div className="relative h-64">
                        <img
                            src={currentImage}
                            alt={car.model}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    </div>

                    {/* Image Thumbnails */}
                    <div className="flex gap-2 p-2 bg-gray-50 border-t">
                        {carImages.map((img, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer border-2 rounded-sm ${
                                    currentImage === img
                                        ? 'border-[#40b6f0]'
                                        : 'border-transparent'
                                }`}
                                onClick={() => setCurrentImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`${car.model} thumbnail ${index + 1}`}
                                    className="w-20 h-14 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Car Specifications */}
                    <div className="p-5">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {car.brand} {car.model} ({car.year})
                        </h2>
                        <p className="text-lg font-bold text-[#40b6f0] mt-2">
                            ${car.pricePerDay}/day
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <FaCarSide className="mr-2 text-[#40b6f0]" />
                                {car.transmission}
                            </div>
                            <div className="flex items-center">
                                <FaGasPump className="mr-2 text-[#40b6f0]" />
                                {car.fuelType}
                            </div>
                            <div className="flex items-center">
                                <FaUserFriends className="mr-2 text-[#40b6f0]" />
                                {car.seatingCapacity} Seats
                            </div>
                            <div className="flex items-center">
                                <FaCogs className="mr-2 text-[#40b6f0]" />
                                Min: {car.minRentalPeriod} Days
                            </div>
                        </div>

                        {/* Features Icons */}
                        <div className="flex gap-3 mt-4">
                            {car.features?.airConditioning && (
                                <FaSnowflake className="text-blue-500" title="Air Conditioning" />
                            )}
                            {car.features?.gps && (
                                <FaMapMarkerAlt className="text-green-500" title="GPS" />
                            )}
                            {car.features?.bluetooth && (
                                <FaBluetooth className="text-purple-500" title="Bluetooth" />
                            )}
                            {car.features?.sunroof && (
                                <FaSun className="text-yellow-500" title="Sunroof" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Booking Form Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Booking Details
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pick-up Location
                            </label>
                            <input
                                type="text"
                                value={pickupLocationState}
                                onChange={(e) => setPickupLocationState(e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#40b6f0] focus:border-[#40b6f0]"
                                placeholder="Enter pickup location"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pick-up Date
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={pickupDateState}
                                    onChange={(e) => setPickupDateState(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pick-up Time
                                </label>
                                <input
                                    type="time"
                                    value={pickupTimeState}
                                    onChange={(e) => setPickupTimeState(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={returnDateState}
                                    onChange={(e) => setReturnDateState(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Return Time
                                </label>
                                <input
                                    type="time"
                                    value={returnTimeState}
                                    onChange={(e) => setReturnTimeState(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-md">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">
                                Total Price
                            </h3>
                            <p className="text-2xl font-bold text-[#40b6f0]">
                                ${totalPrice.toFixed(2)}
                            </p>
                        </div>

                        <button
                            onClick={handleBookingRequest}
                            className="w-full bg-[#40b6f0] text-white py-3 px-6 rounded-md hover:bg-[#3598d7] transition-colors font-medium"
                        >
                            Continue to Booking
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}