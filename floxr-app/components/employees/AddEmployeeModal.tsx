'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronDown, ArrowRight, Loader2, Monitor } from 'lucide-react';

interface Department {
    id: string;
    name: string;
}

interface Equipment {
    id: string;
    name: string;
    type: string;
    status: string;
    assignedTo: string | null;
}

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EQUIPMENT_OPTIONS = [
    { label: 'MacBook Pro', value: 'macbook_pro' },
    { label: '4K Monitor', value: 'monitor_4k' },
    { label: 'Magic Keyboard', value: 'magic_keyboard' },
];

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>([]);

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [phone, setPhone] = useState('');
    const [employmentType, setEmploymentType] = useState('FULL_TIME');
    const [salary, setSalary] = useState('');
    const [currency, setCurrency] = useState('PKR');

    // Equipment Assignment
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [showOtherEquipment, setShowOtherEquipment] = useState(false);
    const [otherEquipmentText, setOtherEquipmentText] = useState('');

    // Load departments and available equipment
    useEffect(() => {
        if (isOpen) {
            // Fetch departments
            fetch('/api/departments')
                .then(res => res.json())
                .then(data => {
                    if (data.departments) {
                        setDepartments(data.departments);
                    }
                })
                .catch(console.error);

            // Fetch available equipment
            fetch('/api/equipment?status=AVAILABLE')
                .then(res => res.json())
                .then(data => {
                    if (data.equipment) {
                        setAvailableEquipment(data.equipment.filter((e: Equipment) => !e.assignedTo));
                    }
                })
                .catch(console.error);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleEquipment = (item: string) => {
        setSelectedEquipment(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!firstName || !lastName || !email || !startDate) {
            setError('Please fill in all required fields (First Name, Last Name, Email, Start Date)');
            return;
        }

        // Validate email format
        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Build equipment string for notes
            let equipmentString = selectedEquipment.join(', ');
            if (showOtherEquipment && otherEquipmentText) {
                if (equipmentString.length > 0) equipmentString += ', ';
                equipmentString += otherEquipmentText;
            }

            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    jobTitle: jobTitle || null,
                    departmentId: departmentId || null,
                    startDate,
                    phone: phone || null,
                    employmentType,
                    salary: salary ? parseFloat(salary) : null,
                    currency,
                    // Equipment will be assigned separately after employee creation
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create employee');
            }

            // If we have equipment selections and real equipment IDs from the database, assign them
            // For now, the equipment selections are stored as a note or can be linked later

            // Reset form
            resetForm();
            router.refresh();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setJobTitle('');
        setDepartmentId('');
        setStartDate('');
        setPhone('');
        setEmploymentType('FULL_TIME');
        setSalary('');
        setCurrency('PKR');
        setSelectedEquipment([]);
        setShowOtherEquipment(false);
        setOtherEquipmentText('');
        setError(null);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" style={{ backgroundColor: 'rgba(24, 28, 36, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {/* Modal Header */}
                <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-head)' }}>Add New Employee</h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>Enter the details for the new team member.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors hover:bg-[#282e39]"
                        style={{ color: 'var(--text-light)' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="p-3 rounded-lg text-sm bg-red-500/10 text-red-400 border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                First Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="e.g. Jane"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Last Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="e.g. Doe"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Work Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane.doe@company.com"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Job Title
                            </label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="e.g. Senior Developer"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Department */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Department
                            </label>
                            <div className="relative">
                                <select
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    className="w-full appearance-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all cursor-pointer"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3" style={{ color: 'var(--text-light)' }}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Employment Type */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Employment Type
                            </label>
                            <div className="relative">
                                <select
                                    value={employmentType}
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                    className="w-full appearance-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all cursor-pointer"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                >
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3" style={{ color: 'var(--text-light)' }}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Start Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all [color-scheme:dark]"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>

                        {/* Salary (Net After Taxes) */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-body)' }}>
                                Salary (Net After Taxes)
                            </label>
                            <div className="flex gap-2">
                                <div className="relative w-24">
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full appearance-none rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all cursor-pointer"
                                        style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                    >
                                        <option value="PKR">PKR</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="AED">AED</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: 'var(--text-light)' }}>
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="e.g. 150000"
                                    className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all font-mono"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                                />
                            </div>
                            <p className="text-xs" style={{ color: 'var(--text-light)' }}>Monthly take-home salary after tax deductions</p>
                        </div>
                    </div>

                    {/* Equipment Assignment Section */}
                    <div className="pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-head)' }}>
                            <Monitor size={18} className="text-[#2463eb]" />
                            Equipment Assignment
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
                            {EQUIPMENT_OPTIONS.map((item) => (
                                <label
                                    key={item.value}
                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:border-[#2463eb]/50"
                                    style={{ backgroundColor: 'var(--bg-subtle)', border: `1px solid ${selectedEquipment.includes(item.value) ? '#2463eb' : 'var(--border-subtle)'}` }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedEquipment.includes(item.value)}
                                        onChange={() => toggleEquipment(item.value)}
                                        className="w-4 h-4 text-[#2463eb] rounded border-slate-600 focus:ring-[#2463eb] focus:ring-offset-0 bg-transparent accent-[#2463eb]"
                                    />
                                    <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{item.label}</span>
                                </label>
                            ))}
                            <label
                                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:border-[#2463eb]/50"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: `1px solid ${showOtherEquipment ? '#2463eb' : 'var(--border-subtle)'}` }}
                            >
                                <input
                                    type="checkbox"
                                    checked={showOtherEquipment}
                                    onChange={(e) => setShowOtherEquipment(e.target.checked)}
                                    className="w-4 h-4 text-[#2463eb] rounded border-slate-600 focus:ring-[#2463eb] focus:ring-offset-0 bg-transparent accent-[#2463eb]"
                                />
                                <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>Other</span>
                            </label>
                        </div>

                        {/* Other Equipment Input */}
                        <div className={`transition-all duration-300 ease-in-out ${showOtherEquipment ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <input
                                type="text"
                                value={otherEquipmentText}
                                onChange={(e) => setOtherEquipmentText(e.target.value)}
                                placeholder="Specify other equipment (e.g., Noise Cancelling Headphones)"
                                className="w-full rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-head)' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-5 flex justify-end gap-3" style={{ backgroundColor: 'rgba(17, 19, 24, 0.5)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <button
                        onClick={() => { resetForm(); onClose(); }}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#282e39]"
                        style={{ color: 'var(--text-body)' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#2463eb] hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Employee</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
