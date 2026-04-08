import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  GitGraph, 
  Link as LinkIcon, 
  BarChart2, 
  Calendar, 
  DollarSign, 
  Shield, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false }: { icon: React.ElementType, label: string, active?: boolean }) => (
  <a 
    href="#" 
    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    <Icon className={`w-[22px] h-[22px] ${!active ? 'group-hover:text-primary transition-colors' : ''}`} />
    <p className="text-sm font-medium">{label}</p>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-border-dark transition-colors duration-300 h-full">
      <div className="flex flex-col h-full overflow-hidden">
        {/* User Profile Snippet */}
        <div className="p-8 border-b border-slate-200 dark:border-border-dark flex-shrink-0">
          <div className="flex gap-4 items-center">
            <div className="relative h-12 w-12 rounded-full ring-2 ring-slate-100 dark:ring-border-dark overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80" 
                 alt="Admin" 
                 className="h-full w-full object-cover"
               />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#111318] rounded-full"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1.5 truncate">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Users} label="Employees" />
          <NavItem icon={UserPlus} label="Onboarding" active />
          <NavItem icon={GitGraph} label="Workflows" />
          <NavItem icon={LinkIcon} label="Integrations" />
          <NavItem icon={BarChart2} label="Analytics" />
          <NavItem icon={Calendar} label="Attendance" />
          <NavItem icon={DollarSign} label="Payroll" />
          <NavItem icon={Shield} label="Users & Access" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-border-dark flex-shrink-0">
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark hover:text-red-500 dark:hover:text-red-400 transition-all">
            <LogOut size={22} />
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};