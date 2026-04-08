'use client';

import React from 'react';
import { OnboardingCandidate } from './detail-types';

interface CandidateProfileProps {
    candidate: OnboardingCandidate;
}

const getInitialsColor = (name: string): string => {
    const colors = [
        'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
        'bg-gradient-to-br from-blue-500 to-cyan-500 text-white',
        'bg-gradient-to-br from-emerald-500 to-teal-500 text-white',
        'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
        'bg-gradient-to-br from-pink-500 to-rose-500 text-white',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

export const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate }) => {
    const initials = candidate.initials || candidate.name.split(' ').map(n => n[0]).join('');

    return (
        <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
            <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-32 h-32 mb-4">
                    {candidate.avatarUrl ? (
                        <img
                            src={candidate.avatarUrl}
                            alt={candidate.name}
                            className="w-full h-full rounded-full object-cover ring-4 ring-[#282e39]"
                        />
                    ) : (
                        <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl font-bold ring-4 ring-[#282e39] ${getInitialsColor(candidate.name)}`}>
                            {initials}
                        </div>
                    )}
                    <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-[#181c24] w-6 h-6 rounded-full"></div>
                </div>

                <h3 className="text-xl font-bold" style={{ color: 'var(--text-head)' }}>{candidate.name}</h3>
                <p className="text-sm font-medium" style={{ color: 'var(--text-light)' }}>{candidate.role}</p>

                <div className="w-full h-px my-6" style={{ backgroundColor: 'var(--border-subtle)' }}></div>

                {/* Info Grid */}
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-light)' }}>Department</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{candidate.department}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-light)' }}>Start Date</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{candidate.startDate}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-light)' }}>Recruiter</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{candidate.recruiter}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-light)' }}>Location</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{candidate.location}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-light)' }}>Total Progress</span>
                        <span className="text-xs font-bold text-[#2463eb]">{candidate.progress}%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                        <div
                            className="bg-[#2463eb] h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${candidate.progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
