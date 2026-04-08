'use client';

import React from 'react';
import { Search, SlidersHorizontal, Filter, LayoutGrid } from 'lucide-react';

interface SearchAndFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const FilterButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap hover:bg-[var(--bg-card)]"
        style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} style={{ color: 'var(--text-light)' }} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 rounded-lg leading-5 text-sm transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#2463eb] focus:border-[#2463eb]"
                    style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-head)'
                    }}
                    placeholder="Search by name, role, or ID..."
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0">
                <FilterButton icon={<Filter size={18} />} label="Department" />
                <FilterButton icon={<SlidersHorizontal size={18} />} label="Status" />
                <FilterButton icon={<LayoutGrid size={18} />} label="Type" />
            </div>
        </div>
    );
};

export default SearchAndFilter;
