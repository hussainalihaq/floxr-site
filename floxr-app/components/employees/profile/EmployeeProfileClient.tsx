'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Wrench } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { ContactCard, EmploymentCard, OnboardingCard } from './InfoCards';
import { HeaderActions } from './HeaderActions';
import { DocumentsView } from './DocumentsView';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    jobTitle?: string | null;
    department?: { name: string } | null;
    status: string;
    employmentType: string;
    startDate: string;
    onboardingProgress?: number;
    onboardingStatus?: string;
    avatar?: string | null;
}

interface EmployeeProfileClientProps {
    employee: Employee;
}

type TabName = 'General Info' | 'Equipment' | 'Documents' | 'Activity Log';

const tabs: { name: TabName; count: number | null }[] = [
    { name: 'General Info', count: null },
    { name: 'Equipment', count: 3 },
    { name: 'Documents', count: 5 },
    { name: 'Activity Log', count: null },
];

export const EmployeeProfileClient: React.FC<EmployeeProfileClientProps> = ({ employee }) => {
    const [activeTab, setActiveTab] = useState<TabName>('General Info');

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header
                className="w-full flex-shrink-0 backdrop-blur-md z-10 sticky top-0 px-4 md:px-8 py-4"
                style={{ backgroundColor: 'rgba(10, 14, 26, 0.8)', borderBottom: '1px solid transparent' }}
            >
                <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto w-full">
                    <Link
                        href="/employees"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all group text-slate-400 hover:text-white hover:bg-[#1f2937]"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Back to Directory</span>
                    </Link>

                    <div className="flex gap-3">
                        <HeaderActions employee={employee} />

                        <Link
                            href={`/employees/${employee.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2463eb] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Edit2 size={16} />
                            <span>Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">

                    {/* Profile Header */}
                    <ProfileHeader employee={employee} />

                    {/* Tabs Navigation */}
                    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <nav aria-label="Tabs" className="flex gap-8 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`
                                        pb-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all
                                        ${activeTab === tab.name
                                            ? 'border-[#2463eb] text-[#2463eb]'
                                            : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                                        }
                                    `}
                                >
                                    {tab.name}
                                    {tab.count && (
                                        <span
                                            className="text-xs py-0.5 px-2 rounded-full"
                                            style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-light)' }}
                                        >
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
                            <ContactCard employee={employee} />
                            <EmploymentCard employee={employee} />
                            <OnboardingCard employee={employee} />
                        </div>
                    )}

                    {activeTab === 'Documents' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <DocumentsView
                                employeeEmail={employee.email}
                                employeePhone={employee.phone || undefined}
                            />
                        </div>
                    )}

                    {(activeTab === 'Equipment' || activeTab === 'Activity Log') && (
                        <div
                            className="flex flex-col items-center justify-center py-20 border border-dashed rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border-subtle)'
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'var(--bg-subtle)' }}
                            >
                                <Wrench size={28} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>Work in Progress</h3>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>This section is currently under development.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileClient;
