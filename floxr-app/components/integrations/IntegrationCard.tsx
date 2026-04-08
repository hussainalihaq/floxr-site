'use client';

import React, { useState } from 'react';
import { Integration } from './types';

interface IntegrationCardProps {
    data: Integration;
    onToggleSync: (id: string, newValue: boolean) => void;
    onConnect: (id: string) => void;
    onDisconnect: (id: string) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ data, onToggleSync, onConnect, onDisconnect }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

    const handleConnectClick = () => {
        setIsConnecting(true);
        // Simulate API call
        setTimeout(() => {
            onConnect(data.id);
            setIsConnecting(false);
        }, 1500);
    };

    const handleDisconnectClick = () => {
        setShowDisconnectConfirm(true);
    };

    const handleConfirmDisconnect = () => {
        setIsDisconnecting(true);
        setTimeout(() => {
            onDisconnect(data.id);
            setIsDisconnecting(false);
            setShowDisconnectConfirm(false);
        }, 1000);
    };

    const handleToggle = () => {
        onToggleSync(data.id, !data.autoSync);
    };

    return (
        <div className={`bg-[var(--bg-elevated)] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 h-full hover:shadow-lg hover:shadow-black/20 ${data.isConnected ? 'border-emerald-500/30' : 'border-[var(--border-subtle)] hover:border-[var(--border-default)]'
            }`}>
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden ${data.iconBgColor}`}
                    style={{ boxShadow: '0 8px 16px -4px rgba(0,0,0,0.3)' }}
                >
                    {data.hasGradientOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 opacity-20" />
                    )}
                    <span
                        className={`material-symbols-outlined text-[32px] relative z-10 ${data.customIconColor || 'text-white'}`}
                    >
                        {data.iconName}
                    </span>
                </div>

                {/* Connection Status Badge */}
                {data.isConnected && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Connected</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{data.name}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{data.description}</p>
            </div>

            {/* Footer Section */}
            <div className="pt-4 border-t border-[var(--border-subtle)] mt-auto">
                {data.isConnected ? (
                    <>
                        {/* Disconnect Confirmation */}
                        {showDisconnectConfirm ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-[var(--text-muted)] text-center">Disconnect {data.name}?</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowDisconnectConfirm(false)}
                                        className="flex-1 py-2 px-3 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-sm font-medium border border-[var(--border-subtle)] hover:bg-[var(--bg-default)] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDisconnect}
                                        disabled={isDisconnecting}
                                        className="flex-1 py-2 px-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                    >
                                        {isDisconnecting ? (
                                            <span className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto block" />
                                        ) : (
                                            'Disconnect'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Sync Row */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-medium text-[var(--text-muted)]">
                                        {data.lastSync ? `Last sync: ${data.lastSync}` : 'Auto-sync enabled'}
                                    </span>
                                    <button
                                        onClick={handleToggle}
                                        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${data.autoSync ? 'bg-emerald-500' : 'bg-slate-700'
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${data.autoSync ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>
                                {/* Disconnect Button */}
                                <button
                                    onClick={handleDisconnectClick}
                                    className="w-full py-2 px-4 rounded-lg text-[var(--text-muted)] text-sm font-medium border border-[var(--border-subtle)] hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.181 8.68a4 4 0 00-5.656 5.656M6.343 6.343a8 8 0 1111.314 11.314M6.343 17.657L17.657 6.343" />
                                    </svg>
                                    <span>Disconnect</span>
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <button
                        onClick={handleConnectClick}
                        disabled={isConnecting}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#2463eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isConnecting ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Connect</span>
                                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
