import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full font-display relative">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;