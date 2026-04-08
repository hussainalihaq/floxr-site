'use client';

import React from 'react';
import { Users, Palmtree, Clock, Home } from 'lucide-react';
import { AttendanceStats } from './types';

interface StatsCardsProps {
    stats: AttendanceStats;
}

const AttendanceStatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
    const presentPercentage = stats.totalEmployees > 0
        ? Math.round((stats.totalPresent / stats.totalEmployees) * 100)
        : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Present */}
            <div
                className="flex flex-col gap-3 rounded-xl p-5 shadow-sm relative overflow-hidden group transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
                <div className="flex justify-between items-start z-10">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Total Present</p>
                    <div className="bg-emerald-500/10 p-1.5 rounded-lg group-hover:bg-emerald-500 transition-all">
                        <Users size={18} className="text-emerald-500 group-hover:text-white transition-all" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2 z-10">
                    <p className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.totalPresent}/{stats.totalEmployees}</p>
                    <p className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">{presentPercentage}%</p>
                </div>
                <div className="w-full h-1.5 rounded-full mt-3 overflow-hidden z-10" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                    <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${presentPercentage}%` }}
                    />
                </div>
            </div>

            {/* On Leave */}
            <div
                className="flex flex-col gap-3 rounded-xl p-5 shadow-sm group transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>On Leave</p>
                    <div className="bg-orange-500/10 p-1.5 rounded-lg group-hover:bg-orange-500 transition-all">
                        <Palmtree size={18} className="text-orange-500 group-hover:text-white transition-all" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.onLeave}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>Employees</p>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>Sick Leave & Casual</p>
            </div>

            {/* Late Arrivals */}
            <div
                className="flex flex-col gap-3 rounded-xl p-5 shadow-sm group transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Late Arrivals</p>
                    <div className="bg-amber-500/10 p-1.5 rounded-lg group-hover:bg-amber-500 transition-all">
                        <Clock size={18} className="text-amber-500 group-hover:text-white transition-all" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.lateArrivals}</p>
                    {stats.lateArrivals > 0 && (
                        <p className="text-amber-500 text-xs font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">+{stats.lateArrivals}</p>
                    )}
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>Avg delay: 12 mins</p>
            </div>

            {/* Work From Home */}
            <div
                className="flex flex-col gap-3 rounded-xl p-5 shadow-sm group transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(36, 99, 235, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Work From Home</p>
                    <div className="bg-blue-500/10 p-1.5 rounded-lg group-hover:bg-blue-500 transition-all">
                        <Home size={18} className="text-blue-500 group-hover:text-white transition-all" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.wfh}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>Remote</p>
                </div>
                <div className="flex -space-x-2 mt-2">
                    <div className="h-6 w-6 rounded-full bg-slate-700 border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
                    <div className="h-6 w-6 rounded-full bg-slate-600 border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
                    <div className="h-6 w-6 rounded-full bg-slate-500 border-2 flex items-center justify-center text-[8px] text-white font-bold" style={{ borderColor: 'var(--bg-card)' }}>
                        +{Math.max(0, stats.wfh - 2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceStatsCards;
