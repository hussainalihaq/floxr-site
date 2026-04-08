'use client';

import React from 'react';
import { Mail, Phone, Copy, Linkedin, Github, Edit2 } from 'lucide-react';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    department?: { name: string } | null;
    startDate: string;
    employmentType: string;
    onboardingProgress?: number;
    onboardingStatus?: string;
}

const CardHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    action?: React.ReactNode
}> = ({ title, icon, action }) => (
    <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-head)' }}>
            <span className="text-[#2463eb]">{icon}</span>
            {title}
        </h3>
        {action}
    </div>
);

const EditButton = () => (
    <button className="p-1 rounded-md transition-colors text-slate-400 hover:text-[#2463eb] hover:bg-[#1f2937]">
        <Edit2 size={16} />
    </button>
);

const CopyButton = () => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <button
            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#2463eb]"
            title="Copy"
        >
            <Copy size={14} />
        </button>
    );
};

// Contact Information Card
export const ContactCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    return (
        <div
            className="rounded-xl shadow-sm flex flex-col h-full"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <CardHeader
                title="Contact Information"
                icon={<Mail size={18} />}
                action={<EditButton />}
            />

            <div className="p-6 space-y-6 flex-1">
                <div className="group">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                        Work Email
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium select-all" style={{ color: 'var(--text-head)' }}>
                            {employee.email}
                        </span>
                        <CopyButton />
                    </div>
                </div>

                <div className="group">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                        Phone Number
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium select-all" style={{ color: 'var(--text-head)' }}>
                            {employee.phone || '—'}
                        </span>
                        {employee.phone && <CopyButton />}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                        Social Profiles
                    </p>
                    <div className="flex gap-2 mt-2">
                        <a
                            href="#"
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-slate-400 hover:text-white hover:border-slate-400"
                            style={{
                                backgroundColor: 'var(--bg-subtle)',
                                border: '1px solid var(--border-subtle)'
                            }}
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-slate-400 hover:text-white hover:border-slate-400"
                            style={{
                                backgroundColor: 'var(--bg-subtle)',
                                border: '1px solid var(--border-subtle)'
                            }}
                        >
                            <Github size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Employment Details Card
export const EmploymentCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const employeeIdShort = employee.id.slice(-8).toUpperCase();

    return (
        <div
            className="rounded-xl shadow-sm flex flex-col h-full"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <CardHeader
                title="Employment Details"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
                action={<EditButton />}
            />

            <div className="p-6 space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                            Employee ID
                        </p>
                        <p className="text-sm font-medium font-mono" style={{ color: 'var(--text-head)' }}>
                            EMP-{employeeIdShort}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                            Join Date
                        </p>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>
                            {formatDate(employee.startDate)}
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                        Department
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>
                        {employee.department?.name || 'Unassigned'}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-light)' }}>
                        Employment Type
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>
                        {employee.employmentType.replace('_', ' ')}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Onboarding Progress Card
export const OnboardingCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    const progress = employee.onboardingProgress || 0;
    const isComplete = progress >= 100;

    // Calculate stroke-dashoffset for circular progress
    const circumference = 2 * Math.PI * 40; // radius = 40
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const checklistItems = [
        { label: 'Account Setup', complete: progress >= 33 },
        { label: 'Equipment Provisioned', complete: progress >= 66 },
        { label: 'Orientation', complete: progress >= 100 },
    ];

    return (
        <div
            className="rounded-xl shadow-sm flex flex-col h-full"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <CardHeader
                title="Onboarding"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>}
                action={
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${isComplete
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                        {isComplete ? 'Complete' : 'In Progress'}
                    </span>
                }
            />

            <div className="p-6 flex-1 flex flex-col">
                {/* Circular Progress */}
                <div className="flex items-center justify-center py-4">
                    <div className="relative w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                className="text-[#282e39]"
                                cx="50" cy="50"
                                fill="none"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                            />
                            <circle
                                className={`${isComplete ? 'text-emerald-500' : 'text-blue-500'} transition-all duration-1000 ease-out`}
                                cx="50" cy="50"
                                fill="none"
                                r="40"
                                stroke="currentColor"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="8"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Checklist */}
                <div className="mt-4 space-y-3">
                    {checklistItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                            {item.complete ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-500">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            )}
                            <span className="font-medium" style={{ color: item.complete ? 'var(--text-body)' : 'var(--text-light)' }}>
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                <button className="mt-auto pt-4 w-full text-center text-sm font-medium text-[#2463eb] hover:underline">
                    View full checklist
                </button>
            </div>
        </div>
    );
};

export default { ContactCard, EmploymentCard, OnboardingCard };
