'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, AlertTriangle } from 'lucide-react';
import { ActivityItem } from './types';

const ActivitySection: React.FC = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            // Get the first company ID from the database
            const companyResponse = await fetch('/api/company/first');
            if (!companyResponse.ok) {
                throw new Error('No company found');
            }
            const { companyId } = await companyResponse.json();

            const response = await fetch(`/api/dashboard/activity?companyId=${companyId}`);

            if (!response.ok) throw new Error('Failed to fetch activities');

            const data = await response.json();
            setActivities(data.activities || []);
        } catch (err) {
            console.error('Error fetching activities:', err);
            // Use fallback data on error
            setActivities(getFallbackActivities());
        } finally {
            setLoading(false);
        }
    };

    // Handle mouse move for cursor glow effect
    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    if (loading) {
        return <ActivitySkeletonLoader />;
    }

    return (
        <div className="lg:col-span-1 flex flex-col rounded-xl shadow-sm overflow-hidden h-[500px]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>Recent Activity</h3>
                <Link href="/analytics" className="text-sm font-semibold hover:underline" style={{ color: '#2463eb' }}>View All</Link>
            </div>
            <div className="flex-1 overflow-y-auto p-0">
                <ul style={{ borderTop: 'none' }}>
                    {activities.map((item, index) => (
                        <li
                            key={item.id}
                            className="cursor-glow px-6 py-4 transition-colors cursor-pointer group"
                            style={{
                                borderTop: index > 0 ? '1px solid var(--border-subtle)' : 'none',
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div className="flex gap-4">
                                {/* Icon/Avatar logic */}
                                <div className="relative flex-shrink-0">
                                    {item.user?.avatar ? (
                                        <>
                                            <img
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#1e2230]"
                                                alt={item.user.name}
                                                src={item.user.avatar}
                                            />
                                            {item.isOnline && (
                                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-[#1e2230]" />
                                            )}
                                        </>
                                    ) : item.type === 'notification' ? (
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-[#1e2230]" style={{ backgroundColor: 'rgba(36, 99, 235, 0.1)', color: '#2463eb' }}>
                                            <Mail size={20} />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-[#1e2230]" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f97316' }}>
                                            <AlertTriangle size={20} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-head)' }}>
                                        {item.user?.name || item.title}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-body)' }}>
                                        {item.description}
                                    </p>
                                    <p className="text-[10px] mt-2" style={{ color: 'var(--text-light)' }}>{item.time}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Loading skeleton component
const ActivitySkeletonLoader = () => {
    return (
        <div className="lg:col-span-1 flex flex-col rounded-xl shadow-sm overflow-hidden h-[500px]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="h-5 w-32 rounded animate-pulse" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                <div className="h-4 w-16 rounded animate-pulse" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
            </div>
            <div className="flex-1 p-0">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="px-6 py-4" style={{ borderTop: i > 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                        <div className="flex gap-4 animate-pulse">
                            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                            <div className="flex-1">
                                <div className="h-4 w-32 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                                <div className="h-3 w-48 rounded mt-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                                <div className="h-2 w-20 rounded mt-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Fallback activities when API fails
function getFallbackActivities(): ActivityItem[] {
    return [
        {
            id: '1',
            type: 'notification',
            title: 'System Notification',
            description: 'Welcome to your dashboard',
            time: 'Just now',
        },
    ];
}

export default ActivitySection;
