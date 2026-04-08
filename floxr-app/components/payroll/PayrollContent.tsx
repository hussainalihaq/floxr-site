'use client';

import React from 'react';
import { Play, Download, FileSpreadsheet } from 'lucide-react';
import { PayrollStatsCards } from './PayrollStatsCards';
import { PayrollTable } from './PayrollTable';

export const PayrollContent: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 bg-[var(--bg-surface)]/80 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
                    <div className="flex min-w-72 flex-col gap-1">
                        <h2 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">
                            Payroll Management
                        </h2>
                        <p className="text-[var(--text-muted)] text-sm">
                            Process salaries, manage deductions, and generate reports for consultants.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Export Button */}
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-default)] transition-colors">
                            <FileSpreadsheet className="w-4 h-4" />
                            <span className="hidden sm:inline">Export CSV</span>
                        </button>
                        {/* Download Report */}
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-default)] transition-colors">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download Report</span>
                        </button>
                        {/* Run Payroll Button */}
                        <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-[#2463eb] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-md shadow-[#2463eb]/20 transition-all">
                            <Play className="w-4 h-4" />
                            <span className="whitespace-nowrap">Run Payroll</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
                    <PayrollStatsCards />
                    <PayrollTable />
                </div>
            </div>
        </div>
    );
};
