import React from 'react';
import { StatCardProps } from '../types';
import { STATS } from '../constants';

const ColorMap: Record<string, {
  border: string;
  bg: string;
  text: string;
  bar: string;
  ring: string;
}> = {
  purple: { border: 'border-t-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-500', bar: 'bg-purple-500', ring: 'ring-purple-500/10' },
  primary: { border: 'border-t-primary', bg: 'bg-primary/10', text: 'text-primary', bar: 'bg-primary', ring: 'ring-primary/10' },
  orange: { border: 'border-t-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500', bar: 'bg-orange-500', ring: 'ring-orange-500/10' },
  emerald: { border: 'border-t-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-500', bar: 'bg-emerald-500', ring: 'ring-emerald-500/10' },
};

const StatCard: React.FC<StatCardProps> = ({ step, title, count, subtitle, color, progress, icon }) => {
  const styles = ColorMap[color];

  return (
    <div className={`relative flex flex-col p-5 bg-white dark:bg-[#181c24] rounded-xl border-t-4 ${styles.border} border-x border-b border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow group ${color === 'primary' ? 'ring-2 ring-primary/10' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-[#1f2937] px-2 py-1 rounded-full">Step {step}</span>
      </div>
      <h3 className="text-slate-900 dark:text-white font-bold text-lg">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{count}</span>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
        <div className={`${styles.bar} h-full ${color === 'primary' ? 'animate-pulse' : ''}`} style={{ width: `${progress}%` }}></div>
      </div>
      {/* Decorative dashed line for pipeline flow */}
      <div className="hidden lg:block absolute top-1/2 -right-6 w-8 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700 z-0 last:hidden"></div>
      <div className="hidden lg:block absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 z-0 last:hidden"></div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div key={stat.title} className={stat.step === 4 ? 'relative' : 'relative lg:overflow-visible'}>
             <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
