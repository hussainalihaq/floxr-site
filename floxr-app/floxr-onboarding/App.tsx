import React from 'react';
import Sidebar from './components/Sidebar';
import PipelineCard from './components/PipelineCard';
import CandidateRow from './components/CandidateRow';
import { PIPELINE_STATS, CANDIDATES } from './constants';

const App: React.FC = () => {
    return (
        <div className="flex h-screen w-full font-display mx-auto max-w-[1600px] aspect-[16/9] bg-white dark:bg-background-dark shadow-2xl overflow-hidden relative border-x border-slate-200 dark:border-[#282e39]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-[#0c1017]">
                
                {/* Header */}
                <header className="w-full flex-shrink-0 bg-white/80 dark:bg-[#101622]/90 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-slate-200 dark:border-[#282e39]">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Onboarding Pipeline</h2>
                            <p className="text-slate-500 dark:text-[#9da6b9] text-sm mt-1">Manage and track new hires across all stages.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                </span>
                                <input 
                                    className="block w-64 pl-10 pr-3 py-2.5 bg-slate-100 dark:bg-[#1f2937] border border-transparent focus:border-primary/50 rounded-lg leading-5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm transition-all shadow-sm" 
                                    placeholder="Search candidates..." 
                                    type="text" 
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-[#3b4354] rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#2d3748] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span className="whitespace-nowrap">Start New Onboarding</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex flex-col gap-8 mx-auto pb-10 h-full max-w-7xl">
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {PIPELINE_STATS.map(stat => (
                                <PipelineCard key={stat.id} stat={stat} />
                            ))}
                        </div>

                        {/* Candidates Table Container */}
                        <div className="bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden flex flex-col flex-1">
                            {/* Table Header */}
                            <div className="px-6 py-5 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center bg-slate-50/50 dark:bg-[#181c24]">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Candidates</h3>
                                <div className="flex gap-2 text-sm text-slate-500">
                                    <span>Showing 28 candidates</span>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-[#282e39] text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-[#1f2937]">
                                            <th className="px-6 py-4">Candidate</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 w-1/4">Current Stage</th>
                                            <th className="px-6 py-4">Assigned To</th>
                                            <th className="px-6 py-4">Task Completion</th>
                                            <th className="px-6 py-4">Due Date</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-[#282e39]">
                                        {CANDIDATES.map(candidate => (
                                            <CandidateRow key={candidate.id} candidate={candidate} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#181c24] flex items-center justify-between mt-auto">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 5 of 28 results</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300 transition-colors">Previous</button>
                                    <button className="px-3 py-1 text-sm bg-primary text-white border border-primary rounded shadow-sm">1</button>
                                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300 transition-colors">2</button>
                                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300 transition-colors">3</button>
                                    <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300 transition-colors">Next</button>
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