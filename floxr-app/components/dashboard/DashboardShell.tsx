'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardShell({ children, user }: { children: React.ReactNode; user?: any }) {
    return (
        <div className="flex h-screen w-full font-display" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-head)' }}>
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}

