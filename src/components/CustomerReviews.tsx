// import React, { useState } from 'react';

import {useState} from "react";

const CustomerReviews = () => {
    const reviews = [
        {
            name: 'John Doe',
            comment: 'This service is fantastic! They helped me find the perfect car, and the customer support was excellent.',
            rating: 5,
        },
        {
            name: 'Jane Smith',
            comment: 'I had a great experience. Easy booking process and the car was in top condition. Highly recommend!',
            rating: 4,
        },
        {
            name: 'Samuel Lee',
            comment: 'Fast service and great prices! Will definitely use them again for my next trip.',
            rating: 5,
        },
        {
            name: 'Emma Johnson',
            comment: 'Excellent customer service. They went above and beyond to ensure I was satisfied with my rental.',
            rating: 5,
        },
        {
            name: 'Michael Brown',
            comment: 'Great cars and a smooth process from start to finish. Very satisfied!',
            rating: 4,
        },
    ];

    // State to track the current set of reviews shown
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to move to the next set of reviews
    const handleNext = () => {
        if (currentIndex + 3 < reviews.length) {
            setCurrentIndex(currentIndex + 3);
        }
    };

    // Function to move to the previous set of reviews
    const handlePrev = () => {
        if (currentIndex - 3 >= 0) {
            setCurrentIndex(currentIndex - 3);
        }
    };

    return (
        <section className="bg-white py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#252828]">What Our Customers Have To Say</h2>
                <p className="text-xl text-[#252828] mt-4">We Are A World-Wide Corporate Brand</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
                    <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#40b6f0] text-white flex justify-center items-center">
                                <span className="text-xl">{review.name.charAt(0)}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-[#252828]">{review.name}</h3>
                        <p className="text-gray-600 mt-4">{review.comment}</p>
                        <div className="mt-4">
                            {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400">★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-[#40b6f0] text-white rounded-md mx-2"
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <div className="flex items-center space-x-2">
                    {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * 3)}
                            className={`w-3 h-3 rounded-full ${currentIndex === index * 3 ? 'bg-[#40b6f0]' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-[#40b6f0] text-white rounded-md mx-2"
                    disabled={currentIndex + 3 >= reviews.length}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default CustomerReviews;
