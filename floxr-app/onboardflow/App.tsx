import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { CandidateProfile } from './components/CandidateProfile';
import { DocumentChecklist } from './components/DocumentChecklist';
import { Timeline } from './components/Timeline';
import { Candidate, DocumentItem, TimelineEvent } from './types';

// Mock Data with high-quality images
const CANDIDATE: Candidate = {
  id: '1',
  name: 'Michael Ross',
  role: 'Senior Product Designer',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  department: 'Design Team',
  startDate: 'Oct 24, 2023',
  recruiter: 'Sarah Jenkins',
  location: 'Remote, NY',
  progress: 0, // Will be calculated
};

const DOCUMENTS: DocumentItem[] = [
  { id: '1', title: 'Offer Letter Signed', completedDate: 'Oct 10', status: 'completed' },
  { id: '2', title: 'I-9 Verification', completedDate: 'Oct 12', status: 'completed' },
  { id: '3', title: 'Background Check', completedDate: 'Oct 14', status: 'completed' },
  { id: '4', title: 'Tax Forms (W-4)', status: 'action_required' },
  { id: '5', title: 'Direct Deposit Info', status: 'pending' },
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'email-sent',
    date: 'Oct 10, 09:30 AM',
    title: 'Welcome Email Sent',
    description: 'System automatically sent the welcome package, handbook, and initial login credentials to personal email.',
    status: 'completed',
    statusLabel: 'Completed',
    icon: 'email',
    meta: {
      triggeredBy: 'Emily Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80',
    }
  },
  {
    id: 'account-access',
    date: 'Oct 12, 02:15 PM',
    title: 'Account Access Provisioned',
    description: 'SSO identity created. Access granted for Google Workspace, Slack, Jira, and Figma Enterprise.',
    status: 'completed',
    statusLabel: 'Provisioned',
    icon: 'badge',
  },
  {
    id: 'shipping',
    time: 'In Progress',
    title: 'Equipment Shipping',
    description: 'MacBook Pro M3 Max (16-inch) and Apple Studio Display have been dispatched via overnight shipping.',
    status: 'in-progress',
    statusLabel: 'Shipped',
    icon: 'shipping',
    meta: {
      trackingNumber: '1Z999AA10123456784',
      triggeredBy: 'IT Logistics'
    }
  },
  {
    id: 'intro',
    time: 'Pending',
    title: 'Team Introduction',
    description: 'Scheduled virtual meet and greet with the Design Team and Product Managers.',
    status: 'pending',
    statusLabel: 'Scheduled',
    icon: 'group',
    meta: {
      eventDate: 'Oct 24, 10:00 AM EST'
    }
  },
  {
    id: 'training',
    title: 'Day 1 Training',
    description: 'Security awareness, harassment prevention, and company culture courses will unlock on start date.',
    status: 'locked',
    statusLabel: 'Locked',
    icon: 'training',
  },
];

const App: React.FC = () => {
  // Calculate total progress based on documents and timeline steps
  const progress = useMemo(() => {
    const totalDocs = DOCUMENTS.length;
    const completedDocs = DOCUMENTS.filter(d => d.status === 'completed').length;
    
    const totalEvents = TIMELINE_EVENTS.length;
    const completedEvents = TIMELINE_EVENTS.filter(e => e.status === 'completed').length;
    const inProgressEvents = TIMELINE_EVENTS.filter(e => e.status === 'in-progress').length * 0.5;

    const totalItems = totalDocs + totalEvents;
    const totalScore = completedDocs + completedEvents + inProgressEvents;
    
    return Math.round((totalScore / totalItems) * 100);
  }, []);

  const candidateWithProgress = { ...CANDIDATE, progress };

  return (
    <div className="flex h-screen w-full font-sans mx-auto max-w-[1920px] bg-background-light dark:bg-background-dark overflow-hidden relative border-x border-slate-200 dark:border-border-dark selection:bg-primary/20">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Main Header */}
        <header className="w-full flex-shrink-0 bg-white/80 dark:bg-[#101622]/90 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-slate-200 dark:border-border-dark transition-all">
          <div className="flex flex-col gap-4 mx-auto max-w-7xl">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium w-fit group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Pipeline
            </a>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div className="animate-fade-in-up">
                <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Candidate Onboarding</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-medium">Active • Last updated 2 mins ago</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#1f2937] border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-[#2d3748] transition-all shadow-sm active:scale-95">
                  Send Message
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 active:scale-95">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Profile & Documents */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <CandidateProfile candidate={candidateWithProgress} />
                <DocumentChecklist documents={DOCUMENTS} />
              </div>

              {/* Right Column: Timeline */}
              <Timeline events={TIMELINE_EVENTS} />
            </div>
            
            <div className="h-10"></div> {/* Bottom Spacer */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;