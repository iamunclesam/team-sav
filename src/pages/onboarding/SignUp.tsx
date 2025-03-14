import React, { useEffect, useState } from "react";
import { TestTubeIcon } from "lucide-react";
import gif from "../../assets/img/gif.png";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  UserCircle,
  UserRound,
  Landmark,
  MapPinIcon,
  Calendar,
  Phone,
} from "lucide-react";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    bvn: "",
    dob: "",
    address: "",
    gender: "",
    beneficiary: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // Check if all required fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill in all fields before proceeding.");
      return; // Prevent step increment if validation fails
    }

    // Proceed to the next step if validation passes
    setStep((prevStep) => prevStep + 1);
  };

  const handleNextStep = () => {
    // Check if all required fields are filled
    if (
      !formData.phoneNumber ||
      !formData.bvn ||
      !formData.dob ||
      !formData.address
    ) {
      alert("Please fill in all fields before proceeding.");
      return; // Prevent step increment if validation fails
    }

    // Proceed to the next step if validation passes
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Handle login logic here (API call, Firebase Auth, etc.)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      bvn: "",
      dob: "",
      address: "",
      gender: "",
      beneficiary: "",
    });
  };

  return (
    <div className="min-h-screen  bg-[#023047] max-w-[460px]  flex flex-col justify-between  ">
      <div
        className={`h-1 bg-[#fb8500] fixed top-0 left-0 w-0  transition-all duration-500 delay-200   ${
          step === 1 ? "w-1/4" : step === 2 ? "w-3/4" : "w-4/4"
        }`}
      ></div>
      <div className="text-center font-semibold text-xl text-white py-5 flex justify-center items-center gap-2">
        <TestTubeIcon color="#fb8500" />
        <p>
          Split<span className="text-[#fb8500]">Wise</span>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start position (invisible, 50px below)
        animate={{ opacity: 1, y: 0 }} // End position (fully visible, normal position)
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      >
        <p className="text-xl font-semibold pb-3 text-center">Register Now</p>
        <div className="w-full max-w-md bg-cyan-900 p-3 rounded-t-xl shadow-md py-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            {step === 1 ? (
              <div className="space-y-3">
                {/* First Name Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <UserRound className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <UserRound className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <Mail className="text-gray-500 ml-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <Lock className="text-gray-500 ml-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-full transition"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            ) : step === 2 ? (
              <div className="space-y-3">
                {/* Phone Number Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <Phone className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* BVN Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <Landmark className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="bvn"
                    placeholder="Enter your bvn"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.bvn}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DOB Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <Calendar className="text-gray-500 ml-2" />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Enter your DOB"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <MapPinIcon className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-full transition"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            ) : step === 3 ? (
              <div className="space-y-3">
                {/* Gender field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <UserRound className="text-gray-500 ml-2" />
                  <select
                    name="gender"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Beneficiary Field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <MapPinIcon className="text-gray-500 ml-2" />
                  <input
                    type="text"
                    name="beneficiary"
                    placeholder="Enter your beneficiary account (GTB)"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-full transition"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>{/* Other content for different steps */}</div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
