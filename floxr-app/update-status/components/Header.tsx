import React from 'react';

interface HeaderProps {
  onUpdateStatusClick: () => void;
  candidateName: string;
}

const Header: React.FC<HeaderProps> = ({ onUpdateStatusClick, candidateName }) => {
  return (
    <header className="w-full flex-shrink-0 bg-white/50 dark:bg-[#101622]/50 backdrop-blur-md z-10 sticky top-0 px-10 py-6 border-b border-transparent dark:border-transparent">
      <div className="flex flex-col gap-4 mx-auto">
        <a
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium w-fit"
          href="#"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Pipeline
        </a>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Candidate Onboarding</h2>
            <p className="text-slate-500 dark:text-[#9da6b9] text-sm mt-1">Viewing detailed progress for {candidateName}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-[#282e39] rounded-lg hover:bg-slate-50 dark:hover:bg-[#2d3748] transition-colors">
              Send Message
            </button>
            <button
              onClick={onUpdateStatusClick}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;