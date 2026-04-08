import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DEPARTMENT_DATA } from '../../constants';

export const DepartmentChart: React.FC = () => {
  return (
    <div className="w-full h-64 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={DEPARTMENT_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {DEPARTMENT_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#181c24', borderColor: '#282e39', borderRadius: '8px', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">Total</span>
        <span className="text-sm text-slate-500">4,258</span>
      </div>
    </div>
  );
};