import React from "react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, PieChart, UserCircle, Split } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-2 p-1 left-1 right-1 max-w-[420px] mx-auto bg-white/60 rounded-xl shadow-lg z-50 backdrop-blur-lg">
      <div className="flex justify-between items-center ">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
              isActive ? "text-blue-600" : "text-black hover:text-blue-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "scale-100 bg-blue-200"
                    : "bg-transparent scale-0 group-hover:scale-90 group-hover:bg-blue-50"
                }`}
              ></div>
              <Home
                size={24}
                className="relative z-10 transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xs mt-1 font-medium relative z-10">
                Home
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/home/splits"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
              isActive ? "text-green-600" : "text-black hover:text-green-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-green-100 scale-100"
                    : "bg-transparent scale-0 group-hover:scale-90 group-hover:bg-green-50"
                }`}
              ></div>
              <Split
                size={24}
                className="relative z-10 transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xs mt-1 font-medium relative z-10">
                Splits
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="insights"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
              isActive ? "text-purple-600" : "text-black hover:text-purple-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-purple-100 scale-100"
                    : "bg-transparent scale-0 group-hover:scale-90 group-hover:bg-purple-50"
                }`}
              ></div>
              <PieChart
                size={24}
                className="relative z-10 transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xs mt-1 font-medium relative z-10">
                Insights
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
              isActive ? "text-orange-600" : "text-black hover:text-orange-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-orange-100 scale-100"
                    : "bg-transparent scale-0 group-hover:scale-90 group-hover:bg-orange-50"
                }`}
              ></div>
              <UserCircle
                size={24}
                className="relative z-10 transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xs mt-1 font-medium relative z-10">
                Profile
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
