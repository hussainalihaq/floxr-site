import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { EmployeeTable } from './components/EmployeeTable';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { INITIAL_EMPLOYEES } from './constants';
import { Employee, FilterState } from './types';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tab: 'All'
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Tab Filter
      if (filters.tab !== 'All' && employee.status !== filters.tab) return false;
      
      // Search Filter
      const searchLower = filters.search.toLowerCase();
      return (
        employee.name.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower)
      );
    });
  }, [employees, filters]);

  const handleCreateEmployee = (data: Omit<Employee, 'id' | 'status' | 'progress' | 'equipmentIcon'> & { equipmentIcon: string }) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      status: 'Onboarding', // Default for new
      progress: 0,
      ...data
    };
    
    setEmployees(prev => [newEmployee, ...prev]);
  };

  return (
    <div className="relative h-screen w-full font-display bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Main App Content - Blurred when modal is open */}
      <div className={`flex h-full w-full transition-all duration-300 ease-in-out ${isModalOpen ? 'blur-sm scale-[0.99] opacity-50 pointer-events-none' : ''}`}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* Top Header */}
          <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-transparent dark:border-transparent">
            <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
              <div className="flex min-w-72 flex-col gap-1">
                <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Employee Directory</h2>
                <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Manage access, track onboarding progress, and view equipment assignments.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="whitespace-nowrap">Add New Employee</span>
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">
              
              {/* Filters Area */}
              <div className="flex flex-col gap-4">
                
                {/* Tabs */}
                <div className="border-b border-slate-200 dark:border-[#282e39]">
                  <div className="flex gap-6 overflow-x-auto">
                    {(['All', 'Onboarding', 'Active', 'Offboarding'] as const).map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setFilters(prev => ({ ...prev, tab }))}
                        className={`pb-3 border-b-2 transition-all font-medium text-sm flex items-center gap-2 ${
                          filters.tab === tab 
                            ? 'border-primary text-primary font-bold' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                      >
                        {tab === 'All' ? 'All Employees' : tab}
                        {tab === 'Onboarding' && <span className="bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">4</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search & Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                    </div>
                    <input 
                      type="text" 
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-[#282e39] rounded-lg leading-5 bg-white dark:bg-[#181c24] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out" 
                      placeholder="Search by name, role, or ID..." 
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                      <span>Department</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                      <span>Status</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">category</span>
                      <span>Type</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <EmployeeTable employees={filteredEmployees} />

            </div>
          </div>
        </main>
      </div>

      {/* Modal - Rendered outside to stay sharp */}
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateEmployee}
      />
    </div>
  );
}

export default App;
