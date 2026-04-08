import React from 'react';

const NavItem: React.FC<{ 
  icon: string; 
  label: string; 
  active?: boolean;
  isButton?: boolean;
}> = ({ icon, label, active, isButton }) => {
  const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group";
  const activeClasses = "bg-primary text-white shadow-lg shadow-primary/20";
  const inactiveClasses = "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark hover:text-slate-900 dark:hover:text-white";

  const className = `${baseClasses} ${active ? activeClasses : inactiveClasses}`;

  return (
    <a href="#" className={className}>
      <span className={`material-symbols-outlined text-[20px] ${!active ? 'group-hover:text-primary transition-colors' : ''}`}>
        {icon}
      </span>
      <p>{label}</p>
    </a>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-border-dark transition-colors duration-300">
      <div className="flex flex-col h-full">
        {/* User Profile Snippet */}
        <div className="p-6 border-b border-slate-200 dark:border-border-dark">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-[#1f2937] ring-2 ring-primary/20 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1 truncate">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <NavItem icon="dashboard" label="Dashboard" />
          <NavItem icon="group" label="Employees" active />
          <NavItem icon="person_add" label="Onboarding" />
          <NavItem icon="schema" label="Workflows" />
          <NavItem icon="link" label="Integrations" />
          <NavItem icon="bar_chart" label="Analytics" />
          <NavItem icon="calendar_month" label="Attendance" />
          <NavItem icon="payments" label="Payroll" />
          <NavItem icon="admin_panel_settings" label="Users & Access" />
          <NavItem icon="settings" label="Settings" />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-border-dark">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark hover:text-red-500 dark:hover:text-red-400 transition-all">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};