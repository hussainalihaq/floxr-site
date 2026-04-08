import React from 'react';
import { SidebarLink } from '../types';

const links: SidebarLink[] = [
  { icon: 'dashboard', label: 'Dashboard' },
  { icon: 'group', label: 'Employees' },
  { icon: 'person_add', label: 'Onboarding' },
  { icon: 'schema', label: 'Workflows' },
  { icon: 'link', label: 'Integrations', isActive: true },
  { icon: 'bar_chart', label: 'Analytics' },
  { icon: 'calendar_month', label: 'Attendance' },
  { icon: 'payments', label: 'Payroll' },
  { icon: 'admin_panel_settings', label: 'Users & Access' },
  { icon: 'settings', label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-[#282e39] transition-colors duration-300 h-full hidden md:flex">
      <div className="flex flex-col h-full">
        {/* User Profile */}
        <div className="p-6 border-b border-slate-200 dark:border-[#282e39]">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-[#1f2937] ring-2 ring-primary/20 text-slate-500 dark:text-slate-400 overflow-hidden">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1 truncate">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                link.isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  !link.isActive && 'group-hover:text-primary'
                }`}
              >
                {link.icon}
              </span>
              <p className="text-sm font-medium">{link.label}</p>
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-[#282e39]">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-red-500 dark:hover:text-red-400 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};