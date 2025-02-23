import {SearchBox} from "./SearchBox.tsx";
import { useNavigate } from "react-router-dom";

export function Hero(){
    const navigate = useNavigate();
    return (
        <div className="bg-[url('car3.jpg')] bg-cover bg-center bg-no-repeat mb-30 min-h-[70vh] flex flex-col items-center justify-center text-center relative pt-28">
            <section className="bg-opacity-50 w-full flex flex-col items-center text-center py-20 px-5 mb-[80px]">
                <h2 className="text-5xl font-bold text-white">
                    Easy And Fast Way To <span className="text-[#40b6f0]">Rent</span> Your Car
                </h2>
                <p className="text-gray-200 mt-4 max-w-2xl">
                    We offer a wide range of rental cars to suit your needs. Whether you're planning a weekend getaway or a business trip.
                </p>
                <button className="mt-6 bg-[#40b6f0] text-white px-6 py-3 rounded-md hover:bg-[#3598d7]" onClick={() => navigate("/car")}>Book Now</button>
            </section>

            {/* Search Box */}
            <SearchBox/>
        </div>
    )
}