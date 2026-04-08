import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard' },
    { icon: 'group', label: 'Employees' },
    { icon: 'person_add', label: 'Onboarding', active: true },
    { icon: 'schema', label: 'Workflows' },
    { icon: 'link', label: 'Integrations' },
    { icon: 'bar_chart', label: 'Analytics' },
    { icon: 'calendar_month', label: 'Attendance' },
    { icon: 'payments', label: 'Payroll' },
    { icon: 'admin_panel_settings', label: 'Users & Access' },
    { icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-[#282e39] transition-colors duration-300">
      <div className="flex flex-col h-full">
        {/* User Profile */}
        <div className="p-8 border-b border-slate-200 dark:border-[#282e39]">
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 dark:bg-[#1f2937] ring-2 ring-primary/20 text-slate-500 dark:text-slate-400 overflow-hidden">
              <span className="material-symbols-outlined text-[32px]">account_circle</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1.5 truncate">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                item.active
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${!item.active && 'group-hover:text-primary transition-colors'}`}>
                {item.icon}
              </span>
              <p className="text-sm font-medium">{item.label}</p>
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-slate-200 dark:border-[#282e39]">
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-red-500 dark:hover:text-red-400 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
