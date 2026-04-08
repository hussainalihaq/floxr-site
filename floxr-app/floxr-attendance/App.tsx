import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { AttendanceTable } from './components/AttendanceTable';
import { MOCK_DATA } from './constants';
import { Stats } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('2023-10-24');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Data
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((record) => {
        const matchesSearch = 
            record.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.employee.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Note: In a real app, we would filter by record.date === dateFilter
        // keeping all mock data for demo purposes if date matches default
        const matchesDate = record.date === dateFilter; 

        return matchesSearch && matchesDate;
    });
  }, [searchQuery, dateFilter]);

  // Pagination Logic
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

  // Calculate Stats on the fly based on full filtered dataset (or full dataset if we want global stats)
  // For this demo, let's calculate based on the MOCK_DATA to keep stats consistent while searching
  const stats: Stats = useMemo(() => {
      // Mock stats to match the screenshot exactly for the demo
      // In a real app, these would likely be fetched from an API endpoint
      return {
          totalPresent: 85,
          totalEmployees: 100,
          onLeave: 5,
          lateArrivals: 3,
          wfh: 7
      };
  }, []);

  return (
    <div className="flex h-screen w-full font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-transparent dark:border-transparent">
          <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
            <div className="flex min-w-72 flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Attendance Management</h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Monitor daily check-ins, leaves, and working hours.</p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] hover:bg-slate-50 dark:hover:bg-[#282e39] text-slate-700 dark:text-slate-300 text-sm font-bold shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="whitespace-nowrap">Export Report</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
            <StatsCards stats={stats} />

            {/* Table Section */}
            <div className="flex flex-col bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="p-5 border-b border-slate-200 dark:border-[#282e39] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </span>
                        <input 
                            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" 
                            placeholder="Search employee by name or ID..." 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <input 
                                className="pl-4 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer" 
                                type="date" 
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                            Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <AttendanceTable data={paginatedData} />

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 dark:border-[#282e39] flex items-center justify-between">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing <span className="font-bold text-slate-700 dark:text-slate-200">
                            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}-
                            {Math.min(currentPage * itemsPerPage, filteredData.length)}
                        </span> of <span className="font-bold text-slate-700 dark:text-slate-200">{filteredData.length}</span> employees
                    </p>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button 
                             onClick={() => handlePageChange(currentPage + 1)}
                             disabled={currentPage === totalPages || totalPages === 0}
                             className="p-2 rounded-lg border border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;