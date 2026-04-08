import React, { useState, useRef, useEffect } from 'react';

export const HeaderActions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (action: string) => {
        setIsOpen(false);
        // Simulation of actions
        if (action === 'whatsapp') {
            window.open('https://wa.me/15550123456', '_blank');
        } else if (action === 'equipment') {
            alert('Equipment assignment workflow started.');
        } else if (action === 'offboarding') {
            const confirmed = window.confirm('Are you sure you want to start the offboarding process for Sarah Jenkins?');
            if (confirmed) {
                alert('Offboarding process initiated.');
            }
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium 
                    border rounded-lg transition-all shadow-sm
                    ${isOpen 
                        ? 'bg-slate-100 dark:bg-[#1f2937] text-slate-900 dark:text-white border-slate-300 dark:border-slate-500 ring-2 ring-primary/20' 
                        : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-surface-dark border-slate-200 dark:border-[#282e39] hover:bg-slate-50 dark:hover:bg-[#1f2937]'
                    }
                `}
            >
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                <span>Actions</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e2530] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-[100] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    <div className="p-2 space-y-1">
                        <div className="px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            Communication
                        </div>
                        <button 
                            onClick={() => handleAction('whatsapp')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2a3241] rounded-lg transition-colors text-left group"
                        >
                            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">chat</span>
                            </div>
                            <div className="flex-1">
                                <span className="block text-slate-900 dark:text-white font-semibold">Send Message</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">Start a conversation via WhatsApp Business</span>
                            </div>
                        </button>

                        <div className="my-2 border-t border-slate-100 dark:border-slate-700/50"></div>

                        <div className="px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Management
                        </div>
                        <button 
                            onClick={() => handleAction('equipment')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2a3241] rounded-lg transition-colors text-left group"
                        >
                             <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                            </div>
                             <div className="flex-1">
                                <span className="block text-slate-900 dark:text-white font-semibold">Assign Equipment</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">Manage hardware allocation & requests</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => handleAction('offboarding')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-left group"
                        >
                            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                            </div>
                            <div className="flex-1">
                                <span className="block text-red-600 dark:text-red-400 font-semibold">Start Offboarding</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">Begin termination or exit process</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};