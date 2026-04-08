import React from 'react';
import { Stats } from '../types';

interface StatsCardsProps {
    stats: Stats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
    const presentPercentage = Math.round((stats.totalPresent / stats.totalEmployees) * 100);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Present */}
            <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start z-10">
                    <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">Total Present</p>
                    <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all">co_present</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2 z-10">
                    <p className="text-slate-900 dark:text-white text-3xl font-bold">{stats.totalPresent}/{stats.totalEmployees}</p>
                    <p className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">{presentPercentage}%</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#282e39] h-1.5 rounded-full mt-3 overflow-hidden z-10">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${presentPercentage}%` }}></div>
                </div>
            </div>

            {/* On Leave */}
            <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm group hover:border-orange-500/30 transition-all">
                <div className="flex justify-between items-start">
                    <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">On Leave</p>
                    <span className="material-symbols-outlined text-orange-500 bg-orange-500/10 p-1.5 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-all">beach_access</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-slate-900 dark:text-white text-3xl font-bold">{stats.onLeave}</p>
                    <p className="text-slate-400 text-xs font-medium">Employees</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">3 Sick Leave, 2 Casual</p>
            </div>

            {/* Late Arrivals */}
            <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm group hover:border-amber-500/30 transition-all">
                <div className="flex justify-between items-start">
                    <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">Late Arrivals</p>
                    <span className="material-symbols-outlined text-amber-500 bg-amber-500/10 p-1.5 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-all">schedule</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-slate-900 dark:text-white text-3xl font-bold">{stats.lateArrivals}</p>
                    <p className="text-amber-500 text-xs font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">+1</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Avg delay: 12 mins</p>
            </div>

            {/* Work From Home */}
            <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm group hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-start">
                    <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">Work From Home</p>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">home_work</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-slate-900 dark:text-white text-3xl font-bold">{stats.wfh}</p>
                    <p className="text-slate-400 text-xs font-medium">Remote</p>
                </div>
                <div className="flex -space-x-2 mt-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-[#181c24]"></div>
                    <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#181c24]"></div>
                    <div className="h-6 w-6 rounded-full bg-slate-400 dark:bg-slate-500 border-2 border-white dark:border-[#181c24] flex items-center justify-center text-[8px] text-white font-bold">+5</div>
                </div>
            </div>
        </div>
    );
};