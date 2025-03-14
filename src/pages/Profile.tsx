import React from 'react';
import { Settings, Bell, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">JD</span>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm">
          <button className="w-full flex items-center p-4 hover:bg-gray-50">
            <Settings className="text-gray-600" size={20} />
            <span className="ml-3 text-gray-800">Account Settings</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 border-t">
            <Bell className="text-gray-600" size={20} />
            <span className="ml-3 text-gray-800">Notifications</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 border-t">
            <Shield className="text-gray-600" size={20} />
            <span className="ml-3 text-gray-800">Privacy & Security</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <button className="w-full flex items-center p-4 hover:bg-gray-50">
            <CreditCard className="text-gray-600" size={20} />
            <span className="ml-3 text-gray-800">Payment Methods</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 border-t">
            <HelpCircle className="text-gray-600" size={20} />
            <span className="ml-3 text-gray-800">Help & Support</span>
          </button>
        </div>

        <button className="w-full flex items-center p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-red-600">
          <LogOut size={20} />
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;