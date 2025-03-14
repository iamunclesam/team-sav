import React from 'react';
import { PieChart, BarChart, ArrowUp, ArrowDown } from 'lucide-react';

const Insights = () => {
  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-medium mb-6 text-gray-50">Insights</h1>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart size={20} className="text-blue-600 mr-2" />
            Split Distribution
          </h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Rent</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Utilities</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Savings</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          <p className='py-[2px] px-2 mx-auto mt-4 bg-blue-500/20 text-[9px] rounded-full w-fit text-blue-500 hover:bg-blue-500/50 '>See more</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart size={20} className="text-blue-600 mr-2" />
            Actions this month
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-lg font-semibold text-green-600">$1,250.00</p>
              </div>
              <ArrowUp className="text-green-600" size={24} />
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Spending</p>
                <p className="text-lg font-semibold text-red-600">$3,750.00</p>
              </div>
              <ArrowDown className="text-red-600" size={24} />
            </div>
          </div>
          <p className='py-[2px] px-2 mx-auto mt-4 bg-blue-500/20 text-[9px] rounded-full w-fit text-blue-500 hover:bg-blue-500/50 '>See more</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Split Goals</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Emergency Fund</span>
                <span className="text-blue-600">80%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Vacation Fund</span>
                <span className="text-blue-600">45%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          <p className='py-[2px] px-2 mx-auto mt-4 bg-blue-500/20 text-[9px] rounded-full w-fit text-blue-500 hover:bg-blue-500/50 '>See more</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;