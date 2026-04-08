'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, RefreshCw, Laptop, Lock, Maximize2, Plus, Minus } from 'lucide-react';
import { WorkflowStep } from './types';

interface WorkflowData {
    id: string;
    name: string;
    jobTitle: string;
    progress: number;
    steps: WorkflowStep[];
}

const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
        'check_circle': CheckCircle2,
        'sync': RefreshCw,
        'laptop_mac': Laptop,
        'lock': Lock,
    };
    return iconMap[iconName] || CheckCircle2;
};

const WorkflowSection: React.FC = () => {
    const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        try {
            // Get the first company ID from the database
            const companyResponse = await fetch('/api/company/first');
            if (!companyResponse.ok) {
                throw new Error('No company found');
            }
            const { companyId } = await companyResponse.json();

            const response = await fetch(`/api/dashboard/workflow?companyId=${companyId}`);

            if (!response.ok) throw new Error('Failed to fetch workflows');

            const data = await response.json();
            setWorkflows(data.workflows || []);
        } catch (err) {
            console.error('Error fetching workflows:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle mouse move for cursor glow effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    // Zoom controls
    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.6));

    // Use first workflow for display (or show empty state)
    const currentWorkflow = workflows[0];
    const steps = currentWorkflow?.steps || getDefaultSteps();

    return (
        <div className="lg:col-span-2 flex flex-col rounded-xl shadow-sm overflow-hidden h-[500px]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>Onboarding Workflow</h3>
                    <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                        {currentWorkflow
                            ? `${currentWorkflow.name} - ${currentWorkflow.jobTitle}`
                            : 'No active onboarding in progress'}
                    </p>
                </div>
                <Link href="/onboarding" className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-page)]" style={{ color: 'var(--text-body)' }} title="View all onboarding workflows">
                    <Maximize2 size={20} />
                </Link>
            </div>

            <div className="flex-1 relative p-6 overflow-x-auto flex items-center justify-center" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(107, 114, 128, 0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />

                <div className="relative z-10 flex items-center gap-8 min-w-max transition-transform origin-center" style={{ transform: `scale(${zoomLevel})` }}>
                    {steps.map((step, index) => {
                        const IconComponent = getIconComponent(step.icon);

                        return (
                            <React.Fragment key={step.id}>
                                {/* Step Card */}
                                <div
                                    className={`flex flex-col items-center gap-2 group ${step.status === 'locked'
                                        ? 'opacity-40'
                                        : step.status === 'pending'
                                            ? 'opacity-60 hover:opacity-100 transition-opacity'
                                            : ''
                                        }`}
                                >
                                    <div
                                        className={`cursor-glow w-48 p-4 rounded-xl transition-all duration-300 cursor-pointer ${step.status === 'completed'
                                            ? 'border-l-4 border-emerald-500 hover:-translate-y-1'
                                            : step.status === 'in-progress'
                                                ? 'border-l-4 ring-2 hover:-translate-y-1'
                                                : step.status === 'pending'
                                                    ? 'border border-l-4 hover:-translate-y-1'
                                                    : 'border border-dashed border-2 cursor-not-allowed'
                                            }`}
                                        style={{
                                            backgroundColor: step.status === 'locked' ? 'var(--bg-card)' : 'var(--bg-card)',
                                            borderColor: step.status === 'completed'
                                                ? '#10b981'
                                                : step.status === 'in-progress'
                                                    ? '#2463eb'
                                                    : step.status === 'pending'
                                                        ? 'var(--border-subtle)'
                                                        : 'var(--border-subtle)',
                                            ...(step.status === 'in-progress' && {
                                                borderLeftColor: '#2463eb',
                                                boxShadow: '0 0 0 2px rgba(36, 99, 235, 0.2)',
                                            }),
                                            ...(step.status === 'pending' && {
                                                borderLeftColor: '#6b7280',
                                            }),
                                            boxShadow: step.status !== 'locked' ? 'var(--shadow-sm)' : 'none'
                                        }}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            {/* Status Badge */}
                                            {step.status === 'completed' && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                                                    Completed
                                                </span>
                                            )}
                                            {step.status === 'in-progress' && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded animate-pulse" style={{ backgroundColor: 'rgba(36, 99, 235, 0.1)', color: '#2463eb' }}>
                                                    In Progress
                                                </span>
                                            )}
                                            {step.status === 'pending' && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-body)' }}>
                                                    Pending
                                                </span>
                                            )}
                                            {step.status === 'locked' && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', color: 'var(--text-light)' }}>
                                                    Locked
                                                </span>
                                            )}

                                            <IconComponent size={16} style={{ color: 'var(--text-light)' }} />
                                        </div>

                                        <p className="font-bold text-sm" style={{ color: 'var(--text-head)' }}>{step.label}</p>
                                        <p className="text-xs mt-1" style={{ color: 'var(--text-body)' }}>{step.subLabel}</p>

                                        {step.status === 'in-progress' && currentWorkflow && (
                                            <div className="w-full h-1 rounded-full mt-3 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                                                <div className="h-full" style={{ backgroundColor: '#2463eb', width: `${currentWorkflow.progress}%` }} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div
                                        className="w-12 h-0.5"
                                        style={{
                                            backgroundColor: step.status === 'completed' ? 'rgba(16, 185, 129, 0.5)' : 'var(--border-subtle)',
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex rounded-lg shadow p-1" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <button
                        onClick={handleZoomIn}
                        className="p-1.5 rounded transition-colors hover:bg-[var(--bg-page)]"
                        style={{ color: 'var(--text-body)' }}
                        title="Zoom in"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="p-1.5 rounded transition-colors hover:bg-[var(--bg-page)]"
                        style={{ color: 'var(--text-body)' }}
                        title="Zoom out"
                    >
                        <Minus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Default steps when no workflow is active
function getDefaultSteps(): WorkflowStep[] {
    return [
        {
            id: '1',
            label: 'Offer Accepted',
            subLabel: 'Candidate Signed',
            status: 'pending',
            icon: 'check_circle',
        },
        {
            id: '2',
            label: 'Doc Collection',
            subLabel: 'I-9 & Tax Forms',
            status: 'pending',
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
}

export default WorkflowSection;
