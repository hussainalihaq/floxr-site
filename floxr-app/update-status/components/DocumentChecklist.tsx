import React from 'react';
import { DocumentItem } from '../types';

interface DocumentChecklistProps {
  documents: DocumentItem[];
}

const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents }) => {
  const completedCount = documents.filter(d => d.completed).length;
  const totalCount = documents.length;

  return (
    <div className="bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm flex-1 flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center">
        <h4 className="font-bold text-slate-900 dark:text-white">Document Checklist</h4>
        <span className="bg-slate-100 dark:bg-[#282e39] text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-1 rounded">
          {completedCount}/{totalCount} Done
        </span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all group ${
                doc.status === 'action_required'
                  ? 'bg-slate-50 dark:bg-[#1f2937]/30 border border-transparent hover:border-slate-200 dark:hover:border-[#282e39]'
                  : 'hover:bg-slate-50 dark:hover:bg-[#1f2937]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    doc.completed
                      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'
                      : 'bg-white dark:bg-[#282e39] border border-slate-200 dark:border-slate-600 text-transparent'
                  } ${!doc.completed && doc.status === 'action_required' ? 'hover:text-primary cursor-pointer' : ''}`}
                >
                  <span className={`material-symbols-outlined text-lg ${!doc.completed && doc.status === 'action_required' ? 'opacity-0 hover:opacity-100' : ''}`}>
                    {doc.completed ? 'check' : 'check'}
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold text-slate-800 dark:text-slate-200 ${
                      doc.completed ? 'line-through decoration-slate-400 decoration-1 text-opacity-60' : ''
                    }`}
                  >
                    {doc.title}
                  </p>
                  {doc.date && <p className="text-xs text-slate-400">Completed {doc.date}</p>}
                  {doc.status === 'action_required' && (
                    <p className="text-xs text-orange-500 font-medium">Action Required</p>
                  )}
                  {doc.status === 'pending' && <p className="text-xs text-slate-400">Pending Candidate</p>}
                </div>
              </div>
              {doc.status === 'action_required' ? (
                <button className="text-primary text-xs font-semibold bg-primary/10 px-3 py-1.5 rounded hover:bg-primary/20 transition-colors">
                  Resend
                </button>
              ) : (
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <span className="material-symbols-outlined text-xl">{doc.status === 'pending' ? 'mail' : 'visibility'}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-[#282e39] bg-slate-50 dark:bg-[#1f2937]/30 rounded-b-xl">
        <button className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors border border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:bg-white dark:hover:bg-[#282e39]">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Document Requirement
        </button>
      </div>
    </div>
  );
};

export default DocumentChecklist;