import React, { useEffect, useState } from 'react';
import { DollarSign, Users, Lock, Globe, Save, Hand, Eye, EyeOff, ChevronDown, UserRound, PiggyBank, UsersRound, HandCoins, Coins, Info, Loader2, Loader } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { col } from 'framer-motion/client';
import apiService from '../utils/ApiService';


const CreateSplit = () => {
  const [splitType, setSplitType] = useState('PRIVATE');
  const [showBalance, setShowBalance] = useState(true);
  const [showContributors, setShowContributors] = useState(true);
  const [splitName, setSplitName] = useState('');
  const [allocation, setallocation] = useState(0);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [allowInstallment, setAllowInstallment] = useState(false);
  const [latePaymentFee, setLatePaymentFee] = useState(0);
  const [selectedRange, setSelectedRange] = useState('7-60'); // Default range
  const [selectedDuration, setSelectedDuration] = useState(7);

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false)

  const colors = [
    { name: 'blue', hex: '#3b82f6' },
    { name: 'orange', hex: '#f97316' },
    { name: 'yellow', hex: '#eab308' },
    { name: 'purple', hex: '#a855f7' },
    { name: 'red', hex: '#ef4444' },
    { name: 'green', hex: '#22c55e' },
  ];

  const handleColorClick = (colorName) => {
    console.log(colorName)
    setSelectedColor(colorName);
  };

  // State for current user details
  // Fetch current user details on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiService.getCurrentUser();

        console.log("Current user:", response.data);

        setCurrentUser(response.data); // Store user details in state
      } catch (error) {
        console.error('Error fetching current user:', error);
        alert('Failed to fetch user details. Please try again.');
      }
    };

    fetchCurrentUser();
  }, []);

  // Log currentUser whenever it changes
  useEffect(() => {

    if (currentUser) {
      console.log("Current User:", currentUser);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)


    // Prepare the split data
    const splitData = {
      name: splitName,
      type: splitType,
      showBalance: splitType === 'PUBLIC' ? showBalance : undefined,
      showContributors: splitType === 'PUBLIC' ? showContributors : undefined,
      allocatedAmount: allocation,
      interest: splitType === 'LENDING' ? interest : undefined,
      paybackDate: splitType === 'LENDING' ? duration : undefined,
      allowInstallment: splitType === 'LENDING' ? allowInstallment : undefined,
      latePaymentFee: splitType === 'LENDING' ? latePaymentFee : undefined,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      mobileNumber: currentUser.mobileNumber,
      bvn: currentUser.bvn,
      dateOfBirth: currentUser.dateOfBirth,
      address: currentUser.address,
      gender: currentUser.gender,
      beneficiaryAccount: currentUser.beneficiaryAccount,
      customerIdentifier: currentUser.customerIdentifier,
      color: selectedColor,
    };

    // Combine split data with user details
    const payload = {
      ...splitData,
      // ...(currentUser && {
      //   email: currentUser.email,
      //   firstName: currentUser.firstName,
      //   lastName: currentUser.lastName,
      //   mobileNumber: currentUser.mobileNumber,
      //   bvn: currentUser.bvn,
      //   dateOfBirth: currentUser.dateOfBirth,
      //   address: currentUser.address,
      //   gender: currentUser.gender,
      //   beneficiaryAccount: currentUser.beneficiaryAccount,
      //   customerIdentifier: currentUser.customerIdentifier,
      //   color: currentUser.color,
      // }),
    };

    // Remove undefined fields from the payload
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:8000/api/splits', splitData, {
        headers: {

          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QzNjI1Zjg2YmU4MDc3NzBlZTBmYjUiLCJpYXQiOjE3NDE5NzE2ODUsImV4cCI6MTc0MjA1ODA4NX0.TeBDi--KuJRnXQgHhPSPVSrjPN9LV4aihfW5yWqm-Es`,
        },
      });

      // Handle the response
      console.log('API Response:', response.data);
      toast.success('Split created successfully!');
      // Optionally, reset the form or redirect the user
    } catch (error) {
      // Handle errors
      console.error('Error submitting split data:', error);
      toast.error('Failed to create split. Please try again.');
    }
    setLoading(false)
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
            <Lock size={20} className={splitType === 'PRIVATE' ? '' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'PRIVATE' ? '' : 'text-gray-500'}`}>Private</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('PUBLIC')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'PUBLIC' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <UsersRound size={20} className={splitType === 'PUBLIC' ? '' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'PUBLIC' ? '' : 'text-gray-500'}`}>Public</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('SAVINGS')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'SAVINGS' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <PiggyBank size={20} className={splitType === 'SAVINGS' ? '' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'SAVINGS' ? '' : 'text-gray-500'}`}>Savings</span>
          </button>
          <button
            type="button"
            onClick={() => setSplitType('LENDING')}
            className={`w-fit p-2 aspect-square rounded-lg border flex flex-col items-center transition-all ${splitType === 'LENDING' ? ' bg-blue-50' : 'border-gray-700 hover:bg-gray-800'
              }`}
          >
            <HandCoins size={20} className={splitType === 'LENDING' ? '' : 'text-gray-500'} />
            <span className={`mt-2 font-medium ${splitType === 'LENDING' ? '' : 'text-gray-500'}`}>Lending</span>
          </button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={allocation}
              onChange={(e) => setallocation(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="">
          <div className="mt-4">
            <p className="text-gray-50 mb-2">
              Selected Split Color: <span className="font-semibold capitalize">{selectedColor || '--'}</span>
            </p>
          </div>
          <div className="flex gap-4 mx-auto mb-6">
            {colors.map((color) => (
              <div
                key={color.name}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-all"
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorClick(color.name)}
              />
            ))}
          </div>
        </div>

        {/* Savings-Specific Fields - Only for SAVINGS split type */}
        {splitType === 'SAVINGS' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-2">Duration</label>
              {/* Duration Range Tabs */}
              <div className="flex text-xs gap-4 mb-4 mx-auto max-w-screen justify-start">
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
                    className={`rounded-full py-1 p-3 border flex flex-col items-center transition-all ${selectedRange === `${range.min}-${range.max}`
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
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
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
              <label className="block text-sm font-medium text-gray-50 mb-2">Duration</label>
              {/* Duration Range Tabs */}
              <div className="flex text-xs gap-4 mb-4 mx-auto max-w-screen justify-start">
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
                    className={`rounded-full py-1 p-3 border flex flex-col items-center transition-all ${selectedRange === `${range.min}-${range.max}`
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
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
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
          <div className="flex flex-col w-full justify-center gap-4 mt-8">
            <div className="flex items-center justify-between gap-8">
              <label className="block text-sm font-medium text-gray-50 mb-2">Show Balance</label>
              <div className="flex items-center w-fit ">
                <button
                  type="button"
                  onClick={() => setShowBalance(!showBalance)}
                  className={`w-full p-1 px-4 rounded-full border flex items-center justify-center transition-all ${showBalance ? 'bg-blue-50' : 'border-zinc-400 hover:bg-gray-800'
                    }`}
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} className="text-gray-500" />}
                  <span className={`ml-2 font-medium ${showBalance ? '' : 'text-gray-500'}`}>
                    {showBalance ? 'Visible' : 'Hidden'}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              <label className="block text-sm font-medium text-gray-50 mb-2">Show Contributors</label>
              <div className="flex items-center w-fit">
                <button
                  type="button"
                  onClick={() => setShowContributors(!showContributors)}
                  className={`w-full p-1 px-4 rounded-full border flex items-center justify-center transition-all ${showContributors ? 'bg-blue-50' : 'border-zinc-400 hover:bg-gray-800'
                    }`}
                >
                  <Users size={20} className={showContributors ? '' : 'text-gray-500'} />
                  <span className={`ml-2 font-medium ${showContributors ? '' : 'text-gray-500'}`}>
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
            <div className="flex items-center space-x-2 p-3 text-xs text-yellow-400 flex items-center">
              <Info size={16} />
              <span >Anyone can contribute to this split</span>
            </div>
          </div>
        )}

        {/* Create Split Button */}
        <button
          type="submit"
          className="w-[80%] bg-blue-600 text-white py-3 rounded-lg px-6 py-2 mx-auto block font-medium hover:bg-blue-700 transition-colors  mt-8 mb-12"
        >
          {loading ? <Loader className='animate-spin mx-auto' /> : "Create Split"}
        </button>
      </form>
    </div>
  );
};

export default CreateSplit;