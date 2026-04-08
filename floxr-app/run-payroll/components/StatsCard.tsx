import React from 'react';
import { StatCardProps } from '../types';

const StatsCard: React.FC<StatCardProps> = ({ title, value, subValue, subLabel, icon, iconColorClass, trend, progress }) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start z-10">
        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">{title}</p>
        <span className={`material-symbols-outlined ${iconColorClass} p-1.5 rounded-lg bg-opacity-10`}>{icon}</span>
      </div>
      
      <div className="flex items-baseline gap-2 mt-2 z-10">
        <p className="text-slate-900 dark:text-white text-3xl font-bold">{value}</p>
        {trend && (
          <p className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">{trend}</p>
        )}
        {subValue && (
            <p className="text-slate-400 text-xs font-medium">{subValue}</p>
        )}
      </div>

      {progress !== undefined ? (
        <div className="w-full bg-slate-100 dark:bg-[#282e39] h-1.5 rounded-full mt-3 overflow-hidden z-10">
          <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      ) : (
         <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subLabel}</p>
      )}
    </div>
  );
};

export default StatsCard;
