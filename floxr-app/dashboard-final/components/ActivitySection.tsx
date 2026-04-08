import React from 'react';
import { ActivityItem } from '../types';

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'update',
    user: {
      name: 'John Doe',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUog3FFs9wLHwhNjAmdK4IBgdlRzx8XnKaw79aTw0XHRCZuRc8gvLoWCBJ-G84maJAf42jR5ttZBIraP6LgUv7JWFiygffjnZZZ_6kEOa_QoEevhiOioRaTOn0ypysgD-QvhXD4pOXKMNmyssaKdALrHoqp6rDxClCuEGR3U99sjthASN7sQBSmcp-I4OO19rhP_yLj-DGT1twuqnR5E1pB9xzysOxlAMU8yTeTqgVyFMb-imkI8lWSAFdPckkV2oeO2JF_--R_mo',
    },
    title: 'Completed I-9 Form verification',
    description: (
      <span>
        Completed <span className="font-semibold text-slate-700 dark:text-slate-300">I-9 Form verification</span>.
      </span>
    ),
    time: '10 minutes ago',
    isOnline: true,
  },
  {
    id: '2',
    type: 'notification',
    title: 'System Notification',
    description: (
      <span>
        Offer letter sent to <span className="font-semibold text-slate-700 dark:text-slate-300">Sarah Jenkins</span>.
      </span>
    ),
    time: '45 minutes ago',
  },
  {
    id: '3',
    type: 'update',
    user: {
      name: 'Emily Chen',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuChQc1kFAF7zvaD2cyN0Z5swZjUUcrUYJxIZzR33BQTqizbh8eoSdSSSwUBzzOv_zqq2vFWUFrBmapmP61Qp0pmBUEKH8yUq8x1Go_YQsGjag8mTHMDoA43LYkNXHrIZCi5C8z_LVRhqJGeR_eH4b7RpGKvH_FysPhV1hd3e0gmZYNYbpABlnYbLYWfAT0H12XdWRD7CTc8c54XZzgT7bNOsY2O0QCh2oI8E8P3GUC1bTefbMRlTFAQFD59aTWGQOP7xgVL0am3yv8',
    },
    title: 'Updated integration settings',
    description: (
      <span>
        Updated integration settings for <span className="font-semibold text-slate-700 dark:text-slate-300">Slack</span>.
      </span>
    ),
    time: '2 hours ago',
  },
  {
    id: '4',
    type: 'alert',
    title: 'Alert',
    description: 'Mike Ross failed background check validation.',
    time: '5 hours ago',
  },
];

const ActivitySection: React.FC = () => {
  return (
    <div className="lg:col-span-1 flex flex-col bg-white dark:bg-[#181c24] rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm overflow-hidden h-[500px]">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282e39] flex justify-between items-center">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Activity</h3>
        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        <ul className="divide-y divide-slate-100 dark:divide-[#282e39]">
          {activities.map((item) => (
            <li
              key={item.id}
              className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-[#1f2937]/50 transition-colors cursor-pointer group"
            >
              <div className="flex gap-4">
                {/* Icon/Avatar logic */}
                <div className="relative flex-shrink-0">
                  {item.user?.avatar ? (
                    <>
                      <img
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#181c24]"
                        alt={item.user.name}
                        src={item.user.avatar}
                      />
                      {item.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-[#181c24]"></span>
                      )}
                    </>
                  ) : item.type === 'notification' ? (
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary ring-2 ring-white dark:ring-[#181c24]">
                      <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/10 text-orange-500 ring-2 ring-white dark:ring-[#181c24]">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {item.user?.name || item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#9da6b9] mt-0.5">
                    {item.description}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2">{item.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivitySection;
