import React, { useState } from 'react';
import { DollarSign, Users, Lock, Globe, Save, Hand, Eye, EyeOff, ChevronDown, UserRound, PiggyBank, UsersRound, HandCoins, Coins } from 'lucide-react';

const CreateSplit = () => {
  const [splitType, setSplitType] = useState('PRIVATE');
  const [showBalance, setShowBalance] = useState(true);
  const [showContributors, setShowContributors] = useState(true);
  const [splitName, setSplitName] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [allowInstallment, setAllowInstallment] = useState(false);
  const [latePaymentFee, setLatePaymentFee] = useState(0);
  const [selectedRange, setSelectedRange] = useState('7-60'); // Default range
  const [selectedDuration, setSelectedDuration] = useState(7);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const splitData = {
      name: splitName,
      type: splitType,
      showBalance,
      showContributors,
      targetAmount: splitType === 'PUBLIC' ? targetAmount : undefined,
      interest: splitType === 'LENDING' ? interest : undefined,
      duration: splitType === 'LENDING' ? duration : undefined,
      allowInstallment: splitType === 'LENDING' ? allowInstallment : undefined,
      latePaymentFee: splitType === 'LENDING' ? latePaymentFee : undefined,
    };
    console.log('Split Data:', splitData);
    // Submit the data to your backend or handle it as needed
  };

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <h1 className="text-lg text-gray-50 font-medium mb-8">Create New Split</h1>

      {/* Split Type */}
      <div className='mb-4'>
        <label className="block text-sm font-medium text-gray-50 mb-2">Split Type</label>
        <div className="grid grid-cols-4 gap-6 text-xs w-fit mr-auto">
          <button
            type="button"
            onClick={() => setSplitType('PRIVATE')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'PRIVATE' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <Lock size={20} className={splitType === 'PRIVATE' ? 'text-blue-500' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'PRIVATE' ? 'text-blue-500' : 'text-gray-500'}`}>Private</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('PUBLIC')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'PUBLIC' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <UsersRound size={20} className={splitType === 'PUBLIC' ? 'text-blue-500' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'PUBLIC' ? 'text-blue-500' : 'text-gray-500'}`}>Public</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('SAVINGS')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'SAVINGS' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <PiggyBank size={20} className={splitType === 'SAVINGS' ? 'text-blue-500' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'SAVINGS' ? 'text-blue-500' : 'text-gray-500'}`}>Savings</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('LENDING')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'LENDING' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <HandCoins size={20} className={splitType === 'LENDING' ? 'text-blue-500' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'LENDING' ? 'text-blue-500' : 'text-gray-500'}`}>Lending</span>
          </button>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Split Name */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-2">Split Name</label>
          <input
            type="text"
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g. Rent, Utilities"
            value={splitName}
            onChange={(e) => setSplitName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-50 mb-2">Allocation</label>
          <div className="relative">
            <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="number"
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Savings-Specific Fields - Only for SAVINGS split type */}
        {splitType === 'SAVINGS' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Duration</label>
              {/* Duration Range Tabs */}
              <div className="flex text-xs gap-4 mb-4 mx-auto max-w-screen justify-center">
                {[
                  { label: '7-60', min: 7, max: 60 },
                  { label: '61-120', min: 61, max: 120 },
                  { label: '121-180', min: 121, max: 180 },
                  { label: '181-240', min: 181, max: 240 },
                  { label: '241-2000', min: 241, max: 2000 },
                ].map((range) => (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() => setSelectedRange(`${range.min}-${range.max}`)}
                    className={`rounded-lg p-2 border flex flex-col items-center transition-all ${selectedRange === `${range.min}-${range.max}`
                      ? ' bg-blue-50'
                      : 'border-gray-700 hover:bg-gray-800'
                      }`}
                  >
                    <span
                      className={`font-medium ${selectedRange === `${range.min}-${range.max}` ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                      {range.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Duration Select Dropdown */}
              <div className="relative">
                <select
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(parseInt(e.target.value, 10))}
                  required
                >
                  {Array.from(
                    { length: selectedRange.split('-')[1] - selectedRange.split('-')[0] + 1 },
                    (_, i) => parseInt(selectedRange.split('-')[0], 10) + i
                  ).map((day) => (
                    <option key={day} value={day}>
                      {day} days
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>
          </>
        )}
        {/* Lending-Specific Fields - Only for LENDING split type */}
        {splitType === 'LENDING' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Interest Rate (%)</label>
              <input
                type="number"
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 5"
                value={interest}
                onChange={(e) => setInterest(parseFloat(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Duration (Months)</label>
              <input
                type="number"
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 12"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Allow Installment Payments</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setAllowInstallment(!allowInstallment)}
                  className={`w-full p-4 rounded-lg border flex items-center justify-center transition-all ${allowInstallment ? 'border-blue-500 bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
                    }`}
                >
                  <span className={`font-medium ${allowInstallment ? 'text-blue-500' : 'text-gray-500'}`}>
                    {allowInstallment ? 'Allowed' : 'Not Allowed'}
                  </span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Late Payment Fee</label>
              <input
                type="number"
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 50"
                value={latePaymentFee}
                onChange={(e) => setLatePaymentFee(parseFloat(e.target.value))}
                required
              />
            </div>
          </>
        )}

        {/* Show Balance and Show Contributors - Only for PUBLIC split type */}
        {splitType === 'PUBLIC' && (
          <div className="grid grid-cols-2 w-full gap-4">
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
          </div>
        )}

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