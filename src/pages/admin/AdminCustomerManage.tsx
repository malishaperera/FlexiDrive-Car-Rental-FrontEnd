import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deleteCustomer, getAllCustomers } from "../../reducers/CustomerReducer";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import CustomerDetailsModal from "../../components/form/CustomerFormModel.tsx";
import { CustomerWithoutPassword } from "../../models/interface/CustomerWithoutPassword.tsx";
import {CustomerModel} from "../../models/CustomerModel.tsx";

export function AdminCustomerManage() {
    const dispatch = useDispatch<AppDispatch>();
    const { customers, loading, error } = useSelector((state: RootState) => state.customer);

    const [selectedCustomer, setSelectedCustomer] = useState<null | CustomerWithoutPassword>(null);

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    const handleViewCustomer = (customerId: string) => {
        const customer = customers.find(c => c.customerId === customerId);
        if (customer) {
            const { password, ...customerWithoutPassword } = customer as CustomerModel & { password?: string };
            setSelectedCustomer(customerWithoutPassword);
        }
    };

    const handleCloseModal = () => {
        setSelectedCustomer(null);
    };

    const handleDeleteCustomer = (customerId: string) => {
        dispatch(deleteCustomer(customerId));
        toast.success("Customer Deleted!");
        dispatch(getAllCustomers());
    };

    return (
        <div className="bg-amber-200 p-6">
            <div className="flex items-center justify-center w-full">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Customer Management
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading customers...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error loading customers</p>
            ) : (
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md mt-10 w-full">
                    <div className="max-h-[500px] overflow-y-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            {/* Table Header */}
                            <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr className="text-left">
                                <th className="py-2 px-4 border">Customer ID</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Phone</th>
                                <th className="py-2 px-4 border">NIC</th>
                                <th className="py-2 px-4 border">NIC Photo</th>
                                <th className="py-2 px-4 border">License</th>
                                <th className="py-2 px-4 border">License Photo</th>
                                <th className="py-2 px-4 border text-center">Actions</th>
                            </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.customerId} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border">{customer.customerId}</td>
                                    <td className="py-2 px-4 border">{customer.name}</td>
                                    <td className="py-2 px-4 border">{customer.email}</td>
                                    <td className="py-2 px-4 border">{customer.phone}</td>
                                    <td className="py-2 px-4 border">{customer.nic}</td>
                                    <td className="py-2 px-4 border">
                                        <img src={customer.nicPhoto1 ?? "default-nic.jpg"} alt="NIC" className="w-12 h-12 object-cover rounded-md" />
                                    </td>
                                    <td className="py-2 px-4 border">{customer.driverLicenseNum}</td>
                                    <td className="py-2 px-4 border">
                                        <img src={customer.driverLicensePhoto ?? "default-license.jpg"} alt="License" className="w-12 h-12 object-cover rounded-md" />
                                    </td>
                                    <td className="py-2 px-4 border text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleViewCustomer(customer.customerId)}
                                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCustomer(customer.customerId)}
                                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <CustomerDetailsModal customer={selectedCustomer} onClose={handleCloseModal} />
            )}
        </div>
    );
}