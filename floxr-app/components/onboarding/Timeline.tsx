'use client';

import React from 'react';
import { Mail, ShieldCheck, Package, Users, GraduationCap, Truck, Calendar, ExternalLink } from 'lucide-react';
import { TimelineEvent } from './detail-types';

interface TimelineProps {
    events: TimelineEvent[];
}

const getIcon = (type: string) => {
    switch (type) {
        case 'email': return <Mail size={18} />;
        case 'badge': return <ShieldCheck size={18} />;
        case 'shipping': return <Package size={18} />;
        case 'group': return <Users size={18} />;
        case 'training': return <GraduationCap size={18} />;
        default: return <Mail size={18} />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.2)]';
        case 'in-progress': return 'bg-blue-600 border-blue-600 text-white shadow-[0_0_0_4px_rgba(37,99,235,0.2)]';
        case 'pending': return 'bg-[#1f2937] border-slate-600 text-slate-500';
        case 'locked': return 'bg-[#111318] border-slate-700 text-slate-600';
        default: return 'bg-slate-100';
    }
};

const getBadgeStyles = (status: string) => {
    switch (status) {
        case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'pending': return 'bg-slate-700/50 text-slate-300 border-slate-600';
        case 'locked': return 'bg-slate-800/50 text-slate-500 border-slate-700';
        default: return 'bg-slate-100';
    }
};

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div
            className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-hidden rounded-xl shadow-sm"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
            {/* Header */}
            <div
                className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 z-10 sticky top-0"
                style={{
                    backgroundColor: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border-subtle)'
                }}
            >
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-head)' }}>
                        Onboarding Journey
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
                        Real-time status of candidate provisioning
                    </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>Done</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>Pending</span>
                    </div>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 relative" style={{ backgroundColor: 'rgba(17, 19, 24, 0.5)' }}>
                {/* Vertical Rail */}
                <div
                    className="absolute left-[3.25rem] sm:left-[4.5rem] top-8 bottom-8 w-px"
                    style={{ backgroundColor: 'var(--border-subtle)' }}
                ></div>

                <div className="space-y-8 relative">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={`relative flex items-start gap-4 sm:gap-8 group ${event.status === 'locked' ? 'opacity-60 grayscale' : ''}`}
                        >
                            {/* Left Column: Icon & Time */}
                            <div className="flex flex-col items-center flex-shrink-0 w-14 sm:w-20">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 border-2 transition-transform duration-300 group-hover:scale-110 ${getStatusColor(event.status)}`}>
                                    {getIcon(event.icon)}
                                </div>
                                {(event.date || event.time) && (
                                    <div className={`text-[10px] sm:text-xs font-bold mt-2 text-center leading-tight ${event.status === 'in-progress' ? 'text-blue-400' : ''}`} style={{ color: event.status !== 'in-progress' ? 'var(--text-light)' : undefined }}>
                                        {event.date ? (
                                            <>
                                                <span className="block">{event.date.split(',')[0]}</span>
                                                <span className="block font-medium opacity-80">{event.date.split(',')[1]}</span>
                                            </>
                                        ) : (
                                            event.time
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Card */}
                            <div className={`flex-1 rounded-xl transition-all duration-200 relative overflow-hidden ${event.status === 'locked'
                                    ? 'border-dashed'
                                    : event.status === 'in-progress'
                                        ? 'border-blue-900 shadow-md ring-1 ring-blue-900/50'
                                        : 'shadow-sm hover:shadow-md'
                                }`} style={{
                                    backgroundColor: event.status === 'locked' ? 'var(--bg-card)' : '#1f2937',
                                    border: `1px solid ${event.status === 'in-progress' ? 'rgb(30, 64, 175)' : 'var(--border-subtle)'}`
                                }}>
                                {/* Active Indicator Strip */}
                                {event.status === 'in-progress' && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                )}

                                <div className="p-4 sm:p-5">
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h4 className={`text-base font-bold ${event.status === 'in-progress' ? 'text-blue-400' : ''}`} style={{ color: event.status !== 'in-progress' ? 'var(--text-head)' : undefined }}>
                                            {event.title}
                                        </h4>
                                        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getBadgeStyles(event.status)}`}>
                                            {event.statusLabel}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm mb-4 leading-relaxed max-w-xl" style={{ color: 'var(--text-light)' }}>
                                        {event.description}
                                    </p>

                                    {/* Meta Content */}
                                    {event.meta && (
                                        <div className="space-y-3 mt-4 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>

                                            {/* Triggered By */}
                                            {event.meta.triggeredBy && (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
                                                            {event.meta.triggeredBy.charAt(0)}
                                                        </div>
                                                        <span className="text-xs" style={{ color: 'var(--text-light)' }}>
                                                            Triggered by <span className="font-semibold" style={{ color: 'var(--text-body)' }}>{event.meta.triggeredBy}</span>
                                                        </span>
                                                    </div>
                                                    <button className="text-xs text-[#2463eb] font-medium hover:underline">View Log</button>
                                                </div>
                                            )}

                                            {/* Tracking Info */}
                                            {event.meta.trackingNumber && (
                                                <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)' }}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-body)' }}>
                                                            <Truck size={14} />
                                                            <span>FedEx Express</span>
                                                        </div>
                                                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">On The Way</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-mono text-xs select-all" style={{ color: 'var(--text-light)' }}>{event.meta.trackingNumber}</div>
                                                        <a href="#" className="flex items-center gap-1 text-[11px] font-bold text-[#2463eb] hover:text-blue-400 transition-colors">
                                                            Track Package <ExternalLink size={10} />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Event Date */}
                                            {event.meta.eventDate && (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-light)' }}>
                                                        <Calendar size={14} />
                                                        <span className="font-medium">{event.meta.eventDate}</span>
                                                    </div>
                                                    <button className="text-xs font-medium text-[#2463eb] hover:underline">Add to Calendar</button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Account Access Badges */}
                                    {event.id === 'account-access' && (
                                        <div className="flex gap-2 mt-4">
                                            {['Gmail', 'Slack', 'Jira', 'Figma'].map((tool) => (
                                                <div key={tool} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                    <span className="text-[10px] font-bold text-emerald-400">{tool}</span>
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

export default Timeline;
