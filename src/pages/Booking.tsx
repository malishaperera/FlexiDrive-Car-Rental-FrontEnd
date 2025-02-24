import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCarSide, FaGasPump, FaCogs, FaUserFriends, FaSnowflake, FaMapMarkerAlt, FaBluetooth, FaSun } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";



export function Booking() {
    const { state } = useLocation();
    const { car, pickupLocation, pickupDate, returnDate, pickupTime, returnTime } = state || {};
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();


    // State to manage form fields
    const [pickupLocationState, setPickupLocationState] = useState(pickupLocation || "");
    const [pickupDateState, setPickupDateState] = useState(pickupDate || "");
    const [pickupTimeState, setPickupTimeState] = useState(pickupTime || "");
    const [returnDateState, setReturnDateState] = useState(returnDate || "");
    const [returnTimeState, setReturnTimeState] = useState(returnTime || "");

    // Date calculation logic
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (pickupDateState && returnDateState && car?.pricePerDay) {
            const startDate = new Date(pickupDateState + ' ' + pickupTimeState);
            const endDate = new Date(returnDateState + ' ' + returnTimeState);
            const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            setTotalPrice(daysDiff * car.pricePerDay);
        }
    }, [pickupDateState, returnDateState, pickupTimeState, returnTimeState, car?.pricePerDay]);

    const handleBookingRequest = () => {
        // Pass all the required booking data to the next page
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

    return (
        <div className="container mx-auto p-8 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {/* Left side: Car Details */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={car.image1} alt={car.model} className="w-full h-64 object-cover" />
                <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800">{car.brand} {car.model} ({car.year})</h2>
                    <p className="text-lg font-bold text-[#40b6f0]">${car.pricePerDay}/day</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                        <p className="flex items-center"><FaCarSide className="mr-2 text-[#40b6f0]" /> {car.transmission}</p>
                        <p className="flex items-center"><FaGasPump className="mr-2 text-[#40b6f0]" /> {car.fuelType}</p>
                        <p className="flex items-center"><FaUserFriends className="mr-2 text-[#40b6f0]" /> {car.seatingCapacity} Seats</p>
                        <p className="flex items-center"><FaCogs className="mr-2 text-[#40b6f0]" /> Min: {car.minRentalPeriod} Days</p>
                    </div>
                    {/* Car Features */}
                    <div className="flex gap-3 mt-3">
                        {car.features?.airConditioning && <FaSnowflake className="text-blue-500" title="Air Conditioning" />}
                        {car.features?.gps && <FaMapMarkerAlt className="text-green-500" title="GPS" />}
                        {car.features?.bluetooth && <FaBluetooth className="text-purple-500" title="Bluetooth" />}
                        {car.features?.sunroof && <FaSun className="text-yellow-500" title="Sunroof" />}
                    </div>
                </div>
            </div>

            {/* Right side: Date Selection and Total Calculation */}
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">Booking Details</h2>

                {/* Pickup and Return Dates & Times */}
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Pick-up & Return</h3>
                    <div className="flex flex-col mb-2">
                        <label>Pick-up Location</label>
                        <input
                            type="text"
                            value={pickupLocationState}
                            onChange={(e) => setPickupLocationState(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label>Pick-up Date</label>
                        <input
                            type="date"
                            min={today}
                            value={pickupDateState}
                            onChange={(e) => setPickupDateState(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label>Pick-up Time</label>
                        <input
                            type="time"
                            value={pickupTimeState}
                            onChange={(e) => setPickupTimeState(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label>Return Date</label>
                        <input
                            type="date"
                            min={today}
                            value={returnDateState}
                            onChange={(e) => setReturnDateState(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label>Return Time</label>
                        <input
                            type="time"
                            value={returnTimeState}
                            onChange={(e) => setReturnTimeState(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Total Calculation */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium">Total Price</h3>
                    <p className="text-2xl font-bold text-[#40b6f0]">${totalPrice}</p>
                </div>

                {/* Confirm Booking */}
                <button className="w-full bg-[#40b6f0] text-white py-3 px-8 rounded-lg hover:bg-[#3598d7] transition" type="button" onClick={handleBookingRequest}>
                    Request Booking
                </button>
            </div>
        </div>
    );
}
