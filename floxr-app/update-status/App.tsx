import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CandidateCard from './components/CandidateCard';
import DocumentChecklist from './components/DocumentChecklist';
import OnboardingTimeline from './components/OnboardingTimeline';
import UpdateStatusModal from './components/UpdateStatusModal';
import { Candidate, DocumentItem, TimelineEvent, UpdateStatusPayload } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initial Data
  const [candidate, setCandidate] = useState<Candidate>({
    name: "Michael Ross",
    role: "Senior Product Designer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo",
    department: "Design",
    startDate: "Oct 24, 2023",
    recruiter: "Sarah Jenkins",
    location: "Remote, NY",
    progress: 65,
    stage: "IT Provisioning"
  });

  const [documents] = useState<DocumentItem[]>([
    { id: '1', title: 'Offer Letter Signed', status: 'completed', date: 'Oct 10', completed: true },
    { id: '2', title: 'I-9 Verification', status: 'completed', date: 'Oct 12', completed: true },
    { id: '3', title: 'Background Check', status: 'completed', date: 'Oct 14', completed: true },
    { id: '4', title: 'Tax Forms (W-4)', status: 'action_required', completed: false },
    { id: '5', title: 'Direct Deposit Info', status: 'pending', completed: false },
  ]);

  const [timelineEvents] = useState<TimelineEvent[]>([
    {
      id: '1',
      title: 'Welcome Email Sent',
      description: 'System automatically sent the welcome package and login credentials.',
      status: 'completed',
      date: 'Oct 10',
      time: '09:30 AM',
      icon: 'mark_email_read',
      iconColorClass: 'text-white',
      bgColorClass: 'bg-emerald-500 shadow-emerald-500/20',
      meta: {
        userImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
        userName: 'Emily Chen'
      }
    },
    {
      id: '2',
      title: 'Account Access Granted',
      description: 'SSO provisioning complete for Google Workspace, Slack, and Jira.',
      status: 'completed',
      date: 'Oct 12',
      time: '02:15 PM',
      icon: 'badge',
      iconColorClass: 'text-white',
      bgColorClass: 'bg-emerald-500 shadow-emerald-500/20',
      meta: {
        icons: ['mail', 'chat', 'task']
      }
    },
    {
      id: '3',
      title: 'IT Hardware Shipping',
      description: 'MacBook Pro M3 and peripherals have been dispatched.',
      status: 'in_progress',
      date: 'In Progress',
      icon: 'sync',
      iconColorClass: 'text-white',
      bgColorClass: 'bg-primary shadow-primary/20',
      borderColorClass: 'border-l-4 border-l-primary border-y border-r border-slate-200 dark:border-[#282e39]',
      meta: {
        trackingId: '1Z999AA10123456784',
        provider: 'FedEx Express'
      }
    },
    {
      id: '4',
      title: 'Team Introduction',
      description: 'Virtual meet and greet with the Design Team.',
      status: 'scheduled',
      date: 'Oct 24',
      time: '10:00 AM EST',
      icon: 'groups',
      iconColorClass: 'text-slate-400',
      bgColorClass: 'bg-white dark:bg-[#282e39] border-2 border-slate-300 dark:border-slate-600',
      borderColorClass: 'border border-slate-200 dark:border-[#282e39] border-dashed'
    },
    {
      id: '5',
      title: 'Training Modules',
      description: 'Security awareness and company policy training will unlock on Day 1.',
      status: 'locked',
      date: 'Pending',
      icon: 'school',
      iconColorClass: 'text-slate-400',
      bgColorClass: 'bg-white dark:bg-[#282e39] border-2 border-slate-300 dark:border-slate-600',
    }
  ]);

  const handleUpdateStatus = (payload: UpdateStatusPayload) => {
    // In a real app, this would make an API call.
    // Here we update the local state to simulate the update.
    setCandidate(prev => ({
      ...prev,
      progress: payload.progress,
      stage: payload.stage
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen w-full font-display mx-auto max-w-[1600px] aspect-[16/9] bg-white dark:bg-background-dark shadow-2xl overflow-hidden relative border-x border-slate-200 dark:border-[#282e39]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          onUpdateStatusClick={() => setIsModalOpen(true)} 
          candidateName={candidate.name} 
        />
        <div className="flex-1 overflow-y-auto p-10">
          <div className="grid grid-cols-12 gap-8 h-full">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <CandidateCard candidate={candidate} />
              <DocumentChecklist documents={documents} />
            </div>
            
            {/* Right Column (Timeline) */}
            <OnboardingTimeline events={timelineEvents} />
          </div>
        </div>
      </main>

      <UpdateStatusModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateStatus}
        currentProgress={candidate.progress}
        currentStage={candidate.stage}
      />
    </div>
  );
};

export default App;