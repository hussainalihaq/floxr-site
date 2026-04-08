'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Equipment {
    id: string
    name: string
    type: string
    serialNumber: string | null
    assetTag: string | null
    status: string
    condition: string
    purchaseDate: string | null
    purchasePrice: number | null
    notes: string | null
    assignedTo: { id: string; name: string } | null
    assignmentId: string | null
}

interface Employee {
    id: string
    firstName: string
    lastName: string
    jobTitle: string | null
}

interface EquipmentClientProps {
    equipment: Equipment[]
    employees: Employee[]
    stats: {
        total: number
        available: number
        assigned: number
        maintenance: number
    }
}

const EQUIPMENT_TYPES = [
    { value: 'LAPTOP', label: '💻 Laptop', icon: '💻' },
    { value: 'PHONE', label: '📱 Phone', icon: '📱' },
    { value: 'MONITOR', label: '🖥️ Monitor', icon: '🖥️' },
    { value: 'KEYBOARD', label: '⌨️ Keyboard', icon: '⌨️' },
    { value: 'MOUSE', label: '🖱️ Mouse', icon: '🖱️' },
    { value: 'HEADSET', label: '🎧 Headset', icon: '🎧' },
    { value: 'ACCESS_CARD', label: '🪪 Access Card', icon: '🪪' },
    { value: 'OTHER', label: '📦 Other', icon: '📦' },
]

export default function EquipmentClient({ equipment, employees, stats }: EquipmentClientProps) {
    const router = useRouter()
    const [showAddModal, setShowAddModal] = useState(false)
    const [showAssignModal, setShowAssignModal] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [filter, setFilter] = useState<'all' | 'AVAILABLE' | 'ASSIGNED'>('all')

    // Add equipment form
    const [newEquipment, setNewEquipment] = useState({
        name: '',
        type: 'LAPTOP',
        serialNumber: '',
        assetTag: '',
        condition: 'NEW',
        notes: '',
    })

    // Assign form
    const [selectedEmployee, setSelectedEmployee] = useState('')

    const handleAddEquipment = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/equipment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEquipment),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setMessage({ type: 'success', text: 'Equipment added!' })
            setShowAddModal(false)
            setNewEquipment({ name: '', type: 'LAPTOP', serialNumber: '', assetTag: '', condition: 'NEW', notes: '' })
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const handleAssign = async (equipmentId: string) => {
        if (!selectedEmployee) return
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch(`/api/equipment/${equipmentId}/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId: selectedEmployee }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setMessage({ type: 'success', text: data.message })
            setShowAssignModal(null)
            setSelectedEmployee('')
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const handleReturn = async (equipmentId: string) => {
        if (!confirm('Return this equipment?')) return
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch(`/api/equipment/${equipmentId}/assign`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ returnReason: 'RETURNED' }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setMessage({ type: 'success', text: 'Equipment returned' })
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const filteredEquipment = filter === 'all'
        ? equipment
        : equipment.filter(e => e.status === filter)

    const getTypeIcon = (type: string) => {
        return EQUIPMENT_TYPES.find(t => t.value === type)?.icon || '📦'
    }

    return (
        <div className="dashboard-page equipment-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Equipment</h1>
                    <p className="page-subtitle">Track and manage company equipment</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary">
                    + Add Equipment
                </button>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon blue"><span>📦</span></div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Total Items</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green"><span>✅</span></div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.available}</span>
                        <span className="stat-label">Available</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple"><span>👤</span></div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.assigned}</span>
                        <span className="stat-label">Assigned</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon yellow"><span>🔧</span></div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.maintenance}</span>
                        <span className="stat-label">Maintenance</span>
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`message ${message.type}`}>{message.text}</div>
            )}

            {/* Filters */}
            <div className="table-filters">
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({equipment.length})
                    </button>
                    <button
                        className={`filter-tab ${filter === 'AVAILABLE' ? 'active' : ''}`}
                        onClick={() => setFilter('AVAILABLE')}
                    >
                        Available ({stats.available})
                    </button>
                    <button
                        className={`filter-tab ${filter === 'ASSIGNED' ? 'active' : ''}`}
                        onClick={() => setFilter('ASSIGNED')}
                    >
                        Assigned ({stats.assigned})
                    </button>
                </div>
            </div>

            {/* Equipment Table */}
            <div className="table-section">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Equipment</th>
                                <th>Serial / Asset #</th>
                                <th>Status</th>
                                <th>Condition</th>
                                <th>Assigned To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipment.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">📦</span>
                                            <h3>No equipment found</h3>
                                            <p>Add your first equipment item</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredEquipment.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="equipment-info">
                                            <span className="equipment-icon">{getTypeIcon(item.type)}</span>
                                            <div>
                                                <span className="equipment-name">{item.name}</span>
                                                <span className="equipment-type">{item.type}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="serial-info">
                                            {item.serialNumber && <span>SN: {item.serialNumber}</span>}
                                            {item.assetTag && <span>Asset: {item.assetTag}</span>}
                                            {!item.serialNumber && !item.assetTag && <span className="text-muted">—</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`condition-badge ${item.condition.toLowerCase()}`}>
                                            {item.condition}
                                        </span>
                                    </td>
                                    <td>
                                        {item.assignedTo ? (
                                            <span className="assigned-to">{item.assignedTo.name}</span>
                                        ) : (
                                            <span className="text-muted">Unassigned</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {item.status === 'AVAILABLE' ? (
                                                <button
                                                    onClick={() => setShowAssignModal(item.id)}
                                                    className="btn-action primary"
                                                >
                                                    Assign
                                                </button>
                                            ) : item.status === 'ASSIGNED' ? (
                                                <button
                                                    onClick={() => handleReturn(item.id)}
                                                    className="btn-action warning"
                                                    disabled={loading}
                                                >
                                                    Return
                                                </button>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Equipment Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add Equipment</h2>
                            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleAddEquipment}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    value={newEquipment.name}
                                    onChange={e => setNewEquipment({ ...newEquipment, name: e.target.value })}
                                    placeholder="MacBook Pro 14 inch"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select
                                        value={newEquipment.type}
                                        onChange={e => setNewEquipment({ ...newEquipment, type: e.target.value })}
                                        className="form-input"
                                    >
                                        {EQUIPMENT_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Condition</label>
                                    <select
                                        value={newEquipment.condition}
                                        onChange={e => setNewEquipment({ ...newEquipment, condition: e.target.value })}
                                        className="form-input"
                                    >
                                        <option value="NEW">New</option>
                                        <option value="GOOD">Good</option>
                                        <option value="FAIR">Fair</option>
                                        <option value="POOR">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Serial Number</label>
                                    <input
                                        type="text"
                                        value={newEquipment.serialNumber}
                                        onChange={e => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
                                        placeholder="SN12345"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Asset Tag</label>
                                    <input
                                        type="text"
                                        value={newEquipment.assetTag}
                                        onChange={e => setNewEquipment({ ...newEquipment, assetTag: e.target.value })}
                                        placeholder="FLOXR-001"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    value={newEquipment.notes}
                                    onChange={e => setNewEquipment({ ...newEquipment, notes: e.target.value })}
                                    placeholder="Additional notes..."
                                    className="form-input"
                                    rows={2}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="btn-primary">
                                    {loading ? 'Adding...' : 'Add Equipment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Modal */}
            {showAssignModal && (
                <div className="modal-overlay" onClick={() => setShowAssignModal(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Assign Equipment</h2>
                            <button className="modal-close" onClick={() => setShowAssignModal(null)}>×</button>
                        </div>
                        <div className="form-group">
                            <label>Select Employee *</label>
                            <select
                                value={selectedEmployee}
                                onChange={e => setSelectedEmployee(e.target.value)}
                                className="form-input"
                            >
                                <option value="">Choose an employee...</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName} {emp.jobTitle ? `(${emp.jobTitle})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setShowAssignModal(null)} className="btn-secondary">
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAssign(showAssignModal)}
                                disabled={loading || !selectedEmployee}
                                className="btn-primary"
                            >
                                {loading ? 'Assigning...' : 'Assign'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
