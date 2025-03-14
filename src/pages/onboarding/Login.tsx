import React, { useEffect, useState } from "react";
import { Mail, Lock, UserCircle } from "lucide-react";
// import googleLogo from "../../assets/img/googleLogo.png";
import { TestTubeIcon} from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Handle login logic here (API call, Firebase Auth, etc.)
  };


  return (
    <div className="min-h-screen  bg-[#023047] max-w-[460px]  flex flex-col justify-between " >
      <div className="text-center font-semibold text-xl text-white py-5 flex justify-center items-center gap-2">
      <TestTubeIcon color="#fb8500" />
        <p>
          Split<span className="text-[#fb8500]">Wise</span>
        </p>
      </div>
      
      <div className=" pt-5" >
        <div className="text-center">
          <p className="text-xl font-semibold pb-3">Log in to your account</p>
        </div>

        <div className="w-full max-w-md bg-cyan-900 p-4 rounded-t-xl shadow-md">
          <p className=" text-white">Login with</p>

          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 mt-2 text-white cursor-pointer">
              {/* <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" /> */}
              Google
            </button>
            
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-white text-sm">or login in with</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#fb8500] text-white py-3 rounded-full  transition"
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
