import {motion} from "framer-motion";

export function LatestCar(){
    return (
        <section className="py-20 px-5 bg-[#f2fafe] mt-20">
            <div className="text-center mb-10">
                <h2 className="text-6xl font-bold mb-4">
                    <span className="text-black py-1 px-2">Latest</span>
                    <span className="text-[#3598d7] py-1 px-2">Inventory</span>
                </h2>
                <h2 className="text-1xl font-bold text-[#252828]">
                    Experience The Future Of Automotive Innovation
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    { name: "Tesla Model S", image: "car2.jpg", price: "$120/day" },
                    { name: "BMW M5", image: "car3.jpg", price: "$150/day" },
                    { name: "Audi R8", image: "car.webp", price: "$180/day" },
                    { name: "Mercedes-Benz G63", image: "car.jpg", price: "$200/day" },
                    { name: "Lamborghini Huracan", image: "car3.jpg", price: "$250/day" },
                    { name: "Porsche 911", image: "car2.jpg", price: "$220/day" },
                ].map((car, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-5 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ amount: 0.3 }}
                    >
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-bold text-[#252828]">{car.name}</h3>
                        <p className="text-gray-600">{car.price}</p>
                        {/*<button className="mt-4 bg-[#40b6f0] text-white px-6 py-2 rounded-md hover:bg-[#3598d7]">*/}
                        {/*    Rent Now*/}
                        {/*</button>*/}
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <button className="bg-[#40b6f0] text-white px-12 py-2 rounded-md hover:bg-[#3598d7]">
                    See All
                </button>
            </div>
        </section>
    )
}