import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TestTubeIcon } from "lucide-react";


const Welcome = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1635766854982-fc151c6e9278?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBidXNpbmVzcyUyMGVudGVycHJlbmV1cnxlbnwwfHwwfHx8MA%3D%3D",


    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFwcHklMjBidXNpbmVzcyUyMHN0b3JlJTIwb3duZXJ8ZW58MHx8MHx8fDA%3D",


    "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFwcHklMjBidXNpbmVzcyUyMHN0b3JlJTIwb3duZXJ8ZW58MHx8MHx8fDA%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Auto-slide every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="h-fit bg-[#023047] max-w-[460px]  flex flex-col justify-between rounded-tl-[60px] px-6 py-12">
      <div className="mx-3">
        <div id="controls-carousel" className="relative w-full">
          {/* Carousel Wrapper */}
          <div className="relative h-80 overflow-hidden rounded-xl ">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 h-80 ${index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={src}
                  className="block w-full object-cover h-full"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
      <div className="text-center pt-3">
        <p className="text-2xl font-semibold text-gray-50">
          The future of smart budgeting and social finance{" "}
        </p>
        <p className="pt-3 text-gray-50 text-sm">
          Dive into a new world and let's get started.
        </p>
      </div>
      <div className="  px-4 mt-5">
        <div className="flex justify-center gap-3 items-center w-full">
          <button className="bg-[#fb8500] text-white w-full py-3 rounded-full">
            <Link to="login">Login</Link>
          </button>
          <button className=" text-[#fb8500] bg-gray-900 w-full py-3 rounded-full">
            <Link to="signup"> Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
