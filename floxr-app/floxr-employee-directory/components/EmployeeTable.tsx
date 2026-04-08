import React from 'react';
import { Employee, EmployeeStatus } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
}

const StatusBadge: React.FC<{ status: EmployeeStatus }> = ({ status }) => {
  if (status === EmployeeStatus.Active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Active
      </span>
    );
  } else if (status === EmployeeStatus.Onboarding) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
        Onboarding
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Offboarding
      </span>
    );
  }
};

const ProgressBar: React.FC<{ progress: number; status: EmployeeStatus }> = ({ progress, status }) => {
  const colorClass = status === EmployeeStatus.Active 
    ? "bg-emerald-500" 
    : status === EmployeeStatus.Onboarding 
      ? "bg-blue-500"
      : "bg-slate-500";
    
  const textColorClass = status === EmployeeStatus.Active 
    ? "text-emerald-600 dark:text-emerald-400"
    : status === EmployeeStatus.Onboarding
      ? "text-blue-600 dark:text-blue-400"
      : "text-slate-600 dark:text-slate-400";

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
            className={`h-full rounded-full ${colorClass}`} 
            style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className={`text-xs font-medium ${textColorClass}`}>{progress}%</span>
    </div>
  );
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <table className="min-w-full divide-y divide-slate-200 dark:divide-border-dark">
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
      <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
        {employees.map((employee) => (
          <tr key={employee.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors">
            {/* Employee Name & Avatar */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                {employee.avatarUrl ? (
                  <img src={employee.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#1f2937]" />
                ) : (
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-[#1f2937] ${employee.initialsColorClass}`}>
                    {employee.initials}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{employee.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{employee.email}</div>
                </div>
              </div>
            </td>

            {/* Role & Dept */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-900 dark:text-white font-medium">{employee.role}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{employee.department}</div>
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={employee.status} />
            </td>

            {/* Equipment */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined text-[18px] text-slate-400">{employee.equipmentIcon}</span>
                <span>{employee.equipment}</span>
              </div>
            </td>

            {/* Progress / Exit Status */}
            <td className="px-6 py-4 whitespace-nowrap">
              {employee.status === EmployeeStatus.Offboarding && employee.exitNote ? (
                 <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 italic">{employee.exitNote}</span>
                 </div>
              ) : (
                <ProgressBar progress={employee.progress || 0} status={employee.status} />
              )}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282e39]">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};