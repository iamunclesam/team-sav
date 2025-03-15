import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Wallet, Building2, ArrowLeftRight, User, ArrowLeft } from 'lucide-react';
import axios from 'axios'; // For API calls
import apiService from '../utils/ApiService';

const Transfer = () => {
    const [transferType, setTransferType] = useState(null); // internal, toOtherUserSplit, external
    const [amount, setAmount] = useState('');
    const [splits, setSplits] = useState([]);
    const [fromSplit, setFromSplit] = useState(null); // Selected "From Split"
    const [toSplit, setToSplit] = useState(null); // Selected "To Split" (for internal transfers)
    const [receiverAccountNumber, setReceiverAccountNumber] = useState(''); // For transfers to another user's split
    const [receiverName, setReceiverName] = useState(''); // Validated receiver name
    const [bankAccountNumber, setBankAccountNumber] = useState(''); // For bank transfers
    const [bankName, setBankName] = useState(''); // For bank transfers
    const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility

    // Fetch user's splits on component mount
    useEffect(() => {
        const fetchSplits = async () => {
            try {
                const response = await apiService.getUserSplits();
                setSplits(response.data);
            } catch (error) {
                console.error('Error fetching splits:', error);
            }
        };

        fetchSplits();
    }, []);

    // Handle internal transfer (between user's own splits)
    const handleInternalTransfer = async () => {
        if (!fromSplit || !toSplit || !amount) {
            alert('Please select both splits and enter an amount.');
            return;
        }

        if (parseFloat(amount) > fromSplit.allocatedAmount) {
            alert('Insufficient balance in the selected split.');
            return;
        }

        try {
            // Mock API call to update splits
            const response = await axios.post('/api/transfer/internal', {
                fromSplitId: fromSplit._id,
                toSplitId: toSplit._id,
                amount: parseFloat(amount),
            });

            if (response.data.success) {
                alert('Transfer successful!');
                // Update local state or refetch splits
                setSplits(response.data.updatedSplits);
            } else {
                alert('Transfer failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during transfer:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Validate receiver's name using Squad API
    const validateReceiverName = async () => {
        if (!receiverAccountNumber) {
            alert('Please enter a virtual account number.');
            return;
        }

        try {
            // Mock Squad API call to validate receiver
            const response = await axios.post('/api/validate-receiver', {
                accountNumber: receiverAccountNumber,
            });

            if (response.data.success) {
                setReceiverName(response.data.receiverName);
                alert(`Receiver validated: ${response.data.receiverName}`);
            } else {
                alert('Invalid account number. Please try again.');
            }
        } catch (error) {
            console.error('Error validating receiver:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle transfer to another user's split
    const handleTransferToOtherUserSplit = async () => {
        if (!fromSplit || !receiverAccountNumber || !amount || !receiverName) {
            alert('Please select a split, validate the receiver, and enter an amount.');
            return;
        }

        if (parseFloat(amount) > fromSplit.allocatedAmount) {
            alert('Insufficient balance in the selected split.');
            return;
        }

        try {
            // Mock Squad API call to transfer to another user's split
            const response = await axios.post('/api/transfer/to-other-user-split', {
                fromSplitId: fromSplit._id,
                receiverAccountNumber,
                amount: parseFloat(amount),
            });

            if (response.data.success) {
                alert('Transfer successful!');
                // Update local state or refetch splits
                setSplits(response.data.updatedSplits);
            } else {
                alert('Transfer failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during transfer:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle bank transfer
    const handleBankTransfer = async () => {
        if (!bankAccountNumber || !bankName || !amount) {
            alert('Please enter bank details and amount.');
            return;
        }

        try {
            // Mock Squad API call to transfer to bank
            const response = await axios.post('/api/transfer/bank', {
                bankAccountNumber,
                bankName,
                amount: parseFloat(amount),
            });

            if (response.data.success) {
                alert('Transfer successful!');
            } else {
                alert('Transfer failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during transfer:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle transfer type selection
    const handleTransferTypeSelection = (type) => {
        setTransferType(type);
        setIsFormVisible(true);
    };

    // Handle go back to transfer type selection
    const handleGoBack = () => {
        setTransferType(null);
        setIsFormVisible(false);
        setAmount('');
        setFromSplit(null);
        setToSplit(null);
        setReceiverAccountNumber('');
        setReceiverName('');
        setBankAccountNumber('');
        setBankName('');
    };

    return (
        <div className="p-4 pb-24 bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-50">Transfer Money</h1>

            {!isFormVisible ? (
                // Transfer Type Selection Screen
                <div className="rounded-xl shadow-sm mb-6">
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => handleTransferTypeSelection('internal')}
                            className={`rounded-xl flex flex-col items-center text-base justify-center gap-4 transition-all ${transferType === 'internal'
                                ? 'bg-blue-50 border-2'
                                : 'border-2 border-gray-100'
                                }`}
                        >
                            <ArrowLeftRight
                                size={20}
                                className={transferType === 'internal' ? 'text-blue-500' : 'text-gray-400'}
                            />
                            <span className={transferType === 'internal' ? '' : 'text-gray-500 text-xs'}>
                                Between Splits
                            </span>
                        </button>
                        <button
                            onClick={() => handleTransferTypeSelection('toOtherUserSplit')}
                            className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${transferType === 'toOtherUserSplit'
                                ? 'bg-blue-50 border-2 '
                                : 'border-2 border-gray-100'
                                }`}
                        >
                            <User
                                size={20}
                                className={transferType === 'toOtherUserSplit' ? 'text-blue-500' : 'text-gray-400'}
                            />
                            <span className={transferType === 'toOtherUserSplit' ? '' : 'text-gray-500 text-xs'}>
                                To Another User
                            </span>
                        </button>
                        <button
                            onClick={() => handleTransferTypeSelection('external')}
                            className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${transferType === 'external'
                                ? 'bg-blue-50 border-2 '
                                : 'border-2 border-gray-100'
                                }`}
                        >
                            <Building2
                                size={20}
                                className={transferType === 'external' ? 'text-blue-500' : 'text-gray-400'}
                            />
                            <span className={transferType === 'external' ? '' : 'text-gray-500 text-xs'}>
                                External Account
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                // Form for Selected Transfer Type
                <>
                    {/* Go Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 text-gray-50 mb-6 hover:text-blue-500 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Go Back</span>
                    </button>

                    {/* Amount Input */}
                    <div className="rounded-xl shadow-sm p-4 mb-6">
                        <label className="block text-sm font-medium text-gray-50 mb-2">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {transferType === 'internal' ? (
                        <>
                            {/* From Split Selection */}
                            <div className="rounded-xl shadow-sm p-4 mb-6">
                                <label className="block text-sm font-medium text-gray-50 mb-4">From Split</label>
                                <div className="space-y-3">
                                    {splits.map(split => (
                                        <button
                                            key={split._id}
                                            onClick={() => setFromSplit(split)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 ${fromSplit?._id === split._id ? 'border-blue-500' : 'border-gray-100'} hover:border-blue-500 transition-colors`}
                                        >
                                            <div className="flex items-center">
                                                <Wallet className="text-gray-400 mr-3" size={20} />
                                                <div className="text-left">
                                                    <p className="font-medium text-white">{split.name}</p>
                                                    <p className="text-sm text-gray-500">Balance: ${split.allocatedAmount}</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* To Split Selection */}
                            <div className="rounded-xl shadow-sm p-4">
                                <label className="block text-sm font-medium mb-4 text-gray-50">To Split</label>
                                <div className="space-y-3">
                                    {splits.map(split => (
                                        <button
                                            key={split._id}
                                            onClick={() => setToSplit(split)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 ${toSplit?._id === split._id ? 'border-blue-500' : 'border-gray-100'} hover:border-blue-500 transition-colors`}
                                        >
                                            <div className="flex items-center">
                                                <Wallet className="text-gray-400 mr-3" size={20} />
                                                <div className="text-left">
                                                    <p className="font-medium text-white">{split.name}</p>
                                                    <p className="text-sm text-gray-500">Balance: ${split.allocatedAmount}</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : transferType === 'toOtherUserSplit' ? (
                        <>
                            {/* From Split Selection */}
                            <div className="rounded-xl shadow-sm p-4 mb-6">
                                <label className="block text-sm font-medium text-gray-50 mb-4">From Split</label>
                                <div className="space-y-3">
                                    {splits.map(split => (
                                        <button
                                            key={split._id}
                                            onClick={() => setFromSplit(split)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 ${fromSplit?._id === split._id ? 'border-blue-500' : 'border-gray-100'} hover:border-blue-500 transition-colors`}
                                        >
                                            <div className="flex items-center">
                                                <Wallet className="text-gray-400 mr-3" size={20} />
                                                <div className="text-left">
                                                    <p className="font-medium text-white">{split.name}</p>
                                                    <p className="text-sm text-gray-500">Balance: ${split.allocatedAmount}</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Receiver Account Number Input */}
                            <div className="rounded-xl shadow-sm p-4 mb-6">
                                <label className="block text-sm font-medium text-gray-50 mb-2">Receiver Account Number</label>
                                <input
                                    type="text"
                                    value={receiverAccountNumber}
                                    onChange={(e) => setReceiverAccountNumber(e.target.value)}
                                    className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter account number"
                                />

                                <button
                                    onClick={validateReceiverName}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 transition-colors"
                                >
                                    Validate Receiver
                                </button>

                                {receiverName && (
                                    <p className="text-sm text-gray-50 mt-2">Receiver: {receiverName}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        // External Transfer Form
                        <div className="rounded-xl shadow-sm p-4 mb-6">
                            <label className="block text-sm font-medium text-gray-50 mb-2">Account Number</label>
                            <input
                                type="text"
                                value={bankAccountNumber}
                                onChange={(e) => setBankAccountNumber(e.target.value)}
                                className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter account number"
                            />

                            <label className="block text-sm font-medium text-gray-50 mb-2">Bank Name</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Search bank name"
                                />
                            </div>
                        </div>
                    )}

                    {/* Transfer Button */}
                    <button
                        onClick={
                            transferType === 'internal'
                                ? handleInternalTransfer
                                : transferType === 'toOtherUserSplit'
                                ? handleTransferToOtherUserSplit
                                : handleBankTransfer
                        }
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowRight size={20} />
                        Transfer
                    </button>
                </>
            )}
        </div>
    );
};

export default Transfer;