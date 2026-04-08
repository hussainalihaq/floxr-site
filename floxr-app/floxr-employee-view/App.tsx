import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProfileHeader } from './components/ProfileHeader';
import { ContactCard, EmploymentCard, OnboardingCard } from './components/InfoCards';
import { HeaderActions } from './components/HeaderActions';
import { DocumentsView } from './components/DocumentsView';

function App() {
    const [activeTab, setActiveTab] = useState('General Info');
    const [darkMode, setDarkMode] = useState(true);

    // Initial theme check
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const tabs = [
        { name: 'General Info', count: null },
        { name: 'Equipment', count: 3 },
        { name: 'Documents', count: 5 },
        { name: 'Activity Log', count: null },
    ];

    return (
        <div className="flex h-screen w-full font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <Sidebar />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/80 backdrop-blur-md z-10 sticky top-0 px-4 md:px-8 py-4 border-b border-transparent">
                    <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto w-full">
                        <button className="flex items-center gap-2 px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#1f2937] rounded-lg transition-all group">
                            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            <span className="font-medium text-sm">Back to Directory</span>
                        </button>

                        <div className="flex gap-3">
                            <button 
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-10 h-10 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-[#1f2937] rounded-lg transition-all"
                                title="Toggle Theme"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {darkMode ? 'light_mode' : 'dark_mode'}
                                </span>
                            </button>
                            
                            <HeaderActions />
                            
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">
                        
                        {/* Profile Header */}
                        <ProfileHeader />

                        {/* Tabs Navigation */}
                        <div className="border-b border-slate-200 dark:border-[#282e39]">
                            <nav aria-label="Tabs" className="flex gap-8 overflow-x-auto no-scrollbar">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`
                                            pb-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all
                                            ${activeTab === tab.name 
                                                ? 'border-primary text-primary' 
                                                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300'
                                            }
                                        `}
                                    >
                                        {tab.name}
                                        {tab.count && (
                                            <span className="bg-slate-100 dark:bg-[#282e39] text-slate-600 dark:text-slate-400 text-xs py-0.5 px-2 rounded-full">
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content Area */}
                        {activeTab === 'General Info' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                               <ContactCard />
                               <EmploymentCard />
                               <OnboardingCard />
                            </div>
                        )}

                        {activeTab === 'Documents' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <DocumentsView />
                            </div>
                        )}

                        {(activeTab === 'Equipment' || activeTab === 'Activity Log') && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-surface-dark border border-dashed border-slate-300 dark:border-[#282e39] rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-[#1f2937] rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-[32px] text-slate-400">construction</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Work in Progress</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">This section is currently under development.</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;