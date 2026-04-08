import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import PayrollTable from './components/PayrollTable';
import RunPayrollModal from './components/RunPayrollModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to handle keyboard escape key for modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="flex h-screen w-full font-display relative">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-transparent dark:border-transparent">
          <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
            <div className="flex min-w-72 flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Payroll Management</h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Process salaries, manage deductions, and approve payments.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary border border-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              <span className="whitespace-nowrap">Run Payroll</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${isModalOpen ? 'blur-sm pointer-events-none select-none' : ''}`}>
          <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                title="Total Payroll"
                value="$125,400"
                trend="+1.2%"
                icon="payments"
                iconColorClass="text-primary bg-primary/10"
                progress={75}
              />
               <StatsCard 
                title="Pending Approvals"
                value="12"
                subValue="Requests"
                subLabel="Requires admin review"
                icon="pending_actions"
                iconColorClass="text-amber-500 bg-amber-500/10"
              />
               <StatsCard 
                title="Taxes & Deductions"
                value="$18,200"
                subValue="Total"
                subLabel="~14.5% of Gross Pay"
                icon="account_balance"
                iconColorClass="text-purple-500 bg-purple-500/10"
              />
              <StatsCard 
                title="Next Pay Date"
                value="Nov 1"
                subValue="2023"
                subLabel="Auto-scheduled run"
                icon="calendar_month"
                iconColorClass="text-emerald-500 bg-emerald-500/10"
              />
            </div>

            {/* Main Table */}
            <PayrollTable />

          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <RunPayrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
