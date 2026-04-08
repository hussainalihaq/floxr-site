'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface AttendanceHeaderProps {
    onExport?: () => void;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({ onExport }) => {
    return (
        <header className="w-full flex-shrink-0 backdrop-blur-md z-10 sticky top-0 px-4 py-4 sm:px-8 sm:py-6" style={{ backgroundColor: 'rgba(10, 14, 26, 0.5)', borderBottom: '1px solid transparent' }}>
            <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
                <div className="flex min-w-72 flex-col gap-1">
                    <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-head)' }}>Attendance Management</h2>
                    <p className="text-sm" style={{ color: 'var(--text-body)' }}>Monitor daily check-ins, leaves, and working hours.</p>
                </div>
            </div>
        </header>
    );
};

export default AttendanceHeader;
