const QuickAccess = () => {
    const quickActions = [
        {
            id: 'transfer',
            name: 'Transfer',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                    <path d="M23 12v4a2 2 0 0 1-2 2h-2"></path>
                    <path d="m15 9-2 2-2-2"></path>
                    <path d="M11 13v-2"></path>
                </svg>
            ),
            color: 'bg-blue-100 text-blue-600'
        },
        {
            id: 'withdraw',
            name: 'Withdraw',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="6" x2="6" y1="10" y2="14"></line>
                    <line x1="12" x2="12" y1="10" y2="14"></line>
                    <line x1="18" x2="18" y1="10" y2="14"></line>
                </svg>
            ),
            color: 'bg-green-100 text-green-600'
        },
        {
            id: 'split',
            name: 'Split Fund',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3h5v5"></path>
                    <path d="M8 3H3v5"></path>
                    <path d="M21 16v5h-5"></path>
                    <path d="M3 16v5h5"></path>
                    <path d="M21 8V3h-5"></path>
                    <path d="M9 21a6 6 0 0 0 6-6"></path>
                </svg>
            ),
            color: 'bg-purple-100 text-purple-600'
        },
        {
            id: 'report',
            name: ' Report',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                </svg>
            ),
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <div className="rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-medium text-gray-50 mb-4">Quick Access</h2>
            <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
                <button
                key={action.id}
                className="flex flex-col items-center justify-center rounded-lg transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                <div className={`w-16 h-16 ${action.color} rounded-md p-2 flex items-center justify-center mb-2`}>
                    {action.icon}
                </div>
                <span className="text-xs font-normal text-gray-200">{action.name}</span>
                </button>
            ))}
            </div>
        </div>
    );
};

export default QuickAccess;