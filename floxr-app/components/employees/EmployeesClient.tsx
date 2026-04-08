'use client';

import React, { useState } from 'react';
import EmployeesHeader from './EmployeesHeader';
import EmployeesContent from './EmployeesContent';
import AddEmployeeModal from './AddEmployeeModal';
import { EmployeeData } from './types';

interface EmployeesClientProps {
    initialEmployees: EmployeeData[];
}

const EmployeesClient: React.FC<EmployeesClientProps> = ({ initialEmployees }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${isModalOpen ? 'blur-sm scale-[0.99] opacity-50 pointer-events-none' : ''}`}>
                <EmployeesHeader onAddEmployee={() => setIsModalOpen(true)} />
                <EmployeesContent initialEmployees={initialEmployees} />
            </div>
            <AddEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default EmployeesClient;
