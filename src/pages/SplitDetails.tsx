import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Clock, ArrowUpCircle } from 'lucide-react';

const SplitDetails = () => {
  const { id } = useParams();

  // This would normally be fetched from an API
  const split = {
    name: 'Rent',
    amount: 1200,
    allocated: 800,
    type: 'private',
    transactions: [
      { id: 1, amount: 400, date: '2024-03-15', type: 'deposit' },
      { id: 2, amount: 400, date: '2024-03-01', type: 'deposit' },
    ]
  };

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">{split.name}</h1>

      <div className="bg-blue-600 text-white p-6 rounded-2xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-80">Target Amount</p>
          <p className="text-sm opacity-80">Progress</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">${split.amount}</h2>
          <span className="text-2xl font-bold">{Math.round((split.allocated / split.amount) * 100)}%</span>
        </div>
        <div className="bg-white/20 h-2 rounded-full">
          <div 
            className="bg-white h-2 rounded-full"
            style={{ width: `${(split.allocated / split.amount) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <Users className="text-blue-600 mb-2" size={24} />
          <p className="text-sm text-gray-600">Type</p>
          <p className="font-semibold capitalize">{split.type}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <Clock className="text-blue-600 mb-2" size={24} />
          <p className="text-sm text-gray-600">Created</p>
          <p className="font-semibold">Mar 1, 2024</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {split.transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <ArrowUpCircle className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">Deposit</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+${transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Add Money
      </button>
    </div>
  );
};

export default SplitDetails;