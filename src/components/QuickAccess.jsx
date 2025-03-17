import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const QuickAccess = () => {
  const quickActions = [
    {
      id: "/home/splits/transfer",
      name: "Transfer",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 4v16l-6-5.5M14 20V4l6 5.5" /></svg>
      ),
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "home/splits/withdraw",
      name: "Withdraw",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a3 3 0 1 0 3 3a3 3 0 0 0-3-3m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1m-.71-6.29a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21L15 7.46A1 1 0 1 0 13.54 6l-.54.59V3a1 1 0 0 0-2 0v3.59L10.46 6A1 1 0 0 0 9 7.46ZM19 15a1 1 0 1 0-1 1a1 1 0 0 0 1-1m1-7h-3a1 1 0 0 0 0 2h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3M5 15a1 1 0 1 0 1-1a1 1 0 0 0-1 1" /></svg>
      ),
      color: "bg-green-100 text-green-600",
    },
    {
      id: "/home/splits/create",
      name: "Create Split",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="M14 17h-3.5v-6.5H17V14a3 3 0 0 1-3 3m3-7.5h-6.5V3H14a3 3 0 0 1 3 3zM6 3h3.5v14H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3" /></svg>
      ),
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "report",
      name: "History",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      ),
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="rounded-xl shadow-md mb-6">
      <h2 className="text-md font-medium text-gray-50 mb-4">Quick Access</h2>
      <div className="grid grid-cols-4 gap-0 border border-gray-700 bg-stone-900 p-1 py-2 rounded-lg">
        {quickActions.map((action) => (
          <Link
            end
            to={action.id}
            key={action.id}
            className="flex flex-col items-center justify-between rounded-lg transition-all hover:shadow-md "
          >
            <div
              className={`w-16 h-16 ${action.color} rounded-md p-0 flex items-center justify-center mb-2`}
            >
              {action.icon}
            </div>
            <span className="text-xs font-normal text-gray-200">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
