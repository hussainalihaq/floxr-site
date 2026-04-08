import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <DashboardContent />
      </main>
    </div>
  );
};

export default App;