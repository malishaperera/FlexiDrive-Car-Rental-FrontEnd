
import { useLocation } from "react-router-dom";

export function BookingState() {
    const { state } = useLocation();
    const { booking, carDetails, pickupDetails, returnDetails } = state || {};

    return (
        <div className="container mx-auto p-8 mt-20">
            <h2 className="text-3xl font-bold mb-8">Booking Confirmation</h2>

            <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                <div className="text-center">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h3 className="text-2xl font-semibold mb-2">Booking Successful!</h3>
                    <p className="text-gray-600">Your booking ID: {booking?.bookingId}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Vehicle Details</h4>
                        <p><span className="font-medium">Vehicle:</span> {carDetails?.brand} {carDetails?.model}</p>
                        <p><span className="font-medium">Year:</span> {carDetails?.year}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Pickup Details</h4>
                        <p><span className="font-medium">Location:</span> {pickupDetails?.location}</p>
                        <p><span className="font-medium">Date:</span> {new Date(pickupDetails?.date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Time:</span> {pickupDetails?.time}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Return Details</h4>
                        <p><span className="font-medium">Date:</span> {new Date(returnDetails?.date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Time:</span> {returnDetails?.time}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Payment Details</h4>
                        <p><span className="font-medium">Total Amount:</span> ${booking?.totalAmount?.toFixed(2)}</p>
                        <p><span className="font-medium">Status:</span> {booking?.status}</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        A confirmation email has been sent to your registered email address.
                        For any inquiries, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
}