import React, { useState } from 'react';
import { DollarSign, Users, Lock, Globe } from 'lucide-react';

const CreateSplit = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Create New Split</h1>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Split Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Rent, Utilities"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="number"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Split Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={`p-4 rounded-lg border flex flex-col items-center ${
                !isPublic ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Lock size={24} className={!isPublic ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${!isPublic ? 'text-blue-500' : 'text-gray-500'}`}>Private</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={`p-4 rounded-lg border flex flex-col items-center ${
                isPublic ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Globe size={24} className={isPublic ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${isPublic ? 'text-blue-500' : 'text-gray-500'}`}>Public</span>
            </button>
          </div>
        </div>

        {isPublic && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contributors</label>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Users size={20} className="text-gray-500" />
              <span className="text-gray-600">Anyone can contribute to this split</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Create Split
        </button>
      </form>
    </div>
  );
};

export default CreateSplit;