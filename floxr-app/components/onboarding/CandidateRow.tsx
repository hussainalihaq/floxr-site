'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MoreVertical, CheckCircle, AlertCircle, Clock, Code, Megaphone, BarChart3, Headphones, Palette, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Candidate } from './types';

interface CandidateRowProps {
    candidate: Candidate;
    onUpdateStatus?: (candidate: Candidate) => void;
    onMarkAsDone?: (candidateId: string) => void;
}

const roleIconMap: Record<string, React.ReactNode> = {
    design_services: <Palette size={16} />,
    code: <Code size={16} />,
    campaign: <Megaphone size={16} />,
    analytics: <BarChart3 size={16} />,
    support_agent: <Headphones size={16} />,
};

const getStageColorClass = (colorName: string) => {
    switch (colorName) {
        case 'purple': return 'text-purple-500';
        case 'orange': return 'text-orange-500';
        case 'emerald': return 'text-emerald-500';
        default: return 'text-[#2463eb]';
    }
};

const getBarColorClass = (colorName: string) => {
    switch (colorName) {
        case 'purple': return 'bg-purple-500';
        case 'orange': return 'bg-orange-500';
        case 'emerald': return 'bg-emerald-500';
        default: return 'bg-[#2463eb]';
    }
};

const getTaskStatusStyle = (status: string) => {
    switch (status) {
        case 'done':
            return {
                bg: 'bg-emerald-900/20',
                text: 'text-emerald-400',
                border: 'border-emerald-700/50',
                icon: <CheckCircle size={14} />
            };
        case 'blocked':
            return {
                bg: 'bg-red-900/20',
                text: 'text-red-400',
                border: 'border-red-700/50',
                icon: <AlertCircle size={14} />
            };
        case 'pending':
            return {
                bg: 'bg-amber-900/20',
                text: 'text-amber-400',
                border: 'border-amber-700/50',
                icon: <Clock size={14} />
            };
        default: // in-progress
            return {
                bg: 'bg-slate-800',
                text: 'text-slate-300',
                border: 'border-slate-700',
                icon: <CheckCircle size={14} />
            };
    }
};

const getInitialsColor = (name: string): string => {
    const colors = [
        'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
        'bg-blue-500/20 text-blue-400',
        'bg-teal-500/20 text-teal-400',
        'bg-amber-500/20 text-amber-400',
        'bg-pink-500/20 text-pink-400',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

export const CandidateRow: React.FC<CandidateRowProps> = ({ candidate, onUpdateStatus, onMarkAsDone }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const taskStyle = getTaskStatusStyle(candidate.tasks.status);
    const stageColorText = getStageColorClass(candidate.stage.color);
    const stageColorBar = getBarColorClass(candidate.stage.color);
    const progressWidth = Math.min(100, (candidate.stage.current / candidate.stage.total) * 100);
    const RoleIcon = roleIconMap[candidate.roleIcon] || <Code size={16} />;

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUpdateStatus = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        onUpdateStatus?.(candidate);
    };

    const handleMarkAsDone = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        onMarkAsDone?.(candidate.id);
    };

    return (
        <tr className="hover:bg-[#1f2937]/50 transition-colors group">
            {/* Candidate Info */}
            <td className="px-6 py-4">
                <Link href={`/onboarding/${candidate.id}`} className="flex items-center gap-3 group/link">
                    <div className="relative">
                        {candidate.avatar ? (
                            <img
                                alt={candidate.name}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#181c24]"
                                src={candidate.avatar}
                            />
                        ) : (
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-[#181c24] ${candidate.initialsColor || getInitialsColor(candidate.name)}`}>
                                {candidate.initials || candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        )}
                        {candidate.avatar && (
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-[#181c24]"></span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold group-hover/link:text-[#2463eb] transition-colors" style={{ color: 'var(--text-head)' }}>
                            {candidate.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-light)' }}>{candidate.email}</p>
                    </div>
                </Link>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">{RoleIcon}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{candidate.role}</span>
                </div>
            </td>

            {/* Current Stage */}
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                        <span className={`font-semibold ${stageColorText}`}>{candidate.stage.name}</span>
                        <span style={{ color: 'var(--text-light)' }}>{candidate.stage.subText}</span>
                    </div>
                    <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-subtle)' }}
                    >
                        <div
                            className={`${stageColorBar} h-full transition-all duration-500 ${candidate.stage.name === 'Offer Sent' ? 'animate-pulse' : ''}`}
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>
                </div>
            </td>

            {/* Assigned To */}
            <td className="px-6 py-4">
                <div className="flex -space-x-2 overflow-hidden">
                    {candidate.assignedTo.avatar ? (
                        <img
                            alt={candidate.assignedTo.name}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181c24] object-cover"
                            src={candidate.assignedTo.avatar}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-[#181c24] bg-slate-700 text-xs font-bold text-slate-300">
                            {candidate.assignedTo.initials || candidate.assignedTo.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                    )}
                </div>
            </td>

            {/* Task Completion */}
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${taskStyle.bg} ${taskStyle.text} ${taskStyle.border}`}>
                    {taskStyle.icon}
                    {candidate.tasks.status === 'done' ? 'All Done' :
                        candidate.tasks.status === 'blocked' ? 'Blocked' :
                            `${candidate.tasks.completed}/${candidate.tasks.total} Tasks`}
                </span>
            </td>

            {/* Due Date */}
            <td className="px-6 py-4">
                <span className={`text-sm font-medium ${candidate.isOverdue ? 'text-red-500 font-semibold' : ''}`} style={{ color: candidate.isOverdue ? undefined : 'var(--text-body)' }}>
                    {candidate.dueDate}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-slate-400 hover:text-[#2463eb] transition-colors p-1 rounded hover:bg-white/5"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                            style={{
                                backgroundColor: 'rgba(24, 28, 36, 0.98)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(8px)'
                            }}
                        >
                            <button
                                onClick={handleUpdateStatus}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <RefreshCw size={16} className="text-[#2463eb]" />
                                Update Status
                            </button>
                            <button
                                onClick={handleMarkAsDone}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-colors border-t border-white/5"
                            >
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                Mark as Done
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default CandidateRow;

