import {useEffect, useState} from "react";
import { CarModel, CarStatus, TransmissionType, FuelType } from "../../models/CarModel";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload.tsx";

interface CarFormModalProps {
    car: CarModel | null;
    onSave: (car: CarModel) => void;
    onClose: () => void;
}

const CarFormModal: React.FC<CarFormModalProps> = ({ car, onSave, onClose }) => {
    const [carData, setCarData] = useState<CarModel>(
        car || new CarModel("", "", "", "", new Date().getFullYear(), 0, CarStatus.AVAILABLE, 4, TransmissionType.AUTOMATIC, FuelType.PETROL)
    );

    const [productImages, setProductImages] = useState<File[]>([]);

    useEffect(() => {
        if (car) {
            setProductImages([]);
        }
    }, [car]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // const numericValue = name === "pricePerDay" ? parseInt(value, 10) : value;
        console.log(`Changing ${name} to ${value}`);//bug
        setCarData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCarData((prev) => ({
            ...prev,
            features: {
                ...(prev.features || { bluetooth: false, airConditioning: false, gps: false, sunroof: false }),
                [name]: checked,
            },
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // Check if files exceed the maximum allowed (e.g., 3 images)
            if (filesArray.length > 3) {
                toast.error("You can only upload up to 3 images.");
                return;
            }

            // Validate file types and sizes
            for (const file of filesArray) {
                if (!file.type.startsWith("image/")) {
                    toast.error("Only image files are allowed.");
                    return;
                }
                if (file.size > 5 * 1024 * 1024) {  // Check for file size (5MB)
                    toast.error("Each image must be smaller than 5MB.");
                    return;
                }
            }
            setProductImages(filesArray);
        }
    };

    const handleSave = async () => {
        try {
            let uploadedImages = [];

            if (productImages.length > 0) {
                // Upload new images
                uploadedImages = await Promise.all(productImages.map(file => mediaUpload(file)));
            } else {
                // Keep existing images if no new ones are uploaded
                uploadedImages = [carData.image1, carData.image2, carData.image3];
            }

            // Assign images (newly uploaded or existing)
            const updatedCar = {
                ...carData,
                image1: uploadedImages[0] || "",
                image2: uploadedImages[1] || "",
                image3: uploadedImages[2] || "",
            };

            onSave(updatedCar);
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white rounded-lg p-8 w-full max-w-4xl mt-12 md:mt-16 overflow-auto max-h-[99vh]">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{car ? "Edit Car" : "Add Car"}</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Number Plate</label>
                            <input
                                type="text"
                                name="carNumberPlate"
                                value={carData.carNumberPlate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={carData.brand}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={carData.model}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Year</label>
                            <input
                                type="number"
                                name="year"
                                value={carData.year}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Price/Day</label>
                            <input
                                type="number"
                                name="pricePerDay"
                                value={carData.pricePerDay}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Transmission</label>
                            <select
                                name="transmission"
                                value={carData.transmission}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={TransmissionType.AUTOMATIC}>Automatic</option>
                                <option value={TransmissionType.MANUAL}>Manual</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Fuel Type</label>
                            <select
                                name="fuelType"
                                value={carData.fuelType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={FuelType.PETROL}>Petrol</option>
                                <option value={FuelType.DIESEL}>Diesel</option>
                                <option value={FuelType.HYBRID}>Hybrid</option>
                                <option value={FuelType.ELECTRIC}>Electric</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Seating Capacity</label>
                            <input
                                type="number"
                                name="seatingCapacity"
                                value={carData.seatingCapacity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-lg font-medium text-gray-700">Features</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="bluetooth"
                                    checked={carData.features?.bluetooth || false}
                                    onChange={handleFeatureChange}
                                    className="mr-2"
                                />
                                <span>Bluetooth</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="airConditioning"
                                    checked={carData.features?.airConditioning || false}
                                    onChange={handleFeatureChange}
                                    className="mr-2"
                                />
                                <span>AC</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="gps"
                                    checked={carData.features?.gps || false}
                                    onChange={handleFeatureChange}
                                    className="mr-2"
                                />
                                <span>GPS</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="sunroof"
                                    checked={carData.features?.sunroof || false}
                                    onChange={handleFeatureChange}
                                    className="mr-2"
                                />
                                <span>Sunroof</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-lg font-medium text-gray-700">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-lg font-medium text-gray-700">Existing Images</label>
                        <div className="flex gap-4">
                            {carData.image1 && <img src={carData.image1} alt="Car Image 1" className="w-20 h-20 object-cover rounded" />}
                            {carData.image2 && <img src={carData.image2} alt="Car Image 2" className="w-20 h-20 object-cover rounded" />}
                            {carData.image3 && <img src={carData.image3} alt="Car Image 3" className="w-20 h-20 object-cover rounded" />}
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {car ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CarFormModal;