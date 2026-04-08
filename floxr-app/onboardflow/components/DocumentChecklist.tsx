import React from 'react';
import { Eye, Mail, Plus, Check } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentChecklistProps {
  documents: DocumentItem[];
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents }) => {
  const completedCount = documents.filter(d => d.status === 'completed').length;
  
  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex-1 flex flex-col min-h-[300px]">
      <div className="p-6 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
        <h4 className="font-bold text-slate-900 dark:text-white">Document Checklist</h4>
        <span className="bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-1 rounded">
          {completedCount}/{documents.length} Done
        </span>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {documents.map((doc) => (
            <li 
              key={doc.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                doc.status === 'action_required' 
                  ? 'bg-slate-50 dark:bg-[#1f2937]/30 border border-transparent hover:border-slate-200 dark:hover:border-border-dark'
                  : 'hover:bg-slate-50 dark:hover:bg-[#1f2937]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                {doc.status === 'completed' ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500">
                    <Check size={18} strokeWidth={3} />
                  </div>
                ) : doc.status === 'action_required' ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-border-dark border border-slate-200 dark:border-slate-600 text-transparent hover:text-primary cursor-pointer transition-colors group-hover:border-primary">
                    <Check size={18} className="opacity-0 hover:opacity-100" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-border-dark border border-slate-200 dark:border-slate-600"></div>
                )}
                
                <div>
                  <p className={`text-sm font-semibold ${
                    doc.status === 'completed' 
                      ? 'text-slate-800 dark:text-slate-200 line-through decoration-slate-400 decoration-1 text-opacity-60' 
                      : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {doc.title}
                  </p>
                  
                  {doc.status === 'completed' && (
                    <p className="text-xs text-slate-400">Completed {doc.completedDate}</p>
                  )}
                  {doc.status === 'action_required' && (
                    <p className="text-xs text-orange-500 font-medium">Action Required</p>
                  )}
                  {doc.status === 'pending' && (
                    <p className="text-xs text-slate-400">Pending Candidate</p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {doc.status === 'action_required' ? (
                <button className="text-primary text-xs font-semibold bg-primary/10 px-3 py-1.5 rounded hover:bg-primary/20 transition-colors">
                  Resend
                </button>
              ) : doc.status === 'pending' ? (
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Mail size={20} />
                </button>
              ) : (
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Eye size={20} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-[#1f2937]/30 rounded-b-xl">
        <button className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors border border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:bg-white dark:hover:bg-border-dark">
          <Plus size={18} />
          Add Document Requirement
        </button>
      </div>
    </div>
  );
};