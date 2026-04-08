'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface EmployeeSidebarProps {
    employee: {
        id: string
        name: string
        email: string
        jobTitle: string | null
        department: string | undefined
    }
}

// Employee-specific navigation
const navItems = [
    { name: 'My Dashboard', href: '/my-dashboard', icon: 'dashboard' },
    { name: 'My Attendance', href: '/my-attendance', icon: 'attendance' },
    { name: 'My Leave', href: '/my-leave', icon: 'leave' },
    { name: 'My Payslips', href: '/my-payslips', icon: 'payroll' },
]

const icons: Record<string, React.ReactNode> = {
    dashboard: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    ),
    attendance: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    leave: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
    ),
    payroll: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
    ),
}

export default function EmployeeSidebar({ employee }: EmployeeSidebarProps) {
    const pathname = usePathname()
    const [showMenu, setShowMenu] = useState(false)

    return (
        <aside className="sidebar employee-sidebar">
            {/* Logo & Brand */}
            <div className="sidebar-header">
                <Link href="/my-dashboard" className="sidebar-logo">
                    <div className="logo-icon">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
                            <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                                    <stop stopColor="#3B5BDB" />
                                    <stop offset="1" stopColor="#5C7CFA" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="logo-text">Floxr</span>
                    <span className="portal-badge">Employee</span>
                </Link>
            </div>

            {/* Employee Info Card */}
            <div className="employee-info-card">
                <div className="employee-avatar-large">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="employee-info-text">
                    <span className="employee-name-large">{employee.name}</span>
                    <span className="employee-role">{employee.jobTitle || 'Employee'}</span>
                    {employee.department && (
                        <span className="employee-dept">{employee.department}</span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{icons[item.icon]}</span>
                            <span className="nav-label">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Section */}
            <div className="sidebar-bottom">
                <Link href="/dashboard" className="nav-item secondary">
                    <span className="nav-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </span>
                    <span className="nav-label">Back to Admin</span>
                </Link>
            </div>
        </aside>
    )
}
