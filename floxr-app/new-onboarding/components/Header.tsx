import React from 'react';

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className="w-full flex-shrink-0 bg-white/80 dark:bg-[#101622]/90 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-slate-200 dark:border-[#282e39]">
      <div className="flex flex-wrap justify-between items-center gap-6">
        <div>
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Onboarding Pipeline</h2>
          <p className="text-slate-500 dark:text-[#9da6b9] text-sm mt-1">Manage and track new hires across all stages.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            </span>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2.5 bg-slate-100 dark:bg-[#1f2937] border border-transparent focus:border-primary/50 rounded-lg leading-5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm transition-all shadow-sm"
              placeholder="Search candidates..."
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-[#3b4354] rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#2d3748] transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span>Filter</span>
          </button>
          <button
            onClick={onOpenModal}
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="whitespace-nowrap">Start New Onboarding</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
