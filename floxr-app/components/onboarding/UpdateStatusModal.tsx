'use client';

import React, { useState, useEffect } from 'react';
import { X, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';

interface UpdateStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    employeeId: string;
    employeeName: string;
    currentProgress: number;
    currentStage: string;
}

const STAGE_PROGRESS_MAP: Record<string, number> = {
    'Offer Sent': 10,
    'Doc Collection': 30,
    'IT Provisioning': 60,
    'First Day': 90,
    'Completed': 100
};

const STAGES = ['Offer Sent', 'Doc Collection', 'IT Provisioning', 'First Day', 'Completed'];

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    employeeId,
    employeeName,
    currentProgress,
    currentStage
}) => {
    const [stage, setStage] = useState(currentStage || 'Offer Sent');
    const [progress, setProgress] = useState(currentProgress);
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMarkingDone, setIsMarkingDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [actions, setActions] = useState({
        markDocs: false,
        sendEmail: false,
        notifyTeam: true,
        assignEquipment: false
    });

    // Sync state when modal opens or props change
    useEffect(() => {
        if (isOpen) {
            setStage(currentStage);
            setProgress(currentProgress);
            setActions({
                markDocs: false,
                sendEmail: false,
                notifyTeam: true,
                assignEquipment: false
            });
            setNote('');
            setError(null);
        }
    }, [isOpen, currentStage, currentProgress]);

    if (!isOpen) return null;

    const handleStageChange = (newStage: string) => {
        setStage(newStage);
        if (STAGE_PROGRESS_MAP[newStage] !== undefined) {
            setProgress(STAGE_PROGRESS_MAP[newStage]);
        }
    };

    const handleActionChange = (key: keyof typeof actions) => {
        setActions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/employees/${employeeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    onboardingProgress: progress,
                    // Note: We're updating progress. Stage info is derived from progress in UI
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update status');
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsDone = async () => {
        setIsMarkingDone(true);
        setError(null);

        try {
            const res = await fetch(`/api/employees/${employeeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'ACTIVE',
                    onboardingStatus: 'COMPLETED',
                    onboardingProgress: 100,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to mark as done');
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsMarkingDone(false);
        }
    };

    const completedTasksCount = Object.values(actions).filter(Boolean).length;
    const totalTasksCount = Object.keys(actions).length;

    return (
        <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
        >
            <div
                className="absolute inset-0 bg-[#0f1218]/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#181c24]/95 backdrop-blur-xl border border-white/10 text-left shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-bold text-white leading-6" id="modal-title">Update Status</h3>
                        <p className="text-sm text-slate-400 mt-0.5">{employeeName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-6 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Error Display */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Status Summary */}
                    <div className="rounded-xl bg-[#111318]/50 border border-white/5 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Stage</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <RefreshCw size={18} className="text-[#2463eb]" />
                                    <span className="text-lg font-bold text-white">{stage}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tasks Selected</p>
                                <div className="mt-1">
                                    <span className="text-lg font-bold text-white">{completedTasksCount}/{totalTasksCount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-[#2463eb] font-bold">{progress}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#282e39]">
                                <div
                                    className="h-full bg-[#2463eb] rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Move to Stage</label>
                                <div className="relative">
                                    <select
                                        value={stage}
                                        onChange={(e) => handleStageChange(e.target.value)}
                                        className="block w-full appearance-none rounded-lg border border-white/10 bg-[#111318] py-2.5 pl-3 pr-10 text-sm text-white focus:border-[#2463eb] focus:ring-1 focus:ring-[#2463eb] outline-none"
                                    >
                                        {STAGES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-slate-300">Override Progress</label>
                                    <span className="text-xs font-bold text-[#2463eb] bg-[#2463eb]/10 px-2 py-0.5 rounded">{progress}%</span>
                                </div>
                                <div className="flex items-center h-[42px]">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onChange={(e) => setProgress(Number(e.target.value))}
                                        className="w-full h-1.5 bg-[#282e39] rounded-lg appearance-none cursor-pointer accent-[#2463eb]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Note</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="block w-full rounded-lg border border-white/10 bg-[#111318] p-3 text-sm text-white placeholder-slate-500 focus:border-[#2463eb] focus:ring-1 focus:ring-[#2463eb] outline-none"
                                placeholder="Enter details regarding this status update..."
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Quick Actions</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { key: 'markDocs', label: 'Mark docs complete' },
                                { key: 'sendEmail', label: 'Send reminder email' },
                                { key: 'notifyTeam', label: 'Notify team' },
                                { key: 'assignEquipment', label: 'Assign equipment' }
                            ].map((action) => (
                                <div
                                    key={action.key}
                                    className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#111318]/30 p-3 hover:bg-[#111318]/50 transition-colors cursor-pointer"
                                    onClick={() => handleActionChange(action.key as keyof typeof actions)}
                                >
                                    <div className="flex h-5 items-center">
                                        <input
                                            type="checkbox"
                                            checked={actions[action.key as keyof typeof actions]}
                                            readOnly
                                            className="h-4 w-4 rounded border-slate-600 bg-[#181c24] text-[#2463eb] focus:ring-[#2463eb] focus:ring-offset-[#181c24]"
                                        />
                                    </div>
                                    <div className="text-sm">
                                        <label className="font-medium text-slate-300 cursor-pointer">{action.label}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/10 bg-[#111318]/40 px-6 py-4">
                    <button
                        onClick={handleMarkAsDone}
                        disabled={isMarkingDone || isLoading}
                        className="text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors disabled:opacity-50 flex items-center gap-2"
                        type="button"
                    >
                        {isMarkingDone ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Mark as Complete'
                        )}
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading || isMarkingDone}
                            className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors disabled:opacity-50"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || isMarkingDone}
                            className="rounded-lg bg-[#2463eb] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2463eb]/20 hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            type="button"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatusModal;
