import React from 'react';
import { Candidate } from '../types';

interface CandidateRowProps {
    candidate: Candidate;
}

const CandidateRow: React.FC<CandidateRowProps> = ({ candidate }) => {
    // Determine text colors dynamically based on stage name for exact matching of the design
    const getStageColorClass = (colorName: string) => {
        switch(colorName) {
            case 'purple': return 'text-purple-500';
            case 'orange': return 'text-orange-500';
            case 'emerald': return 'text-emerald-500';
            default: return 'text-primary';
        }
    };

    const getBarColorClass = (colorName: string) => {
        switch(colorName) {
            case 'purple': return 'bg-purple-500';
            case 'orange': return 'bg-orange-500';
            case 'emerald': return 'bg-emerald-500';
            default: return 'bg-primary';
        }
    };

    const getTaskStatusStyle = (status: string) => {
        switch(status) {
            case 'done':
                return {
                    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                    text: 'text-emerald-600 dark:text-emerald-400',
                    border: 'border-emerald-200 dark:border-emerald-700/50',
                    icon: 'task_alt'
                };
            case 'blocked':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    text: 'text-red-600 dark:text-red-400',
                    border: 'border-red-200 dark:border-red-700/50',
                    icon: 'error'
                };
            case 'pending':
                return {
                    bg: 'bg-amber-50 dark:bg-amber-900/20',
                    text: 'text-amber-600 dark:text-amber-400',
                    border: 'border-amber-200 dark:border-amber-700/50',
                    icon: 'pending'
                };
            default: // in-progress or default
                return {
                    bg: 'bg-slate-100 dark:bg-slate-800',
                    text: 'text-slate-600 dark:text-slate-300',
                    border: 'border-slate-200 dark:border-slate-700',
                    icon: 'check_circle'
                };
        }
    };

    const taskStyle = getTaskStatusStyle(candidate.tasks.status);
    const stageColorText = getStageColorClass(candidate.stage.color);
    const stageColorBar = getBarColorClass(candidate.stage.color);

    // Calculate width percentage based on stage current/total
    const progressWidth = Math.min(100, (candidate.stage.current / candidate.stage.total) * 100);

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
            {/* Candidate Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        {candidate.avatar ? (
                            <img alt="Candidate" className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#181c24]" src={candidate.avatar} />
                        ) : (
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-[#181c24] ${candidate.initialsColor || 'bg-slate-200 text-slate-600'}`}>
                                {candidate.initials}
                            </div>
                        )}
                        {!candidate.avatar && candidate.initials === 'AL' ? null : ( // Logic for green dot, only shown on avatars with images in mockup, but lets make it consistent or strictly follow mockup. Mockup shows it on Sarah (img).
                             candidate.id === '1' && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-[#181c24]"></span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{candidate.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.email}</p>
                    </div>
                </div>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">{candidate.roleIcon}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{candidate.role}</span>
                </div>
            </td>

            {/* Current Stage */}
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                        <span className={`font-semibold ${stageColorText}`}>{candidate.stage.name}</span>
                        <span className="text-slate-400">{candidate.stage.subText}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                            className={`${stageColorBar} h-full ${candidate.stage.name === 'Offer Sent' ? 'animate-pulse' : ''} ${candidate.stage.name === 'Doc Collection' || candidate.stage.name === 'First Day' ? 'shadow-[0_0_10px_rgba(var(--tw-shadow-color),0.5)]' : ''}`} 
                            style={{ width: `${progressWidth}%`, '--tw-shadow-color': candidate.stage.color === 'primary' ? '19,91,236' : (candidate.stage.color === 'emerald' ? '16,185,129' : '0,0,0') } as React.CSSProperties}
                        ></div>
                    </div>
                </div>
            </td>

            {/* Assigned To */}
            <td className="px-6 py-4">
                <div className="flex -space-x-2 overflow-hidden">
                     {candidate.assignedTo.avatar ? (
                        <img alt="Assigned Person" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#181c24] object-cover" src={candidate.assignedTo.avatar} />
                     ) : (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#181c24] bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
                            {candidate.assignedTo.initials}
                        </div>
                     )}
                </div>
            </td>

            {/* Task Completion */}
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${taskStyle.bg} ${taskStyle.text} ${taskStyle.border}`}>
                    <span className="material-symbols-outlined text-[14px]">{taskStyle.icon}</span>
                    {candidate.tasks.status === 'done' ? 'All Done' : 
                     candidate.tasks.status === 'blocked' ? 'Blocked' : 
                     `${candidate.tasks.completed}/${candidate.tasks.total} Tasks`}
                </span>
            </td>

            {/* Due Date */}
            <td className="px-6 py-4">
                <span className={`text-sm font-medium ${candidate.isOverdue ? 'text-red-500 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                    {candidate.dueDate}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </td>
        </tr>
    );
};

export default CandidateRow;