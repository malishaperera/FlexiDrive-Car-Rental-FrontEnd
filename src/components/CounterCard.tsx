import {useState,useEffect} from "react";
import { BsPerson } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";

const CounterCard = () => {
  // State for the counters
  const [activeMembers, setActiveMembers] = useState(0);
  const [carModels, setCarModels] = useState(0);
  const [positiveRatings, setPositiveRatings] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (activeMembers < 2000) {
        setActiveMembers((prev) => prev + 1);
      }
    }, 1);

    const interval2 = setInterval(() => {
      if (carModels < 1000) {
        setCarModels((prev) => prev + 1);
      }
    }, 1);

    const interval3 = setInterval(() => {
      if (positiveRatings < 1500) {
        setPositiveRatings((prev) => prev + 1);
      }
    }, 1);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [activeMembers, carModels, positiveRatings]);

  return (
    <section className="bg-[#f2fafe] py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#252828]">Our Achievement</h2>
        <p className="text-xl text-[#252828] mt-4">Our Journey Of Success IS A Testament TO The Collective Efforts And Determination Of Our Team</p>
      </div>
      <div className="flex justify-center items-center left-30 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <div className="flex justify-center items-center mb-4">
              <BsPerson className="text-4xl text-[#40b6f0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#252828]">
              {activeMembers}+
            </h3>
            <p className="text-gray-600">Active Members</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <div className="flex justify-center items-center mb-4">
              <AiFillStar className="text-4xl text-[#40b6f0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#252828]">
              {carModels}+
            </h3>
            <p className="text-gray-600">Car Models</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <div className="flex justify-center items-center mb-4">
              <FaGasPump className="text-4xl text-[#40b6f0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#252828]">
              {positiveRatings}
            </h3>
            <p className="text-gray-600">Positive Ratings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterCard;
