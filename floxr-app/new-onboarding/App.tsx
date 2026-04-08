import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import CandidatesTable from './components/CandidatesTable';
import OnboardingModal from './components/OnboardingModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-screen w-full font-display mx-auto max-w-[1920px] bg-white dark:bg-background-dark shadow-2xl overflow-hidden relative border-x border-slate-200 dark:border-[#282e39]">
      
      {/* Modal - Overlay */}
      {isModalOpen && <OnboardingModal onClose={closeModal} />}

      {/* Main Layout - Blurred when modal is open */}
      <div className={`flex w-full h-full transition-all duration-300 ${isModalOpen ? 'filter blur-[2px]' : ''}`}>
        
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-[#0c1017]">
          
          <Header onOpenModal={openModal} />

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="flex flex-col gap-8 mx-auto pb-10 h-full max-w-7xl">
              
              <StatsSection />
              
              <CandidatesTable />
            
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
