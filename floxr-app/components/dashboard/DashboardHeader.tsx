'use client';

import React from 'react';
import { UserPlus } from 'lucide-react';

interface DashboardHeaderProps {
    onAddEmployee: () => void;
}

const Header: React.FC<DashboardHeaderProps> = ({ onAddEmployee }) => {
    return (
        <header className="w-full flex-shrink-0 backdrop-blur-md z-10 sticky top-0 px-8 py-6" style={{ backgroundColor: 'rgba(10, 14, 26, 0.5)', borderBottom: '1px solid transparent' }}>
            <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
                <div className="flex min-w-72 flex-col gap-1">
                    <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-head)' }}>
                        Dashboard Overview
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                        Welcome back, Administrator. Here's what's happening today.
                    </p>
                </div>
                <button
                    onClick={onAddEmployee}
                    className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-95"
                    style={{ backgroundColor: '#2463eb' }}
                >
                    <UserPlus size={18} />
                    <span className="whitespace-nowrap">Add New Employee</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
