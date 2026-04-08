'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CandidateProfile } from './CandidateProfile';
import { DocumentChecklist } from './DocumentChecklist';
import { Timeline } from './Timeline';
import { UpdateStatusModal } from './UpdateStatusModal';
import { OnboardingCandidate, DocumentItem, TimelineEvent } from './detail-types';

interface OnboardingDetailContentProps {
    candidate: OnboardingCandidate;
    documents: DocumentItem[];
    timelineEvents: TimelineEvent[];
}

export const OnboardingDetailContent: React.FC<OnboardingDetailContentProps> = ({
    candidate,
    documents,
    timelineEvents
}) => {
    const router = useRouter();
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
    const [isMarkingDone, setIsMarkingDone] = useState(false);

    const handleUpdateSuccess = () => {
        router.refresh();
    };

    const handleMarkAsDone = async () => {
        setIsMarkingDone(true);
        try {
            const res = await fetch(`/api/employees/${candidate.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'ACTIVE',
                    onboardingStatus: 'COMPLETED',
                    onboardingProgress: 100,
                }),
            });

            if (res.ok) {
                router.push('/onboarding');
                router.refresh();
            }
        } catch (err) {
            console.error('Failed to mark as done:', err);
        } finally {
            setIsMarkingDone(false);
        }
    };

    const handleDocumentToggle = async (docId: string) => {
        // Update progress based on document completed
        const docProgressMap: Record<string, number> = {
            'offer': 15,
            'i9': 30,
            'bg-check': 45,
            'tax': 60,
            'bank': 75,
        };

        const newProgress = docProgressMap[docId] || candidate.progress + 10;

        try {
            await fetch(`/api/employees/${candidate.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    onboardingProgress: Math.min(100, newProgress),
                }),
            });
            router.refresh();
        } catch (err) {
            console.error('Failed to update document status:', err);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header
                className="w-full flex-shrink-0 backdrop-blur-md z-20 sticky top-0 px-8 py-6 transition-all"
                style={{
                    backgroundColor: 'rgba(16, 22, 34, 0.9)',
                    borderBottom: '1px solid var(--border-subtle)'
                }}
            >
                <div className="flex flex-col gap-4 mx-auto max-w-7xl">
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 text-sm font-medium w-fit group transition-colors hover:text-[#2463eb]"
                        style={{ color: 'var(--text-light)' }}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Pipeline
                    </Link>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-head)' }}>
                                Candidate Onboarding
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-light)' }}>
                                    Active • Last updated 2 mins ago
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleMarkAsDone}
                                disabled={isMarkingDone}
                                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 flex items-center gap-2 hover:bg-emerald-500/10 hover:border-emerald-500/50 disabled:opacity-50"
                                style={{
                                    backgroundColor: '#1f2937',
                                    color: 'var(--text-body)',
                                    border: '1px solid var(--border-subtle)'
                                }}
                            >
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                {isMarkingDone ? 'Processing...' : 'Mark as Done'}
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 flex items-center gap-2"
                                style={{
                                    backgroundColor: '#1f2937',
                                    color: 'var(--text-body)',
                                    border: '1px solid var(--border-subtle)'
                                }}
                            >
                                <MessageSquare size={16} />
                                Send Message
                            </button>
                            <button
                                onClick={() => setIsUpdateStatusOpen(true)}
                                className="px-4 py-2 text-sm font-semibold text-white bg-[#2463eb] rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 active:scale-95 flex items-center gap-2"
                            >
                                <RefreshCw size={16} />
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Profile & Documents */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <CandidateProfile candidate={candidate} />
                            <DocumentChecklist
                                documents={documents}
                                onToggle={handleDocumentToggle}
                            />
                        </div>

                        {/* Right Column: Timeline */}
                        <Timeline events={timelineEvents} />
                    </div>

                    <div className="h-10"></div>
                </div>
            </div>

            {/* Update Status Modal */}
            <UpdateStatusModal
                isOpen={isUpdateStatusOpen}
                onClose={() => setIsUpdateStatusOpen(false)}
                onSuccess={handleUpdateSuccess}
                employeeId={candidate.id}
                employeeName={candidate.name}
                currentProgress={candidate.progress}
                currentStage={
                    candidate.progress < 20 ? 'Offer Sent' :
                        candidate.progress < 40 ? 'Doc Collection' :
                            candidate.progress < 70 ? 'IT Provisioning' :
                                candidate.progress < 95 ? 'First Day' : 'Completed'
                }
            />
        </div>
    );
};

export default OnboardingDetailContent;

