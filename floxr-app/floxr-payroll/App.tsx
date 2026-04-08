import React from 'react';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import PayrollTable from './components/PayrollTable';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-transparent dark:border-transparent">
          <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
            <div className="flex min-w-72 flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                Payroll Management
              </h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-sm">
                Process salaries, manage deductions, and approve payments.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary border border-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md shadow-primary/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              <span className="whitespace-nowrap">Run Payroll</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
            <StatsCards />
            <PayrollTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;