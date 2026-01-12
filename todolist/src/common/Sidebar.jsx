import { NavLink } from "react-router-dom";
import { FaTasks, FaHome, FaPlus } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";

const Sidebar = () => {
  const sidebarLinks = [
    { to: "/dashboard", label: "Dashboard", icon: FaHome },
    { to: "/tasks/new", label: "Add Task", icon: FaPlus },
    { to: "/view/tasks", label: "View Tasks", icon: FaTasks },
    { to: "/projects", label: "Projects", icon: TbCategoryPlus },
  ];

  return (
    <div className="sticky top-0 w-64 max-w-md h-screen bg-white shadow-2xl flex flex-col">
      <div className="flex px-3 mt-12 mb-4 font-bold text-gray-600 text-3xl">
        TODO App
      </div>

      <nav className="flex flex-col gap-y-4 p-4">
        {sidebarLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-x-2 ${
                isActive ? "text-violet-500 font-semibold" : "text-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

