export interface CarType {
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
    } | string;
    image1?: string;
    minRentalPeriod: number;
}