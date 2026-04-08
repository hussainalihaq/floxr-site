'use client';

import React from 'react';
import { TabCount } from './types';

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    counts: TabCount;
}

const TABS = [
    { id: 'all', label: 'All Employees' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'active', label: 'Active' },
    { id: 'offboarding', label: 'Offboarding' }
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, counts }) => {
    // Get count for each tab (except 'all')
    const getTabCount = (tabId: string): number | null => {
        switch (tabId) {
            case 'onboarding': return counts.onboarding;
            case 'active': return counts.active;
            case 'offboarding': return counts.offboarding;
            default: return null;
        }
    };

    // Get badge color based on tab type
    const getBadgeColor = (tabId: string, isActive: boolean) => {
        if (isActive) return 'bg-[#2463eb]/10 text-[#2463eb]';
        switch (tabId) {
            case 'onboarding': return 'bg-purple-500/10 text-purple-400';
            case 'active': return 'bg-emerald-500/10 text-emerald-400';
            case 'offboarding': return 'bg-orange-500/10 text-orange-400';
            default: return 'bg-slate-500/10 text-slate-400';
        }
    };

    return (
        <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const count = getTabCount(tab.id);

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`pb-3 border-b-2 transition-all font-medium text-sm flex items-center gap-2 whitespace-nowrap ${isActive
                                ? 'border-[#2463eb] text-[#2463eb] font-bold'
                                : 'border-transparent hover:border-[var(--border-subtle)]'
                                }`}
                            style={!isActive ? { color: 'var(--text-body)' } : undefined}
                        >
                            {tab.label}
                            {count !== null && count > 0 && (
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${getBadgeColor(tab.id, isActive)}`}>
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TabNavigation;

