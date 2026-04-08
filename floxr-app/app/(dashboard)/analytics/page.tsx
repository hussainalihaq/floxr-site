'use client'

import { useState, useRef } from 'react'
import {
    Users, Handshake, Timer, Smile, Calendar, Download, ChevronDown,
    MoreHorizontal, TrendingUp, ArrowDown
} from 'lucide-react'

// Types
interface StatMetric {
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    comparisonText: string
    icon: React.ComponentType<{ className?: string }>
    iconColorClass: string
}

interface PipelineStage {
    stage: string
    count: number
    width: string
    colorClass: string
}

interface DepartmentData {
    name: string
    value: number
    fill: string
}

interface AttendanceData {
    department: string
    rate: number
    isHighPerformer?: boolean
}

interface OnboardingData {
    month: string
    completed: number
}

// Constants
const METRICS: StatMetric[] = [
    {
        title: "Total Headcount",
        value: "4,258",
        change: "8.4%",
        changeType: "positive",
        comparisonText: "vs 3,928 last month",
        icon: Users,
        iconColorClass: "text-[#2463eb]"
    },
    {
        title: "Retention Rate",
        value: "94%",
        change: "2.1%",
        changeType: "positive",
        comparisonText: "Top 5% in industry",
        icon: Handshake,
        iconColorClass: "text-emerald-500"
    },
    {
        title: "Avg. Time to Hire",
        value: "18 days",
        change: "4 days",
        changeType: "positive",
        comparisonText: "Target: 21 days",
        icon: Timer,
        iconColorClass: "text-orange-500"
    },
    {
        title: "Employee Happiness",
        value: "4.8/5",
        change: "",
        changeType: "neutral",
        comparisonText: "Based on recent eNPS",
        icon: Smile,
        iconColorClass: "text-purple-500"
    }
]

const PIPELINE_DATA: PipelineStage[] = [
    { stage: "Applied", count: 1240, width: "100%", colorClass: "bg-blue-900/40 hover:bg-blue-900/60" },
    { stage: "Screening", count: 840, width: "75%", colorClass: "bg-blue-800/50 hover:bg-blue-800/70" },
    { stage: "Interview", count: 420, width: "50%", colorClass: "bg-blue-700/60 hover:bg-blue-700/80" },
    { stage: "Offer Sent", count: 125, width: "30%", colorClass: "bg-blue-600/70 hover:bg-blue-600/90" },
    { stage: "Hired", count: 98, width: "20%", colorClass: "bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]" }
]

const DEPARTMENT_DATA: DepartmentData[] = [
    { name: 'Engineering', value: 40, fill: '#2463eb' },
    { name: 'Sales', value: 25, fill: '#10b981' },
    { name: 'Marketing', value: 20, fill: '#f59e0b' },
    { name: 'HR & Ops', value: 15, fill: '#8b5cf6' },
]

const ONBOARDING_DATA: OnboardingData[] = [
    { month: 'Jan', completed: 20 },
    { month: 'Feb', completed: 35 },
    { month: 'Mar', completed: 45 },
    { month: 'Apr', completed: 70 },
    { month: 'May', completed: 65 },
    { month: 'Jun', completed: 90 },
]

const ATTENDANCE_DATA: AttendanceData[] = [
    { department: 'Eng', rate: 92 },
    { department: 'Sales', rate: 85 },
    { department: 'Marketing', rate: 96 },
    { department: 'Product', rate: 88 },
    { department: 'Support', rate: 98, isHighPerformer: true },
]

// Stat Card Component with glow effect
const StatCard = ({ title, value, change, changeType, comparisonText, icon: Icon, iconColorClass }: StatMetric) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        setOpacity(1)
    }

    const getGlowColor = (classes: string) => {
        if (classes.includes('2463eb') || classes.includes('blue')) return 'rgba(36, 99, 235, 0.15)'
        if (classes.includes('emerald')) return 'rgba(16, 185, 129, 0.15)'
        if (classes.includes('orange')) return 'rgba(249, 115, 22, 0.15)'
        if (classes.includes('purple')) return 'rgba(168, 85, 247, 0.15)'
        return 'rgba(255, 255, 255, 0.1)'
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setOpacity(0)}
            className="flex flex-col gap-4 rounded-xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-sm relative overflow-hidden group transition-all hover:border-[var(--border-default)]"
        >
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, ${getGlowColor(iconColorClass)}, transparent)`,
                    opacity: opacity,
                }}
            />
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className={`w-20 h-20 ${iconColorClass}`} />
            </div>

            <div className="flex justify-between items-start z-10 relative">
                <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{title}</p>
            </div>

            <div className="flex items-baseline gap-2 z-10 relative">
                <p className="text-[var(--text-primary)] text-3xl font-bold">{value}</p>

                {change && (
                    <div className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${changeType === 'positive'
                        ? 'text-emerald-500 bg-emerald-500/10'
                        : 'text-red-500 bg-red-500/10'
                        }`}>
                        {changeType === 'positive' && title !== 'Avg. Time to Hire' && (
                            <TrendingUp className="w-3.5 h-3.5 mr-1" />
                        )}
                        {title === 'Avg. Time to Hire' && changeType === 'positive' && (
                            <ArrowDown className="w-3.5 h-3.5 mr-1" />
                        )}
                        <span>{change}</span>
                    </div>
                )}

                {title === 'Employee Happiness' && (
                    <div className="flex items-center text-yellow-500 bg-yellow-500/10 p-1 rounded">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </div>
                )}
            </div>

            <p className="text-[var(--text-muted)] text-xs z-10 relative">{comparisonText}</p>
        </div>
    )
}

// Simple Onboarding Area Chart (CSS-based)
const OnboardingChart = () => {
    const maxValue = Math.max(...ONBOARDING_DATA.map(d => d.completed))

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 flex items-end justify-between gap-2 px-4 relative">
                {/* Background grid lines */}
                <div className="absolute inset-x-4 inset-y-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map((_, i) => (
                        <div key={i} className="border-b border-white/5" />
                    ))}
                </div>

                {/* Bars with gradient effect */}
                {ONBOARDING_DATA.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 relative z-10">
                        <div className="w-full h-64 flex items-end justify-center">
                            <div
                                className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#2463eb]/30 to-[#2463eb] transition-all hover:from-[#2463eb]/50 hover:to-[#3b82f6] shadow-[0_0_20px_rgba(36,99,235,0.3)]"
                                style={{ height: `${(item.completed / maxValue) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-4 pt-4">
                {ONBOARDING_DATA.map((item, index) => (
                    <div key={index} className="flex-1 text-center">
                        <span className="text-xs text-slate-500">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Department Donut Chart (CSS-based)
const DepartmentChart = () => {
    const total = DEPARTMENT_DATA.reduce((sum, d) => sum + d.value, 0)
    let cumulativePercent = 0

    // Create conic gradient
    const gradientStops = DEPARTMENT_DATA.map(dept => {
        const start = cumulativePercent
        cumulativePercent += dept.value
        return `${dept.fill} ${start}% ${cumulativePercent}%`
    }).join(', ')

    return (
        <div className="w-full h-48 relative flex items-center justify-center">
            <div
                className="w-40 h-40 rounded-full relative"
                style={{
                    background: `conic-gradient(${gradientStops})`,
                }}
            >
                {/* Inner circle to create donut effect */}
                <div className="absolute inset-4 rounded-full bg-[var(--bg-elevated)] flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">Total</span>
                    <span className="text-sm text-[var(--text-muted)]">4,258</span>
                </div>
            </div>
        </div>
    )
}

// Hiring Pipeline Funnel
const PipelineFunnel = () => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center gap-3 w-full">
            {PIPELINE_DATA.map((item, index) => (
                <div key={index} className="w-full max-w-md relative group cursor-pointer">
                    <div
                        className={`h-10 rounded mx-auto flex items-center justify-between px-4 transition-colors ${item.colorClass}`}
                        style={{ width: item.width }}
                    >
                        <span className="text-xs font-medium text-white whitespace-nowrap">{item.stage}</span>
                        <span className="text-xs font-bold text-white">{item.count}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Attendance Bar Chart
const AttendanceChart = () => {
    return (
        <div className="flex-1 flex items-end justify-between gap-4 pt-4 px-2 h-full">
            {ATTENDANCE_DATA.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 w-full group h-full justify-end">
                    <div className="relative w-full bg-slate-800 rounded-t-lg h-48 flex items-end overflow-hidden">
                        <div
                            className={`w-full transition-all rounded-t-lg relative ${item.isHighPerformer
                                ? "bg-emerald-500/80 group-hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                : "bg-[#2463eb]/80 group-hover:bg-[#2463eb]"
                                }`}
                            style={{ height: `${item.rate}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                {item.rate}%
                            </div>
                        </div>
                    </div>
                    <span className={`text-xs font-medium ${item.isHighPerformer ? "text-emerald-500 font-bold" : "text-slate-500"}`}>
                        {item.department}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('Last 6 Months')
    const [showDateDropdown, setShowDateDropdown] = useState(false)
    const [exporting, setExporting] = useState(false)

    const dateRangeOptions = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'All Time']

    const handleExportData = async () => {
        setExporting(true)
        try {
            // Create CSV content from analytics data
            const csvContent = [
                'HR Analytics Export',
                `Date Range: ${dateRange}`,
                `Export Date: ${new Date().toLocaleDateString()}`,
                '',
                'Key Metrics',
                'Metric,Value,Change,Comparison',
                ...METRICS.map(m => `${m.title},${m.value},${m.change || 'N/A'},${m.comparisonText}`),
                '',
                'Department Distribution',
                'Department,Percentage',
                ...DEPARTMENT_DATA.map(d => `${d.name},${d.value}%`),
                '',
                'Hiring Pipeline',
                'Stage,Count',
                ...PIPELINE_DATA.map(p => `${p.stage},${p.count}`),
                '',
                'Attendance Rates',
                'Department,Rate',
                ...ATTENDANCE_DATA.map(a => `${a.department},${a.rate}%`),
            ].join('\n')

            const blob = new Blob([csvContent], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `hr_analytics_${dateRange.toLowerCase().replace(/\s/g, '_')}.csv`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Export failed:', error)
        } finally {
            setExporting(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 bg-[var(--bg-surface)]/80 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
                    <div className="flex min-w-72 flex-col gap-1">
                        <h2 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">
                            HR Analytics & Insights
                        </h2>
                        <p className="text-[var(--text-muted)] text-sm">
                            Real-time data visualization and workforce metrics.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Date Range Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDateDropdown(!showDateDropdown)}
                                className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-default)] transition-all"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>{dateRange}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showDateDropdown && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowDateDropdown(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg shadow-xl z-20 py-2">
                                        {dateRangeOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setDateRange(option)
                                                    setShowDateDropdown(false)
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--bg-default)] transition-colors ${dateRange === option ? 'text-[#2463eb] font-medium' : 'text-[var(--text-secondary)]'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={handleExportData}
                            disabled={exporting}
                            className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-[#2463eb] hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                        >
                            <Download className={`w-4 h-4 ${exporting ? 'animate-bounce' : ''}`} />
                            <span className="whitespace-nowrap">{exporting ? 'Exporting...' : 'Export Data'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">

                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {METRICS.map((metric, index) => (
                            <StatCard key={index} {...metric} />
                        ))}
                    </div>

                    {/* Middle Row: Area Chart & Pie Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Onboarding Trends */}
                        <div className="lg:col-span-2 flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden h-[400px]">
                            <div className="px-6 py-5 border-b border-[var(--border-subtle)] flex justify-between items-center">
                                <div>
                                    <h3 className="text-[var(--text-primary)] text-lg font-bold">Onboarding Completion Trends</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Candidates fully onboarded over last 6 months</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="h-3 w-3 rounded-full bg-[#2463eb]"></span>
                                    <span className="text-xs text-slate-500">Completed</span>
                                </div>
                            </div>
                            <div className="flex-1 relative p-6 w-full h-full">
                                <OnboardingChart />
                            </div>
                        </div>

                        {/* Department Split */}
                        <div className="lg:col-span-1 flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden h-[400px]">
                            <div className="px-6 py-5 border-b border-[var(--border-subtle)]">
                                <h3 className="text-[var(--text-primary)] text-lg font-bold">Departmental Split</h3>
                                <p className="text-[var(--text-muted)] text-sm">Headcount distribution</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-6">
                                <DepartmentChart />
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 w-full px-4">
                                    {DEPARTMENT_DATA.map((dept, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.fill }}></span>
                                            <span className="text-xs text-slate-400">{dept.name} ({dept.value}%)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Pipeline & Attendance */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Hiring Pipeline */}
                        <div className="flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm p-6 h-[400px]">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-[var(--text-primary)] text-lg font-bold">Hiring Pipeline</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Conversion rates by stage</p>
                                </div>
                                <button className="text-slate-500 hover:text-[#2463eb] transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            <PipelineFunnel />
                        </div>

                        {/* Attendance Rates */}
                        <div className="flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm p-6 h-[400px]">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-[var(--text-primary)] text-lg font-bold">Attendance Rates</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Average attendance by department</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-emerald-500">High Performing</span>
                                </div>
                            </div>
                            <AttendanceChart />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
