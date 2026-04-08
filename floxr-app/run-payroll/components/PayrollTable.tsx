import React, { useState } from 'react';
import { Employee } from '../types';

const mockData: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Full-Time',
    department: 'Engineering',
    gross: 5000.00,
    deductions: 500.00,
    net: 4500.00,
    method: 'Direct Deposit',
    status: 'Paid',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo'
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'Full-Time',
    department: 'Design',
    gross: 4800.00,
    deductions: 480.00,
    net: 4320.00,
    method: 'Direct Deposit',
    status: 'Processing',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8'
  },
  {
    id: '3',
    name: 'Mike Ross',
    role: 'Consultant',
    department: 'Legal',
    gross: 12000.00,
    deductions: 0.00,
    net: 12000.00,
    method: 'Wire Transfer',
    status: 'Pending Approval',
    initials: 'MR',
    initialsColor: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  },
  {
    id: '4',
    name: 'Jessica Pearson',
    role: 'Full-Time',
    department: 'Management',
    gross: 15000.00,
    deductions: 2000.00,
    net: 13000.00,
    method: 'Direct Deposit',
    status: 'Paid',
    initials: 'JP',
    initialsColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
  },
  {
    id: '5',
    name: 'Donna Lewis',
    role: 'Consultant',
    department: 'Operations',
    gross: 4200.00,
    deductions: 420.00,
    net: 3780.00,
    method: 'Check',
    status: 'Paid',
    initials: 'DL',
    initialsColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const PayrollTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'full-time' | 'consultant'>('full-time');

  return (
    <div className="flex flex-col bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden">
      <div className="flex flex-col border-b border-slate-200 dark:border-[#282e39]">
        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-5 pb-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('full-time')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${activeTab === 'full-time' ? 'text-primary border-primary' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'}`}
          >
            Full-Time Employees
          </button>
          <button 
            onClick={() => setActiveTab('consultant')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeTab === 'consultant' ? 'text-primary border-primary' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'}`}
          >
            Third-Party Consultants
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
              placeholder="Search by name, ID, or department..."
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <input
                className="pl-4 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                type="month"
                defaultValue="2023-10"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-[#1f2937]/30 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-4">Recipient</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Gross Pay</th>
              <th className="px-6 py-4">Deductions</th>
              <th className="px-6 py-4">Net Pay</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
            {mockData.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {employee.avatar ? (
                        <img 
                          src={employee.avatar} 
                          alt="Avatar"
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all"
                        />
                      ) : (
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all ${employee.initialsColor}`}>
                          {employee.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{employee.name}</p>
                      <p className="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400">{employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                    ${employee.department === 'Engineering' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : ''}
                    ${employee.department === 'Design' ? 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' : ''}
                    ${employee.department === 'Legal' ? 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400' : ''}
                    ${employee.department === 'Management' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                    ${employee.department === 'Operations' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : ''}
                  `}>
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-mono">{formatCurrency(employee.gross)}</td>
                <td className={`px-6 py-4 text-sm font-mono ${employee.deductions > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {employee.deductions > 0 ? `-${formatCurrency(employee.deductions)}` : '$0.00'}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(employee.net)}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">
                        {employee.method === 'Direct Deposit' || employee.method === 'Wire Transfer' ? 'account_balance' : 'money_off'}
                    </span>
                    <span>{employee.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border 
                     ${employee.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : ''}
                     ${employee.status === 'Processing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' : ''}
                     ${employee.status === 'Pending Approval' ? 'bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300 border-slate-200 dark:border-slate-600/30' : ''}
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full 
                        ${employee.status === 'Paid' ? 'bg-emerald-500' : ''}
                        ${employee.status === 'Processing' ? 'bg-amber-500' : ''}
                        ${employee.status === 'Pending Approval' ? 'bg-slate-500' : ''}
                    `}></span> 
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-200 dark:border-[#282e39] flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-bold text-slate-700 dark:text-slate-200">1-5</span> of <span className="font-bold text-slate-700 dark:text-slate-200">100</span> employees</p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-all" disabled>
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-all">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
