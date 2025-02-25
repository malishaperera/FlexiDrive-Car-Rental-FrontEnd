export interface BookingModel {
    customerId: string;
    carId: string;
    pickupLocation: string;
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
    totalPrice: number;
    status: string;
}
