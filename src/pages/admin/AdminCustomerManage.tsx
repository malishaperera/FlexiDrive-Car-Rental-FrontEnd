import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {deleteCustomer, getAllCustomers, updateCustomer} from "../../reducers/CustomerReducer";
import { Eye, Edit, Trash2 } from "lucide-react";

export function AdminCustomerManage() {

    const dispatch = useDispatch<AppDispatch>();

    const { customers, loading, error } = useSelector((state: RootState) => state.customer);

    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    const [editedCustomer, setEditedCustomer] = useState<any>(null);


    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    );

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    const openModal = (customer: any) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const openEditModal = (customer: any) => {
        setEditedCustomer(customer);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditedCustomer(null);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCustomer((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = () => {
        dispatch(updateCustomer(editedCustomer));
        console.log("Updated Customer:", editedCustomer);
        closeEditModal();
    };

    const handleDeleteCustomer = (customerId: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(customerId));
        }
    }

    return (
        <>
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                Customer Management
            </h1>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Name, Email or Phone..."
                    className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Loading state */}
            {loading && <p>Loading customers...</p>}

            {/* Error state */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Customer Table */}
            {/*<div className="max-h-[470px] overflow-y-auto p-2 border rounded-lg shadow-lg">*/}
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] border rounded-lg shadow-md">
                <table className="min-w-full border-collapse overflow-x-auto overflow-y-auto ">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th className="py-2 px-4 border">Customer ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Phone</th>
                        <th className="py-2 px-4 border">Address</th>
                        <th className="py-2 px-4 border">NIC</th>
                        <th className="py-2 px-4 border">NIC Photo 1</th>
                        <th className="py-2 px-4 border">NIC Photo 2</th>
                        <th className="py-2 px-4 border">Driver License</th>
                        <th className="py-2 px-4 border">License Photo</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.customerId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{customer.customerId}</td>
                            <td className="py-2 px-4 border">{customer.name}</td>
                            <td className="py-2 px-4 border">{customer.email}</td>
                            <td className="py-2 px-4 border">{customer.phone}</td>
                            <td className="py-2 px-4 border">{customer.address || "N/A"}</td>
                            <td className="py-2 px-4 border">{customer.nic || "N/A"}</td>
                            <td className="py-2 px-4 border">{customer.nicPhoto1 || "N/A"}</td>
                            <td className="py-2 px-4 border">{customer.nicPhoto2 || "N/A"}</td>
                            <td className="py-2 px-4 border">{customer.driverLicenseNum || "N/A"}</td>
                            <td className="py-2 px-4 border">{customer.driverLicensePhoto || "N/A"}</td>
                            <td className="py-2 px-4 border flex space-x-2">
                                {/*<button><Eye className="w-5 h-5 text-blue-500" /></button>*/}
                                <button onClick={() => openModal(customer)}><Eye className="w-5 h-5 text-blue-500" /></button>
                                {/*<button><Edit className="w-5 h-5 text-green-500" /></button>*/}
                                <button onClick={() => openEditModal(customer)}>
                                    <Edit className="w-5 h-5 text-green-500" />
                                </button>
                                {/*<button><Trash2 className="w-5 h-5 text-red-500" /></button>*/}
                                <button onClick={() => handleDeleteCustomer(customer.customerId)}>
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f2fafe] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#252828] mb-4 text-center">Customer Details</h2>
                        {selectedCustomer && (
                            <>
                                <div className="space-y-2">
                                    <p><strong className="text-[#252828]">Name:</strong> {selectedCustomer.name}</p>
                                    <p><strong className="text-[#252828]">Email:</strong> {selectedCustomer.email}</p>
                                    <p><strong className="text-[#252828]">Phone:</strong> {selectedCustomer.phone}</p>
                                    <p><strong className="text-[#252828]">Address:</strong> {selectedCustomer.address || "N/A"}</p>
                                    <p><strong className="text-[#252828]">NIC:</strong> {selectedCustomer.nic || "N/A"}</p>
                                    <p><strong className="text-[#252828]">NIC Photo 1:</strong> {selectedCustomer.nicPhoto1 || "N/A"}</p>
                                    <p><strong className="text-[#252828]">NIC Photo 2:</strong> {selectedCustomer.nicPhoto2 || "N/A"}</p>
                                    <p><strong className="text-[#252828]">Driver License:</strong> {selectedCustomer.driverLicenseNum || "N/A"}</p>
                                    <p><strong className="text-[#252828]">License Photo:</strong> {selectedCustomer.driverLicensePhoto || "N/A"}</p>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={closeModal}
                                        className="bg-[#40b6f0] text-white px-6 py-2 rounded-lg hover:bg-[#252828] transition-all duration-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Modal for Editing */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f2fafe] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#252828] mb-4 text-center">Edit Customer</h2>
                        {editedCustomer && (
                            <div className="space-y-2">
                                {/* Name Input */}
                                <input
                                    type="text"
                                    name="name"
                                    value={editedCustomer.name}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Name"
                                />

                                {/* Email Input */}
                                <input
                                    type="email"
                                    name="email"
                                    value={editedCustomer.email}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Email"
                                />

                                {/* Phone Input */}
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedCustomer.phone}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Phone"
                                />

                                {/* Address Input */}
                                <input
                                    type="text"
                                    name="address"
                                    value={editedCustomer.address || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Address"
                                />

                                {/* NIC Input */}
                                <input
                                    type="text"
                                    name="nic"
                                    value={editedCustomer.nic || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="NIC"
                                />

                                {/* Driver License Number Input */}
                                <input
                                    type="text"
                                    name="driverLicenseNum"
                                    value={editedCustomer.driverLicenseNum || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Driver License Number"
                                />

                                {/* NIC Photo 1 Input */}
                                {/* NIC Photo 1 URL Input */}
                                <input
                                    type="text"
                                    name="nicPhoto1"
                                    value={editedCustomer.nicPhoto1 || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Enter NIC Photo 1 URL"
                                />

                                {/* NIC Photo 2 URL Input */}
                                <input
                                    type="text"
                                    name="nicPhoto2"
                                    value={editedCustomer.nicPhoto2 || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Enter NIC Photo 2 URL"
                                />

                                {/* Driver License Photo URL Input */}
                                <input
                                    type="text"
                                    name="driverLicensePhoto"
                                    value={editedCustomer.driverLicensePhoto || ""}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Enter Driver License Photo URL"
                                />

                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={handleEditSubmit}
                                        className="bg-[#40b6f0] text-white px-6 py-2 rounded-lg hover:bg-[#252828] transition-all duration-300"
                                    >
                                        Update Changes
                                    </button>
                                    <button
                                        onClick={closeEditModal}
                                        className="bg-[#f44336] text-white px-6 py-2 rounded-lg hover:bg-[#252828] transition-all duration-300 ml-4"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
