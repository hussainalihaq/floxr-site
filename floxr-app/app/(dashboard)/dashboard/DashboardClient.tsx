'use client'

import Link from 'next/link'
import { useState } from 'react'

interface DashboardClientProps {
    user: { name: string; email: string }
    stats: {
        totalEmployees: number
        activeCount: number
        onboardingCount: number
        pendingLeaves: number
        avgHoursWeek: number
        clockedInToday: number
        totalHoursThisWeek: number
    }
    payrollSummary: {
        grossPay: number
        netPay: number
        deductions: number
    }
    featuredEmployee: {
        id: string
        name: string
        jobTitle: string
        department: string | null
        avatar: string | null
    } | null
    departments: { id: string; name: string; count: number }[]
    recentPayrolls: {
        id: string
        employeeName: string
        amount: number
        paidAt: string | null
        status: string
    }[]
    onboardingEmployees?: {
        id: string
        name: string
        jobTitle: string
        department: string
        startDate: string
        progress: number
    }[]
}

export default function DashboardClient({
    user,
    stats,
    payrollSummary,
    onboardingEmployees = []
}: DashboardClientProps) {
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    // Quick Stats Config
    const statCards = [
        {
            label: 'Total Employees',
            value: stats.totalEmployees,
            trend: '+12%',
            trendUp: true,
            icon: '👥',
            color: 'blue'
        },
        {
            label: 'Active Onboarding',
            value: stats.onboardingCount,
            trend: '+3%',
            trendUp: true,
            icon: '🚀',
            color: 'purple'
        },
        {
            label: 'Pending Approvals',
            value: stats.pendingLeaves,
            trend: '-2',
            trendUp: false, // For pending, down is good usually? Or maybe simple count
            icon: '⏳',
            color: 'amber'
        },
        {
            label: 'Payroll (This Month)',
            value: formatCurrency(payrollSummary.netPay),
            trend: 'Paid',
            trendUp: true,
            icon: '💰',
            color: 'green'
        }
    ]

    return (
        <div className="dashboard-home fade-in">
            {/* Header Section */}
            <div className="dashboard-header mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {getGreeting()}, {user.name.split(' ')[0]} 👋
                </h1>
                <p className="text-muted">
                    Here's what's happening in your organization today.
                </p>
                <div className="quick-stats-row mt-4 flex gap-4 text-sm text-secondary">
                    <span>• {stats.onboardingCount} active onboardings</span>
                    <span>• {stats.pendingLeaves} pending approvals</span>
                    <span>• 98% on-time attendance</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, i) => (
                    <div key={i} className="stat-card glass-panel p-6 rounded-xl relative overflow-hidden card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                                <div className={`text-xs font-medium flex items-center gap-1 ${stat.trendUp ? 'text-success' : 'text-error'}`}>
                                    {stat.trendUp ? '↑' : '↓'} {stat.trend}
                                    <span className="text-muted ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-full bg-${stat.color}-500/10 text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-sm text-muted font-medium uppercase tracking-wider">
                            {stat.label}
                        </div>
                        {/* Sparkline decoration */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent"></div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Main) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Onboardings */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Active Onboardings</h2>
                            <Link href="/employees?status=ONBOARDING" className="text-sm text-primary-blue hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {onboardingEmployees.length > 0 ? onboardingEmployees.map(emp => (
                                <div key={emp.id} className="glass-panel p-4 rounded-xl flex items-center gap-4 card-hover">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <h3 className="font-semibold">{emp.name}</h3>
                                            <span className="text-xs text-muted">Started {new Date(emp.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-muted mb-2">{emp.jobTitle} • {emp.department}</p>

                                        {/* Progress Bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                                                    style={{ width: `${emp.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-mono text-muted">{emp.progress}%</span>
                                        </div>
                                    </div>
                                    <button className="icon-btn">
                                        ➤
                                    </button>
                                </div>
                            )) : (
                                <div className="glass-panel p-8 rounded-xl text-center text-muted">
                                    No active onboardings
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Recent Payrolls (Activity Feed Replacement) */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="glass-panel rounded-xl p-6 relative">
                            <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-border-color"></div>
                            <div className="space-y-6">
                                <div className="relative pl-10">
                                    <div className="absolute left-2 top-1 w-3 h-3 rounded-full bg-success border-2 border-bg-secondary z-10"></div>
                                    <p className="text-sm"><span className="font-semibold text-primary">Payroll Processed</span> for January</p>
                                    <span className="text-xs text-muted">2 hours ago</span>
                                </div>
                                <div className="relative pl-10">
                                    <div className="absolute left-2 top-1 w-3 h-3 rounded-full bg-primary-blue border-2 border-bg-secondary z-10"></div>
                                    <p className="text-sm"><span className="font-semibold text-primary">New Hire</span> Sarah Connor joined Engineering</p>
                                    <span className="text-xs text-muted">Yesterday</span>
                                </div>
                                <div className="relative pl-10">
                                    <div className="absolute left-2 top-1 w-3 h-3 rounded-full bg-warning border-2 border-bg-secondary z-10"></div>
                                    <p className="text-sm"><span className="font-semibold text-primary">Leave Request</span> from John Doe pending approval</p>
                                    <span className="text-xs text-muted">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="glass-panel p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-primary-blue-glow">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/employees/new" className="block w-full py-3 px-4 bg-primary-blue hover:bg-blue-600 text-white rounded-lg text-center font-medium transition-colors shadow-lg shadow-blue-500/20">
                                + Add New Hire
                            </Link>
                            <Link href="/payroll" className="block w-full py-3 px-4 bg-bg-tertiary hover:bg-bg-secondary border border-border-color rounded-lg text-center font-medium transition-colors">
                                ⚡ Process Payroll
                            </Link>
                            <Link href="/leave" className="block w-full py-3 px-4 bg-bg-tertiary hover:bg-bg-secondary border border-border-color rounded-lg text-center font-medium transition-colors">
                                ✅ Approve Leaves
                            </Link>
                        </div>
                    </div>

                    {/* Team Availability */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h2 className="text-lg font-bold mb-4">Who's Out?</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs">JD</div>
                                    <div>
                                        <p className="text-sm font-medium">John Doe</p>
                                        <p className="text-xs text-muted">Sick Leave</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-500">Today</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">AS</div>
                                    <div>
                                        <p className="text-sm font-medium">Alice Smith</p>
                                        <p className="text-xs text-muted">Remote</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-500">WFH</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-xs text-muted hover:text-primary transition-colors">
                            View Team Calendar →
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
