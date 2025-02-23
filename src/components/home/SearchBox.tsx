import { toast } from "react-toastify";

export function SearchBox() {
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const pickupDate = (document.getElementById('pickup-date') as HTMLInputElement).value;
        const returnDate = (document.getElementById('return-date') as HTMLInputElement).value;

        // Check if return date is earlier than pickup date
        if (new Date(returnDate) < new Date(pickupDate)) {
            toast.error("Return date cannot be earlier than pick-up date.");
            return;
        }

        // Validate if the pickup date is before today
        if (new Date(pickupDate) < new Date(today)) {
            toast.error("Pick-up date cannot be in the past.");
            return;
        }

        // Validate if the return date is before today
        if (new Date(returnDate) < new Date(today)) {
            toast.error("Return date cannot be in the past.");
            return;
        }

        // If everything is valid, you can proceed
        toast.success("Form submitted successfully!");
    };

    return (
        <section className="bg-white shadow-md p-6 rounded-lg max-w-6xl mx-auto mt-10 absolute bottom-[-90px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <div>
                <label className="block text-gray-700">Pick up Location</label>
                <input type="text" className="w-full p-3 border rounded-md" placeholder="SriLanka, Colombo" />
            </div>
            <div>
                <label className="block text-gray-700">Pick up Date & Time</label>
                <div className="flex space-x-4">
                    <input
                        id="pickup-date"
                        type="date"
                        className="w-1/2 p-3 border rounded-md"
                        min={today}
                    />
                    <input type="time" className="w-1/2 p-3 border rounded-md" />
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Return Date & Time</label>
                <div className="flex space-x-4">
                    <input
                        id="return-date"
                        type="date"
                        className="w-1/2 p-3 border rounded-md"
                        min={today}
                    />
                    <input type="time" className="w-1/2 p-3 border rounded-md" placeholder="Return time" />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="col-span-2 md:col-span-3 lg:col-span-3 bg-[#40b6f0] text-white py-3 rounded-md hover:bg-[#3598d7]"
            >
                Search Car
            </button>
        </section>
    );
}
