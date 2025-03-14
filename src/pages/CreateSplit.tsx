import React, { useState } from 'react';
import { DollarSign, Users, Lock, Globe, Save, Hand, Eye, EyeOff } from 'lucide-react';

const CreateSplit = () => {
  const [splitType, setSplitType] = useState('PRIVATE');
  const [showBalance, setShowBalance] = useState(true);
  const [showContributors, setShowContributors] = useState(true);

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <h1 className="text-xl text-gray-50 font-medium mb-8 text-center">Create New Split</h1>

      <form className="space-y-8">
        {/* Split Name */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-2">Split Name</label>
          <input
            type="text"
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Rent, Utilities"
            required
          />
        </div>

        {/* Target Amount - Only for PUBLIC split type */}
        {splitType === 'PUBLIC' && (
          <div>
            <label className="block text-sm font-medium text-gray-50 mb-2">Target Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="number"
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        )}

        {/* Split Type */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-2">Split Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSplitType('PRIVATE')}
              className={`p-4 rounded-lg border flex flex-col items-center transition-all ${splitType === 'PRIVATE' ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                }`}
            >
              <Lock size={24} className={splitType === 'PRIVATE' ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${splitType === 'PRIVATE' ? 'text-blue-500' : 'text-gray-500'}`}>Private</span>
            </button>
            <button
              type="button"
              onClick={() => setSplitType('PUBLIC')}
              className={`p-4 rounded-lg border flex flex-col items-center transition-all ${splitType === 'PUBLIC' ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                }`}
            >
              <Globe size={24} className={splitType === 'PUBLIC' ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${splitType === 'PUBLIC' ? 'text-blue-500' : 'text-gray-500'}`}>Public</span>
            </button>
            <button
              type="button"
              onClick={() => setSplitType('SAVINGS')}
              className={`p-4 rounded-lg border flex flex-col items-center transition-all ${splitType === 'SAVINGS' ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                }`}
            >
              <Save size={24} className={splitType === 'SAVINGS' ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${splitType === 'SAVINGS' ? 'text-blue-500' : 'text-gray-500'}`}>Savings</span>
            </button>
            <button
              type="button"
              onClick={() => setSplitType('LENDING')}
              className={`p-4 rounded-lg border flex flex-col items-center transition-all ${splitType === 'LENDING' ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                }`}
            >
              <Hand size={24} className={splitType === 'LENDING' ? 'text-blue-500' : 'text-gray-500'} />
              <span className={`mt-2 font-medium ${splitType === 'LENDING' ? 'text-blue-500' : 'text-gray-500'}`}>Lending</span>
            </button>
          </div>
        </div>

        {/* Show Balance - Only for PUBLIC split type */}

        <div className="grid grid-cols-2 w-full gap-4">
          {splitType === 'PUBLIC' && (
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-50 mb-2">Show Balance</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBalance(!showBalance)}
                  className={`w-full p-4 rounded-lg border flex items-center justify-center transition-all ${showBalance ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                    }`}
                >
                  {showBalance ? <Eye size={24} className="text-blue-500" /> : <EyeOff size={24} className="text-gray-500" />}
                  <span className={`ml-2 font-medium ${showBalance ? 'text-blue-500' : 'text-gray-500'}`}>
                    {showBalance ? 'Visible' : 'Hidden'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {splitType === 'PUBLIC' && (
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-50 mb-2">Show Contributors</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowContributors(!showContributors)}
                  className={`w-full p-4 rounded-lg border flex items-center justify-center transition-all ${showContributors ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                    }`}
                >
                  <Users size={24} className={showContributors ? 'text-blue-500' : 'text-gray-500'} />
                  <span className={`ml-2 font-medium ${showContributors ? 'text-blue-500' : 'text-gray-500'}`}>
                    {showContributors ? 'Visible' : 'Hidden'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Contributors Section - Only for PUBLIC split type */}
        {splitType === 'PUBLIC' && (
          <div className='w-full'>
            <label className="block text-sm font-medium text-gray-50 mb-2">Contributors</label>
            <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
              <Users size={20} className="text-gray-500" />
              <span className="text-gray-400">Anyone can contribute to this split</span>
            </div>
          </div>
        )}

        {/* Create Split Button */}
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