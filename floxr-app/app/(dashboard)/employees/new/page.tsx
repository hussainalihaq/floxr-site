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
        <div className="new-employee-page">
            {/* Header */}
            <div className="page-header">
                <Link href="/employees" className="back-link">
                    ← Back to Employees
                </Link>
                <h1 className="page-title">Add New Employee</h1>
                <p className="page-subtitle">Fill in the details to start onboarding</p>
            </div>

            <form onSubmit={handleSubmit} className="employee-form">
                {/* Basic Info */}
                <div className="form-section">
                    <h2 className="section-title">Basic Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="John"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Work Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="john@company.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Personal Email</label>
                            <input
                                type="email"
                                name="personalEmail"
                                value={form.personalEmail}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="john@gmail.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="form-section">
                    <h2 className="section-title">Contact Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+92 300 1234567"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">WhatsApp Number</label>
                            <input
                                type="tel"
                                name="whatsappNumber"
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                placeholder="Same as phone if blank"
                                className="form-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="form-section">
                    <h2 className="section-title">Job Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Job Title</label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={form.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <input
                                type="text"
                                name="newDepartment"
                                value={form.newDepartment}
                                onChange={handleChange}
                                placeholder="e.g. Engineering"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Employment Type</label>
                            <select
                                name="employmentType"
                                value={form.employmentType}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACT">Contract</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Compensation & Compliance */}
                <div className="form-section">
                    <h2 className="section-title">Compensation & Compliance</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Salary</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange}
                                    placeholder="Monthly salary"
                                    className="form-input flex-1"
                                />
                                <select
                                    name="currency"
                                    value={form.currency}
                                    onChange={handleChange}
                                    className="form-input w-24"
                                >
                                    <option value="PKR">PKR</option>
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="AED">AED</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tax ID</label>
                            <div className="input-group">
                                <select
                                    name="taxIdType"
                                    value={form.taxIdType}
                                    onChange={handleChange}
                                    className="form-input w-28"
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
                                    className="form-input flex-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="form-actions">
                    <Link href="/employees" className="btn-secondary">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? 'Creating...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    )
}
