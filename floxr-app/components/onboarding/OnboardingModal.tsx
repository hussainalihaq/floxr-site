'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Settings, Mail, Laptop, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface Department {
    id: string;
    name: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    departmentId: string;
    startDate: string;
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
    location: string;
    sendWelcomeEmail: boolean;
    assignEquipment: boolean;
    requiredDocs: string[];
    otherDocName: string;
}

const INITIAL_FORM_DATA: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    departmentId: '',
    startDate: '',
    employmentType: 'FULL_TIME',
    location: 'Remote',
    sendWelcomeEmail: true,
    assignEquipment: false,
    requiredDocs: ['w4', 'contract'],
    otherDocName: '',
};

const DOCUMENT_OPTIONS = [
    { id: 'i9', label: 'I-9 Form' },
    { id: 'w4', label: 'W-4 Form' },
    { id: 'contract', label: 'Employment Contract' },
    { id: 'nda', label: 'Non-Disclosure Agreement' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOtherChecked, setIsOtherChecked] = useState(false);

    // Fetch departments on mount
    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
        }
    }, [isOpen]);

    const fetchDepartments = async () => {
        try {
            const res = await fetch('/api/departments');
            if (res.ok) {
                const data = await res.json();
                setDepartments(data.departments || []);
            }
        } catch (err) {
            console.error('Failed to fetch departments:', err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleToggle = (field: 'sendWelcomeEmail' | 'assignEquipment') => {
        setFormData(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleDocToggle = (docId: string) => {
        setFormData(prev => {
            const docs = prev.requiredDocs.includes(docId)
                ? prev.requiredDocs.filter(d => d !== docId)
                : [...prev.requiredDocs, docId];
            return { ...prev, requiredDocs: docs };
        });
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('First name and last name are required');
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Valid email address is required');
            return;
        }
        if (!formData.startDate) {
            setError('Start date is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    jobTitle: formData.jobTitle || undefined,
                    departmentId: formData.departmentId || undefined,
                    startDate: formData.startDate,
                    employmentType: formData.employmentType,
                    status: 'ONBOARDING',
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create employee');
            }

            // Reset form and close
            setFormData(INITIAL_FORM_DATA);
            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <div
                className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{
                    backgroundColor: 'rgba(16, 22, 34, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                    <div>
                        <h2 className="text-xl font-bold text-white">Start New Onboarding</h2>
                        <p className="text-sm text-slate-400 mt-1">Add a new hire to the pipeline.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Error Display */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Section 1: Basic Info */}
                    <section>
                        <h3 className="text-sm font-semibold text-[#2463eb] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <User size={16} />
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. John"
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Doe"
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john.doe@example.com"
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+92 300 0000000"
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Position Details */}
                    <section>
                        <h3 className="text-sm font-semibold text-[#2463eb] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Briefcase size={16} />
                            Position Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-medium text-slate-300">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Senior Product Designer"
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Department</label>
                                <div className="relative">
                                    <select
                                        name="departmentId"
                                        value={formData.departmentId}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all appearance-none pr-10"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                        {departments.length === 0 && (
                                            <>
                                                <option value="">Engineering</option>
                                                <option value="">Design</option>
                                                <option value="">Marketing</option>
                                                <option value="">Human Resources</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Start Date *</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all [color-scheme:dark]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Employment Type</label>
                                <div className="flex gap-1 p-1 bg-[#181c24] rounded-lg border border-slate-700/50">
                                    {(['FULL_TIME', 'PART_TIME', 'CONTRACT'] as const).map((type) => (
                                        <label key={type} className="flex-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="employmentType"
                                                value={type}
                                                checked={formData.employmentType === type}
                                                onChange={handleInputChange}
                                                className="peer sr-only"
                                            />
                                            <span className="block text-center py-1.5 text-xs font-medium text-slate-400 rounded peer-checked:bg-slate-700 peer-checked:text-white transition-all hover:text-slate-200">
                                                {type === 'FULL_TIME' ? 'Full-time' : type === 'PART_TIME' ? 'Part-time' : 'Contract'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Location</label>
                                <div className="relative">
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#181c24] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2463eb]/50 focus:border-transparent transition-all appearance-none pr-10"
                                    >
                                        <option value="Remote">Remote</option>
                                        <option value="On-site">On-site (HQ)</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Settings */}
                    <section>
                        <h3 className="text-sm font-semibold text-[#2463eb] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Settings size={16} />
                            Onboarding Settings
                        </h3>
                        <div className="space-y-4">
                            {/* Toggle: Send Welcome Email */}
                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Send Welcome Email</p>
                                        <p className="text-xs text-slate-500">Automated welcome kit & login details</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleToggle('sendWelcomeEmail')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.sendWelcomeEmail ? 'bg-[#2463eb]' : 'bg-slate-700'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${formData.sendWelcomeEmail ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                </button>
                            </div>

                            {/* Toggle: Assign Equipment */}
                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded bg-orange-500/10 text-orange-400">
                                        <Laptop size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Assign Equipment</p>
                                        <p className="text-xs text-slate-500">Trigger IT provisioning workflow</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleToggle('assignEquipment')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.assignEquipment ? 'bg-[#2463eb]' : 'bg-slate-700'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${formData.assignEquipment ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                </button>
                            </div>

                            {/* Required Documents */}
                            <div className="space-y-3 pt-2 border-t border-slate-700/30 mt-4">
                                <label className="text-xs font-semibold text-[#2463eb] uppercase tracking-wider flex items-center gap-2 mb-2">
                                    Required Documents
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {DOCUMENT_OPTIONS.map(doc => (
                                        <label
                                            key={doc.id}
                                            className="flex items-center p-3 rounded-lg border border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24] cursor-pointer transition-colors group"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.requiredDocs.includes(doc.id)}
                                                onChange={() => handleDocToggle(doc.id)}
                                                className="w-4 h-4 text-[#2463eb] bg-slate-700 border-slate-600 rounded focus:ring-[#2463eb]/50 focus:ring-2"
                                            />
                                            <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                                {doc.label}
                                            </span>
                                        </label>
                                    ))}

                                    {/* Other Option */}
                                    <div className={`flex flex-col p-3 rounded-lg border transition-colors duration-200 ${isOtherChecked ? 'border-[#2463eb]/50 bg-[#181c24]' : 'border-slate-700/30 bg-[#181c24]/50 hover:bg-[#181c24]'}`}>
                                        <label className="flex items-center cursor-pointer group w-full">
                                            <input
                                                type="checkbox"
                                                checked={isOtherChecked}
                                                onChange={(e) => setIsOtherChecked(e.target.checked)}
                                                className="w-4 h-4 text-[#2463eb] bg-slate-700 border-slate-600 rounded focus:ring-[#2463eb]/50 focus:ring-2"
                                            />
                                            <span className={`ml-3 text-sm font-medium transition-colors ${isOtherChecked ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                Other
                                            </span>
                                        </label>

                                        {isOtherChecked && (
                                            <div className="mt-3 w-full">
                                                <input
                                                    type="text"
                                                    name="otherDocName"
                                                    value={formData.otherDocName}
                                                    onChange={handleInputChange}
                                                    placeholder="Please specify document..."
                                                    className="w-full bg-black/20 border border-slate-700/50 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2463eb]/50 focus:border-[#2463eb]/50 transition-all"
                                                    autoFocus
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-5 flex justify-end gap-3"
                    style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(16, 22, 34, 0.5)'
                    }}
                >
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#2463eb] hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <span>Start Onboarding</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
