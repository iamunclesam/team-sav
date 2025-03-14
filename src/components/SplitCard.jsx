import { HandCoins, Share2, UsersRound, TrendingUp, PiggyBank, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import apiService from '../utils/ApiService';


const SplitCard = () => {
    const [splits, setSplits] = useState([]);

    useEffect(() => {
        const fetchSplits = async () => {
            try {
                const response = await apiService.getUserSplits();
                console.log("Splits:", response.data);
                
                const data = response.data;
                setSplits(data);
            } catch (error) {
                console.error('Error fetching splits:', error);
            }
        };

        fetchSplits();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
            {splits.map(split => {
                // Color mappings
                const colorMap = {
                    blue: {
                        bg: "bg-blue-100",
                        border: "border-blue-300",
                        progress: "from-blue-500 to-blue-600",
                        text: "text-blue-700"
                    },
                    green: {
                        bg: "bg-green-100",
                        border: "border-green-300",
                        progress: "from-green-500 to-green-600",
                        text: "text-green-700"
                    },
                    purple: {
                        bg: "bg-purple-100",
                        border: "border-purple-300",
                        progress: "from-purple-500 to-purple-600",
                        text: "text-purple-700"
                    },
                    orange: {
                        bg: "bg-orange-100",
                        border: "border-orange-300",
                        progress: "from-orange-500 to-orange-600",
                        text: "text-orange-700"
                    }
                };

                const colors = colorMap[split.color];

                return (
                    <div key={split.id} className={`${colors.bg} p-4 rounded-xl  border-2 ${colors.border} hover:shadow-lg transition-shadow duration-300`}>
                        <div className="flex justify-between items-center gap-1 mb-3">
                            <h3 className="font-medium text-md text-gray-800 truncate">{split.name}</h3>
                            {split.type === 'PUBLIC' && (
                                <div className="flex flex-shrink-0 items-center justify-center gap-1 bg-white w-8 h-8 rounded-full">
                                    <UsersRound strokeWidth={3} size={16} className={colors.text} />
                                </div>
                            )}
                            {split.type === 'SAVINGS' && (
                                <div className="flex flex-shrink-0 items-center justify-center gap-1 bg-white w-8 h-8 rounded-full">
                                    <PiggyBank strokeWidth={3} size={16} className={colors.text} />
                                </div>
                            )}
                            {split.type === 'LENDING' && (
                                <div className="flex flex-shrink-0 items-center justify-center gap-1 bg-white w-8 h-8 rounded-full">
                                    <HandCoins strokeWidth={3} size={16} className={colors.text} />
                                </div>
                            )}
                            {split.type === 'PRIVATE' && (
                                <div className="flex flex-shrink-0 items-center justify-center gap-1 bg-white w-8 h-8 rounded-full">
                                    <Lock strokeWidth={3} size={16} className={colors.text} />
                                </div>
                            )}
                        </div>

                        <div className="mt-4 mb-3">
                            <div className={`h-2 bg-gray-100 border ${colors.border} rounded-full overflow-hidden`}>
                                <div
                                    className={`h-full bg-gradient-to-r ${colors.progress}  rounded-full transition-all duration-500 ease-in-out`}
                                    style={{ width: `${Math.min((split.allocatedAmount / split.amount) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm mt-2">
                            {split.type === 'public' && (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-xs">Target</span>
                                    <span className="font-semibold text-gray-800">${split.amount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-xs">Allocated</span>
                                <span className={`font-semibold ${colors.text}`}>${split.allocatedAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SplitCard;