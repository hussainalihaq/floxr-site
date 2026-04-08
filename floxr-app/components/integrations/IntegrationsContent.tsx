'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { IntegrationCard } from './IntegrationCard';
import { INITIAL_INTEGRATIONS } from './data';
import { IntegrationCategory } from './types';

export const IntegrationsContent: React.FC = () => {
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

    // Disconnect handler (switches state to disconnected)
    const handleDisconnect = (id: string) => {
        setIntegrations(prev =>
            prev.map(item => item.id === id ? { ...item, isConnected: false, autoSync: false } : item)
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

    // Count connected integrations
    const connectedCount = integrations.filter(i => i.isConnected).length;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 bg-[var(--bg-surface)]/80 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">Integrations Marketplace</h2>
                        <p className="text-[var(--text-muted)] text-sm">Supercharge your workflow by connecting your favorite tools.</p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-[var(--text-muted)]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search integrations..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-[var(--border-subtle)] rounded-xl leading-5 bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-[#2463eb] sm:text-sm transition-shadow"
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
                                className={`px-4 py-2 rounded-lg text-sm transition-all border ${activeCategory === category
                                    ? 'bg-[#2463eb] text-white shadow-lg shadow-[#2463eb]/25 border-transparent font-semibold'
                                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-subtle)] font-medium'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}

                        {/* Connected Count Badge */}
                        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-sm font-medium text-emerald-500">{connectedCount} Connected</span>
                        </div>
                    </div>

                    {/* Integration Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIntegrations.map((integration) => (
                            <IntegrationCard
                                key={integration.id}
                                data={integration}
                                onToggleSync={handleToggleSync}
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                            />
                        ))}

                        {filteredIntegrations.length === 0 && (
                            <div className="col-span-full py-12 text-center text-[var(--text-muted)]">
                                <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No integrations found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Bottom Call to Action */}
                    <div className="mt-12 text-center pb-8">
                        <p className="text-[var(--text-muted)] text-sm">
                            Don&apos;t see the tool you use?
                            <a
                                href="#"
                                className="text-[#2463eb] hover:text-blue-400 font-semibold ml-1 transition-colors border-b border-[#2463eb]/30 hover:border-[#2463eb]"
                            >
                                Request an Integration
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
