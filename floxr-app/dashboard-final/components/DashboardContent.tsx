import React from 'react';
import StatsSection from './StatsSection';
import WorkflowSection from './WorkflowSection';
import ActivitySection from './ActivitySection';
import PromoSection from './PromoSection';

const DashboardContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">
        <StatsSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <WorkflowSection />
          <ActivitySection />
        </div>
        
        <PromoSection />
      </div>
    </div>
  );
};

export default DashboardContent;
