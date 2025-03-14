import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, PieChart, UserCircle } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-2 left-2 right-2 max-w-sm  bg-white rounded-xl shadow-lg border border-gray-100 z-50">
      <div className="flex justify-between items-center ">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-100 scale-100' : 'bg-transparent scale-0 group-hover:scale-90 group-hover:bg-blue-50'}`}></div>
              <Home size={24} className="relative z-10 transition-transform duration-300 hover:scale-110" />
              <span className="text-xs mt-1 font-medium relative z-10">Home</span>
              <span className={`absolute bottom-0 w-8 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600 scale-100' : 'bg-transparent scale-0'}`}></span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/create" 
          className={({ isActive }) => 
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive ? 'bg-green-100 scale-100' : 'bg-transparent scale-0 group-hover:scale-90 group-hover:bg-green-50'}`}></div>
              <PlusCircle size={24} className="relative z-10 transition-transform duration-300 hover:scale-110" />
              <span className="text-xs mt-1 font-medium relative z-10">Create</span>
              <span className={`absolute bottom-0 w-8 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-green-600 scale-100' : 'bg-transparent scale-0'}`}></span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/insights" 
          className={({ isActive }) => 
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive ? 'bg-purple-100 scale-100' : 'bg-transparent scale-0 group-hover:scale-90 group-hover:bg-purple-50'}`}></div>
              <PieChart size={24} className="relative z-10 transition-transform duration-300 hover:scale-110" />
              <span className="text-xs mt-1 font-medium relative z-10">Insights</span>
              <span className={`absolute bottom-0 w-8 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-purple-600 scale-100' : 'bg-transparent scale-0'}`}></span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-orange-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive ? 'bg-orange-100 scale-100' : 'bg-transparent scale-0 group-hover:scale-90 group-hover:bg-orange-50'}`}></div>
              <UserCircle size={24} className="relative z-10 transition-transform duration-300 hover:scale-110" />
              <span className="text-xs mt-1 font-medium relative z-10">Profile</span>
              <span className={`absolute bottom-0 w-8 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-orange-600 scale-100' : 'bg-transparent scale-0'}`}></span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;