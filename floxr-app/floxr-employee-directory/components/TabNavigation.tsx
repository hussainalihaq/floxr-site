import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { label: 'All Employees', count: null },
  { label: 'Onboarding', count: 4 },
  { label: 'Active', count: null },
  { label: 'Offboarding', count: null }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-slate-200 dark:border-border-dark">
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => onTabChange(tab.label)}
              className={`pb-3 border-b-2 transition-all font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};