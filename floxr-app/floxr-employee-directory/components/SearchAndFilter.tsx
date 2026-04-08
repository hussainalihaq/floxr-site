import React from 'react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterButton: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors whitespace-nowrap">
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    <span>{label}</span>
  </button>
);

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-border-dark rounded-lg leading-5 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search by name, role, or ID..."
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0">
        <FilterButton icon="filter_list" label="Department" />
        <FilterButton icon="tune" label="Status" />
        <FilterButton icon="category" label="Type" />
      </div>
    </div>
  );
};