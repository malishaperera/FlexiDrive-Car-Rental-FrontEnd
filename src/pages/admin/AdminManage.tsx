import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {deleteAdmin, getAllAdmins, saveAdmin, updateAdmin} from "../../reducers/AdminReducer";
import { Eye, Edit, Trash2 } from "lucide-react";

export function AdminManage() {
    const dispatch = useDispatch<AppDispatch>();

    const { admins, loading, error } = useSelector((state: RootState) => state.admin);

    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const [editedAdmin, setEditedAdmin] = useState<any>(null);
    const [newAdmin, setNewAdmin] = useState<any>({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const filteredAdmins = admins.filter((admin) =>
        (admin.name && admin.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (admin.email && admin.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (admin.phone && admin.phone.includes(searchQuery))
    );


    useEffect(() => {
        dispatch(getAllAdmins());
    }, [dispatch]);

    const openModal = (admin: any) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAdmin(null);
    };

    const openEditModal = (admin: any) => {
        setEditedAdmin(admin);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditedAdmin(null);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewAdmin({ username: '', email: '', phone: '' ,password:''});
    };

    const handleAddAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAdmin((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddAdminSubmit = () => {
        console.log(newAdmin);
        dispatch(saveAdmin(newAdmin));
        closeAddModal();
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedAdmin((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = () => {
        dispatch(updateAdmin(editedAdmin));
        console.log("Updated Admin:", editedAdmin);
        closeEditModal();
    };

    const handleDeleteAdmin = (adminId: string) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            dispatch(deleteAdmin(adminId));
        }
    };

    return (
        <>
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                Admin Management
            </h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Name, Email or Phone..."
                    className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={openAddModal}
                    className="bg-[#40b6f0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#252828] transition-all duration-300"
                >
                    Admin Add
                </button>
            </div>

            {/* Loading state */}
            {loading && <p>Loading admins...</p>}

            {/* Error state */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Admin Table */}
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] border rounded-lg shadow-md">
                <table className="min-w-full border-collapse overflow-x-auto overflow-y-auto">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th className="py-2 px-4 border">Admin ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Phone</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {filteredAdmins.map((admin) => (
                        <tr key={admin.adminId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{admin.adminId}</td>
                            <td className="py-2 px-4 border">{admin.name}</td>
                            <td className="py-2 px-4 border">{admin.email}</td>
                            <td className="py-2 px-4 border">{admin.phone}</td>
                            <td className="py-2 px-4 border flex space-x-2">
                                <button onClick={() => openModal(admin)}>
                                    <Eye className="w-5 h-5 text-blue-500" />
                                </button>
                                <button onClick={() => openEditModal(admin)}>
                                    <Edit className="w-5 h-5 text-green-500" />
                                </button>
                                <button onClick={() => handleDeleteAdmin(admin.adminId)}>
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Admin Details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f2fafe] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#252828] mb-4 text-center">Admin Details</h2>
                        {selectedAdmin && (
                            <>
                                <div className="space-y-2">
                                    <p><strong className="text-[#252828]">Name:</strong> {selectedAdmin.name}</p>
                                    <p><strong className="text-[#252828]">Email:</strong> {selectedAdmin.email}</p>
                                    <p><strong className="text-[#252828]">Phone:</strong> {selectedAdmin.phone}</p>
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

            {/* Modal for Editing Admin */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f2fafe] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#252828] mb-4 text-center">Edit Admin</h2>
                        {editedAdmin && (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={editedAdmin.name}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Name"
                                />

                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    name="username"*/}
                                {/*    value={newAdmin.name}*/}
                                {/*    onChange={handleEditChange}*/}
                                {/*    className="w-full px-4 py-2 border rounded-lg"*/}
                                {/*    placeholder="Name"*/}
                                {/*/>*/}

                                <input
                                    type="email"
                                    name="email"
                                    value={editedAdmin.email}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Email"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    value={editedAdmin.phone}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Phone"
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

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f2fafe] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-3xl font-bold text-[#252828] mb-4 text-center">Add Admin</h2>
                        <div className="space-y-2">
                            <input
                                type="text"
                                name="username"
                                value={newAdmin.username}
                                onChange={handleAddAdminChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Name"
                            />

                            <input
                                type="email"
                                name="email"
                                value={newAdmin.email}
                                onChange={handleAddAdminChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Email"
                            />

                            <input
                                type="text"
                                name="password"
                                value={newAdmin.password}
                                onChange={handleAddAdminChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Password"
                            />


                            <input
                                type="text"
                                name="phone"
                                value={newAdmin.phone}
                                onChange={handleAddAdminChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Phone"
                            />

                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleAddAdminSubmit}
                                    className="bg-[#40b6f0] text-white px-6 py-2 rounded-lg hover:bg-[#252828] transition-all duration-300"
                                >
                                    Add Admin
                                </button>
                                <button
                                    onClick={closeAddModal}
                                    className="bg-[#f44336] text-white px-6 py-2 rounded-lg hover:bg-[#252828] transition-all duration-300 ml-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}