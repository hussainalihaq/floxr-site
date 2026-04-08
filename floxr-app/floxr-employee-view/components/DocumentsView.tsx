import React, { useState } from 'react';

interface Document {
    id: string;
    name: string;
    category: string;
    status: 'Verified' | 'Pending' | 'Missing' | 'Expired';
    date?: string;
}

const RequestMenu: React.FC<{ 
    docName: string; 
    onClose: () => void;
}> = ({ docName, onClose }) => {
    // Mock data for links
    const employeeEmail = "sarah.j@floxr.com";
    const employeePhone = "15550123456";
    
    const emailSubject = encodeURIComponent(`Action Required: Missing Document - ${docName}`);
    const emailBody = encodeURIComponent(`Hi Sarah,\n\nPlease submit your ${docName} as soon as possible.\n\nThanks,\nHR Team`);
    const mailtoLink = `mailto:${employeeEmail}?subject=${emailSubject}&body=${emailBody}`;
    
    const waText = encodeURIComponent(`Hi Sarah, please submit your ${docName} as soon as possible.`);
    const waLink = `https://wa.me/${employeePhone}?text=${waText}`;

    return (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-slate-200 dark:border-[#282e39] z-20 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
            <div className="p-1">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-[#282e39] mb-1">
                    Request via
                </div>
                <a 
                    href={mailtoLink}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2937] rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                    Email
                </a>
                <a 
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2937] rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px] text-emerald-500">chat</span>
                    WhatsApp
                </a>
            </div>
        </div>
    );
};

export const DocumentsView: React.FC = () => {
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
                return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
            case 'Pending':
                return 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
            case 'Missing':
                return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
            case 'Expired':
                return 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#282e39] rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-[#282e39] flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">folder_shared</span>
                    Employee Documents
                </h3>
                <button className="text-sm font-medium text-primary hover:text-blue-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    Upload New
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-[#1f2937] text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-[#282e39]">
                        <tr>
                            <th className="px-6 py-4">Document Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Uploaded Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#282e39]">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 dark:bg-[#282e39] flex items-center justify-center text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-[18px]">description</span>
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                    {doc.category}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(doc.status)}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono">
                                    {doc.date || '—'}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    {(doc.status === 'Missing' || doc.status === 'Expired' || doc.status === 'Pending') ? (
                                        <div className="relative inline-block">
                                            <button 
                                                onClick={() => setActiveRequestMenu(activeRequestMenu === doc.id ? null : doc.id)}
                                                className="px-3 py-1.5 text-xs font-medium text-primary bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
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
                                                        onClose={() => setActiveRequestMenu(null)} 
                                                    />
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-[#282e39] bg-slate-50 dark:bg-[#1f2937]/30 text-center">
                <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
                    View All Documents history
                </button>
            </div>
        </div>
    );
};