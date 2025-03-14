import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Wallet, Building2, ArrowLeftRight } from 'lucide-react';
import apiService from '../utils/ApiService';


const Transfer = () => {
    const [transferType, setTransferType] = useState('internal');
    const [amount, setAmount] = useState('');
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


    return (
        <div className="p-4 pb-24">
            <h1 className="text-2xl font-bold mb-6 text-gray-50">Transfer Money</h1>

            {/* Transfer Type Selection */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setTransferType('internal')}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${transferType === 'internal'
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'border-2 border-gray-100'
                            }`}
                    >
                        <ArrowLeftRight
                            size={24}
                            className={transferType === 'internal' ? 'text-blue-500' : 'text-gray-400'}
                        />
                        <span className={transferType === 'internal' ? 'text-blue-500' : 'text-gray-500'}>
                            Between Splits
                        </span>
                    </button>
                    <button
                        onClick={() => setTransferType('external')}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${transferType === 'external'
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'border-2 border-gray-100'
                            }`}
                    >
                        <Building2
                            size={24}
                            className={transferType === 'external' ? 'text-blue-500' : 'text-gray-400'}
                        />
                        <span className={transferType === 'external' ? 'text-blue-500' : 'text-gray-500'}>
                            External Account
                        </span>
                    </button>
                </div>
            </div>

            {/* Amount Input */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                    />
                </div>
            </div>

            {transferType === 'internal' ? (
                <>
                    {/* From Split Selection */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">From Split</label>
                        <div className="space-y-3">
                            {splits.map(split => (
                                <button
                                    key={split._id}
                                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <Wallet className="text-gray-400 mr-3" size={20} />
                                        <div className="text-left">
                                            <p className="font-medium">{split.name}</p>
                                            <p className="text-sm text-gray-500">Balance: ${split.allocatedBalance}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* To Split Selection */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">To Split</label>
                        <div className="space-y-3">
                            {splits.map(split => (
                                <button
                                    key={split._id}
                                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <Wallet className="text-gray-400 mr-3" size={20} />
                                        <div className="text-left">
                                            <p className="font-medium">{split.name}</p>
                                            <p className="text-sm text-gray-500">Balance: ${split.allocatedBalance}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                        placeholder="Enter account number"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search bank name"
                        />
                    </div>
                </div>
            )}

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                Continue Transfer
            </button>
        </div>
    );
};

export default Transfer;