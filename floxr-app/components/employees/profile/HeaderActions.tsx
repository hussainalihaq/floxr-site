'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, MessageCircle, Laptop, LogOut } from 'lucide-react';

interface HeaderActionsProps {
    employee: {
        firstName: string;
        lastName: string;
        phone?: string | null;
    };
    onAssignEquipment?: () => void;
    onStartOffboarding?: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
    employee,
    onAssignEquipment,
    onStartOffboarding
}) => {
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
        if (action === 'whatsapp') {
            const phone = employee.phone?.replace(/\D/g, '') || '';
            if (phone) {
                window.open(`https://wa.me/${phone}`, '_blank');
            } else {
                alert('No phone number available for WhatsApp');
            }
        } else if (action === 'equipment') {
            onAssignEquipment?.();
        } else if (action === 'offboarding') {
            const confirmed = window.confirm(`Are you sure you want to start the offboarding process for ${employee.firstName} ${employee.lastName}?`);
            if (confirmed) {
                onStartOffboarding?.();
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
                        ? 'bg-[#1f2937] text-white border-slate-500 ring-2 ring-[#2463eb]/20'
                        : 'text-slate-300 border-[#282e39] hover:bg-[#1f2937]'
                    }
                `}
                style={{ backgroundColor: isOpen ? '#1f2937' : 'var(--bg-card)' }}
            >
                <MoreHorizontal size={18} />
                <span>Actions</span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-[100] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                    style={{
                        backgroundColor: 'rgba(30, 37, 48, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div className="p-2 space-y-1">
                        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>
                            Communication
                        </div>
                        <button
                            onClick={() => handleAction('whatsapp')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left group hover:bg-white/5"
                        >
                            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <MessageCircle size={18} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-semibold" style={{ color: 'var(--text-head)' }}>Send Message</span>
                                <span className="text-xs font-normal leading-tight mt-0.5" style={{ color: 'var(--text-light)' }}>
                                    Start a conversation via WhatsApp
                                </span>
                            </div>
                        </button>

                        <div className="my-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}></div>

                        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-light)' }}>
                            Management
                        </div>
                        <button
                            onClick={() => handleAction('equipment')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left group hover:bg-white/5"
                        >
                            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <Laptop size={18} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-semibold" style={{ color: 'var(--text-head)' }}>Assign Equipment</span>
                                <span className="text-xs font-normal leading-tight mt-0.5" style={{ color: 'var(--text-light)' }}>
                                    Manage hardware allocation & requests
                                </span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleAction('offboarding')}
                            className="w-full flex items-start gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left group hover:bg-red-900/10"
                        >
                            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                                <LogOut size={18} />
                            </div>
                            <div className="flex-1">
                                <span className="block font-semibold text-red-400">Start Offboarding</span>
                                <span className="text-xs font-normal leading-tight mt-0.5" style={{ color: 'var(--text-light)' }}>
                                    Begin termination or exit process
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderActions;
