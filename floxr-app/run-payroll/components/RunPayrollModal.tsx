import React, { useState } from 'react';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RunPayrollModal: React.FC<RunPayrollModalProps> = ({ isOpen, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    hours: true,
    deductions: true,
    invoices: false,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-display">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#1e2330]/95 dark:bg-[#181c24]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white">Run Payroll</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-primary font-medium">Finalize & Generate Report</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Summary Card */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#111318]/50 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 rounded-lg text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pay Period</p>
                <p className="text-white font-bold text-lg">Oct 1 - Oct 31, 2023</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> On Schedule
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">Verification Checklist</h4>
            <div className="space-y-3">
              
              {/* Item 1 */}
              <div 
                onClick={() => toggleCheck('hours')}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                  ${checkedItems.hours ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'}
                `}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                   ${checkedItems.hours ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}
                `}>
                  <span className="material-symbols-outlined text-[16px]">{checkedItems.hours ? 'check' : 'remove'}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium transition-colors ${checkedItems.hours ? 'text-white group-hover:text-emerald-200' : 'text-slate-300'}`}>Confirm all employee hours</p>
                  <p className="text-xs text-emerald-500/70">Verified by System</p>
                </div>
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => toggleCheck('deductions')}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                  ${checkedItems.deductions ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'}
                `}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                   ${checkedItems.deductions ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}
                `}>
                   <span className="material-symbols-outlined text-[16px]">{checkedItems.deductions ? 'check' : 'remove'}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium transition-colors ${checkedItems.deductions ? 'text-white group-hover:text-emerald-200' : 'text-slate-300'}`}>Review pending deductions</p>
                  <p className="text-xs text-emerald-500/70">Verified by Admin</p>
                </div>
              </div>

              {/* Item 3 (Action Required) */}
              <div 
                onClick={() => toggleCheck('invoices')}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                  ${checkedItems.invoices 
                    ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' 
                    : 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20'
                  }
                `}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all border-2
                   ${checkedItems.invoices 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-amber-500 text-transparent group-hover:bg-amber-500 group-hover:text-white'
                   }
                `}>
                   <span className="material-symbols-outlined text-[16px]">{checkedItems.invoices ? 'check' : 'priority_high'}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold transition-colors ${checkedItems.invoices ? 'text-emerald-200' : 'text-amber-400 group-hover:text-amber-200'}`}>
                    {checkedItems.invoices ? 'Consultant invoices validated' : 'Validate consultant invoices'}
                  </p>
                  <p className={`text-xs ${checkedItems.invoices ? 'text-emerald-500/70' : 'text-amber-500/70'}`}>
                    {checkedItems.invoices ? 'Approved manually' : '2 Invoices require manual approval'}
                  </p>
                </div>
                {!checkedItems.invoices && (
                  <button className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-500 rounded hover:bg-amber-400 transition-colors">
                    Review Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Totals Grid */}
          <div className="bg-gradient-to-br from-[#282e39] to-[#181c24] rounded-xl p-5 border border-white/5 shadow-inner">
            <div className="grid grid-cols-3 gap-8 divide-x divide-white/10">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium">Total Gross Pay</p>
                <p className="text-lg font-bold text-white font-mono">$125,400.00</p>
              </div>
              <div className="pl-8 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Total Deductions</p>
                <p className="text-lg font-bold text-red-400 font-mono">-$18,200.00</p>
              </div>
              <div className="pl-8 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Net Total</p>
                <p className="text-xl font-black text-emerald-400 font-mono">$107,200.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-white/5 flex justify-between items-center bg-white/5">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/25 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px]">
            <span>Generate Payroll Report</span>
            <span className="material-symbols-outlined text-[18px]">description</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunPayrollModal;
