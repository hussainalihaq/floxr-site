'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';
import { AttendanceRecord } from './types';

interface AttendanceTableProps {
    data: AttendanceRecord[];
}

type StatusType = 'Present' | 'Late' | 'Absent' | 'WFH' | 'Active' | 'Completed';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const normalizedStatus = status as StatusType;

    if (normalizedStatus === 'Present' || normalizedStatus === 'Completed') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Present
            </span>
        );
    } else if (normalizedStatus === 'Late') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Late
            </span>
        );
    } else if (normalizedStatus === 'Absent') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Absent
            </span>
        );
    } else if (normalizedStatus === 'WFH') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> WFH
            </span>
        );
    } else if (normalizedStatus === 'Active') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Active
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> {status}
        </span>
    );
};

const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const getInitialsColor = (name: string): string => {
    const colors = [
        'bg-blue-500/20 text-blue-400',
        'bg-purple-500/20 text-purple-400',
        'bg-emerald-500/20 text-emerald-400',
        'bg-amber-500/20 text-amber-400',
        'bg-pink-500/20 text-pink-400',
        'bg-indigo-500/20 text-indigo-400',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatHours = (hours: number | null): string => {
    if (!hours) return '0h 00m';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m.toString().padStart(2, '0')}m`;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
    if (data.length === 0) {
        return (
            <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                    ⏰
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-head)' }}>No attendance records</h3>
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>No records found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead style={{ backgroundColor: '#1f2937' }}>
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider rounded-tl-lg" style={{ color: 'var(--text-light)' }}>Employee</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Department</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Clock In</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Clock Out</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Total Hours</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Status</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right rounded-tr-lg" style={{ color: 'var(--text-light)' }}>Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className="transition-colors group hover:bg-[#1f2937]/50"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-slate-700 transition-all ${getInitialsColor(record.employee.firstName)}`}>
                                        {getInitials(record.employee.firstName, record.employee.lastName)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--text-head)' }}>{record.employee.firstName} {record.employee.lastName}</p>
                                        <p className="text-xs" style={{ color: 'var(--text-light)' }}>ID: #{record.employeeId.slice(-6)}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400">
                                    General
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono" style={{ color: 'var(--text-body)' }}>
                                {formatTime(record.clockIn)}
                            </td>
                            <td className="px-6 py-4 text-sm font-mono" style={{ color: 'var(--text-body)' }}>
                                {record.clockOut ? formatTime(record.clockOut) : <span style={{ color: 'var(--text-light)' }}>--:-- --</span>}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold" style={{ color: record.hoursWorked ? 'var(--text-head)' : 'var(--text-light)' }}>
                                {formatHours(record.hoursWorked)}
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={record.clockOut ? 'Completed' : 'Active'} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-1 rounded-full transition-colors hover:bg-[#282e39]" style={{ color: 'var(--text-light)' }}>
                                    <MoreVertical size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
