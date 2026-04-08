'use client';

import React, { useState } from 'react';
import { FileText, Upload, Download, Mail, MessageCircle } from 'lucide-react';

interface Document {
    id: string;
    name: string;
    category: string;
    status: 'Verified' | 'Pending' | 'Missing' | 'Expired';
    date?: string;
}

interface DocumentsViewProps {
    employeeEmail: string;
    employeePhone?: string;
}

// Request Menu Component
const RequestMenu: React.FC<{
    docName: string;
    employeeEmail: string;
    employeePhone?: string;
    onClose: () => void;
}> = ({ docName, employeeEmail, employeePhone, onClose }) => {
    const emailSubject = encodeURIComponent(`Action Required: Missing Document - ${docName}`);
    const emailBody = encodeURIComponent(`Hi,\n\nPlease submit your ${docName} as soon as possible.\n\nThanks,\nHR Team`);
    const mailtoLink = `mailto:${employeeEmail}?subject=${emailSubject}&body=${emailBody}`;

    const phone = employeePhone?.replace(/\D/g, '') || '';
    const waText = encodeURIComponent(`Hi, please submit your ${docName} as soon as possible.`);
    const waLink = `https://wa.me/${phone}?text=${waText}`;

    return (
        <div
            className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <div className="p-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-light)', borderBottom: '1px solid var(--border-subtle)' }}>
                    Request via
                </div>
                <a
                    href={mailtoLink}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-[#1f2937]"
                    style={{ color: 'var(--text-body)' }}
                >
                    <Mail size={16} className="text-slate-400" />
                    Email
                </a>
                {phone && (
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-[#1f2937]"
                        style={{ color: 'var(--text-body)' }}
                    >
                        <MessageCircle size={16} className="text-emerald-500" />
                        WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
};

export const DocumentsView: React.FC<DocumentsViewProps> = ({ employeeEmail, employeePhone }) => {
    const [documents] = useState<Document[]>([
        { id: '1', name: 'Passport Copy', category: 'Identity', status: 'Verified', date: 'Jan 15, 2023' },
        { id: '2', name: 'University Diploma', category: 'Education', status: 'Missing' },
        { id: '3', name: 'Tax Form W-4', category: 'Tax & Legal', status: 'Pending', date: 'Jan 20, 2023' },
        { id: '4', name: 'Non-Disclosure Agreement', category: 'Legal', status: 'Verified', date: 'Jan 15, 2023' },
        { id: '5', name: 'Previous Employment Verification', category: 'Employment', status: 'Expired', date: 'Dec 10, 2022' },
    ]);

    const [activeRequestMenu, setActiveRequestMenu] = useState<string | null>(null);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Verified':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Pending':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Missing':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Expired':
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400';
        }
    };

    return (
        <div
            className="rounded-xl shadow-sm overflow-hidden"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-head)' }}>
                    <FileText size={18} className="text-[#2463eb]" />
                    Employee Documents
                </h3>
                <button className="text-sm font-medium text-[#2463eb] hover:text-blue-400 flex items-center gap-1 transition-colors">
                    <Upload size={16} />
                    Upload New
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead style={{ backgroundColor: '#1f2937', color: 'var(--text-light)', borderBottom: '1px solid var(--border-subtle)' }}>
                        <tr>
                            <th className="px-6 py-4 font-medium">Document Name</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Uploaded Date</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-[#1f2937]/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--bg-subtle)' }}
                                        >
                                            <FileText size={16} className="text-slate-400" />
                                        </div>
                                        <span className="font-medium" style={{ color: 'var(--text-head)' }}>{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4" style={{ color: 'var(--text-light)' }}>
                                    {doc.category}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(doc.status)}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono" style={{ color: 'var(--text-light)' }}>
                                    {doc.date || '—'}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    {(doc.status === 'Missing' || doc.status === 'Expired' || doc.status === 'Pending') ? (
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setActiveRequestMenu(activeRequestMenu === doc.id ? null : doc.id)}
                                                className="px-3 py-1.5 text-xs font-medium text-[#2463eb] bg-blue-500/10 border border-blue-500/20 rounded-md hover:bg-blue-500/20 transition-colors"
                                            >
                                                Request
                                            </button>
                                            {activeRequestMenu === doc.id && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-10"
                                                        onClick={() => setActiveRequestMenu(null)}
                                                    ></div>
                                                    <RequestMenu
                                                        docName={doc.name}
                                                        employeeEmail={employeeEmail}
                                                        employeePhone={employeePhone}
                                                        onClose={() => setActiveRequestMenu(null)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <button className="text-slate-400 hover:text-slate-300 transition-colors">
                                            <Download size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 text-center" style={{ backgroundColor: 'rgba(31, 41, 55, 0.3)', borderTop: '1px solid var(--border-subtle)' }}>
                <button className="text-sm font-medium transition-colors hover:text-[#2463eb]" style={{ color: 'var(--text-light)' }}>
                    View All Documents history
                </button>
            </div>
        </div>
    );
};

export default DocumentsView;
