import React from 'react';
import { Candidate } from '../types';

interface CandidateProfileProps {
  candidate: Candidate;
}

export const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate }) => {
  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img 
            src={candidate.avatarUrl} 
            alt={candidate.name} 
            className="w-full h-full rounded-full object-cover ring-4 ring-slate-100 dark:ring-border-dark"
          />
          <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white dark:border-card-dark w-6 h-6 rounded-full"></div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
        <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-medium">{candidate.role}</p>
        
        <div className="w-full h-px bg-slate-100 dark:bg-border-dark my-6"></div>
        
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{candidate.department}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Start Date</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{candidate.startDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Recruiter</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{candidate.recruiter}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{candidate.location}</span>
          </div>
        </div>
        
        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Progress</span>
            <span className="text-xs font-bold text-primary">{candidate.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-border-dark rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${candidate.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};