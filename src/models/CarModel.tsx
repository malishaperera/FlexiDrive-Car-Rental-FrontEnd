export enum CarStatus {
    AVAILABLE = "AVAILABLE",
    RENTED = "RENTED",
    MAINTENANCE = "MAINTENANCE"
}

export enum TransmissionType {
    AUTOMATIC = "AUTOMATIC",
    MANUAL = "MANUAL"
}

export enum FuelType {
    PETROL = "PETROL",
    DIESEL = "DIESEL",
    HYBRID = "HYBRID",
    ELECTRIC = "ELECTRIC"
}


export class CarModel {
    carId: string;
    carNumberPlate: string;
    brand: string;
    model: string;
    year: number;
    pricePerDay: number;
    status: CarStatus;
    seatingCapacity: number;
    transmission: TransmissionType;
    fuelType: FuelType;
    features?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    createdAt: Date;

    minRentalPeriod: number;
    maxRentalPeriod: number;

    constructor(
        carId: string,
        carNumberPlate: string,
        brand: string,
        model: string,
        year: number,
        pricePerDay: number,
        status: CarStatus,
        seatingCapacity: number,
        transmission: TransmissionType,
        fuelType: FuelType,
        features?: string,
        image1?: string,
        image2?: string,
        image3?: string,
        createdAt?: Date,
        minRentalPeriod = 1,
        maxRentalPeriod = 28
    ) {
        this.carId = carId;
        this.carNumberPlate = carNumberPlate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.status = status;
        this.seatingCapacity = seatingCapacity;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.features = features;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.createdAt = createdAt || new Date();
        this.minRentalPeriod = minRentalPeriod;
        this.maxRentalPeriod = maxRentalPeriod;
    }
}