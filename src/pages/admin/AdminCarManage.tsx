import AddButton from "../../components/button/AddButton.tsx";

export function AdminCarManage() {

    const handleAddCar = () => {
        console.log("Add Car button clicked");
    };

    return (
        <>

            <div className="flex flex-col items-center justify-center w-full">

                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Car Management
                </h1>
                <AddButton text="Add Customer" onClick={handleAddCar} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-[500px] overflow-y-auto bg-white p-4 rounded-lg shadow-md mt-6">
                {/* Card 1 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                {/* Card 4 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                {/* Card 5 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                {/* Card 6 */}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        <p>Content goes here...</p>
                        {/* More content */}
                    </div>
                </div>
            </div>

        </>




);
}
