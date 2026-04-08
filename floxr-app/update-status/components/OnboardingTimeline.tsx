import React from 'react';
import { TimelineEvent } from '../types';

interface OnboardingTimelineProps {
  events: TimelineEvent[];
}

const OnboardingTimeline: React.FC<OnboardingTimelineProps> = ({ events }) => {
  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-hidden bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm">
      <div className="p-8 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center bg-white dark:bg-[#181c24] z-10 sticky top-0">
        <div>
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">Onboarding Timeline</h3>
          <p className="text-slate-500 dark:text-[#9da6b9] text-sm mt-1">Live status of onboarding tasks and provisioning</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Completed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-md">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/30 rounded-md">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Pending</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-10 relative bg-slate-50/50 dark:bg-[#111318]/50">
        <div className="absolute left-16 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-[#282e39]"></div>
        <div className="space-y-10 relative">
          
          {events.map((event) => (
            <div key={event.id} className={`relative flex items-start gap-8 group ${event.status === 'scheduled' ? 'opacity-60' : event.status === 'locked' ? 'opacity-40' : ''}`}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 ring-4 ring-white dark:ring-[#181c24] relative ${event.bgColorClass || 'bg-white dark:bg-[#282e39]'} ${event.iconColorClass}`}>
                  <span className={`material-symbols-outlined ${event.status === 'in_progress' ? 'animate-spin-slow' : ''}`}>{event.icon}</span>
                </div>
                <div className={`text-[10px] font-bold mt-2 text-center w-20 ${event.status === 'in_progress' ? 'text-primary' : 'text-slate-400'}`}>
                  {event.time || event.date || (event.status === 'in_progress' ? 'In Progress' : 'Pending')}
                </div>
              </div>
              
              <div className={`flex-1 p-5 rounded-xl border shadow-sm transition-all ${event.status === 'locked' ? 'bg-slate-50 dark:bg-[#181c24] border-dashed border-slate-200 dark:border-[#282e39]' : 'bg-white dark:bg-[#1f2937] hover:shadow-md'} ${event.borderColorClass || 'border-slate-200 dark:border-[#282e39]'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{event.title}</h4>
                  {event.status === 'completed' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 uppercase tracking-wide">Completed</span>
                  )}
                  {event.status === 'in_progress' && (
                     <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 uppercase tracking-wide">Shipped</span>
                  )}
                  {event.status === 'scheduled' && (
                     <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 uppercase tracking-wide">Scheduled</span>
                  )}
                   {event.status === 'locked' && (
                     <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500 uppercase tracking-wide">Locked</span>
                  )}
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{event.description}</p>
                
                {event.meta?.userImage && (
                  <div className="flex items-center gap-2">
                    <img alt="User" className="w-5 h-5 rounded-full" src={event.meta.userImage} />
                    <span className="text-xs text-slate-400">Triggered by <span className="text-slate-600 dark:text-slate-300 font-medium">{event.meta.userName}</span></span>
                  </div>
                )}

                {event.meta?.icons && (
                  <div className="flex gap-2 mt-2">
                    {event.meta.icons.map((ic, i) => (
                      <div key={i} className="w-8 h-8 rounded bg-slate-100 dark:bg-[#282e39] flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-lg">{ic}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {event.meta?.trackingId && (
                  <div className="bg-slate-50 dark:bg-[#181c24] p-3 rounded-lg border border-slate-100 dark:border-[#282e39] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tracking: {event.meta.trackingId}</p>
                        <p className="text-[10px] text-slate-400">{event.meta.provider} • Est. Delivery: Tomorrow</p>
                      </div>
                    </div>
                    <a href="#" className="text-primary text-xs font-bold hover:underline">Track</a>
                  </div>
                )}
                
                {event.status === 'scheduled' && event.date && event.time && (
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        <span>{event.date}, {event.time}</span>
                    </div>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default OnboardingTimeline;