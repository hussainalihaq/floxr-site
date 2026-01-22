'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewEmployeePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        whatsappNumber: '',
        personalEmail: '',
        jobTitle: '',
        departmentId: '',
        newDepartment: '',
        employmentType: 'FULL_TIME',
        startDate: '',
        salary: '',
        currency: 'PKR',
        taxId: '',
        taxIdType: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // If new department is specified, create it first
            let departmentId = form.departmentId
            if (form.newDepartment && !form.departmentId) {
                const deptRes = await fetch('/api/departments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: form.newDepartment }),
                })
                const deptData = await deptRes.json()
                if (deptRes.ok) {
                    departmentId = deptData.department.id
                }
            }

            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    departmentId,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create employee')
            }

            router.push('/employees')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/employees" className="text-indigo-400 hover:text-indigo-300 text-sm mb-2 inline-block">
                    ← Back to Employees
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Employee</h1>
                <p className="text-slate-400 mt-1">Fill in the details to start onboarding</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Work Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Personal Email</label>
                            <input
                                type="email"
                                name="personalEmail"
                                value={form.personalEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+92 300 1234567"
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
                            <input
                                type="tel"
                                name="whatsappNumber"
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                placeholder="Same as phone if blank"
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Job Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={form.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                            <input
                                type="text"
                                name="newDepartment"
                                value={form.newDepartment}
                                onChange={handleChange}
                                placeholder="e.g. Engineering"
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Employment Type</label>
                            <select
                                name="employmentType"
                                value={form.employmentType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            >
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACT">Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Compensation & Compliance */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Compensation & Compliance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Salary</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange}
                                    placeholder="Monthly salary"
                                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                                <select
                                    name="currency"
                                    value={form.currency}
                                    onChange={handleChange}
                                    className="w-24 px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="PKR">PKR</option>
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="AED">AED</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Tax ID</label>
                            <div className="flex gap-2">
                                <select
                                    name="taxIdType"
                                    value={form.taxIdType}
                                    onChange={handleChange}
                                    className="w-28 px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="">Type</option>
                                    <option value="NTN">NTN</option>
                                    <option value="CNIC">CNIC</option>
                                    <option value="PAN">PAN</option>
                                    <option value="AADHAAR">Aadhaar</option>
                                </select>
                                <input
                                    type="text"
                                    name="taxId"
                                    value={form.taxId}
                                    onChange={handleChange}
                                    placeholder="Tax ID number"
                                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/employees"
                        className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    )
}
