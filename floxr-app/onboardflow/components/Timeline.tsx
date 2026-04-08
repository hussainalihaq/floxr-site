import React from 'react';
import { Mail, ShieldCheck, RefreshCw, Truck, Users, GraduationCap, MessageSquare, CheckSquare, Calendar, ExternalLink, ChevronRight, Package } from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'email': return <Mail size={18} />;
      case 'badge': return <ShieldCheck size={18} />;
      case 'shipping': return <Package size={18} />;
      case 'group': return <Users size={18} />;
      case 'training': return <GraduationCap size={18} />;
      default: return <Mail size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.2)]';
      case 'in-progress': return 'bg-blue-600 border-blue-600 text-white shadow-[0_0_0_4px_rgba(37,99,235,0.2)]';
      case 'pending': return 'bg-white dark:bg-[#1f2937] border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500';
      case 'locked': return 'bg-slate-50 dark:bg-[#111318] border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600';
      default: return 'bg-slate-100';
    }
  };

  const getBadgeStyles = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30';
      case 'pending': return 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
      case 'locked': return 'bg-slate-50 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500 border border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-hidden bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-border-dark flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white dark:bg-card-dark z-10 sticky top-0">
        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
            Onboarding Journey
          </h3>
          <p className="text-slate-500 dark:text-[#9da6b9] text-sm mt-1">Real-time status of candidate provisioning</p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Done</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Pending</span>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 relative bg-slate-50/50 dark:bg-[#111318]/50 custom-scrollbar">
        {/* The Vertical Rail */}
        <div className="absolute left-[3.25rem] sm:left-[4.5rem] top-8 bottom-8 w-px bg-slate-200 dark:bg-border-dark"></div>
        
        <div className="space-y-8 relative">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className={`relative flex items-start gap-4 sm:gap-8 group ${event.status === 'locked' ? 'opacity-60 grayscale' : ''}`}
            >
              {/* Left Column: Icon & Time */}
              <div className="flex flex-col items-center flex-shrink-0 w-14 sm:w-20">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 border-2 transition-transform duration-300 group-hover:scale-110 ${getStatusColor(event.status)}`}>
                  {event.status === 'shipping' && event.statusLabel === 'Shipped' ? (
                     <RefreshCw size={18} className="animate-spin-slow" />
                  ) : (
                     getIcon(event.icon)
                  )}
                </div>
                {event.date || event.time ? (
                  <div className={`text-[10px] sm:text-xs font-bold mt-2 text-center leading-tight ${event.status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                     {event.date ? (
                       <>
                         <span className="block">{event.date.split(',')[0]}</span>
                         <span className="block font-medium opacity-80">{event.date.split(',')[1]}</span>
                       </>
                     ) : (
                       event.time
                     )}
                  </div>
                ) : (
                   <div className="h-6 mt-2"></div>
                )}
              </div>

              {/* Right Column: Card */}
              <div className={`flex-1 rounded-xl transition-all duration-200 relative overflow-hidden ${
                event.status === 'locked' 
                  ? 'bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-border-dark border-dashed'
                  : event.status === 'in-progress'
                    ? 'bg-white dark:bg-[#1f2937] border border-blue-200 dark:border-blue-900 shadow-md ring-1 ring-blue-100 dark:ring-blue-900/50'
                    : 'bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600'
              }`}>
                {/* Active Indicator Strip */}
                {event.status === 'in-progress' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                )}

                <div className="p-4 sm:p-5">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className={`text-base font-bold ${event.status === 'in-progress' ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                      {event.title}
                    </h4>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getBadgeStyles(event.status)}`}>
                      {event.statusLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed max-w-xl">
                    {event.description}
                  </p>

                  {/* Meta Content Area */}
                  {(event.meta) && (
                    <div className="space-y-3 mt-4 pt-3 border-t border-slate-100 dark:border-border-dark">
                      
                      {/* Meta: Triggered By */}
                      {event.meta.triggeredBy && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={event.meta.avatarUrl || "https://ui-avatars.com/api/?name=Admin&background=random"} 
                              alt="User" 
                              className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-card-dark" 
                            />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Triggered by <span className="text-slate-700 dark:text-slate-300 font-semibold">{event.meta.triggeredBy}</span>
                            </span>
                          </div>
                          <button className="text-xs text-primary font-medium hover:underline">View Log</button>
                        </div>
                      )}

                      {/* Meta: Tracking Info (specific to shipping) */}
                      {event.meta.trackingNumber && (
                        <div className="bg-slate-50 dark:bg-black/20 p-3 rounded-lg border border-slate-200 dark:border-border-dark group/track">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                              <Truck size={14} />
                              <span>FedEx Express</span>
                            </div>
                            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">On The Way</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="font-mono text-xs text-slate-500 select-all">{event.meta.trackingNumber}</div>
                             <a href="#" className="flex items-center gap-1 text-[11px] font-bold text-primary hover:text-blue-700 transition-colors">
                               Track Package <ExternalLink size={10} />
                             </a>
                          </div>
                        </div>
                      )}

                       {/* Meta: Event Date (specific to meetings) */}
                       {event.meta.eventDate && (
                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs bg-slate-100 dark:bg-border-dark px-2.5 py-1.5 rounded-md">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="font-medium">{event.meta.eventDate}</span>
                          </div>
                          <button className="text-xs font-medium text-primary hover:underline">Add to Calendar</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Account Access Specific Actions */}
                  {event.id === 'account-access' && (
                     <div className="flex gap-2 mt-4">
                        {['Gmail', 'Slack', 'Jira', 'Figma'].map((tool) => (
                           <div key={tool} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{tool}</span>
                           </div>
                        ))}
                     </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};