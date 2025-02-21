import {BsPerson} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {FaGasPump} from "react-icons/fa";
import {IoMdCalendar} from "react-icons/io";
import CounterCard from "./CounterCard.tsx";
import CustomerReviews from "./CustomerReviews.tsx";

export function AboutUs() {
    return (
        <>
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
        </>
    )
}