import React from 'react';

const PromoSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* AI Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-[150px]">rocket_launch</span>
        </div>
        <h4 className="text-lg font-bold relative z-10">New Feature: AI Onboarding Assistant</h4>
        <p className="text-blue-100 text-sm mt-2 max-w-md relative z-10">
          Automate 50% more of your workflow with our new AI-powered document parser. Available now
          for admin users.
        </p>
        <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-colors relative z-10">
          Try Beta
        </button>
      </div>

      {/* Help Section */}
      <div className="p-6 rounded-xl bg-slate-100 dark:bg-[#181c24] border border-slate-200 dark:border-[#282e39] flex items-center justify-between">
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold">Need Help?</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Check our documentation or contact support.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
            Docs
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-[#282e39] border border-slate-200 dark:border-[#3b4354] rounded-lg shadow-sm hover:shadow transition-all text-slate-900 dark:text-white">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
