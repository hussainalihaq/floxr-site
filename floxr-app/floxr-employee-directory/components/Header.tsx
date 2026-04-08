import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-4 py-4 sm:px-8 sm:py-6 border-b border-transparent dark:border-transparent">
      <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
        <div className="flex min-w-72 flex-col gap-1">
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Employee Directory</h2>
          <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Manage access, track onboarding progress, and view equipment assignments.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="whitespace-nowrap">Add New Employee</span>
        </button>
      </div>
    </header>
  );
};