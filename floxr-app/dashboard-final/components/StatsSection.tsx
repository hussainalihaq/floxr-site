import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Hours Saved */}
      <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">
            Hours Saved
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-1 rounded text-[20px]">
            trending_up
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-slate-900 dark:text-white text-2xl font-bold">1,245 hrs</p>
          <p className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
            +15%
          </p>
        </div>
        <div className="h-8 w-full mt-1">
          <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 30" width="100%">
            <path
              className="opacity-50"
              d="M0,30 Q25,25 50,15 T100,5"
              fill="none"
              stroke="#135bec"
              strokeWidth="2"
            />
            <path
              className="opacity-20"
              d="M0,30 Q25,25 50,15 T100,5 V30 H0 Z"
              fill="url(#grad1)"
            />
            <defs>
              <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#135bec', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#135bec', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Card 2: Today's Attendance */}
      <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">
            Today's Attendance
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded text-[20px]">
            co_present
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-slate-900 dark:text-white text-2xl font-bold">85/100</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Present</p>
        </div>
        <div className="w-full mt-2 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-[10px] text-slate-400 dark:text-slate-500">15 Away/Remote</p>
          <p className="text-[10px] font-bold text-emerald-500">Good Turnout</p>
        </div>
      </div>

      {/* Card 3: Pending Approvals */}
      <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">
            Pending Approvals
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-500/10 p-1 rounded text-[20px]">
            pending_actions
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-slate-900 dark:text-white text-2xl font-bold">12</p>
          <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded">
            Action Required
          </span>
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 2 Payroll Batches
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 10 Expense Reports
          </div>
        </div>
      </div>

      {/* Card 4: This Month Payroll */}
      <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">
            This Month Payroll
          </p>
          <span className="material-symbols-outlined text-purple-500 bg-purple-500/10 p-1 rounded text-[20px]">
            payments
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <p className="text-slate-900 dark:text-white text-2xl font-bold">$142,500</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Total payout</p>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Scheduled
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
