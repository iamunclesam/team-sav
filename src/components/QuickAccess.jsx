import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const QuickAccess = () => {
  const quickActions = [
    {
      id: "/home/splits/transfer",
      name: "Transfer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 10H4l5.5-6M4 14h16l-5.5 6"
          />
        </svg>
      ),
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "home/splits/withdraw",
      name: "Withdraw",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.25 6H9c-1.886 0-2.828 0-3.414.586S5 8.114 5 10v6.25h14V10c0-1.886 0-2.828-.586-3.414S16.886 6 15 6h-2.25v4.973l.68-.794a.75.75 0 1 1 1.14.976l-2 2.333a.75.75 0 0 1-1.14 0l-2-2.333a.75.75 0 0 1 1.14-.976l.68.794zM5.03 17.75h13.94c-.052.79-.189 1.297-.556 1.664C17.828 20 16.886 20 15 20H9c-1.886 0-2.828 0-3.414-.586c-.367-.367-.504-.873-.555-1.664"
          />
          <path
            fill="currentColor"
            d="M5.889 3H18.11C20.26 3 22 4.8 22 7.02c0 1.29-.587 2.437-1.5 3.173v-.282c0-.866 0-1.66-.087-2.305c-.095-.711-.32-1.463-.938-2.08c-.618-.619-1.37-.844-2.08-.94c-.646-.086-1.44-.086-2.306-.086H8.91c-.865 0-1.659 0-2.304.087c-.711.095-1.463.32-2.08.938c-.619.618-.844 1.37-.94 2.08c-.086.646-.086 1.44-.086 2.306v.282A4.06 4.06 0 0 1 2 7.02C2 4.8 3.741 3 5.889 3"
          />
        </svg>
      ),
      color: "bg-green-100 text-green-600",
    },
    {
      id: "/home/splits/create",
      name: "Create Split",
      icon: <Plus size={28} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "report",
      name: "History",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
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
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action) => (
          <Link
            end
            to={action.id}
            key={action.id}
            className="flex flex-col items-center justify-center rounded-lg transition-all hover:shadow-md "
          >
            <div
              className={`w-16 h-16 ${action.color} rounded-md p-2 flex items-center justify-center mb-2`}
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
