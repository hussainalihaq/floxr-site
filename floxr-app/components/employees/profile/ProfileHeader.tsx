'use client';

import React from 'react';
import { MapPin, Clock, Briefcase } from 'lucide-react';

interface ProfileHeaderProps {
    employee: {
        firstName: string;
        lastName: string;
        email: string;
        jobTitle?: string | null;
        department?: { name: string } | null;
        status: string;
        employmentType: string;
        avatar?: string | null;
    };
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusStyles: Record<string, string> = {
        ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        ONBOARDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        OFFBOARDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };

    const statusLabels: Record<string, string> = {
        ACTIVE: 'Active',
        ONBOARDING: 'Onboarding',
        OFFBOARDING: 'Offboarding',
    };

    const dotStyles: Record<string, string> = {
        ACTIVE: 'bg-emerald-500',
        ONBOARDING: 'bg-blue-500 animate-pulse',
        OFFBOARDING: 'bg-amber-500',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${statusStyles[status] || statusStyles.ACTIVE}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || dotStyles.ACTIVE}`}></span>
            {statusLabels[status] || status}
        </span>
    );
};

const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const getInitialsColor = (name: string): string => {
    const colors = [
        'bg-blue-500/20 text-blue-400',
        'bg-purple-500/20 text-purple-400',
        'bg-emerald-500/20 text-emerald-400',
        'bg-amber-500/20 text-amber-400',
        'bg-pink-500/20 text-pink-400',
        'bg-cyan-500/20 text-cyan-400',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee }) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const roleInfo = `${employee.jobTitle || 'Team Member'} • ${employee.department?.name || 'Unassigned'}`;

    return (
        <div
            className="rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
            }}
        >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                {/* Avatar */}
                <div className="relative">
                    {employee.avatar ? (
                        <img
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-[#282e39] shadow-xl"
                            src={employee.avatar}
                            alt={fullName}
                        />
                    ) : (
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center font-bold text-3xl ring-4 ring-[#282e39] shadow-xl ${getInitialsColor(employee.firstName)}`}>
                            {getInitials(employee.firstName, employee.lastName)}
                        </div>
                    )}
                    {/* Online status indicator */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#181c24] rounded-full" title="Online"></div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold truncate" style={{ color: 'var(--text-head)' }}>
                            {fullName}
                        </h1>
                        <StatusBadge status={employee.status} />
                    </div>

                    <p className="text-lg font-medium mb-4" style={{ color: 'var(--text-body)' }}>
                        {roleInfo}
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-8 text-sm" style={{ color: 'var(--text-light)' }}>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-slate-500" />
                            <span>Remote</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-slate-500" />
                            <span>Local time: {getCurrentTime()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} className="text-slate-500" />
                            <span>{employee.employmentType.replace('_', ' ')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
