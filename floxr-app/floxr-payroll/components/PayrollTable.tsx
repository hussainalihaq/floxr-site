import React, { useState, useMemo } from 'react';
import { Employee, EmploymentType, PaymentStatus } from '../types';
import { MOCK_EMPLOYEES } from '../constants';

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  let styles = '';
  let dotColor = '';

  switch (status) {
    case PaymentStatus.PAID:
      styles =
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20';
      dotColor = 'bg-emerald-500';
      break;
    case PaymentStatus.PROCESSING:
      styles =
        'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
      dotColor = 'bg-amber-500';
      break;
    case PaymentStatus.PENDING_APPROVAL:
      styles =
        'bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300 border border-slate-200 dark:border-slate-600/30';
      dotColor = 'bg-slate-500';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

const PayrollTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EmploymentType>(EmploymentType.FULL_TIME);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES.filter((emp) => {
      const matchesTab = emp.type === activeTab;
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const totalEmployees = filteredEmployees.length;
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden">
      {/* Controls Header */}
      <div className="flex flex-col border-b border-slate-200 dark:border-[#282e39]">
        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-5 pb-0 overflow-x-auto">
          <button
            onClick={() => {
                setActiveTab(EmploymentType.FULL_TIME);
                setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
              activeTab === EmploymentType.FULL_TIME
                ? 'text-primary border-primary'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Full-Time Employees
          </button>
          <button
            onClick={() => {
                setActiveTab(EmploymentType.CONSULTANT);
                setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === EmploymentType.CONSULTANT
                ? 'text-primary border-primary'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Third-Party Consultants
          </button>
        </div>

        {/* Filters Row */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
              placeholder="Search by name, ID, or department..."
              value={searchQuery}
              onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="month"
                defaultValue="2023-10"
                className="pl-4 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-[#1f2937]/30 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-4">Recipient</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Gross Pay</th>
              <th className="px-6 py-4">Deductions</th>
              <th className="px-6 py-4">Net Pay</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt="User Avatar"
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all"
                          />
                        ) : (
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all ${employee.initialsColorClass}`}
                          >
                            {employee.initials}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {employee.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${employee.departmentColorClass}`}
                    >
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                    {formatCurrency(employee.grossPay)}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-500 dark:text-red-400 font-mono">
                   {employee.deductions > 0 ? `-${formatCurrency(employee.deductions)}` : '$0.00'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {formatCurrency(employee.netPay)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        No employees found matching your criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-[#282e39] flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {Math.min((currentPage - 1) * pageSize + 1, totalEmployees)}-
            {Math.min(currentPage * pageSize, totalEmployees)}
          </span>{' '}
          of <span className="font-bold text-slate-700 dark:text-slate-200">{MOCK_EMPLOYEES.length} (mocked total: 100)</span> employees
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrentPage((p) => (p * pageSize < totalEmployees ? p + 1 : p))}
            disabled={currentPage * pageSize >= totalEmployees}
            className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;