import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Clock, ArrowUpCircle, TrendingUp, Copy, ArrowDownCircle, Wallet } from 'lucide-react';
import axios from 'axios';

const SplitDetails = () => {
  const  splitId = useParams(); 
  const [split, setSplitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSplitDetails = async () => {
    try {
      const response = await axios.get(`https://t-savvy-1.onrender.com/api/splits/${splitId}/split`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QzNjI1Zjg2YmU4MDc3NzBlZTBmYjUiLCJpYXQiOjE3NDE5NzE1NDMsImV4cCI6MTc0MjA1Nzk0M30.8LTJHY5lcABVoXG-2zj-FFXFAqLPFRr47UT_Z2ivu-w`, // Attach token to request
          },
        }
      );
      console.log("Split Details:", response.data);
      setSplitDetails(response.data);
    } catch (error) {
      console.error("Error fetching split details:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(splitId);
    
    if (splitId) {
      fetchSplitDetails();
    }
  }, [splitId]);

  const copyVirtualAccount = () => {
    if (split && split.virtualAccountNumber) {
      navigator.clipboard.writeText(split.virtualAccountNumber);
      // You might want to add a toast notification here
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading split details...</p>
      </div>
    );
  }

  // Show error state
  if (error || !split) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 font-medium">Error: {error || "Failed to load split details"}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchSplitDetails();
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }


  if (!split) {
    return (
      <div className="text-center text-gray-600 p-6">
        <h2 className="text-xl font-semibold">Split Not Found</h2>
        <p>The requested split does not exist.</p>
      </div>
    );
  }

  // Only render the main content when data is loaded successfully
  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-white">{split.name}</h1>

      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-6 rounded-2xl mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="relative">
            <p className="text-sm opacity-80">Split Balance</p>
            <h2 className="text-3xl font-bold mb-4">&#8358;{split.allocatedAmount}</h2>
            <div className="bg-white/20 h-2 rounded-full mb-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${(split.allocatedAmount / split.amount) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm">
              <span className="opacity-80">Target: </span>
              <span className="font-semibold">&#8358;{split.amount}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Virtual Account</h2>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <Wallet className="text-blue-600 mr-2" size={20} />
            <span className="font-mono">{split.virtualAccountNumber}</span>
          </div>
          <button
            onClick={copyVirtualAccount}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Split Metrics</h2>
          <TrendingUp className="text-green-600" size={24} />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Monthly Growth</span>
              {/* <span className="text-green-600">+{split.monthlyGrowth}%</span> */}
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              {/* <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${split.monthlyGrowth * 2}%` }}
              ></div> */}
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-gray-600">Contribution Frequency</span>
            <span className="font-medium">Bi-weekly</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Average Contribution</span>
            {/* <span className="font-medium">${split.averageContribution || 400}</span> */}
          </div>
        </div>
      </div>

      {split.transactions && split.transactions.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {split.transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowUpCircle className="text-green-600" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-red-600" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <p className="text-gray-600">No transactions yet</p>
        </div>
      )}
    </div>
  );
};

export default SplitDetails;