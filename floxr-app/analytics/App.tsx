import React from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { OnboardingChart } from './components/charts/OnboardingChart';
import { DepartmentChart } from './components/charts/DepartmentChart';
import { PipelineFunnel } from './components/charts/PipelineFunnel';
import { AttendanceChart } from './components/charts/AttendanceChart';
import { METRICS, DEPARTMENT_DATA } from './constants';
import { Calendar, Download, ChevronDown, MoreHorizontal } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/80 backdrop-blur-md z-10 sticky top-0 px-8 py-6 border-b border-transparent dark:border-transparent">
          <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
            <div className="flex min-w-72 flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">HR Analytics & Insights</h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Real-time data visualization and workforce metrics.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-all">
                  <Calendar className="w-4 h-4" />
                  <span>Last 6 Months</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                <Download className="w-4 h-4" />
                <span className="whitespace-nowrap">Export Data</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">
            
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {METRICS.map((metric, index) => (
                <StatCard key={index} {...metric} />
              ))}
            </div>

            {/* Middle Row: Area Chart & Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Onboarding Trends */}
              <div className="lg:col-span-2 flex flex-col bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden h-[400px]">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Onboarding Completion Trends</h3>
                    <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Candidates fully onboarded over last 6 months</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    <span className="text-xs text-slate-500">Completed</span>
                  </div>
                </div>
                <div className="flex-1 relative p-6 w-full h-full">
                  <OnboardingChart />
                </div>
              </div>

              {/* Department Split */}
              <div className="lg:col-span-1 flex flex-col bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden h-[400px]">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-border-dark">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Departmental Split</h3>
                  <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Headcount distribution</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <DepartmentChart />
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2 w-full px-4">
                    {DEPARTMENT_DATA.map((dept, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.fill }}></span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">{dept.name} ({dept.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Pipeline & Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Hiring Pipeline */}
              <div className="flex flex-col bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm p-6 h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Hiring Pipeline</h3>
                    <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Conversion rates by stage</p>
                  </div>
                  <button className="text-slate-500 hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <PipelineFunnel />
              </div>

              {/* Attendance Rates */}
              <div className="flex flex-col bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm p-6 h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Attendance Rates</h3>
                    <p className="text-slate-500 dark:text-[#9da6b9] text-sm">Average attendance by department</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-500">High Performing</span>
                  </div>
                </div>
                <AttendanceChart />
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;