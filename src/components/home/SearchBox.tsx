
export function SearchBox(){
    return (
        <section className="bg-white shadow-md p-6 rounded-lg max-w-6xl mx-auto mt-10 absolute bottom-[-90px] grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
                <label className="block text-gray-700">Pick up Location</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Gulsan, Avenu" />

            </div>
            <div>
                <label className="block text-gray-700">Return Location</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Gulsan, Avenu" />
            </div>
            <div>
                <label className="block text-gray-700">Pick up Date</label>
                <input type="date" className="w-full p-2 border rounded-md" />
                <label className="block text-gray-700">Pick up Time</label>
                <input type="time" className="w-full p-2 border rounded-md" placeholder="Gulsan, Avenu" />
            </div>
            <div>
                <label className="block text-gray-700">Return Date</label>
                <input type="date" className="w-full p-2 border rounded-md" />
                <label className="block text-gray-700">Return Time</label>
                <input type="time" className="w-full p-2 border rounded-md" placeholder="Gulsan, Avenu" />
            </div>
            <button className="col-span-2 md:col-span-4 bg-[#40b6f0] text-white py-2 rounded-md hover:bg-[#3598d7]">
                Search Car
            </button>
        </section>
    )
}