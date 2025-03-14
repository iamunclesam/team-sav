import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import SplitCard from '../../components/SplitCard'
import apiService from '../../utils/apiService.js'

const AllSplits = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [splits, setSplits] = useState([]);

    useEffect(() => {
        const fetchSplits = async () => {
            try {
                const response = await apiService.getUserSplits();
                console.log("Splits:", response.data);
                
                const data = response.data;
                console.log("All Splits:", data);
                
                setSplits(data);
            } catch (error) {
                console.error('Error fetching splits:', error);
            }
        };

        fetchSplits();
    }, []);

    // Filter splits based on active tab
    const filteredSplits = activeTab === 'all'
        ? splits
        : splits.filter(split => split.type === activeTab);

    // Calculate total allocated amount for filtered splits
    const totalAllocated = filteredSplits.reduce((sum, split) => sum + split.allocatedAmount, 0);

    return (
        <div className="max-w-lg mx-auto p-6  min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-medium text-gray-50">All Splits</h1>
                <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <Plus size={16} />
                </button>
            </div>

            {/* Stats Card */}
            <div className="relative bg-blue-600 text-white p-6 rounded-xl shadow-sm mb-8">
            <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
                <img className="w-auto h-full" src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png" alt="" />
            </div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-100 font-medium text-sm">Total Allocated</p>
                    <TrendingUp className="text-gray-100" size={20} />
                </div>
                <div className='flex gap-2 items-end text-white'>
                    <p className="text-3xl font-bold text-white">${totalAllocated.toLocaleString()}</p>
                    <span className="text-xs text-gray-100 font-medium mt-1">Across {filteredSplits.length} splits</span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-white rounded-lg shadow-sm mb-6 p-1">
                <button
                    className={`flex-1 py-1 text-center rounded-md transition-colors ${activeTab === 'all' ? 'bg-blue-600/80 text-sm text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('all')}
                >
                    All
                </button>
                <button
                    className={`flex-1 py-1 text-center rounded-md transition-colors ${activeTab === 'PRIVATE' ? 'bg-blue-600 text-sm text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('PRIVATE')}
                >
                    Private
                </button>
                <button
                    className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${activeTab === 'PUBLIC' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('PUBLIC')}
                >
                    Public
                </button>
                <button
                    className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${activeTab === 'SAVINGS' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('SAVINGS')}
                >
                    Savings
                </button>
                <button
                    className={`flex-1 py-1 text-center rounded-md text-sm transition-colors ${activeTab === 'LENDING' ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('LENDING')}
                >
                    Lending
                </button>
            </div>

            {/* Splits List */}
            <SplitCard splits={filteredSplits} />

            {filteredSplits.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No {activeTab} splits found</p>
                </div>
            )}
        </div>
    );
}

export default AllSplits;