import React from 'react';
import { CANDIDATES } from '../constants';
import { Candidate } from '../types';

const StatusBadge: React.FC<{ status: Candidate['taskStatus']; count: number; total: number }> = ({ status, count, total }) => {
  const configs = {
    checked: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', icon: 'check_circle' },
    pending: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-700/50', icon: 'pending' },
    blocked: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-700/50', icon: 'error' },
    done: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-700/50', icon: 'task_alt' },
  };
  const config = configs[status];
  const label = status === 'done' ? 'All Done' : status === 'blocked' ? 'Blocked' : `${count}/${total} Tasks`;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
      {label}
    </span>
  );
};

const CandidatesTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden flex flex-col flex-1">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center bg-slate-50/50 dark:bg-[#181c24]">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Candidates</h3>
        <div className="flex gap-2 text-sm text-slate-500">
          <span>Showing 28 candidates</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#282e39] text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-[#1f2937]">
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 w-1/4">Current Stage</th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Task Completion</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#282e39]">
            {CANDIDATES.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {candidate.avatar ? (
                        <img alt={candidate.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#181c24]" src={candidate.avatar} />
                      ) : (
                         <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white dark:ring-[#181c24] ${candidate.name.includes('Mike') ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} `}>
                             {candidate.name.includes('Mike') ? 'MR' : candidate.name.split(' ').map(n=>n[0]).join('')}
                         </div>
                      )}
                      {candidate.id === '1' && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-[#181c24]"></span>}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{candidate.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">{candidate.roleIcon}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{candidate.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className={`font-semibold text-${candidate.stageColor === 'primary' ? 'primary' : candidate.stageColor + '-500'}`}>{candidate.stageName}</span>
                      <span className="text-slate-400">{candidate.stageDetail}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`bg-${candidate.stageColor === 'primary' ? 'primary' : candidate.stageColor + '-500'} h-full transition-all duration-1000 ${candidate.id === '2' ? 'animate-pulse' : ''} ${candidate.stageColor === 'emerald' ? 'shadow-[0_0_10px_rgba(16,185,129,0.5)]' : ''} ${candidate.stageColor === 'primary' ? 'shadow-[0_0_10px_rgba(19,91,236,0.5)]' : ''}`} 
                        style={{ width: `${candidate.stageProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {candidate.assignedTo.startsWith('http') ? (
                         <img alt="HR Manager" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#181c24] object-cover" src={candidate.assignedTo} />
                    ) : (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#181c24] bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">{candidate.assignedTo}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={candidate.taskStatus} count={candidate.tasksCompleted} total={candidate.totalTasks} />
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${candidate.isDueDateUrgent ? 'text-red-500 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                    {candidate.dueDate}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#181c24] flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 5 of 28 results</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300">Previous</button>
          <button className="px-3 py-1 text-sm bg-primary text-white border border-primary rounded shadow-sm">1</button>
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300">2</button>
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300">3</button>
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-[#3b4354] rounded hover:bg-slate-50 dark:hover:bg-[#2d3748] text-slate-600 dark:text-slate-300">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesTable;
