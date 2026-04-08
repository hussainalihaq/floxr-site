import React from 'react';
import { WorkflowStep } from '../types';

const steps: WorkflowStep[] = [
  {
    id: '1',
    label: 'Offer Accepted',
    subLabel: 'Candidate Signed',
    status: 'completed',
    icon: 'check_circle',
  },
  {
    id: '2',
    label: 'Doc Collection',
    subLabel: 'I-9 & Tax Forms',
    status: 'in-progress',
    icon: 'sync',
  },
  {
    id: '3',
    label: 'IT Provisioning',
    subLabel: 'Hardware Setup',
    status: 'pending',
    icon: 'laptop_mac',
  },
  {
    id: '4',
    label: 'Welcome Day',
    subLabel: 'Team Intro',
    status: 'locked',
    icon: 'lock',
  },
];

const WorkflowSection: React.FC = () => {
  return (
    <div className="lg:col-span-2 flex flex-col bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden h-[500px]">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center bg-white dark:bg-[#181c24]">
        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">Onboarding Workflow</h3>
          <p className="text-slate-500 dark:text-[#9da6b9] text-sm">
            Visual representation of current candidate pipeline
          </p>
        </div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-[#282e39] rounded-lg transition-colors text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined">fullscreen</span>
        </button>
      </div>
      
      <div className="flex-1 relative bg-slate-50 dark:bg-[#111318] p-6 overflow-x-auto flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        <div className="relative z-10 flex items-center gap-8 min-w-max">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Card */}
              <div
                className={`flex flex-col items-center gap-2 group ${
                  step.status === 'locked'
                    ? 'opacity-40'
                    : step.status === 'pending'
                    ? 'opacity-60 hover:opacity-100 transition-opacity'
                    : ''
                }`}
              >
                <div
                  className={`w-48 p-4 rounded-xl shadow-lg dark:shadow-none transition-all duration-300 cursor-pointer ${
                    step.status === 'completed'
                      ? 'bg-white dark:bg-[#1f2937] border-l-4 border-emerald-500 hover:-translate-y-1'
                      : step.status === 'in-progress'
                      ? 'bg-white dark:bg-[#1f2937] border-l-4 border-primary ring-2 ring-primary/20 hover:-translate-y-1'
                      : step.status === 'pending'
                      ? 'bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-[#282e39] border-l-4 border-l-slate-300 dark:border-l-slate-600 hover:-translate-y-1 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] border-dashed border-2 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    {/* Status Badge */}
                    {step.status === 'completed' && (
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                        Completed
                      </span>
                    )}
                    {step.status === 'in-progress' && (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                        In Progress
                      </span>
                    )}
                    {step.status === 'pending' && (
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                    {step.status === 'locked' && (
                      <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded">
                        Locked
                      </span>
                    )}
                    
                    <span className="material-symbols-outlined text-slate-400 text-sm">
                      {step.icon}
                    </span>
                  </div>

                  <p className="font-bold text-slate-800 dark:text-white text-sm">{step.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{step.subLabel}</p>
                  
                  {step.status === 'in-progress' && (
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-primary w-2/3"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500/50'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex bg-white dark:bg-[#1f2937] rounded-lg shadow border border-slate-200 dark:border-[#282e39] p-1">
          <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#282e39] rounded text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
          <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#282e39] rounded text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;
