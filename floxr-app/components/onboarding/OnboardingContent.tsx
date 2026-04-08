'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { PipelineCard } from './PipelineCard';
import { CandidateRow } from './CandidateRow';
import { OnboardingModal } from './OnboardingModal';
import { UpdateStatusModal } from './UpdateStatusModal';
import { Candidate, PipelineStat } from './types';

interface OnboardingContentProps {
    candidates: Candidate[];
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({ candidates }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const itemsPerPage = 5;

    const handleModalSuccess = () => {
        // Refresh the page to get updated candidates
        router.refresh();
    };

    const handleUpdateStatus = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setIsUpdateStatusOpen(true);
    };

    const handleMarkAsDone = async (candidateId: string) => {
        try {
            const res = await fetch(`/api/employees/${candidateId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'ACTIVE',
                    onboardingStatus: 'COMPLETED',
                    onboardingProgress: 100,
                }),
            });

            if (res.ok) {
                router.refresh();
            }
        } catch (err) {
            console.error('Failed to mark as done:', err);
        }
    };

    // Calculate dynamic stats from candidates
    const pipelineStats: PipelineStat[] = useMemo(() => {
        const offerSent = candidates.filter(c => c.stage.name === 'Offer Sent').length;
        const docCollection = candidates.filter(c => c.stage.name === 'Doc Collection').length;
        const itProvisioning = candidates.filter(c => c.stage.name === 'IT Provisioning').length;
        const firstDay = candidates.filter(c => c.stage.name === 'First Day').length;
        const total = candidates.length || 1; // Avoid division by zero

        return [
            {
                id: '1',
                step: 1,
                title: 'Offer Sent',
                count: offerSent,
                subtitle: offerSent === 1 ? 'candidate' : 'candidates',
                color: 'purple',
                progress: Math.round((offerSent / total) * 100),
                icon: 'send'
            },
            {
                id: '2',
                step: 2,
                title: 'Doc Collection',
                count: docCollection,
                subtitle: docCollection === 1 ? 'candidate' : 'candidates',
                color: 'primary',
                progress: Math.round((docCollection / total) * 100),
                icon: 'description'
            },
            {
                id: '3',
                step: 3,
                title: 'IT Provisioning',
                count: itProvisioning,
                subtitle: itProvisioning === 1 ? 'candidate' : 'candidates',
                color: 'orange',
                progress: Math.round((itProvisioning / total) * 100),
                icon: 'devices'
            },
            {
                id: '4',
                step: 4,
                title: 'First Day',
                count: firstDay,
                subtitle: firstDay === 1 ? 'starting soon' : 'starting soon',
                color: 'emerald',
                progress: Math.round((firstDay / total) * 100),
                icon: 'celebration'
            }
        ];
    }, [candidates]);

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
    const paginatedCandidates = filteredCandidates.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header
                className="w-full flex-shrink-0 backdrop-blur-md z-10 sticky top-0 px-8 py-6"
                style={{
                    backgroundColor: 'rgba(16, 22, 34, 0.9)',
                    borderBottom: '1px solid var(--border-subtle)'
                }}
            >
                <div className="flex flex-wrap justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-head)' }}>
                            Onboarding Pipeline
                        </h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
                            Manage and track new hires across all stages.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-slate-400 group-focus-within:text-[#2463eb] transition-colors" />
                            </span>
                            <input
                                className="block w-64 pl-10 pr-3 py-2.5 rounded-lg leading-5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/20 sm:text-sm transition-all shadow-sm"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    color: 'var(--text-head)',
                                    border: '1px solid transparent'
                                }}
                                placeholder="Search candidates..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter */}
                        <button
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#2d3748]"
                            style={{
                                backgroundColor: 'var(--bg-subtle)',
                                color: 'var(--text-body)',
                                border: '1px solid var(--border-subtle)'
                            }}
                        >
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>

                        {/* Add Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-5 bg-[#2463eb] hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all"
                        >
                            <Plus size={18} />
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
                        {pipelineStats.map((stat, index) => (
                            <PipelineCard
                                key={stat.id}
                                stat={stat}
                                isLast={index === pipelineStats.length - 1}
                            />
                        ))}
                    </div>

                    {/* Candidates Table Container */}
                    <div
                        className="rounded-xl shadow-sm overflow-hidden flex flex-col flex-1"
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)'
                        }}
                    >
                        {/* Table Header */}
                        <div
                            className="px-6 py-5 flex justify-between items-center"
                            style={{
                                backgroundColor: 'rgba(24, 28, 36, 0.5)',
                                borderBottom: '1px solid var(--border-subtle)'
                            }}
                        >
                            <h3 className="font-bold text-lg" style={{ color: 'var(--text-head)' }}>
                                Active Candidates
                            </h3>
                            <div className="flex gap-2 text-sm" style={{ color: 'var(--text-light)' }}>
                                <span>Showing {filteredCandidates.length} candidates</span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr
                                        className="text-xs font-semibold tracking-wide uppercase"
                                        style={{
                                            backgroundColor: '#1f2937',
                                            color: 'var(--text-light)',
                                            borderBottom: '1px solid var(--border-subtle)'
                                        }}
                                    >
                                        <th className="px-6 py-4">Candidate</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4 w-1/4">Current Stage</th>
                                        <th className="px-6 py-4">Assigned To</th>
                                        <th className="px-6 py-4">Task Completion</th>
                                        <th className="px-6 py-4">Due Date</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                                    {paginatedCandidates.map(candidate => (
                                        <CandidateRow
                                            key={candidate.id}
                                            candidate={candidate}
                                            onUpdateStatus={handleUpdateStatus}
                                            onMarkAsDone={handleMarkAsDone}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {paginatedCandidates.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                    style={{ backgroundColor: 'var(--bg-subtle)' }}
                                >
                                    <Search size={28} className="text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>
                                    No candidates found
                                </h3>
                                <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredCandidates.length > 0 && (
                            <div
                                className="px-6 py-4 flex items-center justify-between mt-auto"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderTop: '1px solid var(--border-subtle)'
                                }}
                            >
                                <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} results
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 text-sm rounded transition-colors disabled:opacity-50"
                                        style={{
                                            color: 'var(--text-body)',
                                            border: '1px solid var(--border-subtle)'
                                        }}
                                    >
                                        <ChevronLeft size={16} className="inline" /> Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 text-sm rounded ${page === currentPage
                                                ? 'bg-[#2463eb] text-white border-[#2463eb]'
                                                : 'hover:bg-[#2d3748]'
                                                }`}
                                            style={page !== currentPage ? {
                                                color: 'var(--text-body)',
                                                border: '1px solid var(--border-subtle)'
                                            } : undefined}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 text-sm rounded transition-colors disabled:opacity-50"
                                        style={{
                                            color: 'var(--text-body)',
                                            border: '1px solid var(--border-subtle)'
                                        }}
                                    >
                                        Next <ChevronRight size={16} className="inline" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Onboarding Modal */}
            <OnboardingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess}
            />

            {/* Update Status Modal */}
            {selectedCandidate && (
                <UpdateStatusModal
                    isOpen={isUpdateStatusOpen}
                    onClose={() => {
                        setIsUpdateStatusOpen(false);
                        setSelectedCandidate(null);
                    }}
                    onSuccess={() => {
                        router.refresh();
                    }}
                    employeeId={selectedCandidate.id}
                    employeeName={selectedCandidate.name}
                    currentProgress={selectedCandidate.stage.current / selectedCandidate.stage.total * 100}
                    currentStage={selectedCandidate.stage.name}
                />
            )}
        </div>
    );
};

export default OnboardingContent;
