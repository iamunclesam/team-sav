import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import SplitCard from '../../components/SplitCard'

const AllSplits = () => {
  const [activeTab, setActiveTab] = useState('all');

  const splits = [
    { 
      id: 1, 
      name: 'Rent', 
      amount: 1200, 
      allocated: 800, 
      type: 'private',
      monthlyGrowth: 12.5
    },
    { 
      id: 2, 
      name: 'Utilities', 
      amount: 300, 
      allocated: 150, 
      type: 'PRIVATE',
      monthlyGrowth: 8.2
    },
    { 
      id: 3, 
      name: 'Community Fund', 
      amount: 5000, 
      allocated: 3500, 
      type: 'LENDING',
      monthlyGrowth: 15.7
    },
    { 
      id: 4, 
      name: 'Emergency Fund', 
      amount: 10000, 
      allocated: 4200,
      type: 'PUBLIC',
      monthlyGrowth: 5.3
    },
    { 
      id: 5, 
      name: 'Vacation', 
      amount: 2000, 
      allocated: 1200, 
      type: 'SAVINGS',
      monthlyGrowth: 20.1
    }
  ];

  // Filter splits based on active tab
  const filteredSplits = activeTab === 'all' 
    ? splits 
    : splits.filter(split => split.type === activeTab);

  // Calculate total allocated amount for filtered splits
  const totalAllocated = filteredSplits.reduce((sum, split) => sum + split.allocated, 0);

  return (
    <div className="max-w-lg mx-auto p-6  min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium text-gray-50">All Splits</h1>
        <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
        </button>
      </div>
      
    
      
      {/* Stats Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">Total Allocated</p>
          <TrendingUp className="text-blue-600" size={20} />
        </div>
        <p className="text-3xl font-bold text-blue-600">${totalAllocated.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-1">Across {filteredSplits.length} splits</p>
      </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg shadow-sm mb-6 p-1">
        <button 
          className={`flex-1 py-1 text-center rounded-md transition-colors ${
            activeTab === 'all' ? 'bg-blue-600/80 text-sm text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`flex-1 py-1 text-center rounded-md transition-colors ${
            activeTab === 'PRIVATE' ? 'bg-blue-600 text-sm text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('PRIVATE')}
        >
          Private
        </button>
        <button 
          className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${
            activeTab === 'PUBLIC' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('PUBLIC')}
        >
          Public
        </button>
        <button 
          className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${
            activeTab === 'SAVINGS' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('SAVINGS')}
        >
          Savings
        </button>
        <button 
          className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${
            activeTab === 'LENDING' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('LENDING')}
        >
          Lending
        </button>
      </div>

      {/* Splits List */}
    <SplitCard />

      {filteredSplits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No {activeTab} splits found</p>
        </div>
      )}
    </div>
  );
}

export default AllSplits;