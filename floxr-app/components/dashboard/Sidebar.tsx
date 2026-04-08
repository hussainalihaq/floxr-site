'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Workflow,
    Link2,
    BarChart3,
    Calendar,
    DollarSign,
    Shield,
    Settings,
    LogOut,
    User,
    PanelLeftClose,
    PanelLeft
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { NavItem } from './types';

interface UserInfo {
    name: string;
    role: string;
}

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
    const pathname = usePathname();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [collapsed, setCollapsed] = useState(isCollapsed);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        setCollapsed(isCollapsed);
    }, [isCollapsed]);

    const fetchUser = async () => {
        try {
            const supabase = createClient();
            const { data: { user: authUser } } = await supabase.auth.getUser();

            if (authUser) {
                const response = await fetch('/api/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser({
                        name: userData.name || authUser.email?.split('@')[0] || 'User',
                        role: userData.role === 'OWNER' || userData.role === 'ADMIN' ? 'Admin Console'
                            : userData.role === 'MANAGER' ? 'Manager Console'
                                : 'Employee Portal'
                    });
                } else {
                    setUser({
                        name: authUser.email?.split('@')[0] || 'User',
                        role: 'Admin Console'
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const navItems: (NavItem & { href: string; IconComponent: any })[] = [
        { icon: 'dashboard', label: 'Dashboard', href: '/dashboard', IconComponent: LayoutDashboard },
        { icon: 'group', label: 'Employees', href: '/employees', IconComponent: Users },
        { icon: 'person_add', label: 'Onboarding', href: '/onboarding', IconComponent: UserPlus },
        { icon: 'link', label: 'Integrations', href: '/integrations', IconComponent: Link2 },
        { icon: 'bar_chart', label: 'Analytics', href: '/analytics', IconComponent: BarChart3 },
        { icon: 'calendar_month', label: 'Attendance', href: '/attendance', IconComponent: Calendar },
        { icon: 'payments', label: 'Payroll', href: '/payroll', IconComponent: DollarSign },
        { icon: 'settings', label: 'Settings', href: '/settings', IconComponent: Settings },
    ];

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/signup';
    };

    const handleToggle = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        onToggle?.();
    };

    return (
        <aside
            style={{ backgroundColor: 'var(--bg-subtle)', borderRight: '1px solid var(--border-subtle)' }}
            className={`flex-shrink-0 flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
        >
            <div className="flex flex-col h-full">
                {/* User Profile Header with Toggle */}
                <div className="p-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                        {!collapsed && (
                            <div className="flex gap-3 items-center flex-1 min-w-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-primary/20 flex-shrink-0" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-light)' }}>
                                    <User size={24} />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <h1 className="text-sm font-bold leading-none truncate" style={{ color: 'var(--text-head)' }}>
                                        {user?.name || 'Loading...'}
                                    </h1>
                                    <p className="text-xs font-medium mt-1 truncate" style={{ color: 'var(--text-body)' }}>
                                        {user?.role || 'Admin Console'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Toggle Button */}
                        <button
                            onClick={handleToggle}
                            className="p-2 rounded-lg transition-all hover:scale-105"
                            style={{ color: 'var(--text-body)' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                                e.currentTarget.style.color = 'var(--text-head)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-body)';
                            }}
                            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                    {navItems.map((item, index) => {
                        const isActive = item.href === '/dashboard'
                            ? pathname === '/dashboard'
                            : pathname?.startsWith(item.href);

                        const Icon = item.IconComponent;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                    ? 'text-white shadow-lg shadow-primary/20'
                                    : 'hover:text-white'
                                    } ${collapsed ? 'justify-center' : ''}`}
                                style={isActive
                                    ? { backgroundColor: 'var(--primary)' }
                                    : { color: 'var(--text-body)' }
                                }
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                                        e.currentTarget.style.color = 'var(--text-head)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-body)';
                                    }
                                }}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon size={20} className={!isActive ? 'group-hover:text-primary transition-colors' : ''} />
                                {!collapsed && <p className="text-sm font-medium">{item.label}</p>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer Actions - Logout with RED hover */}
                <div className="p-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all logout-btn ${collapsed ? 'justify-center' : ''}`}
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-body)';
                        }}
                        title={collapsed ? 'Logout' : undefined}
                    >
                        <LogOut size={20} />
                        {!collapsed && <p className="text-sm font-medium">Logout</p>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
