import React, { useState } from 'react';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [isOtherChecked, setIsOtherChecked] = useState(false);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col glass-panel rounded-2xl shadow-2xl animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">Start New Onboarding</h2>
            <p className="text-sm text-slate-400 mt-1">Add a new hire to the pipeline.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Section 1: Basic Info */}
          <section>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">person</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">First Name</label>
                <input type="text" placeholder="e.g. John" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Last Name</label>
                <input type="text" placeholder="e.g. Doe" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <input type="email" placeholder="john.doe@example.com" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
              </div>
            </div>
          </section>

          {/* Section 2: Position Details */}
          <section>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">work</span>
              Position Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-medium text-slate-300">Job Title</label>
                <input type="text" placeholder="e.g. Senior Product Designer" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Department</label>
                <select className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all">
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Human Resources</option>
                  <option>Sales</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Start Date</label>
                <input type="date" className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all [color-scheme:dark]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Employment Type</label>
                <div className="flex gap-2 p-1 bg-[#181c24] rounded-lg border border-slate-700/50">
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="employment_type" defaultChecked className="peer sr-only" />
                    <span className="block text-center py-1.5 text-xs font-medium text-slate-400 rounded peer-checked:bg-slate-700 peer-checked:text-white transition-all hover:text-slate-200">Full-time</span>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="employment_type" className="peer sr-only" />
                    <span className="block text-center py-1.5 text-xs font-medium text-slate-400 rounded peer-checked:bg-slate-700 peer-checked:text-white transition-all hover:text-slate-200">Part-time</span>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="employment_type" className="peer sr-only" />
                    <span className="block text-center py-1.5 text-xs font-medium text-slate-400 rounded peer-checked:bg-slate-700 peer-checked:text-white transition-all hover:text-slate-200">Contract</span>
                  </label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Location</label>
                <select className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all">
                  <option>Remote</option>
                  <option>On-site (HQ)</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Settings */}
          <section>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">settings_suggest</span>
              Onboarding Settings
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Assign HR Buddy</label>
                <div className="relative">
                  <select className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all pl-3 pr-10 appearance-none">
                    <option>Select an HR Manager...</option>
                    <option>Sarah Jenkins (Senior HR)</option>
                    <option>Mike Ross (Recruiter)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-500 text-lg pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                    <span className="material-symbols-outlined text-lg">mark_email_read</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Send Welcome Email</p>
                    <p className="text-xs text-slate-500">Automated welcome kit & login details</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-orange-500/10 text-orange-400">
                    <span className="material-symbols-outlined text-lg">laptop_mac</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Assign Equipment</p>
                    <p className="text-xs text-slate-500">Trigger IT provisioning workflow</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-700/30 mt-4">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-base">folder_shared</span>
                    Required Documents
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24] cursor-pointer transition-colors group">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary/50 focus:ring-2" />
                        <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">I-9 Form</span>
                    </label>
                    <label className="flex items-center p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24] cursor-pointer transition-colors group">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary/50 focus:ring-2" />
                        <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">W-4 Form</span>
                    </label>
                    <label className="flex items-center p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24] cursor-pointer transition-colors group">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary/50 focus:ring-2" />
                        <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Employment Contract</span>
                    </label>
                    <label className="flex items-center p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24] cursor-pointer transition-colors group">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary/50 focus:ring-2" />
                        <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Non-Disclosure Agreement</span>
                    </label>
                    
                    {/* Other Document Option */}
                    <div className={`flex flex-col p-3 rounded-lg border transition-colors duration-200 ${isOtherChecked ? 'border-primary/50 bg-[#181c24]' : 'border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24]'}`}>
                      <label className="flex items-center cursor-pointer group w-full">
                          <input 
                            type="checkbox" 
                            checked={isOtherChecked}
                            onChange={(e) => setIsOtherChecked(e.target.checked)}
                            className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary/50 focus:ring-2" 
                          />
                          <span className={`ml-3 text-sm font-medium transition-colors ${isOtherChecked ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>Other</span>
                      </label>
                      
                      {isOtherChecked && (
                        <div className="mt-3 w-full animate-fadeIn">
                          <input 
                            type="text" 
                            placeholder="Please specify document..." 
                            className="w-full bg-black/20 border border-slate-700/50 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>

                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10 flex justify-end gap-3 bg-[#101622]/50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>Start Onboarding</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
