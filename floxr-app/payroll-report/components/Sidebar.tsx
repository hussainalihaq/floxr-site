import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Workflow, 
  Link as LinkIcon, 
  BarChart2, 
  Calendar, 
  Banknote, 
  Shield, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Users, label: "Employees", active: false },
    { icon: UserPlus, label: "Onboarding", active: false },
    { icon: Workflow, label: "Workflows", active: false },
    { icon: LinkIcon, label: "Integrations", active: false },
    { icon: BarChart2, label: "Analytics", active: false },
    { icon: Calendar, label: "Attendance", active: false },
    { icon: Banknote, label: "Payroll", active: true },
    { icon: Shield, label: "Users & Access", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-[#282e39] transition-colors duration-300">
      <div className="flex flex-col h-full">
        {/* User Profile */}
        <div className="p-6 border-b border-slate-200 dark:border-[#282e39]">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-[#1f2937] ring-2 ring-primary/20 text-slate-500 dark:text-slate-400">
              <User size={24} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1 truncate">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                item.active
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={`transition-colors ${
                  !item.active ? "group-hover:text-primary" : ""
                }`}
              />
              <p className="text-sm font-medium">{item.label}</p>
            </a>
          ))}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-[#282e39]">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-red-500 dark:hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;