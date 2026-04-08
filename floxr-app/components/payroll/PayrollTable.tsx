'use client';

import React, { useState, useMemo } from 'react';
import { PayrollEmployee, EmploymentType, PaymentStatus } from './types';
import { MOCK_PAYROLL_EMPLOYEES } from './data';
import { Search, ChevronLeft, ChevronRight, MoreVertical, SlidersHorizontal } from 'lucide-react';

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    let styles = '';
    let dotColor = '';

    switch (status) {
        case PaymentStatus.PAID:
            styles = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            dotColor = 'bg-emerald-500';
            break;
        case PaymentStatus.PROCESSING:
            styles = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            dotColor = 'bg-amber-500';
            break;
        case PaymentStatus.PENDING_APPROVAL:
            styles = 'bg-slate-700/30 text-slate-300 border border-slate-600/30';
            dotColor = 'bg-slate-500';
            break;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {status}
        </span>
    );
};

export const PayrollTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState<EmploymentType>(EmploymentType.FULL_TIME);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredEmployees = useMemo(() => {
        return MOCK_PAYROLL_EMPLOYEES.filter((emp) => {
            const matchesTab = emp.type === activeTab;
            const matchesSearch =
                emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.department.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    const totalEmployees = filteredEmployees.length;
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
            {/* Controls Header */}
            <div className="flex flex-col border-b border-[var(--border-subtle)]">
                {/* Tabs */}
                <div className="flex gap-1 px-5 pt-5 pb-0 overflow-x-auto">
                    <button
                        onClick={() => {
                            setActiveTab(EmploymentType.FULL_TIME);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${activeTab === EmploymentType.FULL_TIME
                                ? 'text-[#2463eb] border-[#2463eb]'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-default)]'
                            }`}
                    >
                        Full-Time Employees
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab(EmploymentType.CONSULTANT);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeTab === EmploymentType.CONSULTANT
                                ? 'text-[#2463eb] border-[#2463eb]'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-default)]'
                            }`}
                    >
                        Third-Party Consultants
                    </button>
                </div>

                {/* Filters Row */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                            <Search className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[#2463eb]/50 focus:border-[#2463eb] outline-none transition-all text-sm"
                            placeholder="Search by name or department..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <input
                                type="month"
                                defaultValue="2025-01"
                                className="pl-4 pr-3 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[#2463eb]/50 outline-none cursor-pointer"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-default)] transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] text-xs uppercase font-semibold tracking-wide">
                        <tr>
                            <th className="px-6 py-4">Recipient</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Gross Pay</th>
                            <th className="px-6 py-4">Deductions</th>
                            <th className="px-6 py-4">Net Pay</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                        {paginatedEmployees.length > 0 ? (
                            paginatedEmployees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="hover:bg-[var(--bg-subtle)] transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                {employee.avatar ? (
                                                    <img
                                                        src={employee.avatar}
                                                        alt={employee.name}
                                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[var(--border-default)] transition-all"
                                                    />
                                                ) : (
                                                    <div
                                                        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-[var(--border-default)] transition-all ${employee.initialsColorClass}`}
                                                    >
                                                        {employee.initials}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[var(--text-primary)]">
                                                    {employee.name}
                                                </p>
                                                <p className="text-[11px] uppercase tracking-wide font-medium text-[var(--text-muted)]">
                                                    {employee.role}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${employee.departmentColorClass}`}
                                        >
                                            {employee.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)] font-mono">
                                        {formatCurrency(employee.grossPay)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-red-400 font-mono">
                                        {employee.deductions > 0 ? `-${formatCurrency(employee.deductions)}` : '$0.00'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-[var(--text-primary)] font-mono">
                                        {formatCurrency(employee.netPay)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={employee.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[var(--text-muted)] hover:text-[#2463eb] transition-colors p-1 rounded hover:bg-[var(--bg-subtle)]">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-[var(--text-muted)]">
                                    No employees found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                    Showing{' '}
                    <span className="font-bold text-[var(--text-secondary)]">
                        {Math.min((currentPage - 1) * pageSize + 1, totalEmployees)}-
                        {Math.min(currentPage * pageSize, totalEmployees)}
                    </span>{' '}
                    of <span className="font-bold text-[var(--text-secondary)]">{totalEmployees}</span> employees
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-default)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => (p * pageSize < totalEmployees ? p + 1 : p))}
                        disabled={currentPage * pageSize >= totalEmployees}
                        className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-default)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
