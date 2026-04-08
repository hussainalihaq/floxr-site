import React from 'react';
import { PIPELINE_DATA } from '../../constants';

export const PipelineFunnel: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3 w-full">
      {PIPELINE_DATA.map((item, index) => (
        <div key={index} className="w-full max-w-md relative group cursor-pointer">
          <div 
            className={`h-10 rounded mx-auto flex items-center justify-between px-4 transition-colors ${item.colorClass}`}
            style={{ width: item.width }}
          >
            <span className="text-xs font-medium text-white whitespace-nowrap">{item.stage}</span>
            <span className="text-xs font-bold text-white">{item.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};