import React from 'react';

const CardHeader: React.FC<{ 
    title: string; 
    icon: string; 
    action?: React.ReactNode 
}> = ({ title, icon, action }) => (
    <div className="p-5 border-b border-slate-100 dark:border-[#282e39] flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
            {title}
        </h3>
        {action}
    </div>
);

const EditButton = () => (
    <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-slate-50 dark:hover:bg-[#1f2937]">
        <span className="material-symbols-outlined text-[18px]">edit</span>
    </button>
);

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-[#282e39] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-slate-400 transition-all">
        {children}
    </a>
);

export const ContactCard: React.FC = () => {
    return (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#282e39] rounded-xl shadow-sm flex flex-col h-full">
            <CardHeader title="Contact Information" icon="contact_mail" action={<EditButton />} />
            
            <div className="p-6 space-y-6 flex-1">
                <div className="group">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Work Email</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-white select-all">sarah.j@floxr.com</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-primary" title="Copy">
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        </button>
                    </div>
                </div>

                <div className="group">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-white select-all">+1 (555) 012-3456</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-primary" title="Copy">
                            <span className="material-symbols-outlined text-[16px]">phone</span>
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Social Profiles</p>
                    <div className="flex gap-2 mt-2">
                        <SocialIcon>
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                        </SocialIcon>
                        <SocialIcon>
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EmploymentCard: React.FC = () => {
    return (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#282e39] rounded-xl shadow-sm flex flex-col h-full">
            <CardHeader title="Employment Details" icon="badge" action={<EditButton />} />

            <div className="p-6 space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Employee ID</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">EMP-2023-042</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Join Date</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Jan 15, 2023</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Department</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Product Design & Engineering</p>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Reporting To</p>
                    <div className="flex items-center gap-3 mt-2 p-2 rounded-lg border border-slate-100 dark:border-[#282e39] hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">JD</div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">James Doe</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">VP of Design</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const OnboardingCard: React.FC = () => {
    return (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#282e39] rounded-xl shadow-sm flex flex-col h-full">
            <CardHeader 
                title="Onboarding" 
                icon="rocket_launch" 
                action={
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Complete
                    </span>
                }
            />

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-center py-4">
                    <div className="relative w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle className="text-slate-100 dark:text-[#282e39]" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="8"></circle>
                            <circle className="text-emerald-500 transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="251" strokeDashoffset="0" strokeLinecap="round" strokeWidth="8"></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">100%</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Account Setup</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Equipment Provisioned</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Orientation</span>
                    </div>
                </div>

                <button className="mt-auto pt-4 w-full text-center text-sm text-primary font-medium hover:underline">
                    View full checklist
                </button>
            </div>
        </div>
    );
};