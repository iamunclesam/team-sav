import React, { useEffect, useState } from "react";
import { Mail, Lock, UserCircle } from "lucide-react";
import googleLogo from "../../assets/google.svg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Handle login logic here (API call, Firebase Auth, etc.)
  };

  return (
    <div className="h-fit  bg-[#023047] max-w-[460px]  flex flex-col justify-between rounded-tl-[60px] px-6">
      <div className=" pt-5">
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-50 pb-3 p-6">Login</p>
        </div>

        <div className="w-full max-w-md p-4 rounded-t-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md">
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
            <div className="flex p-2 px-4 bg-gray-200 rounded-lg flex-col shadow-md">
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

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-white text-sm">or login in with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 mt-4 text-white cursor-pointer text-sm hover:scale-105 transition-transform"
              type="button"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#fb8500] text-white py-3 rounded-2xl rounded-tr-none  transition font-sans"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
