import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Workflow, 
  Link as LinkIcon, 
  BarChart2, 
  Calendar, 
  CreditCard, 
  Shield, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false, href = "#" }: { icon: any, label: string, active?: boolean, href?: string }) => (
  <a 
    href={href}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/20" 
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-slate-900 dark:hover:text-white"
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? "text-white" : "group-hover:text-primary transition-colors"}`} />
    <p className="text-sm font-medium">{label}</p>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-border-dark transition-colors duration-300">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-slate-200 dark:border-border-dark">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-[#1f2937] ring-2 ring-primary/20 text-slate-500 dark:text-slate-400">
              <User className="w-6 h-6" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none truncate">Hussain Haq</h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium mt-1 truncate">Admin Console</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Users} label="Employees" />
          <NavItem icon={UserPlus} label="Onboarding" />
          <NavItem icon={Workflow} label="Workflows" />
          <NavItem icon={LinkIcon} label="Integrations" />
          <NavItem icon={BarChart2} label="Analytics" active />
          <NavItem icon={Calendar} label="Attendance" />
          <NavItem icon={CreditCard} label="Payroll" />
          <NavItem icon={Shield} label="Users & Access" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-border-dark">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#282e39] hover:text-red-500 dark:hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" />
            <p className="text-sm font-medium">Logout</p>
          </a>
        </div>
      </div>
    </aside>
  );
};