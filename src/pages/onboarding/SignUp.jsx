import React, { useEffect, useState } from "react";
import { TestTubeIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  UserRound,
  Landmark,
  MapPinIcon,
  Calendar,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
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
    <div className="h-fit bg-[#023047] max-w-[460px]  flex flex-col justify-between rounded-tl-[60px] px-6 ">
      <div
        className={`h-1 bg-[#fb8500] fixed top-0 left-0 w-0  transition-all duration-500 delay-200   ${
          step === 1 ? "w-1/4" : step === 2 ? "w-3/4" : "w-4/4"
        }`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start position (invisible, 50px below)
        animate={{ opacity: 1, y: 0 }} // End position (fully visible, normal position)
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      >
        <p className="text-3xl font-semibold text-gray-50 pb-3 p-6 text-center">
          Sign Up
        </p>
        <div className="w-full max-w-md p-3 rounded-t-xl shadow-md py-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            {step === 1 ? (
              <div className="space-y-3">
                {/* First Name Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="firstname" className="font-semibold">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="lastname" className="font-semibold">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="password" className="font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-2xl rounded-tr-none transition mt-6"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            ) : step === 2 ? (
              <div className="space-y-3">
                {/* Phone Number Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="phoneNumber" className="font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* BVN Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="bvn" className="font-semibold">
                    BVN
                  </label>
                  <input
                    type="text"
                    name="bvn"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.bvn}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DOB Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="dob" className="font-semibold">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="address" className="font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-2xl rounded-tr-none  transition mt-6"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            ) : step === 3 ? (
              <div className="space-y-3">
                {/* Gender field */}
                <div className="flex items-center p-2 bg-gray-200 rounded-lg">
                  <select
                    name="gender"
                    className="w-full p-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black font-semibold"
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
                <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md mb-4">
                  <label htmlFor="beneficiary" className="font-semibold">
                    Beneficiary Account (GTB)
                  </label>
                  <input
                    type="text"
                    name="beneficiary"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-black"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="w-full bg-[#fb8500] text-white py-3 rounded-2xl rounded-tr-none transition mt-6"
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

      <p className="mx-auto text-sm text-gray-50 mb-2">Already have an account? <Link to="login"    className="hover:underline">Log In</Link></p>
    </div>
  );
};

export default SignUp;
