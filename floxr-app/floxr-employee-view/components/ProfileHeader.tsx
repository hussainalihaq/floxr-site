import React from 'react';

export const ProfileHeader: React.FC = () => {
    return (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#282e39] rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
             {/* Background decoration or pattern could go here */}
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="relative">
                    <img 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-slate-50 dark:ring-[#282e39] shadow-xl" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo"
                        alt="Profile"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-surface-dark rounded-full" title="Online"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white truncate">Sarah Jenkins</h1>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                        </span>
                    </div>
                    
                    <p className="text-lg text-slate-500 dark:text-[#9da6b9] font-medium mb-4">
                        Senior Product Designer • Design System Team
                    </p>
                    
                    <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500">location_on</span>
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500">schedule</span>
                            <span>Local time: 10:42 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500">work</span>
                            <span>Full-time</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};