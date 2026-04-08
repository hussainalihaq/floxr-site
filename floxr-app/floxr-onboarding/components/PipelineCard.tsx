import React from 'react';
import { PipelineStat } from '../types';

interface PipelineCardProps {
    stat: PipelineStat;
}

const colorMap: Record<string, { bg: string, text: string, bar: string, border: string, bgSoft: string }> = {
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', bar: 'bg-purple-500', border: 'border-t-purple-500', bgSoft: 'bg-purple-500/10' },
    primary: { bg: 'bg-primary', text: 'text-primary', bar: 'bg-primary', border: 'border-t-primary', bgSoft: 'bg-primary/10' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', bar: 'bg-orange-500', border: 'border-t-orange-500', bgSoft: 'bg-orange-500/10' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', bar: 'bg-emerald-500', border: 'border-t-emerald-500', bgSoft: 'bg-emerald-500/10' },
};

const PipelineCard: React.FC<PipelineCardProps> = ({ stat }) => {
    const colors = colorMap[stat.color] || colorMap.primary;

    return (
        <div className={`relative flex flex-col p-5 bg-white dark:bg-[#181c24] rounded-xl border-t-4 ${colors.border} border-x border-b border-slate-200 dark:border-[#282e39] shadow-sm hover:shadow-md transition-shadow group`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${colors.bgSoft} ${colors.text}`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-[#1f2937] px-2 py-1 rounded-full">Step {stat.step}</span>
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg">{stat.title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{stat.count}</span>
                <span className="text-xs text-slate-500">{stat.subtitle}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                    className={`${colors.bar} h-full ${stat.title === 'Doc Collection' ? 'animate-pulse' : ''}`} 
                    style={{ width: `${stat.progress}%` }}
                ></div>
            </div>
            
            {stat.step !== 4 && (
                <>
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-8 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700 z-0"></div>
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 z-0"></div>
                </>
            )}
        </div>
    );
};

export default PipelineCard;