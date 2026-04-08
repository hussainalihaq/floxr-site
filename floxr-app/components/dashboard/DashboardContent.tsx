'use client';

import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import StatsSection from './StatsSection';
import WorkflowSection from './WorkflowSection';
import ActivitySection from './ActivitySection';
import PromoSection from './PromoSection';
import AddEmployeeModal from '@/components/employees/AddEmployeeModal';

const DashboardContent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${isModalOpen ? 'blur-sm scale-[0.99] opacity-50 pointer-events-none' : ''}`}>
                <DashboardHeader onAddEmployee={() => setIsModalOpen(true)} />
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
            </div>
            <AddEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default DashboardContent;
