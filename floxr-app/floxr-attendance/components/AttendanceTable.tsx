import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types';
import { DEPARTMENTS } from '../constants';

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

const StatusBadge: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
  switch (status) {
    case 'Present':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Present
        </span>
      );
    case 'Late':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Late
        </span>
      );
    case 'Absent':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Absent
        </span>
      );
    case 'WFH':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> WFH
        </span>
      );
    default:
      return null;
  }
};

const DepartmentBadge: React.FC<{ department: string }> = ({ department }) => {
    let colorClass = "bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400";
    
    if (department === DEPARTMENTS.ENGINEERING) {
        colorClass = "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
    } else if (department === DEPARTMENTS.DESIGN) {
        colorClass = "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
    } else if (department === DEPARTMENTS.LEGAL) {
        colorClass = "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400";
    } else if (department === DEPARTMENTS.MANAGEMENT) {
        colorClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
    } else if (department === DEPARTMENTS.OPERATIONS) {
         colorClass = "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
    }

    return (
         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${colorClass}`}>
            {department}
        </span>
    )
}

const Avatar: React.FC<{ name: string; avatar?: string; initials?: string, department: string }> = ({ name, avatar, initials, department }) => {
    if (avatar) {
        return (
            <div className="relative">
                <img className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all" src={avatar} alt={name} />
            </div>
        )
    }

    let bgClass = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    if (department === DEPARTMENTS.LEGAL) {
        bgClass = "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
    } else if (department === DEPARTMENTS.OPERATIONS) {
        bgClass = "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
    }

    return (
        <div className={`h-9 w-9 rounded-full ${bgClass} flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-700 transition-all`}>
            {initials}
        </div>
    )
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 dark:bg-[#1f2937]/30 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wide">
          <tr>
            <th className="px-6 py-4 rounded-tl-lg">Employee</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Clock In</th>
            <th className="px-6 py-4">Clock Out</th>
            <th className="px-6 py-4">Total Hours</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-[#282e39]">
          {data.length === 0 ? (
             <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No records found matching your filters.
                </td>
             </tr>
          ) : (
            data.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                    <Avatar 
                        name={record.employee.name} 
                        avatar={record.employee.avatar} 
                        initials={record.employee.initials} 
                        department={record.employee.department}
                    />
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{record.employee.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ID: {record.employee.id}</p>
                    </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <DepartmentBadge department={record.employee.department} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                    {record.clockIn || <span className="text-slate-400 dark:text-slate-600">--:-- --</span>}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                    {record.clockOut || <span className="text-slate-400 dark:text-slate-600">--:-- --</span>}
                </td>
                <td className={`px-6 py-4 text-sm font-bold ${record.totalHours === '0h 00m' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {record.totalHours}
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={record.status} />
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-[#282e39] p-1">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                </td>
                </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};