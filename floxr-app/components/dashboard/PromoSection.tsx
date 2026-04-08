'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

const PromoSection: React.FC = () => {
    const handleTryBeta = () => {
        alert('AI Onboarding Assistant Beta is coming soon! You\'ll be notified when it\'s available.');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r text-white shadow-lg relative overflow-hidden group" style={{ background: 'linear-gradient(to right, #2463eb, #1d4ed8)' }}>
                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500">
                    <Rocket size={150} />
                </div>
                <h4 className="text-lg font-bold relative z-10">New Feature: AI Onboarding Assistant</h4>
                <p className="text-sm mt-2 max-w-md relative z-10" style={{ color: '#bfdbfe' }}>
                    Automate 50% more of your workflow with our new AI-powered document parser. Available now
                    for admin users.
                </p>
                <button
                    onClick={handleTryBeta}
                    className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-colors relative z-10"
                >
                    Try Beta
                </button>
            </div>

            {/* Help Section */}
            <div className="p-6 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <div>
                    <h4 className="font-bold" style={{ color: 'var(--text-head)' }}>Need Help?</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
                        Check our documentation or contact support.
                    </p>
                </div>
                <div className="flex gap-3">
                    <a
                        href="https://docs.floxr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium transition-colors hover:text-[#2463eb]"
                        style={{ color: 'var(--text-body)' }}
                    >
                        Docs
                    </a>
                    <Link
                        href="/settings"
                        className="px-4 py-2 text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all"
                        style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PromoSection;

