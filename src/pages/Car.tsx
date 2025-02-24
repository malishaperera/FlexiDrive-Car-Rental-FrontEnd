import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../reducers/CarReducer.ts";
import { AppDispatch, RootState } from "../store/store.tsx";
import { Header } from "../components/home/Header.tsx";
import { FaCarSide, FaGasPump, FaCogs, FaUserFriends, FaSnowflake, FaMapMarkerAlt, FaBluetooth, FaSun } from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";

// Define the Car type
interface CarType {
    carNumberPlate: string;
    brand: string;
    model: string;
    year: number;
    pricePerDay: number;
    status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
    seatingCapacity: number;
    transmission: "AUTOMATIC" | "MANUAL";
    fuelType: "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";
    features?: {
        airConditioning?: boolean;
        gps?: boolean;
        bluetooth?: boolean;
        sunroof?: boolean;
    };
    image1?: string;
    minRentalPeriod: number;
}

// Component
export function Car() {
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading, error } = useSelector((state: RootState) => state.car);

    const { state } = useLocation();
    const { pickupLocation, pickupDate, returnDate, pickupTime, returnTime } = state || {};
    const navigate = useNavigate();

    const handleRentNow = (car) => {
        // Pass the selected car along with search details to the booking page
        navigate("/booking", {
            state: {
                car,
                pickupLocation,
                pickupDate,
                returnDate,
                pickupTime,
                returnTime
            }
        });
    };

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="container mx-auto p-8 mt-30 overflow-x-auto">
                {loading && <p className="text-center text-lg text-gray-600">Loading cars...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cars.map((car: CarType) => (
                        <div key={car.carNumberPlate} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={car.image1} alt={car.model} className="w-full h-52 object-cover" />
                            <div className="p-5">
                                {/* Car Name */}
                                <h2 className="text-xl font-semibold text-gray-800">{car.brand} {car.model} ({car.year})</h2>

                                {/* Price & Status */}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-lg font-bold text-[#40b6f0]">${car.pricePerDay}/day</p>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${car.status === "AVAILABLE" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                        {car.status}
                                    </span>
                                </div>

                                {/* Car Details */}
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

                                {/* Rent Button */}
                                <button className="mt-5 w-full bg-[#40b6f0] text-white py-2 rounded-lg hover:bg-[#3598d7] transition" onClick={() => handleRentNow(car)}>
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
