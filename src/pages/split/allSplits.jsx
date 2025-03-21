import { useEffect, useState } from "react";
import { Share2, TrendingUp, ArrowRight, Plus, Loader } from "lucide-react";
import SplitCard from "../../components/SplitCard.jsx";
import apiService from "../../utils/ApiService.js";
import { Link, useNavigate } from "react-router-dom";

const AllSplits = () => {
  const [activeTab, setActiveTab] = useState("private");
  const [splits, setSplits] = useState([]);
  const [splitsLoading, setSplitsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSplits = async () => {
      setSplitsLoading(true);
      try {
        const response = await apiService.getUserSplits();
        console.log("Splits:", response.data);

        const data = response.data;
        console.log("All Splits:", data);

        setSplits(data);
      } catch (error) {
        console.error("Error fetching splits:", error);
      }
      setSplitsLoading(false);
    };

    fetchSplits();
  }, []);

  // Filter splits based on active tab
  const filteredSplits =
    activeTab === "all"
      ? splits
      : splits.filter((split) => split.type === activeTab);

  // Calculate total allocated amount for filtered splits
  const totalAllocated = filteredSplits.reduce(
    (sum, split) => sum + split.allocatedAmount,
    0
  );

  return (
    <div className="max-w-lg mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium text-gray-50">All Splits</h1>
        <Link
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          to="/create"
        >
          <Plus size={16} />
        </Link>
      </div>

      {/* Stats Card */}
      <div className="relative bg-blue-600 text-white p-6 rounded-xl shadow-sm mb-8">
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
          <img
            className="w-auto h-full"
            src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-100 font-medium text-sm">Total Allocated</p>
          <TrendingUp className="text-gray-100" size={20} />
        </div>
        <div className="flex gap-2 items-end text-white">
          <p className="text-3xl font-bold text-white">
            {" "}
            &#8358;{totalAllocated.toLocaleString()}
          </p>
          <span className="text-xs text-gray-100 font-medium mt-1">
            Across {filteredSplits.length} splits
          </span>
        </div>
      </div>

      <div className="flex bg-transparent border-gray-200 mb-6">
        {["All", "Private", "Public", "Savings", "Lending"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-1 px-3 text-center text-sm font-medium transition-all duration-300 ${
              activeTab === tab.toUpperCase()
                ? "text-white bg-blue-500/30 rounded-full border-blue-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => {
              setActiveTab(tab.toUpperCase());
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Splits List */}
      {!splitsLoading ? (
        <SplitCard splits={filteredSplits} />
      ) : (
        <Loader size={20} className="animate-spin text-blue-200 mx-auto" />
      )}

      {filteredSplits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No{" "}
            {activeTab.toLowerCase() === "all" ? "" : activeTab.toLowerCase()}{" "}
            splits found
          </p>
        </div>
      )}
    </div>
  );
};

export default AllSplits;
