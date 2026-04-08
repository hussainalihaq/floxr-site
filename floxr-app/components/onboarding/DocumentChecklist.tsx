'use client';

import React from 'react';
import { Eye, Mail, Plus, Check } from 'lucide-react';
import { DocumentItem } from './detail-types';

interface DocumentChecklistProps {
    documents: DocumentItem[];
    onToggle?: (docId: string, currentStatus: DocumentItem['status']) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents, onToggle }) => {
    const completedCount = documents.filter(d => d.status === 'completed').length;

    const handleToggle = (doc: DocumentItem) => {
        // Only allow toggling action_required and pending to completed
        if (doc.status !== 'completed' && onToggle) {
            onToggle(doc.id, doc.status);
        }
    };

    return (
        <div
            className="rounded-xl shadow-sm flex-1 flex flex-col min-h-[300px]"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
            <div
                className="p-6 flex justify-between items-center"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
                <h4 className="font-bold" style={{ color: 'var(--text-head)' }}>Document Checklist</h4>
                <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-light)' }}
                >
                    {completedCount}/{documents.length} Done
                </span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    {documents.map((doc) => (
                        <li
                            key={doc.id}
                            className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${doc.status === 'action_required'
                                ? 'bg-[#1f2937]/30'
                                : 'hover:bg-[#1f2937]/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Status Icon - Clickable */}
                                {doc.status === 'completed' ? (
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500">
                                        <Check size={18} strokeWidth={3} />
                                    </div>
                                ) : doc.status === 'action_required' ? (
                                    <div
                                        onClick={() => handleToggle(doc)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
                                        style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}
                                        title="Click to mark as completed"
                                    >
                                        <Check size={18} className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" />
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleToggle(doc)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all hover:bg-[#2463eb]/10 hover:border-[#2463eb]/30"
                                        style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}
                                        title="Click to mark as completed"
                                    >
                                        <Check size={18} className="opacity-0 group-hover:opacity-100 text-[#2463eb] transition-opacity" />
                                    </div>
                                )}

                                <div>
                                    <p className={`text-sm font-semibold ${doc.status === 'completed'
                                        ? 'line-through decoration-slate-500 opacity-60'
                                        : ''
                                        }`} style={{ color: 'var(--text-body)' }}>
                                        {doc.title}
                                    </p>

                                    {doc.status === 'completed' && (
                                        <p className="text-xs" style={{ color: 'var(--text-light)' }}>Completed {doc.completedDate}</p>
                                    )}
                                    {doc.status === 'action_required' && (
                                        <p className="text-xs text-orange-500 font-medium">Action Required</p>
                                    )}
                                    {doc.status === 'pending' && (
                                        <p className="text-xs" style={{ color: 'var(--text-light)' }}>Pending Candidate</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            {doc.status === 'action_required' ? (
                                <button className="text-[#2463eb] text-xs font-semibold bg-[#2463eb]/10 px-3 py-1.5 rounded hover:bg-[#2463eb]/20 transition-colors">
                                    Resend
                                </button>
                            ) : doc.status === 'pending' ? (
                                <button className="text-slate-400 hover:text-slate-300">
                                    <Mail size={20} />
                                </button>
                            ) : (
                                <button className="text-slate-400 hover:text-slate-300">
                                    <Eye size={20} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="p-4 rounded-b-xl"
                style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.3)',
                    borderTop: '1px solid var(--border-subtle)'
                }}
            >
                <button
                    className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors border border-dashed rounded-lg hover:text-[#2463eb] hover:border-[#2463eb]"
                    style={{ color: 'var(--text-body)', borderColor: 'var(--border-subtle)' }}
                >
                    <Plus size={18} />
                    Add Document Requirement
                </button>
            </div>
        </div>
    );
};

export default DocumentChecklist;

