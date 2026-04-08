import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ONBOARDING_DATA } from '../../constants';

export const OnboardingChart: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={ONBOARDING_DATA}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#135bec" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
            </linearGradient>
            <filter id="glow" height="130%" width="130%" x="-15%" y="-15%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dy={10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#181c24', borderColor: '#282e39', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: '#282e39', strokeDasharray: '4 4' }}
          />
          <Area 
            type="monotone" 
            dataKey="completed" 
            stroke="#135bec" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorCompleted)" 
            filter="url(#glow)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};