import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BsPerson } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import CounterCard from "./CounterCard.tsx";
import CustomerReviews from "./CustomerReviews.tsx";
import Footer from "./Footer .tsx";


export function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <div className="bg-[#f2fafe]h-[90px] min-h-screen w-screen ">
            {/* Header */}
            <header className="flex top-0 left-0 w-full  justify-between items-center px-10 py-5 bg-blue-950 shadow-md transition-colors fixed z-50">
                <h1 className="text-2xl font-bold text-[#252828]">YOUR CHARIOT</h1>
                <nav className="flex space-x-6 text-white">
                    <a href="#" className="hover:text-[#40b6f0]">Home</a>
                    <a href="#" className="hover:text-[#40b6f0]">Rent Car</a>
                    <a href="#" className="hover:text-[#40b6f0]">Business Consulting</a>
                    <a href="#" className="hover:text-[#40b6f0]">About Us</a>
                    <a href="#" className="hover:text-[#40b6f0]">Blog</a>
                </nav>
                <div className="space-x-4">
                    <button className="border border-[#40b6f0] text-[#40b6f0] px-4 py-2 rounded-md hover:bg-[#40b6f0] hover:text-white">Log in</button>
                    <button className="bg-[#40b6f0] text-white px-4 py-2 rounded-md hover:bg-[#3598d7]">Sign Up</button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-[url('car3.jpg')] bg-cover bg-center bg-no-repeat mb-30 min-h-[80vh] flex flex-col items-center justify-center text-center relative pt-32">
                <section className="bg-opacity-50 w-full flex flex-col items-center text-center py-20 px-5 mb-[90px]">
                    <h2 className="text-5xl font-bold text-white">
                        Easy And Fast Way To <span className="text-[#40b6f0]">Rent</span> Your Car
                    </h2>
                    <p className="text-gray-200 mt-4 max-w-2xl">
                        We offer a wide range of rental cars to suit your needs. Whether you're planning a weekend getaway or a business trip.
                    </p>
                    <button className="mt-6 bg-[#40b6f0] text-white px-6 py-3 rounded-md hover:bg-[#3598d7]">Rent Car</button>
                </section>

                {/* Search Box */}
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
            </div>

            {/*Latest*/}
            {/*Inventory*/}
            {/*Experience The Future Of Automotive Innovation With Our Latest Car Models*/}
            {/* Latest Inventory */}
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
                        { name: "BMW M5", image: "bmw.jpg", price: "$150/day" },
                        { name: "Audi R8", image: "audi.jpg", price: "$180/day" },
                        { name: "Mercedes-Benz G63", image: "g63.jpg", price: "$200/day" },
                        { name: "Lamborghini Huracan", image: "lambo.jpg", price: "$250/day" },
                        { name: "Porsche 911", image: "porsche.jpg", price: "$220/day" },
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
                            <button className="mt-4 bg-[#40b6f0] text-white px-6 py-2 rounded-md hover:bg-[#3598d7]">
                                Rent Now
                            </button>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button className="bg-[#40b6f0] text-white px-12 py-2 rounded-md hover:bg-[#3598d7]">
                        See All
                    </button>
                </div>
            </section>


            <section className="bg-white py-20 px-5 md:px-16 mt-0">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#252828] mb-4">Why Choose Us</h2>
                    <p className="text-xl text-[#252828]">
                        We stand as your trusted partner. Our dedication to quality, innovation, and customer satisfaction sets us apart.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <div className="text-4xl text-[#40b6f0] mb-4">
                            <BsPerson />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#252828] mb-2">24 Hour Support</h3>
                        <p className="text-gray-600">We are always here for you. Anytime, anywhere. Your satisfaction is our priority.</p>
                    </div>

                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <div className="text-4xl text-[#40b6f0] mb-4">
                            <AiFillStar />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#252828] mb-2">Verified License</h3>
                        <p className="text-gray-600">Your safety is our concern. We are a licensed and verified provider for peace of mind.</p>
                    </div>

                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <div className="text-4xl text-[#40b6f0] mb-4">
                            <FaGasPump />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#252828] mb-2">Best Price</h3>
                        <p className="text-gray-600">We offer the best value for top-tier services. Quality and affordability go hand-in-hand.</p>
                    </div>

                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <div className="text-4xl text-[#40b6f0] mb-4">
                            <IoMdCalendar />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#252828] mb-2">Free Cancellation</h3>
                        <p className="text-gray-600">Plans change, and we understand. Our free cancellation policy ensures flexibility for you.</p>
                    </div>
                </div>
            </section>

            <CounterCard/>
            <CustomerReviews/>



             {/*About Us Section*/}
            {/*<section className="bg-[#e0f7ff] py-20 px-5 text-center mt-20">*/}
            {/*    <h2 className="text-4xl font-bold text-[#252828]">About Us</h2>*/}
            {/*    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">*/}
            {/*        Your Chariot is a premium car rental service providing top-quality vehicles for all your travel needs. Our mission is to make car rental simple, fast, and accessible for everyone. Whether you're on a business trip, a family vacation, or just need a reliable ride, we have the perfect vehicle for you.*/}
            {/*    </p>*/}
            {/*</section>*/}

            <Footer/>
        </div>
    );
}
