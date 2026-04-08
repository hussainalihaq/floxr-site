'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Laptop, MoreHorizontal, ClipboardList, Pencil, Monitor, UserMinus } from 'lucide-react';
import { EmployeeData, EmployeeStatus } from './types';

interface EmployeeTableProps {
    employees: EmployeeData[];
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    if (status === EmployeeStatus.ACTIVE) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Active
            </span>
        );
    } else if (status === EmployeeStatus.ONBOARDING) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Onboarding
            </span>
        );
    } else {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Offboarding
            </span>
        );
    }
};

const ProgressBar: React.FC<{ progress: number; status: string }> = ({ progress, status }) => {
    const colorClass = status === EmployeeStatus.ACTIVE
        ? 'bg-emerald-500'
        : status === EmployeeStatus.ONBOARDING
            ? 'bg-blue-500'
            : 'bg-slate-500';

    const textColorClass = status === EmployeeStatus.ACTIVE
        ? 'text-emerald-400'
        : status === EmployeeStatus.ONBOARDING
            ? 'text-blue-400'
            : 'text-slate-400';

    return (
        <div className="flex items-center gap-3">
            <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${colorClass}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <span className={`text-xs font-medium ${textColorClass}`}>{progress}%</span>
        </div>
    );
};

const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const getInitialsColor = (name: string): string => {
    const colors = [
        'bg-blue-500/20 text-blue-400',
        'bg-purple-500/20 text-purple-400',
        'bg-emerald-500/20 text-emerald-400',
        'bg-amber-500/20 text-amber-400',
        'bg-pink-500/20 text-pink-400',
        'bg-cyan-500/20 text-cyan-400',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

// Actions Dropdown Component
interface ActionsDropdownProps {
    employeeId: string;
    employeeName: string;
    onViewProfile: () => void;
    onEditDetails: () => void;
    onManageEquipment: () => void;
    onOffboard: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
    employeeId,
    onViewProfile,
    onEditDetails,
    onManageEquipment,
    onOffboard
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            label: 'View Profile',
            icon: ClipboardList,
            onClick: onViewProfile,
            color: 'text-slate-300',
            hoverColor: 'group-hover:text-white'
        },
        {
            label: 'Edit Details',
            icon: Pencil,
            onClick: onEditDetails,
            color: 'text-slate-300',
            hoverColor: 'group-hover:text-white'
        },
        {
            label: 'Manage Equipment',
            icon: Monitor,
            onClick: onManageEquipment,
            color: 'text-slate-300',
            hoverColor: 'group-hover:text-white'
        },
        {
            label: 'Offboard Employee',
            icon: UserMinus,
            onClick: onOffboard,
            color: 'text-red-400',
            hoverColor: 'group-hover:text-red-300',
            isDanger: true
        },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg transition-colors inline-flex hover:bg-[#282e39]"
                style={{ color: 'var(--text-light)' }}
            >
                <MoreHorizontal size={20} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                        backgroundColor: 'rgba(30, 35, 46, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div className="py-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                                className={`group w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 hover:bg-white/5 ${item.isDanger ? '' : ''}`}
                            >
                                <item.icon
                                    size={18}
                                    className={`${item.color} ${item.hoverColor} transition-all duration-200 group-hover:scale-110`}
                                />
                                <span className={`${item.isDanger ? 'text-red-400 group-hover:text-red-300' : 'text-slate-300 group-hover:text-white'} transition-colors duration-200`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
    const handleViewProfile = (employeeId: string) => {
        window.location.href = `/employees/${employeeId}`;
    };

    const handleEditDetails = (employeeId: string) => {
        // TODO: Open edit modal
        console.log('Edit details for:', employeeId);
    };

    const handleManageEquipment = (employeeId: string) => {
        // TODO: Open equipment management
        console.log('Manage equipment for:', employeeId);
    };

    const handleOffboard = (employeeId: string) => {
        // TODO: Start offboarding process
        console.log('Offboard employee:', employeeId);
    };

    if (employees.length === 0) {
        return (
            <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center mx-auto mb-4 text-3xl">
                    👥
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-head)' }}>No employees found</h3>
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>Try adjusting your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <table className="min-w-full divide-y divide-[var(--border-subtle)]">
            <thead style={{ backgroundColor: '#111318' }}>
                <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Employee</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Role & Dept</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Status</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Equipment</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Progress</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
                {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-[#1f2937]/50 transition-colors">
                        {/* Employee Name & Avatar */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                {employee.avatar ? (
                                    <img src={employee.avatar} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-[#1f2937]" />
                                ) : (
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-[#1f2937] ${getInitialsColor(employee.firstName)}`}>
                                        {getInitials(employee.firstName, employee.lastName)}
                                    </div>
                                )}
                                <div>
                                    <Link href={`/employees/${employee.id}`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--text-head)' }}>
                                        {employee.firstName} {employee.lastName}
                                    </Link>
                                    <div className="text-xs" style={{ color: 'var(--text-light)' }}>{employee.email}</div>
                                </div>
                            </div>
                        </td>

                        {/* Role & Dept */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>{employee.jobTitle || 'Team Member'}</div>
                            <div className="text-xs" style={{ color: 'var(--text-light)' }}>{employee.department?.name || 'Unassigned'}</div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={employee.status} />
                        </td>

                        {/* Equipment */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-body)' }}>
                                <Laptop size={18} style={{ color: 'var(--text-light)' }} />
                                <span>MacBook Pro</span>
                            </div>
                        </td>

                        {/* Progress */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            {employee.status === EmployeeStatus.OFFBOARDING ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs italic" style={{ color: 'var(--text-light)' }}>Exit Pending</span>
                                </div>
                            ) : (
                                <ProgressBar progress={employee.onboardingProgress || 0} status={employee.status} />
                            )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <ActionsDropdown
                                employeeId={employee.id}
                                employeeName={`${employee.firstName} ${employee.lastName}`}
                                onViewProfile={() => handleViewProfile(employee.id)}
                                onEditDetails={() => handleEditDetails(employee.id)}
                                onManageEquipment={() => handleManageEquipment(employee.id)}
                                onOffboard={() => handleOffboard(employee.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
