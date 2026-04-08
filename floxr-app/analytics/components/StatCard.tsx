import React from 'react';
import { LucideIcon, TrendingUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  comparisonText: string;
  icon: LucideIcon;
  iconColorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  comparisonText, 
  icon: Icon, 
  iconColorClass 
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark shadow-sm relative overflow-hidden group">
      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className={`w-20 h-20 ${iconColorClass}`} />
      </div>
      
      <div className="flex justify-between items-start z-10">
        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">{title}</p>
      </div>
      
      <div className="flex items-baseline gap-2 z-10">
        <p className="text-slate-900 dark:text-white text-3xl font-bold">{value}</p>
        
        {change && (
          <div className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${
            changeType === 'positive' 
              ? 'text-emerald-500 bg-emerald-500/10' 
              : 'text-red-500 bg-red-500/10'
          }`}>
             {changeType === 'positive' ? (
                // For this specific design, positive means trending up usually, but sometimes arrow down is good (Time to hire)
                // We will handle generic 'trending up' icon for visual consistency unless specified
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
             ) : null }
             {/* Special handling for 'Avg Time to Hire' which has a down arrow but is positive */}
             {title === 'Avg. Time to Hire' && changeType === 'positive' && (
                <ArrowDown className="w-3.5 h-3.5 mr-1" />
             )}
            <span>{change}</span>
          </div>
        )}
        
        {/* Special case for star rating */}
        {title === 'Employee Happiness' && (
             <div className="flex items-center text-yellow-500 bg-yellow-500/10 p-1 rounded">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
             </div>
        )}
      </div>
      
      <p className="text-slate-400 text-xs z-10">{comparisonText}</p>
    </div>
  );
};