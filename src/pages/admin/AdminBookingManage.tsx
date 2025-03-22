// // AdminBookingManage.tsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../store/store";
// import { deleteBooking, getAllBookings, updateBooking } from "../../reducers/BookingReducer";
// import { Eye, Trash2 } from "lucide-react";
//
// export function AdminBookingManage() {
//     const dispatch = useDispatch<AppDispatch>();
//     const { bookings, loading, error } = useSelector((state: RootState) => ({
//         bookings: Array.isArray(state.booking.bookings) ? state.booking.bookings : [],
//         loading: state.booking.loading,
//         error: state.booking.error
//     }));
//
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedBooking, setSelectedBooking] = useState<BookingModels | null>(null);
//
//     useEffect(() => {
//         dispatch(getAllBookings());
//     }, [dispatch]);
//
//     const handleStatusUpdate = (bookingId: string, newStatus: string) => {
//         const bookingToUpdate = bookings.find(b => b.bookingId === bookingId);
//         if (bookingToUpdate) {
//             dispatch(updateBooking({
//                 ...bookingToUpdate,
//                 status: newStatus,
//                 pickupDate: bookingToUpdate.pickupDate,
//                 returnDate: bookingToUpdate.returnDate,
//                 totalAmount: bookingToUpdate.totalAmount
//             }));
//         }
//     };
//
//     const formatDate = (dateString: string) => {
//         try {
//             return new Date(dateString).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//         } catch {
//             return 'Invalid Date';
//         }
//     };
//
//     const filteredBookings = bookings.filter(booking =>
//         (booking.bookingId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//         (booking.customerId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//         (booking.status?.toLowerCase() || '').includes(searchQuery.toLowerCase())
//     );
//
//     return (
//         <div className="p-6">
//             <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
//                 Booking Management
//             </h1>
//
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search by Booking ID, Customer ID or Status..."
//                     className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//             </div>
//
//             {loading && (
//                 <div className="text-center p-4">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//                     <p className="mt-2">Loading bookings...</p>
//                 </div>
//             )}
//
//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
//                     {typeof error === 'string' ? error : 'Error loading bookings'}
//                 </div>
//             )}
//
//             {!loading && !error && (
//                 <div className="overflow-x-auto border rounded-lg shadow-md">
//                     <table className="min-w-full">
//                         <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3 px-6">Booking ID</th>
//                             <th className="py-3 px-6">Customer</th>
//                             <th className="py-3 px-6">Pickup Date</th>
//                             <th className="py-3 px-6">Return Date</th>
//                             <th className="py-3 px-6">Total (USD)</th>
//                             <th className="py-3 px-6">Status</th>
//                             <th className="py-3 px-6">Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {filteredBookings.length > 0 ? (
//                             filteredBookings.map((booking) => (
//                                 <tr key={booking.bookingId} className="hover:bg-gray-50">
//                                     <td className="py-4 px-6 border">{booking.bookingId}</td>
//                                     <td className="py-4 px-6 border">{booking.customerId}</td>
//                                     <td className="py-4 px-6 border">{formatDate(booking.pickupDate)}</td>
//                                     <td className="py-4 px-6 border">{formatDate(booking.returnDate)}</td>
//                                     <td className="py-4 px-6 border">${booking.totalAmount.toFixed(2)}</td>
//                                     <td className="py-4 px-6 border">
//                                         <select
//                                             value={booking.status}
//                                             onChange={(e) => handleStatusUpdate(booking.bookingId, e.target.value)}
//                                             className={`px-2 py-1 rounded ${
//                                                 booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                                                     booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
//                                                         'bg-red-100 text-red-800'
//                                             }`}
//                                         >
//                                             <option value="PENDING">Pending</option>
//                                             <option value="CONFIRMED">Confirmed</option>
//                                             <option value="CANCELLED">Cancelled</option>
//                                         </select>
//                                     </td>
//                                     <td className="py-4 px-6 border flex gap-2">
//                                         <button
//                                             onClick={() => {
//                                                 setSelectedBooking(booking);
//                                                 setIsModalOpen(true);
//                                             }}
//                                             className="text-blue-500 hover:text-blue-700"
//                                         >
//                                             <Eye size={20} />
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 if(window.confirm('Delete this booking?')) {
//                                                     dispatch(deleteBooking(booking.bookingId));
//                                                 }
//                                             }}
//                                             className="text-red-500 hover:text-red-700"
//                                         >
//                                             <Trash2 size={20} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="text-center py-6 text-gray-500">
//                                     {searchQuery ?
//                                         'No matching bookings found' :
//                                         'No bookings available'}
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//
//             {isModalOpen && selectedBooking && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//                         <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
//                         <div className="grid grid-cols-2 gap-4 mb-4">
//                             <div>
//                                 <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
//                                 <p><strong>Customer ID:</strong> {selectedBooking.customerId}</p>
//                                 <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation}</p>
//                             </div>
//                             <div>
//                                 <p><strong>Total Amount:</strong> ${selectedBooking.totalPrice.toFixed(2)}</p>
//                                 <p><strong>Status:</strong> {selectedBooking.status}</p>
//                             </div>
//                         </div>
//                         <h3 className="text-lg font-semibold mb-2">Car Details</h3>
//                         <div className="border rounded p-3">
//                             {selectedBooking.bookingCar?.map((car) => (
//                                 <div key={car.carId} className="mb-2">
//                                     <p className="font-medium">Car ID: {car.carId}</p>
//                                     {car.model && <p>Model: {car.model}</p>}
//                                     {car.licensePlate && <p>License: {car.licensePlate}</p>}
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             onClick={() => setIsModalOpen(false)}
//                             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// AdminBookingManage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {Booking, deleteBooking, getAllBookings, updateBooking} from "../../reducers/BookingReducer";
import { Eye, Trash2 } from "lucide-react";

export function AdminBookingManage() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, error } = useSelector((state: RootState) => ({
        bookings: state.booking.bookings,
        loading: state.booking.loading,
        error: state.booking.error
    }));

    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    const handleStatusUpdate = (bookingId: string, newStatus: string) => {
        const bookingToUpdate = bookings.find(b => b.bookingId === bookingId);
        if (bookingToUpdate) {
            dispatch(updateBooking({
                ...bookingToUpdate,
                status: newStatus
            }));
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    const filteredBookings = bookings.filter(booking =>
        (booking.bookingId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (booking.customerId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (booking.status?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                Booking Management
            </h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by Booking ID, Customer ID or Status..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading && (
                <div className="text-center p-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2">Loading bookings...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {typeof error === 'string' ? error : 'Error loading bookings'}
                </div>
            )}

            {!loading && !error && (
                <div className="overflow-x-auto border rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6">Booking ID</th>
                            <th className="py-3 px-6">Customer</th>
                            <th className="py-3 px-6">Pickup Date</th>
                            <th className="py-3 px-6">Return Date</th>
                            <th className="py-3 px-6">Total (USD)</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking.bookingId} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 border">{booking.bookingId}</td>
                                    <td className="py-4 px-6 border">{booking.customerId}</td>
                                    <td className="py-4 px-6 border">{formatDate(booking.pickupDate)}</td>
                                    <td className="py-4 px-6 border">{formatDate(booking.returnDate)}</td>
                                    <td className="py-4 px-6 border">${booking.totalAmount.toFixed(2)}</td>
                                    <td className="py-4 px-6 border">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusUpdate(booking.bookingId, e.target.value)}
                                            className={`px-2 py-1 rounded ${
                                                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6 border flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if(window.confirm('Delete this booking?')) {
                                                    dispatch(deleteBooking(booking.bookingId));
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    {searchQuery ?
                                        'No matching bookings found' :
                                        'No bookings available'}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
                                <p><strong>Customer ID:</strong> {selectedBooking.customerId}</p>
                                <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation}</p>
                            </div>
                            <div>
                                <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount.toFixed(2)}</p>
                                <p><strong>Status:</strong> {selectedBooking.status}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Car Details</h3>
                        <div className="border rounded p-3">
                            {selectedBooking.bookingCar?.map((car) => (
                                <div key={car.carId} className="mb-2">
                                    <p className="font-medium">Car ID: {car.carId}</p>
                                    {car.model && <p>Model: {car.model}</p>}
                                    {car.licensePlate && <p>License: {car.licensePlate}</p>}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}