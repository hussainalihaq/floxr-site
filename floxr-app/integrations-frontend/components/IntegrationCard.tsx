import React, { useState } from 'react';
import { Integration } from '../types';

interface IntegrationCardProps {
  data: Integration;
  onToggleSync: (id: string, newValue: boolean) => void;
  onConnect: (id: string) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ data, onToggleSync, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectClick = () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      onConnect(data.id);
      setIsConnecting(false);
    }, 1500);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSync(data.id, e.target.checked);
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden ${data.iconBgColor} ${data.iconBgColor === 'bg-white' ? 'shadow-white/10' : `shadow-${data.iconBgColor.replace('bg-', '')}/20`}`}>
          {data.hasGradientOverlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 opacity-20"></div>
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
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Connected</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2">{data.name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{data.description}</p>
      </div>

      {/* Footer Section */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
        {data.isConnected ? (
          <>
            <span className="text-xs font-medium text-slate-500">
                {data.lastSync ? `Last sync: ${data.lastSync}` : 'Auto-sync enabled'}
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                name="toggle" 
                id={`toggle-${data.id}`}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#1f2530] appearance-none cursor-pointer transition-all duration-300"
                checked={data.autoSync}
                onChange={handleToggle}
              />
              <label 
                htmlFor={`toggle-${data.id}`} 
                className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${data.autoSync ? 'bg-emerald-500' : 'bg-slate-700'}`}
              ></label>
            </div>
          </>
        ) : (
          <button 
            onClick={handleConnectClick}
            disabled={isConnecting}
            className="w-full py-2 px-4 rounded-lg bg-[#282e39] hover:bg-[#323a46] text-white text-sm font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Connect</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};