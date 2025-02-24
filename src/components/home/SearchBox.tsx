// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function SearchBox() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [returnTime, setReturnTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickupLocation || !pickupDate || !returnDate || !pickupTime || !returnTime) {

            toast.error("Please fill in all fields");
            return;
        }

        console.log("Navigating to /car");
        // navigate("/car");
        navigate("/car", {
            state: {
                pickupLocation,
                pickupDate,
                returnDate,
                pickupTime,
                returnTime,
            },
        });
    };

    return (
        <div className="bg-white w-[1800px] max-w-5xl shadow-lg p-8 rounded-xl mx-auto mt-10 absolute bottom-[-90px]">

        <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end" onSubmit={handleSubmit}>

                {/* Pick-up Location */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Pick-up Location</label>
                    <select
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                    >
                        <option value="">Select Location</option>
                        <option value="colombo1">Colombo 1 (Fort)</option>
                        <option value="colombo2">Colombo 2 (Pettah)</option>
                        <option value="colombo3">Colombo 3 (Kollupitiya)</option>
                        <option value="colombo4">Colombo 4 (Bambalapitiya)</option>
                        <option value="colombo5">Colombo 5 (Havelock Town)</option>
                        <option value="colombo6">Colombo 6 (Wellawatte)</option>
                        <option value="colombo7">Colombo 7 (Cinnamon Gardens)</option>
                        <option value="colombo8">Colombo 8 (Borella)</option>
                        <option value="colombo9">Colombo 9 (Dematagoda)</option>
                        <option value="colombo10">Colombo 10 (Grandpass)</option>
                    </select>
                </div>

                {/* Pick-up Date & Time */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Pick-up Date & Time</label>
                    <div className="flex space-x-3">
                        <input
                            type="date"
                            className="p-3 border rounded-lg w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            min={today}
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                        />
                        <input
                            type="time"
                            className="p-3 border rounded-lg w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                        />
                    </div>
                </div>

                {/* Return Date & Time */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Return Date & Time</label>
                    <div className="flex space-x-3">
                        <input
                            type="date"
                            className="p-3 border rounded-lg w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            min={today}
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                        <input
                            type="time"
                            className="p-3 border rounded-lg w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-[#40b6f0] w-[600px] text-white py-3 px-10 text-lg font-medium rounded-lg hover:bg-[#3598d7] transition duration-300"
                    >
                        Search
                    </button>
                </div>

            </form>
        </div>
    );
}