import React from 'react';
import { Wallet, Share2, TrendingUp, Bell } from 'lucide-react';
import SplitCard from '../components/SplitCard.js'
import QuickAccess from '../components/QuickAccess.js';

const Home = () => {
  // const splits = [
  //   { id: 1, name: 'Rent', amount: 1200, allocated: 800, type: 'private', color: 'blue' },
  //   { id: 2, name: 'Utilities', amount: 300, allocated: 150, type: 'private', color: 'green' },
  //   { id: 3, name: 'Community Fund', amount: 5000, allocated: 3500, type: 'public', color: 'purple' },
  //   { id: 4, name: 'Emergency Savings', amount: 2000, allocated: 1200, type: 'private', color: 'orange' }
  // ];
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img src="https://placehold.co/600x400" className='w-10 h-10 rounded-full object-cover' alt="" />
          <h1 className="text-lg text-gray-50  font-medium">Hello, John</h1>
        </div>
        <div className="text-gray-100">
          <Bell size={24} />
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-6 rounded-2xl mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute -inset-1 bg-gradient-to-t from-white/[0.05] to-transparent"></div>
        <div className="relative">
          <p className="text-sm opacity-80">Total Balance</p>
          <h2 className="text-3xl font-bold mb-4">$2,450.00</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Monthly Income</p>
              <p className="font-semibold">$5,000.00</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Allocated</p>
              <p className="font-semibold">$2,550.00</p>
            </div>
          </div>
        </div>
      </div>

      <QuickAccess />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-50 font-semibold">Recent Splits</h2>
          <button className="text-blue-600 text-sm">See All</button>
        </div>
        <SplitCard />
      </div>

      <div>
        <h2 className="text-md text-gray-50  font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-4 rounded-xl">
            <TrendingUp className="text-green-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Savings Rate</p>
            <p className="text-lg font-semibold">24%</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <Share2 className="text-blue-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Active Splits</p>
            <p className="text-lg font-semibold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;