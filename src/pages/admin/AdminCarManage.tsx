import { CarModel } from "../../models/CarModel";
import {  Edit, Trash2, Wifi, Sun, MapPin } from "lucide-react";
// Eye
import AddButton from "../../components/button/AddButton.tsx";
import { useEffect, useState } from "react";
import CarFormModal from "../../components/form/CarFormModal.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import {createCar, deleteCar, getAllCars, updateCar} from "../../reducers/CarReducer.ts";
import { toast } from "react-hot-toast";

export function AdminCarManage() {
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading, error } = useSelector((state: RootState) => state.car);

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to hold the car data (new car data)
    const [newCar, setNewCar] = useState<CarModel | null>(null);

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    const handleAddCar = () => {
        setIsModalOpen(true);
        setNewCar(null);
    };

    const handleEditCar = (carId: string) => {
        const carToEdit = cars.find(car => car.carId === carId);
        if (carToEdit) {
            setNewCar(carToEdit);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveCar = (car: CarModel) => {
        try {
            if (car.carId) {
                dispatch(updateCar(car));
                toast.success("Car Updated!");
            } else {
                dispatch(createCar(car));
                toast.success("Car Added!");
            }
            dispatch(getAllCars());
        } catch (error) {
            console.error("Error :", error);
            toast.error("Failed to save car.");
        }
        setNewCar(car);
        handleCloseModal();
    };

    const handleDeleteCar = (carId: string) => {
        dispatch(deleteCar(carId));
        toast.success("Car Deleted!");
        dispatch(getAllCars());
    };
    return (
        <div className="bg-amber-200">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Car Management
                </h1>
                <AddButton text="Add Car" onClick={handleAddCar} />
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading cars...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error loading cars</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-[550px] overflow-y-auto bg-white p-4 rounded-lg shadow-md mt-6">
                    {cars.map((car) => (
                        <div key={car.carId} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                            <img src={car.image1} alt="Car" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-bold mb-2">{car.brand} {car.model}</h2>
                            <p className="text-sm text-gray-600">Year: {car.year}</p>
                            <p className="text-sm text-gray-600">Price/Day: ${car.pricePerDay}</p>
                            <p className="text-sm text-gray-600">Fuel: {car.fuelType}</p>
                            <p className="text-sm text-gray-600">Transmission: {car.transmission}</p>
                            <p className="text-sm text-gray-600">Seats: {car.seatingCapacity}</p>

                            <div className="mt-4 flex flex-wrap justify-center gap-4">
                                {car.features?.bluetooth && (
                                    <div className="flex items-center space-x-1 text-blue-500">
                                        <Wifi className="w-5 h-5" />
                                        <span>Bluetooth</span>
                                    </div>
                                )}
                                {car.features?.airConditioning && (
                                    <div className="flex items-center space-x-1 text-green-500">
                                        <Sun className="w-5 h-5" />
                                        <span>AC</span>
                                    </div>
                                )}
                                {car.features?.gps && (
                                    <div className="flex items-center space-x-1 text-red-500">
                                        <MapPin className="w-5 h-5" />
                                        <span>GPS</span>
                                    </div>
                                )}
                                {car.features?.sunroof && (
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <Sun className="w-5 h-5" />
                                        <span>Sunroof</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-4 mt-4 justify-center relative top-">
                                {/*<button  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">*/}
                                {/*     <Eye className="w-5 h-5" />*/}
                                {/* </button>*/}
                                <button onClick={() => handleEditCar(car.carId)} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteCar(car.carId)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Car Form Modal */}
            {isModalOpen && (
                <CarFormModal
                    car={newCar}
                    onSave={handleSaveCar}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}