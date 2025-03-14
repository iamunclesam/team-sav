import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { TestTubeIcon } from "lucide-react";


const Welcome = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
      "https://img.freepik.com/premium-photo/credit-card-smartphone-business-black-woman-with-fintech-online-easy-payment-loan-application-digital-banking-ecommerce-online-shopping-website-corporate-worker-check-credit-score_590464-88801.jpg?ga=GA1.1.384133121.1729851340&semt=ais_authors_boost",
      "https://img.freepik.com/free-vector/fintech-word-concept_23-2147839481.jpg?ga=GA1.1.384133121.1729851340&semt=ais_authors_boost",
      "https://img.freepik.com/premium-psd/cyber-security-online-financial-manage-safety-check-mark_469703-328.jpg?ga=GA1.1.384133121.1729851340&semt=ais_authors_boost",
      "https://img.freepik.com/free-photo/payment-solutions-financial-technology-with-businessman-using-tablet-background_53876-104203.jpg?ga=GA1.1.384133121.1729851340&semt=ais_authors_boost",
      "https://img.freepik.com/premium-vector/3d-money-protection-shield-with-purse-isolated-blue-background-money-protection-concept-cash-secure-investment-online-payment-protection-money-security-financial-saving-insurance_221648-1259.jpg?w=826",
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
    <div className="min-h-screen bg-[#023047] flex flex-col justify-between">
     <div className="text-center font-semibold text-xl text-white py-5 flex justify-center items-center gap-2">
      <TestTubeIcon color="#fb8500" />
        <p>
          Split<span className="text-[#fb8500]">Wise</span>
        </p>
      </div>
      <div className="mx-3">
      <div id="controls-carousel" className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative h-80 overflow-hidden rounded-xl ">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 h-80 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={src} className="block w-full h-full" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
      </div>
      <div className="text-center pt-3">
        <p className="text-3xl font-semibold">Get a fintech app that auto budgets.</p>
        <p className="pt-3">Dive into a new world and let's get started.</p>
      </div>
      <div className="  px-4 py-5">
        <div className="flex justify-center gap-3 items-center w-full">
          <button className="bg-[#fb8500] text-white w-full py-3 rounded-full">
           <Link to = '/login'>Login</Link>
          </button>
          <button className=" text-[#fb8500] bg-gray-900 w-full py-3 rounded-full">
            <Link to='/signup'> Sign Up</Link>
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
