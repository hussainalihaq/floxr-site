import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Printer, Download, TrendingUp, MoreHorizontal, Search } from 'lucide-react';
import CostChart from './CostChart';
import { SUMMARY_STATS, DEPARTMENTS, EMPLOYEES, CHART_DATA } from '../constants';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-[#0b0e14]">
      {/* Header */}
      <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-8 py-5 border-b border-slate-200 dark:border-[#1e2330]">
        <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>Payroll</span>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-white font-medium">Reports</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">Payroll Report Preview</h2>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] hover:bg-slate-50 dark:hover:bg-[#1f2937] text-slate-600 dark:text-slate-300 text-sm font-medium transition-all">
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Summary Header Card */}
          <div className="bg-white dark:bg-[#181c24] rounded-2xl border border-slate-200 dark:border-[#282e39] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Generated Successfully
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Payroll Report: Oct 2023</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Period: October 1, 2023 - October 31, 2023 • ID: #PY-2023-10-A</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold transition-colors">
                  <Printer size={20} />
                  Print
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-primary/25 transition-all transform hover:translate-y-[-1px]">
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Stats) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Gross Pay */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-4 opacity-5 dark:opacity-5 group-hover:opacity-10 transition-opacity">
                  <BanknoteIcon className="text-slate-900 dark:text-white" size={96} />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Gross Pay</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">{formatCurrency(SUMMARY_STATS.totalGrossPay)}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <TrendingUp size={14} /> {SUMMARY_STATS.grossPayChange}%
                    </span>
                    <span className="text-xs text-slate-400">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-4 opacity-5 dark:opacity-5 group-hover:opacity-10 transition-opacity">
                  <WalletIcon className="text-slate-900 dark:text-white" size={96} />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Net Pay Disbursed</p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">{formatCurrency(SUMMARY_STATS.netPayDisbursed)}</p>
                  <div className="mt-4 w-full bg-slate-100 dark:bg-[#282e39] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${SUMMARY_STATS.netPayProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Taxes */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Taxes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(SUMMARY_STATS.totalTaxes)}</p>
                  <p className="text-xs text-slate-400 mt-1">Federal & State</p>
                </div>
              </div>

              {/* Deductions */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Deductions</p>
                  <p className="text-2xl font-bold text-red-500 dark:text-red-400 font-mono">{formatCurrency(SUMMARY_STATS.totalDeductions)}</p>
                  <p className="text-xs text-slate-400 mt-1">Benefits & 401k</p>
                </div>
              </div>

            </div>

            {/* Right Column (Donut Chart) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cost Distribution</h3>
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <CostChart />
                <div className="w-full mt-6 space-y-3">
                  {CHART_DATA.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Department Breakdown */}
          <div className="bg-white dark:bg-[#181c24] rounded-2xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-[#282e39]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Departmental Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-[#111318] text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Headcount</th>
                    <th className="px-6 py-4">Total Cost</th>
                    <th className="px-6 py-4 w-1/3">Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
                  {DEPARTMENTS.map((dept, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{dept.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{dept.headcount} Employees</td>
                      <td className="px-6 py-4 text-sm font-mono font-medium text-slate-900 dark:text-white">{formatCurrency(dept.totalCost)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-[#282e39] rounded-full overflow-hidden">
                            <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.allocation}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-500">{dept.allocation}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Ledger */}
          <div className="bg-white dark:bg-[#181c24] rounded-2xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Ledger</h3>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search size={18} />
                </span>
                <input 
                  className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  placeholder="Search employee..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-[#111318] text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Base Salary</th>
                    <th className="px-6 py-4 text-right">Overtime</th>
                    <th className="px-6 py-4 text-right">Tax</th>
                    <th className="px-6 py-4 text-right">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {employee.avatar ? (
                            <img className="h-8 w-8 rounded-full object-cover" src={employee.avatar} alt={employee.name} />
                          ) : (
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${employee.initialsColor}`}>
                              {employee.initials}
                            </div>
                          )}
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{employee.role}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-300 text-right">{formatCurrency(employee.baseSalary)}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-300 text-right">{formatCurrency(employee.overtime)}</td>
                      <td className={`px-6 py-4 text-sm font-mono text-right ${employee.tax < 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-400'}`}>
                        {employee.tax < 0 ? '-' : ''}{formatCurrency(Math.abs(employee.tax))}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900 dark:text-white text-right">{formatCurrency(employee.netPay)}</td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No employees found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-[#282e39] flex justify-center">
              <button className="text-sm font-medium text-primary hover:text-blue-500 transition-colors">View All Entries</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

// Custom icons to replace Material Symbols
const BanknoteIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
)
const WalletIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
)

export default Dashboard;