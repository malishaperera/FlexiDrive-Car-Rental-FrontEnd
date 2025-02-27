
export function DashBoardAdmin() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Top bar */}
            <div className="bg-[#40b6f0] p-4 flex justify-between items-center">
                <div className="text-white text-xl font-bold">Admin Dashboard</div>
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:bg-blue-600 p-2 rounded-lg">Notifications</button>
                    <button className="text-white hover:bg-blue-600 p-2 rounded-lg">Profile</button>
                </div>
            </div>

            {/* Content area */}
            <div className="p-6">
                <h2 className="text-3xl font-extrabold text-[#252828] mb-6">Dashboard Overview</h2>

                {/* Statistics Cards */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {/* Car Count */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-[#252828]">Total Cars</h3>
                        <p className="text-4xl font-bold text-[#40b6f0]">75</p>
                    </div>

                    {/* Customer Count */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-[#252828]">Total Customers</h3>
                        <p className="text-4xl font-bold text-[#40b6f0]">150</p>
                    </div>

                    {/* Booking Count */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-[#252828]">Total Bookings</h3>
                        <p className="text-4xl font-bold text-[#40b6f0]">200</p>
                    </div>
                </div>

                {/* Graph Section */}

            </div>
        </div>
    );
}
