'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, AlertCircle, DollarSign } from 'lucide-react';

interface DashboardStats {
    hoursSaved: number;
    todayAttendance: {
        present: number;
        total: number;
        percentage: number;
    };
    pendingApprovals: {
        total: number;
        leaveRequests: number;
        payrollBatches: number;
    };
    monthlyPayroll: {
        total: number;
        status: string;
    };
}

const StatsSection: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Get the first company ID from the database
            const companyResponse = await fetch('/api/company/first');
            if (!companyResponse.ok) {
                throw new Error('No company found');
            }
            const { companyId } = await companyResponse.json();

            const response = await fetch(`/api/dashboard/stats?companyId=${companyId}`);

            if (!response.ok) throw new Error('Failed to fetch stats');

            const data = await response.json();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    // Handle mouse move for cursor glow effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    if (loading) {
        return <StatsSkeletonLoader />;
    }

    if (error || !stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-full p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}>
                    Unable to load statistics. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Hours Saved */}
            <div
                className="cursor-glow outline-glow flex flex-col gap-3 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseMove={handleMouseMove}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                        Hours Saved
                    </p>
                    <div className="p-1 rounded" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                        <TrendingUp className="text-emerald-500" size={20} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.hoursSaved.toLocaleString()} hrs</p>
                    <p className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        +15%
                    </p>
                </div>
                <div className="h-8 w-full mt-1">
                    <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 30" width="100%">
                        <path
                            className="opacity-50"
                            d="M0,30 Q25,25 50,15 T100,5"
                            fill="none"
                            stroke="#2463eb"
                            strokeWidth="2"
                        />
                        <path
                            className="opacity-20"
                            d="M0,30 Q25,25 50,15 T100,5 V30 H0 Z"
                            fill="url(#grad1)"
                        />
                        <defs>
                            <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#2463eb', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#2463eb', stopOpacity: 0 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Card 2: Today's Attendance */}
            <div
                className="cursor-glow outline-glow flex flex-col gap-3 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseMove={handleMouseMove}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                        Today's Attendance
                    </p>
                    <div className="p-1 rounded" style={{ backgroundColor: 'rgba(36, 99, 235, 0.1)' }}>
                        <Users className="text-[#2463eb]" size={20} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>
                        {stats.todayAttendance.present}/{stats.todayAttendance.total}
                    </p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>Present</p>
                </div>
                <div className="w-full mt-2 rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div
                        className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: `${stats.todayAttendance.percentage}%`,
                            backgroundColor: '#2463eb',
                            animation: 'expandWidth 1.5s ease-out'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>
                        {stats.todayAttendance.total - stats.todayAttendance.present} Away/Remote
                    </p>
                    <p className="text-[10px] font-bold text-emerald-500">
                        {stats.todayAttendance.percentage >= 80 ? 'Good Turnout' : 'Normal'}
                    </p>
                </div>
            </div>

            {/* Card 3: Pending Approvals */}
            <div
                className="cursor-glow outline-glow flex flex-col gap-3 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseMove={handleMouseMove}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                        Pending Approvals
                    </p>
                    <div className="p-1 rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                        <AlertCircle className="text-orange-500" size={20} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.pendingApprovals.total}</p>
                    {stats.pendingApprovals.total > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fb923c' }}>
                            Action Required
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-body)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {stats.pendingApprovals.payrollBatches} Payroll Batches
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-body)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {stats.pendingApprovals.leaveRequests} Leave Requests
                    </div>
                </div>
            </div>

            {/* Card 4: This Month Payroll */}
            <div
                className="cursor-glow outline-glow flex flex-col gap-3 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseMove={handleMouseMove}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                        This Month Payroll
                    </p>
                    <div className="p-1 rounded" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                        <DollarSign className="text-purple-500" size={20} />
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>
                        ${Number(stats.monthlyPayroll.total).toLocaleString()}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-body)' }}>Total payout</p>
                </div>
                <div className="flex gap-2 mt-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {stats.monthlyPayroll.status}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes expandWidth {
                    from {
                        width: 0%;
                    }
                    to {
                        width: ${stats.todayAttendance.percentage}%;
                    }
                }
            `}</style>
        </div>
    );
};

// Loading skeleton component
const StatsSkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl p-5 animate-pulse" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex justify-between items-start">
                        <div className="h-3 w-24 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                        <div className="h-8 w-8 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                    </div>
                    <div className="h-8 w-32 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                    <div className="h-8 w-full rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                </div>
            ))}
        </div>
    );
};

export default StatsSection;
