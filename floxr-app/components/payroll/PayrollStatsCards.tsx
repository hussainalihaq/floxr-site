'use client';

import React, { useRef, useState } from 'react';
import { KPI_DATA } from './data';
import { KPICardProps } from './types';

const StatCard: React.FC<{ kpi: KPICardProps }> = ({ kpi }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const getGlowColor = (classes: string) => {
        if (classes.includes('2463eb') || classes.includes('primary')) return 'rgba(36, 99, 235, 0.15)';
        if (classes.includes('amber')) return 'rgba(245, 158, 11, 0.15)';
        if (classes.includes('purple')) return 'rgba(168, 85, 247, 0.15)';
        if (classes.includes('emerald')) return 'rgba(16, 185, 129, 0.15)';
        return 'rgba(255, 255, 255, 0.1)';
    };

    const glowColor = getGlowColor(kpi.iconColorClass);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col gap-3 rounded-xl p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-sm relative overflow-hidden group transition-all hover:border-[var(--border-default)]"
        >
            {/* Full Card Glow Layer */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
                    opacity: opacity,
                }}
            />

            {/* Header Row */}
            <div className="flex justify-between items-start z-10 relative">
                <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">
                    {kpi.title}
                </p>

                {/* Icon Wrapper */}
                <div className={`p-1.5 rounded-lg ${kpi.iconColorClass}`}>
                    {kpi.icon}
                </div>
            </div>

            {/* Value Row */}
            <div className="flex items-baseline gap-2 mt-2 z-10 relative">
                <p className="text-[var(--text-primary)] text-3xl font-bold">{kpi.value}</p>
                {kpi.trend && (
                    <p
                        className={`text-xs font-bold px-1.5 py-0.5 rounded ${kpi.trendPositive
                                ? 'text-emerald-500 bg-emerald-500/10'
                                : 'text-[var(--text-muted)] font-medium'
                            }`}
                    >
                        {kpi.trend}
                    </p>
                )}
            </div>

            {/* Subtext or Progress Bar */}
            {kpi.progress ? (
                <div className="w-full bg-[var(--bg-subtle)] h-1.5 rounded-full mt-3 overflow-hidden z-10 relative">
                    <div
                        className="bg-[#2463eb] h-full rounded-full"
                        style={{ width: `${kpi.progress}%` }}
                    />
                </div>
            ) : (
                <p className="text-xs text-[var(--text-muted)] mt-1 z-10 relative">{kpi.subtext}</p>
            )}
        </div>
    );
};

export const PayrollStatsCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_DATA.map((kpi: KPICardProps, index) => (
                <StatCard key={index} kpi={kpi} />
            ))}
        </div>
    );
};
