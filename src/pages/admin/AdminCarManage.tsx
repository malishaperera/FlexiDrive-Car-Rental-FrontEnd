import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {CarModel, CarStatus, FuelType, TransmissionType} from "../../models/CarModel";
import {createCar, deleteCar, getAllCars, updateCar} from "../../reducers/CarReducer.ts";
import { Eye, Edit, Trash2 } from "lucide-react";
import {toast} from "react-hot-toast";
import {Plus} from "react-feather";

export function AdminCarManage() {
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading, error } = useSelector((state: RootState) => state.car);
    const [selectedImage, setSelectedImage] = useState<{ [key: string]: string }>({});

    const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCar, setEditCar] = useState<CarModel | null>(null);

    const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
    const [newCar, setNewCar] = useState<CarModel>({
        carId: "",
        carNumberPlate: "",
        brand: "",
        model: "",
        year: 2023,
        pricePerDay: 0,
        status: CarStatus.AVAILABLE,
        seatingCapacity: 4,
        transmission: TransmissionType.AUTOMATIC,
        fuelType: FuelType.PETROL,
        features: { bluetooth: false, airConditioning: false, gps: false, sunroof: false },
        image1: "",
        image2: "",
        image3: "",
        createdAt: new Date(),
        minRentalPeriod: 1,
        maxRentalPeriod: 28,
    });

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "AVAILABLE":
                return "bg-green-500 text-white";
            case "RENTED":
                return "bg-red-500 text-white";
            case "MAINTENANCE":
                return "bg-yellow-500 text-black";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const handleViewClick = (car: CarModel) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditClick = (car: CarModel) => {
        setEditCar(car);
        setIsEditModalOpen(true);
    };

    const handleUpdateCar = async () => {
        if (editCar) {
            dispatch(updateCar(editCar))
                .unwrap()
                .then(() => {
                    toast.success("Car updated successfully!");
                    handleCloseEditModal();
                })
                .catch((error) => {
                    toast.error("Failed to update car.");
                });
        }
    };

    const handleDeleteClick = (carId: string) => {
        dispatch(deleteCar(carId))
            .unwrap()
            .then(() => {
                toast.success("Car deleted successfully!");
            })
            .catch((error) => {
                toast.error(error || "Failed to delete car");
            });
    };
    const handleCloseAddModal = () => {
        setIsAddCarModalOpen(false);
    };

    const handleAddCar = () => {
        dispatch(createCar(newCar))
            .unwrap()
            .then(() => {
                toast.success("Car added successfully!");
                setIsAddCarModalOpen(false);
            })
            .catch((error) => {
                toast.error(error || "Failed to add car.");
            });
    };

    return (
        <>
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Car Management</h1>
            <div className="flex justify-center mb-6">
                <button
                    className="p-4 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => setIsAddCarModalOpen(true)}
                >
                    <Plus className="w-6 h-6 mr-2" /> Add Car
                </button>
            </div>

            <div className="p-4">

            {loading && <p>Loading cars...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="max-h-[470px] overflow-y-auto p-2 border rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cars.map((car: CarModel) => {
                        const images = [car.image1, car.image2, car.image3].filter(Boolean);
                        return (
                            <div key={car.carId} className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
                                <img
                                    src={selectedImage[car.carNumberPlate] || car.image1 || "https://via.placeholder.com/200"}
                                    alt={car.brand + " " + car.model}
                                    className="w-full h-40 object-cover rounded-md"
                                />

                                <div className="flex space-x-2 mt-2">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-10 h-10 object-cover rounded cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                                            onClick={() => setSelectedImage((prev) => ({ ...prev, [car.carId]: img as string }))}/>
                                        ))}
                                </div>

                                <h2 className="text-lg font-bold mt-2">{car.brand} {car.model}</h2>
                                <p className="text-gray-600">Plate: {car.carNumberPlate}</p>
                                <p className="text-gray-600">Price: ${car.pricePerDay}/day</p>
                                <p className="text-gray-600">Seats: {car.seatingCapacity}</p>
                                <p className="text-gray-600">Fuel: {car.fuelType}</p>
                                <p className="text-gray-600">Transmission: {car.transmission}</p>

                                <p className={`px-2 py-1 rounded-md text-center mt-2 w-fit ${getStatusColor(car.status)}`}>
                                    {car.status}
                                </p>

                                <div className="flex flex-wrap mt-2 text-sm text-gray-500">
                                    {car.features?.bluetooth && <span className="mr-2">🎧 Bluetooth</span>}
                                    {car.features?.airConditioning && <span className="mr-2">❄️ A/C</span>}
                                    {car.features?.gps && <span className="mr-2">🛰 GPS</span>}
                                    {car.features?.sunroof && <span className="mr-2">🌞 Sunroof</span>}
                                </div>

                                <div className="flex justify-evenly mt-auto pt-4">
                                    <button
                                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                        onClick={() => handleViewClick(car)}
                                    >
                                        <Eye className="w-5 h-5 text-blue-500" />
                                    </button>
                                    <button
                                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                        onClick={() => handleEditClick(car)}
                                    >
                                        <Edit className="w-5 h-5 text-green-500" />
                                    </button>
                                    <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                            onClick={() => handleDeleteClick(car.carId)}>
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for displaying selected car details */}
            {isModalOpen && selectedCar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">{selectedCar.brand} {selectedCar.model}</h2>
                        <p><strong>Plate:</strong> {selectedCar.carNumberPlate}</p>
                        <p><strong>Price per Day:</strong> ${selectedCar.pricePerDay}</p>
                        <p><strong>Seats:</strong> {selectedCar.seatingCapacity}</p>
                        <p><strong>Fuel:</strong> {selectedCar.fuelType}</p>
                        <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
                        <p><strong>Status:</strong> {selectedCar.status}</p>

                        <h3 className="mt-4 font-bold">Features:</h3>
                        <ul className="list-disc pl-6">
                            {selectedCar.features?.bluetooth && <li>🎧 Bluetooth</li>}
                            {selectedCar.features?.airConditioning && <li>❄️ A/C</li>}
                            {selectedCar.features?.gps && <li>🛰 GPS</li>}
                            {selectedCar.features?.sunroof && <li>🌞 Sunroof</li>}
                        </ul>

                        <button
                            className="mt-4 p-2 bg-red-500 text-white rounded-md"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for editing car details */}
            {isEditModalOpen && editCar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-xl overflow-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Car</h2>
                        <form className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)]">
                            {/* Car Number Plate */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Car Number Plate:</label>
                                <input
                                    type="text"
                                    value={editCar?.carNumberPlate || ''}
                                    onChange={(e) => setEditCar({ ...editCar, carNumberPlate: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Brand:</label>
                                <input
                                    type="text"
                                    value={editCar?.brand || ''}
                                    onChange={(e) => setEditCar({ ...editCar, brand: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Model */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Model:</label>
                                <input
                                    type="text"
                                    value={editCar?.model || ''}
                                    onChange={(e) => setEditCar({ ...editCar, model: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Year:</label>
                                <input
                                    type="number"
                                    value={editCar?.year || ''}
                                    onChange={(e) => setEditCar({ ...editCar, year: parseInt(e.target.value) })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Price per Day */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Price per Day:</label>
                                <input
                                    type="number"
                                    value={editCar?.pricePerDay || ''}
                                    onChange={(e) => setEditCar({ ...editCar, pricePerDay: Number(e.target.value) })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Status:</label>
                                <select
                                    value={editCar?.status || ''}
                                    onChange={(e) => setEditCar({ ...editCar, status: e.target.value as CarStatus })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={CarStatus.AVAILABLE}>Available</option>
                                    <option value={CarStatus.RENTED}>Rented</option>
                                    <option value={CarStatus.MAINTENANCE}>Maintenance</option>
                                </select>
                            </div>

                            {/* Seating Capacity */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Seating Capacity:</label>
                                <input
                                    type="number"
                                    value={editCar?.seatingCapacity || ''}
                                    onChange={(e) => setEditCar({ ...editCar, seatingCapacity: parseInt(e.target.value) })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Transmission */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Transmission:</label>
                                <select
                                    value={editCar?.transmission || ''}
                                    onChange={(e) => setEditCar({ ...editCar, transmission: e.target.value as TransmissionType })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TransmissionType.AUTOMATIC}>Automatic</option>
                                    <option value={TransmissionType.MANUAL}>Manual</option>
                                </select>
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Fuel Type:</label>
                                <select
                                    value={editCar?.fuelType || ''}
                                    onChange={(e) => setEditCar({ ...editCar, fuelType: e.target.value as FuelType })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="PETROL">Petrol</option>
                                    <option value="DIESEL">Diesel</option>
                                    <option value="ELECTRIC">Electric</option>
                                </select>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Features</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={newCar.features?.bluetooth ?? false}
                                            onChange={(e) =>
                                                setNewCar({
                                                    ...newCar,
                                                    features: {
                                                        ...newCar.features,
                                                        bluetooth: e.target.checked,
                                                    },
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        Bluetooth
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={newCar.features?.airConditioning ?? false}
                                            onChange={(e) =>
                                                setNewCar({
                                                    ...newCar,
                                                    features: {
                                                        ...newCar.features,
                                                        airConditioning: e.target.checked,
                                                    },
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        Air Conditioning
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={newCar.features?.gps ?? false}
                                            onChange={(e) =>
                                                setNewCar({
                                                    ...newCar,
                                                    features: { ...newCar.features, gps: e.target.checked },
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        GPS
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={newCar.features?.sunroof ?? false}
                                            onChange={(e) =>
                                                setNewCar({
                                                    ...newCar,
                                                    features: {
                                                        ...newCar.features,
                                                        sunroof: e.target.checked,
                                                    },
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        Sunroof
                                    </label>
                                </div>
                            </div>

                            {/* Image URLs */}
                            <div>
                                <label className="block text-lg font-medium mb-2">Images:</label>
                                <input
                                    type="text"
                                    value={editCar?.image1 || ''}
                                    onChange={(e) => setEditCar({ ...editCar, image1: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                    placeholder="Image URL 1"
                                />
                                <input
                                    type="text"
                                    value={editCar?.image2 || ''}
                                    onChange={(e) => setEditCar({ ...editCar, image2: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                    placeholder="Image URL 2"
                                />
                                <input
                                    type="text"
                                    value={editCar?.image3 || ''}
                                    onChange={(e) => setEditCar({ ...editCar, image3: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Image URL 3"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    className="p-4 bg-blue-500 text-white rounded-lg w-full shadow-md hover:bg-blue-600 transition duration-300"
                                    onClick={handleUpdateCar}
                                >
                                    Update Car
                                </button>
                                <button
                                    type="button"
                                    className="p-4 bg-red-500 text-white rounded-lg w-full shadow-md hover:bg-red-600 transition duration-300"
                                    onClick={handleCloseEditModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
                {/* Add Car Modal */}
                {isAddCarModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-xl overflow-auto max-h-screen">
                            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Car</h2>
                            <form className="space-y-6">
                                {/* Car Number Plate */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Car Number Plate:</label>
                                    <input
                                        type="text"
                                        value={newCar.carNumberPlate}
                                        onChange={(e) =>
                                            setNewCar({ ...newCar, carNumberPlate: e.target.value })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Brand:</label>
                                    <input
                                        type="text"
                                        value={newCar.brand}
                                        onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Model */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Model:</label>
                                    <input
                                        type="text"
                                        value={newCar.model}
                                        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Year:</label>
                                    <input
                                        type="number"
                                        value={newCar.year}
                                        onChange={(e) => setNewCar({ ...newCar, year: parseInt(e.target.value) })}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Price per Day */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Price per Day:</label>
                                    <input
                                        type="number"
                                        value={newCar.pricePerDay}
                                        onChange={(e) =>
                                            setNewCar({ ...newCar, pricePerDay: parseFloat(e.target.value) })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Status:</label>
                                    <select
                                        value={newCar.status}
                                        onChange={(e) => setNewCar({ ...newCar, status: e.target.value as CarStatus })}  // Cast to CarStatus
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="AVAILABLE">Available</option>
                                        <option value="RENTED">Rented</option>
                                        <option value="MAINTENANCE">Maintenance</option>
                                    </select>
                                </div>


                                {/* Features */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Features</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newCar.features?.bluetooth}
                                                onChange={(e) =>
                                                    setNewCar({
                                                        ...newCar,
                                                        features: {
                                                            ...newCar.features,
                                                            bluetooth: e.target.checked,
                                                        },
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            Bluetooth
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newCar.features?.airConditioning}
                                                onChange={(e) =>
                                                    setNewCar({
                                                        ...newCar,
                                                        features: {
                                                            ...newCar.features,
                                                            airConditioning: e.target.checked,
                                                        },
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            Air Conditioning
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newCar.features?.gps}
                                                onChange={(e) =>
                                                    setNewCar({
                                                        ...newCar,
                                                        features: { ...newCar.features, gps: e.target.checked },
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            GPS
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newCar.features?.sunroof}
                                                onChange={(e) =>
                                                    setNewCar({
                                                        ...newCar,
                                                        features: {
                                                            ...newCar.features,
                                                            sunroof: e.target.checked,
                                                        },
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            Sunroof
                                        </label>
                                    </div>
                                </div>

                                {/* Image URLs */}
                                <div>
                                    <label className="block text-lg font-medium mb-2">Images:</label>
                                    <input
                                        type="text"
                                        value={newCar.image1}
                                        onChange={(e) =>
                                            setNewCar({ ...newCar, image1: e.target.value })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                        placeholder="Image URL 1"
                                    />
                                    <input
                                        type="text"
                                        value={newCar.image2}
                                        onChange={(e) =>
                                            setNewCar({ ...newCar, image2: e.target.value })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                        placeholder="Image URL 2"
                                    />
                                    <input
                                        type="text"
                                        value={newCar.image3}
                                        onChange={(e) =>
                                            setNewCar({ ...newCar, image3: e.target.value })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Image URL 3"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseAddModal}
                                        className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddCar}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Add Car
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div>
        </>
    );
}