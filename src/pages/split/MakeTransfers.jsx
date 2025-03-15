import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Search,
  Wallet,
  Building2,
  ArrowLeftRight,
  Repeat,
  CornerLeftUp,
  Coins,
  UsersRound,
  PiggyBank,
  HandCoins,
  Lock,
  Loader2,
} from "lucide-react";
import apiService from "../../utils/ApiService";
import toast from 'react-hot-toast';
import axios from "axios";

const Transfer = () => {
  const [transferType, setTransferType] = useState("internal");
  const [amount, setAmount] = useState("");
  const [splits, setSplits] = useState([]);
  const [splitLoading, setSplitLoading] = useState(false);
  const [fromSplit, setFromSplit] = useState(null); // Selected "From Split"
  const [toSplit, setToSplit] = useState(null); // Selected "To Split"
  const [receiverAccountNumber, setReceiverAccountNumber] = useState(""); // For external split transfer
  const [receiverName, setReceiverName] = useState(""); // Validated receiver name
  const [bankAccountNumber, setBankAccountNumber] = useState(""); // For external account transfer
  const [bankName, setBankName] = useState(""); // For external account transfer
  const [isLoading, setIsLoading] = useState(false); // Loading state for transfers
  const [isValidateLoading, setIsValidateLoading] = useState(false); // Loading state for transfers

  // Fetch user's splits on component mount
  const fetchSplits = async () => {
    setSplitLoading(true);
    try {
      const response = await apiService.getUserSplits();
      setSplits(response.data);
    } catch (error) {
      console.error("Error fetching splits:", error);
    }
    setSplitLoading(false);
  };

  // Fetch splits on component mount
  useEffect(() => {
    fetchSplits();
  }, []);

  // Handle internal transfer
  const handleInternalTransfer = async () => {
    if (!fromSplit || !toSplit || !amount) {
      toast.error("Please select both splits and enter an amount.");
      return;
    }

    if (parseFloat(amount) > fromSplit.allocatedAmount) {
      toast.error("Insufficient balance in the selected split.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.makeInternalSplitTransfer({
        senderSplitId: fromSplit._id,
        receivingSplitId: toSplit._id,
        amount: parseFloat(amount)
      });

      if (response) {
        toast.success("Transfer successful");
        await fetchSplits(); // Refresh splits

        // Reset fields after successful transfer
        setFromSplit(null);
        setToSplit(null);
        setAmount("");
      } else {
        toast.error("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  // Handle external split transfer
  const handleExternalSplitTransfer = async () => {
    if (parseFloat(amount) > fromSplit.allocatedAmount) {
      toast.error("Insufficient balance in the selected split.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.makeExternalSplitTransfer({
        senderSplitId: fromSplit._id,
        receiverSplitAccountNumber: receiverAccountNumber,
        amount: amount
      });

      if (response) {
        toast.success("Transfer successful");
        await fetchSplits(); // Refresh splits

        // Reset fields after successful transfer
        setFromSplit(null);
        setReceiverAccountNumber("");
        setAmount("");
        setReceiverName(""); // Reset receiver name
      } else {
        toast.error("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };


  // Handle external account transfer
  const handleExternalAccountTransfer = async () => {
    if (!bankAccountNumber || !bankName || !amount) {
      alert("Please enter bank details and amount.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await mockApi.externalAccountTransfer(
        bankAccountNumber,
        bankName,
        parseFloat(amount)
      );

      if (response.success) {
        alert(response.message);
      } else {
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  // Validate receiver's account number
  const validateReceiver = async () => {
    if (!receiverAccountNumber) {
      toast.error("Please enter a virtual account number.");
      return;
    }

    setIsValidateLoading(true);
    try {
      const token = localStorage.getItem('token') 
      const response = await axios.get(`https://sandbox-api-d.squadco.com/virtual-account/customer/${receiverAccountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status == 200) {
        const names = response.data.data
        setReceiverName(`${names.first_name} ${names.last_name}`);
        // toast.success(`Receiver validated: ${names.first_name} ${names.last_name}`);
      } else {
        toast.error("Invalid account number. Please try again.");
      }
    } catch (error) {
      console.error("Error validating receiver:", error);
      toast.error("An error occurred. Please try again.");
    }
    setIsValidateLoading(false);
  };

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-8 text-gray-50">Transfer Money</h1>

      {/* Transfer Type Selection */}
      <div className="rounded-xl shadow-sm mb-6">
        <p className="text-gray-50 font-semibold mb-4">Select transfer type</p>
        <div className="flex mx-auto gap-8 w-fit">
          <button
            onClick={() => setTransferType("internal")}
            className={`rounded-xl flex items-center text-base justify-center gap-2 transition-all flex-col`}
          >
            <div
              className={`p-3 rounded-xl ${transferType === "internal"
                ? "bg-blue-50 border-2 "
                : "border-2 border-gray-100"
                }`}
            >
              <Repeat
                size={20}
                className={
                  transferType === "internal"
                    ? "text-blue-500"
                    : "text-gray-400"
                }
              />
            </div>
            <span className="text-xs text-white">Internal Split</span>
          </button>
          <button
            onClick={() => setTransferType("externalSplit")}
            className={`rounded-xl flex items-center text-base justify-center gap-2 transition-all flex-col`}
          >
            <div
              className={`p-3 rounded-xl ${transferType === "externalSplit"
                ? "bg-blue-50 border-2 "
                : "border-2 border-gray-100"
                }`}
            >
              <ArrowLeftRight
                size={20}
                className={
                  transferType === "externalSplit"
                    ? "text-green-500"
                    : "text-gray-400"
                }
              />
            </div>
            <span className="text-xs text-white">External Splits</span>
          </button>
          <button
            onClick={() => setTransferType("externalAccount")}
            className={`rounded-xl flex items-center text-base justify-center gap-2 transition-all flex-col`}
          >
            <div
              className={`p-3 rounded-xl ${transferType === "externalAccount"
                ? "bg-blue-50 border-2 "
                : "border-2 border-gray-100"
                }`}
            >
              <CornerLeftUp
                size={20}
                className={
                  transferType === "externalAccount"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              />
            </div>
            <span className="text-xs text-white">External Accounts</span>
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div className="rounded-xl shadow-sm mb-6">
        <label className="block text-sm font-medium text-gray-50 mb-2">
          Amount
        </label>
        <div className="relative">
          <Coins className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      {transferType === "internal" ? (
        <>
          {/* From Split Selection */}
          <div className="rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-50 mb-4">
              From Split
            </label>
            {!splitLoading ? (
              <div className="space-y-3">
                {splits.map((split) => {
                  let splitIcon;

                  if (split.type === "PUBLIC") {
                    splitIcon = <UsersRound size={20} />;
                  } else if (split.type === "SAVINGS") {
                    splitIcon = <PiggyBank size={20} />;
                  } else if (split.type === "LENDING") {
                    splitIcon = <HandCoins size={20} />;
                  } else if (split.type === "PRIVATE") {
                    splitIcon = <Lock size={20} />;
                  } else {
                    splitIcon = <Wallet size={20} />;
                  }

                  return (
                    <button
                      key={split._id}
                      onClick={() => setFromSplit(split)}
                      className={`w-full flex items-center justify-between p-2 rounded-2xl bg-blue-500/10 hover:border-blue-500 transition-colors pr-4 ${fromSplit?._id === split._id ? "border border-blue-500" : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-300 rounded-lg flex justify-center items-center">
                          {splitIcon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">{split.name}</p>
                          <p className="text-xs text-gray-400">
                            Balance: &#8358;{split.allocatedAmount}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <Loader2
                size={20}
                className="animate-spin text-blue-200 mx-auto"
              />
            )}
          </div>

          {/* To Split Selection */}
          <div className="rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium mb-4 text-gray-50">
              To Split
            </label>
            {!splitLoading ? (
              <div className="space-y-3">
                {splits.map((split) => {
                  let splitIcon;

                  if (split.type === "PUBLIC") {
                    splitIcon = <UsersRound size={20} />;
                  } else if (split.type === "SAVINGS") {
                    splitIcon = <PiggyBank size={20} />;
                  } else if (split.type === "LENDING") {
                    splitIcon = <HandCoins size={20} />;
                  } else if (split.type === "PRIVATE") {
                    splitIcon = <Lock size={20} />;
                  } else {
                    splitIcon = <Wallet size={20} />;
                  }

                  return (
                    <button
                      key={split._id}
                      onClick={() => setToSplit(split)}
                      className={`w-full flex items-center justify-between p-2 rounded-2xl bg-blue-500/10 hover:border-blue-500 transition-colors pr-4 ${toSplit?._id === split._id ? "border border-blue-500" : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-300 rounded-lg flex justify-center items-center">
                          {splitIcon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">{split.name}</p>
                          <p className="text-sm text-gray-500">
                            Balance: ${split.allocatedAmount}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <Loader2
                size={20}
                className="animate-spin text-blue-200 mx-auto"
              />
            )}
          </div>
        </>
      ) : transferType === "externalSplit" ? (
        <>
          {/* From Split Selection */}
          <div className="rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-50 mb-4">
              From Split
            </label>
            {!splitLoading ? (
              <div className="space-y-3">
                {splits.map((split) => {
                  let splitIcon;

                  if (split.type === "PUBLIC") {
                    splitIcon = <UsersRound size={20} />;
                  } else if (split.type === "SAVINGS") {
                    splitIcon = <PiggyBank size={20} />;
                  } else if (split.type === "LENDING") {
                    splitIcon = <HandCoins size={20} />;
                  } else if (split.type === "PRIVATE") {
                    splitIcon = <Lock size={20} />;
                  } else {
                    splitIcon = <Wallet size={20} />;
                  }

                  return (
                    <button
                      key={split._id}
                      onClick={() => setFromSplit(split)}
                      className={`w-full flex items-center justify-between p-2 rounded-2xl bg-blue-500/10 hover:border-blue-500 transition-colors pr-4 ${fromSplit?._id === split._id ? "border border-blue-500" : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-300 rounded-lg flex justify-center items-center">
                          {splitIcon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">{split.name}</p>
                          <p className="text-xs text-gray-400">
                            Balance: &#8358;{split.allocatedAmount}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <Loader2
                size={20}
                className="animate-spin text-blue-200 mx-auto"
              />
            )}
          </div>

          {/* Receiver Account Number Input */}
          <div className="rounded-xl shadow-sm p-4 mb-6">
            <label className="block text-sm font-medium text-gray-50 mb-2">
              Receiver Account Number
            </label>
            <input
              type="text"
              value={receiverAccountNumber}
              onChange={(e) => setReceiverAccountNumber(e.target.value)}
              onBlur={validateReceiver}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="1234567890"
            />
            {/* <button
              onClick={validateReceiver}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 transition-colors"
            >
              Validate Receiver
            </button> */}
            {isValidateLoading ? (
              <p className="text-sm text-gray-50 mt-2">Validating...</p>
            ) : receiverName && (
              <p className="text-sm text-gray-50 mt-2">
                Receiver: <span className="text-green-600">{receiverName}</span>
              </p>
            )}

          </div>
        </>
      ) : (
        // External Account Transfer
        <div className="rounded-xl shadow-sm mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-50 mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="1234567890"
            />
          </div>

          <label className="block text-sm font-medium text-gray-50 mb-2">
            Bank Name
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
          transferType === "internal"
            ? handleInternalTransfer
            : transferType === "externalSplit"
              ? handleExternalSplitTransfer
              : handleExternalAccountTransfer
        }
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 rounded-tr-none mt-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <ArrowRight size={20} />
            Transfer
          </>
        )}
      </button>
    </div>
  );
};

export default Transfer;