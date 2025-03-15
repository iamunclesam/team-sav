import React, { useEffect, useState } from "react";
import { Mail, Lock, UserCircle } from "lucide-react";
import googleLogo from "../../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state for transfers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Handle login logic here (API call, Firebase Auth, etc.)
    setIsLoading(true);
    try {
      const response = await axios.post('https://t-savvy-1.onrender.com/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      toast.success("Login successful")
      navigate('/home')
    } catch (error) {
      console.error("Error logging in");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-fit bg-[#023047] max-w-[460px]  flex flex-col justify-between rounded-tl-[60px] px-6">
      <div className=" pt-5">
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-50 pb-3 p-6">Login</p>
        </div>

        <div className="w-full max-w-md p-4 rounded-t-xl shadow-md">
          <form onSubmit={handleSubmit} className="">
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
              className={`w-full bg-[#fb8500] text-white py-3 rounded-2xl rounded-tr-none transition mt-6 
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>

      <p className="mx-auto text-sm text-gray-50 mb-2">Dont't have an account? <Link to="signup" className="hover:underline">Sign Up</Link></p>
    </div>
  );
};

export default Login;
