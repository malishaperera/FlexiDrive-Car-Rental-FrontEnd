import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getAllBookings, updateBooking } from "../../reducers/BookingReducer";
import { Eye, Edit, Trash2 } from "lucide-react";

// Function to format date
const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};

export function AdminBookingManage() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, error } = useSelector((state: RootState) => state.booking);

    // State for the modal and selected booking
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingModel | null>(null);

    // Dispatch the action to fetch all bookings when the component mounts
    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    // Handle open modal with selected booking
    const handleEditClick = (booking: BookingModel) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    // Handle form submission for update
    const handleUpdateBooking = (updatedBooking: BookingModel) => {
        if (updatedBooking) {
            dispatch(updateBooking(updatedBooking));
            setIsModalOpen(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Booking Management</h1>

            {loading && <p>Loading bookings...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table for displaying bookings */}
            <div className="overflow-x-auto max-h-[500px] border rounded-lg shadow-md">
                <table className="min-w-full border-collapse overflow-x-auto">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th className="py-2 px-4 border">Booking ID</th>
                        <th className="py-2 px-4 border">Customer ID</th>
                        <th className="py-2 px-4 border">Car IDs</th>
                        <th className="py-2 px-4 border">Pickup Location</th>
                        <th className="py-2 px-4 border">Pickup Date</th>
                        <th className="py-2 px-4 border">Return Date</th>
                        <th className="py-2 px-4 border">Pickup Time</th>
                        <th className="py-2 px-4 border">Return Time</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {/* Loop through bookings and display each row */}
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{booking.bookingId}</td>
                            <td className="py-2 px-4 border">{booking.customerId}</td>
                            <td className="py-2 px-4 border">
                                {booking.bookingCar.length > 0
                                    ? booking.bookingCar.map((car, index) => (
                                        <span key={index}>{car.carId}{index < booking.bookingCar.length - 1 ? ', ' : ''}</span>
                                    ))
                                    : 'No Cars'}
                            </td>
                            <td className="py-2 px-4 border">{booking.pickupLocation}</td>
                            <td className="py-2 px-4 border">{formatDate(booking.pickupDate)}</td>
                            <td className="py-2 px-4 border">{formatDate(booking.returnDate)}</td>
                            <td className="py-2 px-4 border">{booking.pickupTime}</td>
                            <td className="py-2 px-4 border">{booking.returnTime}</td>
                            <td className="py-2 px-4 border">{booking.status}</td>
                            <td className="py-2 px-4 border flex space-x-2">
                                <button>
                                    <Eye className="w-5 h-5 text-blue-500" />
                                </button>
                                <button onClick={() => handleEditClick(booking)}>
                                    <Edit className="w-5 h-5 text-green-500" />
                                </button>
                                <button>
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing booking */}
            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateBooking(selectedBooking);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Booking ID</label>
                                <input
                                    type="text"
                                    value={selectedBooking.bookingId}
                                    disabled
                                    className="mt-1 w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Pickup Location</label>
                                <input
                                    type="text"
                                    value={selectedBooking.pickupLocation}
                                    onChange={(e) =>
                                        setSelectedBooking({ ...selectedBooking, pickupLocation: e.target.value })
                                    }
                                    className="mt-1 w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    value={selectedBooking.status}
                                    onChange={(e) =>
                                        setSelectedBooking({ ...selectedBooking, status: e.target.value })
                                    }
                                    className="mt-1 w-full px-4 py-2 border rounded-md"
                                >
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                >
                                    Close
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Update Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
