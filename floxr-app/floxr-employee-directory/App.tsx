import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmployeeTable } from './components/EmployeeTable';
import { TabNavigation } from './components/TabNavigation';
import { SearchAndFilter } from './components/SearchAndFilter';
import { EMPLOYEES } from './constants';
import { EmployeeStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Employees');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Keeping it consistent with UI showing 1-5 of 42 (simulated)

  // Filtering Logic
  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter((employee) => {
      // 1. Filter by Tab
      if (activeTab === 'Onboarding' && employee.status !== EmployeeStatus.Onboarding) return false;
      if (activeTab === 'Active' && employee.status !== EmployeeStatus.Active) return false;
      if (activeTab === 'Offboarding' && employee.status !== EmployeeStatus.Offboarding) return false;
      
      // 2. Filter by Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          employee.name.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  // Pagination Logic (Simulated for this demo since we only have 5 items in constants, but setup is real)
  const totalEmployees = filteredEmployees.length;
  // In a real app with 42 items, we would slice. For now, we show all mock data.
  const paginatedEmployees = filteredEmployees; 
  
  const startRange = totalEmployees > 0 ? 1 : 0;
  const endRange = totalEmployees;

  return (
    <div className="flex h-screen w-full font-display">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">
            
            {/* Controls Section */}
            <div className="flex flex-col gap-4">
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
              
              <SearchAndFilter 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
              />
            </div>

            {/* Data Table Section */}
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="overflow-x-auto">
                <EmployeeTable employees={paginatedEmployees} />
              </div>

              {/* Pagination Footer */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-border-dark flex items-center justify-between bg-white dark:bg-surface-dark">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showing <span className="font-medium text-slate-900 dark:text-white">{startRange}-{endRange}</span> of <span className="font-medium text-slate-900 dark:text-white">{totalEmployees}</span> employees
                </p>
                <div className="flex gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1 text-sm border border-slate-200 dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button 
                     disabled={true} // Disabled for mock demo as we don't have > 10 items
                     onClick={() => setCurrentPage(p => p + 1)}
                     className="px-3 py-1 text-sm border border-slate-200 dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
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