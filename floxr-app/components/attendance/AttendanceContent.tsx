'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Download, RefreshCw } from 'lucide-react';
import AttendanceStatsCards from './AttendanceStatsCards';
import AttendanceTable from './AttendanceTable';
import { AttendanceRecord, AttendanceEmployee, AttendanceStats } from './types';

interface AttendanceContentProps {
    employees: AttendanceEmployee[];
    initialTimesheets: AttendanceRecord[];
    stats: {
        clockedInCount: number;
        totalHoursToday: number;
        totalEmployees: number;
    };
}

const AttendanceContent: React.FC<AttendanceContentProps> = ({ employees, initialTimesheets, stats }) => {
    const router = useRouter();
    const [timesheets, setTimesheets] = useState<AttendanceRecord[]>(initialTimesheets);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(initialTimesheets.length);
    const itemsPerPage = 10;

    // Calculate stats for cards
    const cardStats: AttendanceStats = useMemo(() => ({
        totalPresent: stats.clockedInCount + timesheets.filter(t => t.clockOut).length,
        totalEmployees: stats.totalEmployees,
        clockedIn: stats.clockedInCount,
        totalHoursToday: stats.totalHoursToday,
        onLeave: Math.max(0, stats.totalEmployees - timesheets.length),
        lateArrivals: 0,
        wfh: 0,
    }), [stats, timesheets]);

    // Fetch timesheets from API
    const fetchTimesheets = async (date?: string, page: number = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: itemsPerPage.toString(),
            });

            if (date) {
                params.set('startDate', date);
                // Set end date to next day for range
                const nextDay = new Date(date);
                nextDay.setDate(nextDay.getDate() + 1);
                params.set('endDate', nextDay.toISOString().split('T')[0]);
            }

            const res = await fetch(`/api/timesheets?${params.toString()}`);
            const data = await res.json();

            if (res.ok) {
                setTimesheets(data.timesheets.map((t: any) => ({
                    ...t,
                    clockIn: t.clockIn,
                    clockOut: t.clockOut || null,
                })));
                setTotalCount(data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching timesheets:', error);
        } finally {
            setLoading(false);
        }
    };

    // Refresh data when date changes
    useEffect(() => {
        fetchTimesheets(dateFilter, 1);
        setCurrentPage(1);
    }, [dateFilter]);

    // Filter data by search
    const filteredData = useMemo(() => {
        return timesheets.filter((record) => {
            const fullName = `${record.employee.firstName} ${record.employee.lastName}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [timesheets, searchQuery]);

    // Pagination for filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRefresh = () => {
        fetchTimesheets(dateFilter, currentPage);
    };

    const handleExport = () => {
        // Build CSV content
        const headers = ['Employee', 'Department', 'Clock In', 'Clock Out', 'Hours', 'Status'];
        const rows = filteredData.map(record => [
            `${record.employee.firstName} ${record.employee.lastName}`,
            'General',
            record.clockIn ? new Date(record.clockIn).toLocaleString() : '',
            record.clockOut ? new Date(record.clockOut).toLocaleString() : '',
            record.hoursWorked?.toFixed(2) || '0',
            record.clockOut ? 'Completed' : 'Active'
        ]);

        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-${dateFilter}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const startRange = filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endRange = Math.min(currentPage * itemsPerPage, filteredData.length);

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
                {/* Stats Cards */}
                <AttendanceStatsCards stats={cardStats} />

                {/* Table Section */}
                <div
                    className="flex flex-col rounded-xl shadow-sm overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    {/* Filters */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <div className="relative max-w-sm w-full">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center" style={{ color: 'var(--text-light)' }}>
                                <Search size={20} />
                            </span>
                            <input
                                className="pl-10 pr-4 py-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2463eb] transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                placeholder="Search employee by name or ID..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="flex gap-3">
                            <input
                                className="px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2463eb] cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors active:scale-95 hover:bg-[#1f2937] disabled:opacity-50"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
                            >
                                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                                {loading ? 'Loading...' : 'Refresh'}
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors active:scale-95 hover:bg-[#1f2937]"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
                            >
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <AttendanceTable data={paginatedData} />

                    {/* Pagination */}
                    {filteredData.length > 0 && (
                        <div className="p-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                                Showing <span className="font-bold" style={{ color: 'var(--text-head)' }}>{startRange}-{endRange}</span> of <span className="font-bold" style={{ color: 'var(--text-head)' }}>{filteredData.length}</span> employees
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f2937]"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-light)' }}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1f2937]"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceContent;
