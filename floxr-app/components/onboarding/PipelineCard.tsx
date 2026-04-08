'use client';

import React from 'react';
import { Send, FileText, Monitor, PartyPopper } from 'lucide-react';
import { PipelineStat } from './types';

interface PipelineCardProps {
    stat: PipelineStat;
    isLast?: boolean;
}

const colorMap: Record<string, {
    bg: string;
    text: string;
    bar: string;
    border: string;
    bgSoft: string;
    glow: string;
    icon: React.ReactNode;
}> = {
    purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        bar: 'bg-purple-500',
        border: 'border-t-purple-500',
        bgSoft: 'bg-purple-500/10',
        glow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)',
        icon: <Send size={20} />
    },
    primary: {
        bg: 'bg-[#2463eb]',
        text: 'text-[#2463eb]',
        bar: 'bg-[#2463eb]',
        border: 'border-t-[#2463eb]',
        bgSoft: 'bg-[#2463eb]/10',
        glow: '0 0 20px rgba(36, 99, 235, 0.4), 0 0 40px rgba(36, 99, 235, 0.2)',
        icon: <FileText size={20} />
    },
    orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-500',
        bar: 'bg-orange-500',
        border: 'border-t-orange-500',
        bgSoft: 'bg-orange-500/10',
        glow: '0 0 20px rgba(249, 115, 22, 0.4), 0 0 40px rgba(249, 115, 22, 0.2)',
        icon: <Monitor size={20} />
    },
    emerald: {
        bg: 'bg-emerald-500',
        text: 'text-emerald-500',
        bar: 'bg-emerald-500',
        border: 'border-t-emerald-500',
        bgSoft: 'bg-emerald-500/10',
        glow: '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)',
        icon: <PartyPopper size={20} />
    },
};

const iconMap: Record<string, React.ReactNode> = {
    send: <Send size={20} />,
    description: <FileText size={20} />,
    devices: <Monitor size={20} />,
    celebration: <PartyPopper size={20} />,
};

export const PipelineCard: React.FC<PipelineCardProps> = ({ stat, isLast }) => {
    const colors = colorMap[stat.color] || colorMap.primary;
    const IconComponent = iconMap[stat.icon] || colorMap[stat.color]?.icon;

    return (
        <div
            className={`relative flex flex-col p-5 rounded-xl border-t-4 ${colors.border} shadow-sm hover:shadow-md transition-shadow group`}
            style={{
                backgroundColor: 'var(--bg-card)',
                borderLeftColor: 'var(--border-subtle)',
                borderRightColor: 'var(--border-subtle)',
                borderBottomColor: 'var(--border-subtle)',
                borderLeftWidth: '1px',
                borderRightWidth: '1px',
                borderBottomWidth: '1px',
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`p-2.5 rounded-lg ${colors.bgSoft} ${colors.text} transition-all duration-300 group-hover:scale-110`}
                    style={{
                        boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = colors.glow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                    {IconComponent}
                </div>
                <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-light)' }}
                >
                    Step {stat.step}
                </span>
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-head)' }}>{stat.title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>{stat.count}</span>
                <span className="text-xs" style={{ color: 'var(--text-light)' }}>{stat.subtitle}</span>
            </div>
            <div
                className="w-full h-1.5 rounded-full mt-4 overflow-hidden"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
            >
                <div
                    className={`${colors.bar} h-full transition-all duration-500 ${stat.title === 'Doc Collection' ? 'animate-pulse' : ''}`}
                    style={{ width: `${stat.progress}%` }}
                ></div>
            </div>

            {/* Connector line between cards */}
            {!isLast && (
                <>
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-8 h-0.5 border-t-2 border-dashed z-0" style={{ borderColor: 'var(--border-subtle)' }}></div>
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-2 h-2 rounded-full z-0" style={{ backgroundColor: 'var(--border-subtle)' }}></div>
                </>
            )}
        </div>
    );
};

export default PipelineCard;
