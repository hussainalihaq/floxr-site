import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { IntegrationCard } from './components/IntegrationCard';
import { INITIAL_INTEGRATIONS } from './data';
import { IntegrationCategory } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory>('All Apps');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  // Toggle Auto-Sync
  const handleToggleSync = (id: string, newValue: boolean) => {
    setIntegrations(prev => 
      prev.map(item => item.id === id ? { ...item, autoSync: newValue } : item)
    );
  };

  // Connect handler (switches state to connected)
  const handleConnect = (id: string) => {
    setIntegrations(prev =>
      prev.map(item => item.id === id ? { ...item, isConnected: true, autoSync: true } : item)
    );
  };

  // Filtering Logic
  const filteredIntegrations = useMemo(() => {
    return integrations.filter(item => {
      // Category Filter
      const matchesCategory = activeCategory === 'All Apps' || item.categories.includes(activeCategory);
      
      // Search Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(query) || 
                            item.description.toLowerCase().includes(query);
      
      return matchesCategory && matchesSearch;
    });
  }, [integrations, activeCategory, searchQuery]);

  const categories: IntegrationCategory[] = ['All Apps', 'Communication', 'Productivity', 'Payroll'];

  return (
    <div className="flex h-screen w-full font-display bg-background-light dark:bg-[#0b0e14]">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Sticky Header */}
        <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/80 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-slate-200 dark:border-[#1e232d]">
          <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto">
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">Integrations Marketplace</h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Supercharge your workflow by connecting your favorite tools.</p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
              </div>
              <input 
                type="text"
                placeholder="Search integrations..."
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-[#282e39] rounded-xl leading-5 bg-white dark:bg-[#181c24] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 border-transparent font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f2530] hover:text-slate-900 dark:hover:text-white border-transparent hover:border-slate-200 dark:hover:border-[#282e39] font-medium'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard 
                  key={integration.id} 
                  data={integration} 
                  onToggleSync={handleToggleSync}
                  onConnect={handleConnect}
                />
              ))}
              
              {filteredIntegrations.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">search_off</span>
                  <p>No integrations found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-12 text-center pb-8">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Don't see the tool you use? 
                <a 
                  href="#" 
                  className="text-primary hover:text-blue-400 font-semibold ml-1 transition-colors border-b border-primary/30 hover:border-primary"
                >
                  Request an Integration
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;