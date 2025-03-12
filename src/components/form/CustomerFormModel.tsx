import React from "react";
import { X } from "lucide-react";
import { CustomerWithoutPassword } from "../../models/interface/CustomerWithoutPassword";
import { motion } from "framer-motion";

interface CustomerDetailsModalProps {
    customer: CustomerWithoutPassword;
    onClose: () => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ customer, onClose }) => {
    return (
        // <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        //     <div className="bg-[#f2fafe] p-6 rounded-xl  w-[800px] shadow-lg transform transition-all scale-95">
        //
        //     {/* Header */}
        //         <div className="flex justify-between items-center border-b pb-2 mb-4">
        //             <h2 className="text-2xl font-semibold text-[#252828]">Customer Details</h2>
        //             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition">
        //                 <X className="w-5 h-5 text-gray-600" />
        //             </button>
        //         </div>
        //
        //         {/* Customer Info */}
        //         <div className="space-y-3">
        //             <p><strong className="text-[#252828]">Customer ID:</strong> {customer.customerId}</p>
        //             <p><strong className="text-[#252828]">Name:</strong> {customer.name}</p>
        //             <p><strong className="text-[#252828]">Email:</strong> {customer.email}</p>
        //             <p><strong className="text-[#252828]">Phone:</strong> {customer.phone}</p>
        //             <p><strong className="text-[#252828]">NIC:</strong> {customer.nic}</p>
        //         </div>
        //
        //         {/* Image Section */}
        //         {/*<div className="mt-4 flex gap-4">*/}
        //         {/*    <div className="flex flex-col items-center">*/}
        //         {/*        <span className="text-sm text-gray-600">NIC Photo Front</span>*/}
        //         {/*        <img src={customer.nicPhoto1 ?? "default-nic.jpg"}*/}
        //         {/*             alt="NIC"*/}
        //         {/*             className="w-20 h-20 object-cover rounded-lg border shadow-sm" />*/}
        //         {/*    </div>*/}
        //         {/*    <div className="flex flex-col items-center">*/}
        //         {/*        <span className="text-sm text-gray-600">NIC Photo Back</span>*/}
        //         {/*        <img src={customer.nicPhoto2 ?? "default-nic.jpg"}*/}
        //         {/*             alt="NIC"*/}
        //         {/*             className="w-20 h-20 object-cover rounded-lg border shadow-sm" />*/}
        //         {/*    </div>*/}
        //         {/*    <div className="flex flex-col items-center">*/}
        //         {/*        <span className="text-sm text-gray-600">License Photo</span>*/}
        //         {/*        <img src={customer.driverLicensePhoto ?? "default-license.jpg"}*/}
        //         {/*             alt="License"*/}
        //         {/*             className="w-20 h-20 object-cover rounded-lg border shadow-sm" />*/}
        //         {/*    </div>*/}
        //         {/*</div>*/}
        //         <div className="mt-4 flex gap-4">
        //             {[
        //                 { label: "NIC Photo Front", src: customer.nicPhoto1 ?? "default-nic.jpg" },
        //                 { label: "NIC Photo Back", src: customer.nicPhoto2 ?? "default-nic.jpg" },
        //                 { label: "License Photo", src: customer.driverLicensePhoto ?? "default-license.jpg" }
        //             ].map((item, index) => (
        //                 <div key={index} className="flex flex-col items-center">
        //                     <span className="text-sm text-gray-600">{item.label}</span>
        //                     <motion.img
        //                         src={item.src}
        //                         alt={item.label}
        //                         className="w-20 h-20 object-cover rounded-lg border shadow-sm"
        //                         whileHover={{ scale: 1.2 }} // Zoom effect on hover
        //                         transition={{ duration: 0.3 }}
        //                     />
        //                 </div>
        //             ))}
        //         </div>
        //
        //         {/* Close Button */}
        //         <div className="mt-6 flex justify-end">
        //             <button onClick={onClose}
        //                     className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
        //                 Close
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-[#f2fafe] p-8 rounded-xl w-[900px] shadow-lg transform transition-all scale-95">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-6">
                    <h2 className="text-3xl font-semibold text-[#252828]">Customer Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition">
                        <X className="w-5 h-5 text-[#252828]" />
                    </button>
                </div>

                {/* Customer Info */}
                <div className="space-y-4">
                    <p><strong className="text-[#252828]">Customer ID:</strong> {customer.customerId}</p>
                    <p><strong className="text-[#252828]">Name:</strong> {customer.name}</p>
                    <p><strong className="text-[#252828]">Email:</strong> {customer.email}</p>
                    <p><strong className="text-[#252828]">Phone:</strong> {customer.phone}</p>
                    <p><strong className="text-[#252828]">NIC:</strong> {customer.nic}</p>
                </div>

                {/* Image Section */}
                <div className="mt-6 grid grid-cols-3 gap-8">
                    {[{
                        label: "NIC Photo Front",
                        src: customer.nicPhoto1 ?? "default-nic.jpg"
                    }, {
                        label: "NIC Photo Back",
                        src: customer.nicPhoto2 ?? "default-nic.jpg"
                    }, {
                        label: "License Photo",
                        src: customer.driverLicensePhoto ?? "default-license.jpg"
                    }].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-sm text-[#252828]">{item.label}</span>
                            <motion.img
                                src={item.src}
                                alt={item.label}
                                className="w-32 h-32 object-cover rounded-lg border shadow-md transition-transform transform hover:scale-110"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <div className="mt-8 flex justify-end">
                    <button onClick={onClose}
                            className="px-8 py-3 bg-[#40b6f0] text-white rounded-lg hover:bg-[#2593d0] transition">
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CustomerDetailsModal;
