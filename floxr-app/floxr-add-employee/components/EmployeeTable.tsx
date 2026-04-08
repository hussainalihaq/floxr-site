import React from 'react';
import { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <div className="bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-[#282e39]">
          <thead className="bg-slate-50 dark:bg-[#111318]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role & Dept</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Equipment</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Onboarding Progress</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {employee.avatarUrl ? (
                      <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#1f2937]" src={employee.avatarUrl} alt={employee.name} />
                    ) : (
                      <div className={`h-10 w-10 rounded-full ${employee.initialsColor} flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-[#1f2937]`}>
                        {employee.initials}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{employee.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900 dark:text-white font-medium">{employee.role}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{employee.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                    ${employee.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : ''}
                    ${employee.status === 'Onboarding' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' : ''}
                    ${employee.status === 'Offboarding' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' : ''}
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full 
                       ${employee.status === 'Active' ? 'bg-emerald-500' : ''}
                       ${employee.status === 'Onboarding' ? 'bg-blue-500 animate-pulse' : ''}
                       ${employee.status === 'Offboarding' ? 'bg-amber-500' : ''}
                    `}></span>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">{employee.equipmentIcon}</span>
                    <span className="max-w-[150px] truncate" title={employee.equipment}>{employee.equipment}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.exitPending ? (
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400 italic">Exit Pending</span>
                     </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${employee.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${employee.progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {employee.progress}%
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282e39]">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-[#282e39] flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-medium text-slate-900 dark:text-white">1-{employees.length}</span> of <span className="font-medium text-slate-900 dark:text-white">42</span> employees</p>
        <div className="flex gap-2">
          <button disabled className="px-3 py-1 text-sm border border-slate-200 dark:border-[#282e39] rounded-lg bg-white dark:bg-[#181c24] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors disabled:opacity-50">Previous</button>
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#282e39] rounded-lg bg-white dark:bg-[#181c24] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};
