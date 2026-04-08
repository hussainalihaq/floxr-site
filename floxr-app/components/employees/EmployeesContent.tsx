'use client';

import React, { useState, useMemo, useEffect } from 'react';
import TabNavigation from './TabNavigation';
import SearchAndFilter from './SearchAndFilter';
import EmployeeTable from './EmployeeTable';
import { EmployeeData, EmployeeStatus, TabCount } from './types';

interface EmployeesContentProps {
    initialEmployees: EmployeeData[];
}

const EmployeesContent: React.FC<EmployeesContentProps> = ({ initialEmployees }) => {
    const [employees] = useState<EmployeeData[]>(initialEmployees);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // Calculate counts for tabs
    const counts: TabCount = useMemo(() => ({
        all: employees.length,
        onboarding: employees.filter(e => e.status === EmployeeStatus.ONBOARDING).length,
        active: employees.filter(e => e.status === EmployeeStatus.ACTIVE).length,
        offboarding: employees.filter(e => e.status === EmployeeStatus.OFFBOARDING).length,
    }), [employees]);

    // Filtering Logic
    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            // 1. Filter by Tab
            if (activeTab === 'onboarding' && employee.status !== EmployeeStatus.ONBOARDING) return false;
            if (activeTab === 'active' && employee.status !== EmployeeStatus.ACTIVE) return false;
            if (activeTab === 'offboarding' && employee.status !== EmployeeStatus.OFFBOARDING) return false;

            // 2. Filter by Search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
                return (
                    fullName.includes(query) ||
                    (employee.jobTitle?.toLowerCase().includes(query) ?? false) ||
                    (employee.department?.name.toLowerCase().includes(query) ?? false) ||
                    employee.email.toLowerCase().includes(query)
                );
            }

            return true;
        });
    }, [employees, activeTab, searchQuery]);

    // Sort employees: ACTIVE first, then ONBOARDING, then OFFBOARDING
    const sortedEmployees = useMemo(() => {
        const statusOrder: Record<string, number> = {
            [EmployeeStatus.ACTIVE]: 0,
            [EmployeeStatus.ONBOARDING]: 1,
            [EmployeeStatus.OFFBOARDING]: 2,
        };

        return [...filteredEmployees].sort((a, b) => {
            const orderA = statusOrder[a.status] ?? 99;
            const orderB = statusOrder[b.status] ?? 99;
            return orderA - orderB;
        });
    }, [filteredEmployees]);

    // Pagination Logic
    const totalEmployees = sortedEmployees.length;
    const totalPages = Math.ceil(totalEmployees / itemsPerPage);
    const paginatedEmployees = sortedEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const startRange = totalEmployees > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endRange = Math.min(currentPage * itemsPerPage, totalEmployees);

    // Reset to page 1 when tab or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">

                {/* Controls Section */}
                <div className="flex flex-col gap-4">
                    <TabNavigation
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        counts={counts}
                    />

                    <SearchAndFilter
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                {/* Data Table Section */}
                <div
                    className="rounded-xl overflow-hidden shadow-sm flex flex-col"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    <div className="overflow-x-auto">
                        <EmployeeTable employees={paginatedEmployees} />
                    </div>

                    {/* Pagination Footer */}
                    {totalEmployees > 0 && (
                        <div
                            className="px-6 py-4 flex items-center justify-between"
                            style={{ borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
                        >
                            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                                Showing <span className="font-medium" style={{ color: 'var(--text-head)' }}>{startRange}-{endRange}</span> of <span className="font-medium" style={{ color: 'var(--text-head)' }}>{totalEmployees}</span> employees
                            </p>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className="px-3 py-1 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f2937]"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="px-3 py-1 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f2937]"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default EmployeesContent;
