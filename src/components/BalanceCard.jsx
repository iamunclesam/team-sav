import React, { useState, useEffect } from "react";
import {
  CheckIcon,
  ClipboardIcon,
  Copy,
  Eye,
  EyeOff,
  TrendingUp,
  Wallet,
} from "lucide-react";
import apiService from "../utils/ApiService";

const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [userBalance, setUserBalance] = useState(null);
  const [userAccountNumber, setAccountNumber] = useState(null);
  const [totalSplitAmount, setTotalSplitAmount] = useState(0);
  const [userLoading, setUserLoading] = useState(false);
  const [splitsLoading, setSplitsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(userAccountNumber || "")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiService.getCurrentUser();
        const userBal = res.data.potBalance;
        console.log(userBal);
        setUserBalance(userBal);
      } catch (error) {
        console.log("Error fetching Balance:", error);
      }
    };

    const fetchUserAccount = async () => {
      try {
        const res = await apiService.getCurrentUser();
        const userBal = res.data.virtualAccountNumber;
        console.log(userBal);
        setAccountNumber(userBal);
      } catch (error) {
        console.log("Error fetching Balance:", error);
      }
    };
    setUserLoading(true);
    fetchUserAccount();

    fetchUser();
    setUserLoading(false);
  }, []);

  useEffect(() => {
    const fetchAllSplits = async () => {
      setSplitsLoading(true);
      try {
        const res = await apiService.getUserSplits();
        const totalAmount = res.data.reduce(
          (acc, split) => acc + Number(split.allocatedAmount || 0),
          0
        );
        console.log("Total Split Amount:", totalAmount);
        setTotalSplitAmount(totalAmount);
      } catch (error) {
        console.log("Error fetching splits:", error);
      }
      setSplitsLoading(false);
    };

    fetchAllSplits();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white p-3 rounded-2xl mb-6 shadow-lg ">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
      <div className="absolute -inset-1 bg-gradient-to-t from-white/[0.05] to-transparent"></div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>

      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Wavy line */}
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
        />
      </div>

      {/* Content */}
      <div className="relative ">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center">
              <Wallet size={18} className="mr-2 opacity-80" />
              <p className="text-sm opacity-80">Pot Total</p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex items-center gap-2" onClick={copyToClipboard}>
            <h1 className="text-gray-50 text-sm">
              {userAccountNumber || 42677272728}
            </h1>
            {/* <Copy size={16} className="text-gray-50" /> */}
            {copied ? (
              <CheckIcon size={18} color="green" />
            ) : (
              <ClipboardIcon size={18} />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 flex items-center">
          &#8358;
          {""}
          {showBalance ? `${(userBalance || 0).toLocaleString()}` : "••••"}
          {/* <div className="ml-2 text-sm bg-white/20 rounded-full px-2 py-0.5 flex items-center">
            <TrendingUp size={12} className="mr-1" />
            <span>+3.5%</span>
          </div> */}
        </h2>

        <div className="p-4 pb-1 bg-white/10 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[10px] opacity-80 ">Splits Balance</p>
              <p className="font-semibold">
                &#8358;
                {showBalance
                  ? `${(totalSplitAmount || 0).toLocaleString()}`
                  : "••••"}
              </p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <p className="text-[10px] opacity-80 ">Pot Balance</p>
              <p className="font-semibold">
                &#8358;
                {showBalance
                  ? `${(userBalance - totalSplitAmount || 0).toLocaleString()}`
                  : "••••"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
