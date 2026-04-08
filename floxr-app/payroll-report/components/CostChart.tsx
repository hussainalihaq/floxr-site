import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CHART_DATA } from '../constants';

const CostChart: React.FC = () => {
  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={CHART_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {CHART_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Cost</span>
        <span className="text-xl font-bold text-slate-900 dark:text-white">$148.6k</span>
      </div>
    </div>
  );
};

export default CostChart;