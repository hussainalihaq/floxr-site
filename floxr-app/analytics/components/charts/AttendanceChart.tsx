import React from 'react';
import { ATTENDANCE_DATA } from '../../constants';

// Since the design is very specific with the rounded tops and hover effects, 
// a custom Tailwind implementation is actually cleaner than overriding Recharts styles heavily here.

export const AttendanceChart: React.FC = () => {
  return (
    <div className="flex-1 flex items-end justify-between gap-4 pt-4 px-2 h-full">
      {ATTENDANCE_DATA.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2 w-full group h-full justify-end">
          <div className="relative w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-48 flex items-end overflow-hidden">
            <div 
              className={`w-full transition-all rounded-t-lg relative ${
                item.isHighPerformer 
                  ? "bg-emerald-500/80 group-hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  : "bg-blue-500/80 group-hover:bg-blue-500"
              }`} 
              style={{ height: `${item.rate}%` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                {item.rate}%
              </div>
            </div>
          </div>
          <span className={`text-xs font-medium ${item.isHighPerformer ? "text-emerald-500 font-bold" : "text-slate-500"}`}>
            {item.department}
          </span>
        </div>
      ))}
    </div>
  );
};