import React, { useRef, useState } from 'react';
import { KPI_DATA } from '../constants';
import { KPICardProps } from '../types';

const StatCard: React.FC<{ kpi: KPICardProps }> = ({ kpi }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const getGlowColor = (classes: string) => {
    // Reduced opacity for the larger card surface area to keep text readable
    if (classes.includes('primary')) return 'rgba(19, 91, 236, 0.15)';
    if (classes.includes('amber')) return 'rgba(245, 158, 11, 0.15)';
    if (classes.includes('purple')) return 'rgba(168, 85, 247, 0.15)';
    if (classes.includes('emerald')) return 'rgba(16, 185, 129, 0.15)';
    return 'rgba(255, 255, 255, 0.1)';
  };

  const glowColor = getGlowColor(kpi.iconColorClass);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] shadow-sm relative overflow-hidden group transition-all"
    >
      {/* Full Card Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
          opacity: opacity,
        }}
      />
      
      {/* Header Row */}
      <div className="flex justify-between items-start z-10 relative">
        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-semibold uppercase tracking-wider">
          {kpi.title}
        </p>
        
        {/* Icon Wrapper */}
        <div
          className={`p-1.5 rounded-lg ${kpi.iconColorClass}`}
        >
          <span className="material-symbols-outlined">{kpi.icon}</span>
        </div>
      </div>

      {/* Value Row */}
      <div className="flex items-baseline gap-2 mt-2 z-10 relative">
        <p className="text-slate-900 dark:text-white text-3xl font-bold">{kpi.value}</p>
        {kpi.trend && (
          <p
            className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              kpi.trendPositive
                ? 'text-emerald-500 bg-emerald-500/10'
                : 'text-slate-400 font-medium'
            }`}
          >
            {kpi.trend}
          </p>
        )}
      </div>

      {/* Subtext or Progress Bar */}
      {kpi.progress ? (
        <div className="w-full bg-slate-100 dark:bg-[#282e39] h-1.5 rounded-full mt-3 overflow-hidden z-10 relative">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${kpi.progress}%` }}
          ></div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 z-10 relative">{kpi.subtext}</p>
      )}
    </div>
  );
};

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_DATA.map((kpi: KPICardProps, index) => (
        <StatCard key={index} kpi={kpi} />
      ))}
    </div>
  );
};

export default StatsCards;