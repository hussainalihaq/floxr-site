# Floxr Dashboard Development Tasks

## Current Phase: Admin Console Polish

### Completed Tasks ✅
- [x] Dark theme implementation with CSS variables
- [x] Lucide icons integration (replaced Material Symbols)
- [x] Blue progress bar with animation in attendance card
- [x] Cursor glow effects on cards (radial gradient following mouse)
- [x] API endpoints for real dashboard stats (/api/dashboard/stats, workflow, activity)
- [x] Loading skeletons and error states
- [x] 'use client' directives for all dashboard components

### In Progress 🔄
- [x] Stat box glow outline effect on cursor movement
- [x] Logout button red hover effect
- [x] Dynamic user account name in header (from session)
- [x] Sidebar collapse toggle (PanelLeftClose/PanelLeft icons)
- [ ] Company ID context integration for real data

### Upcoming Tasks 📋

#### Phase 1: Admin Console
- [ ] Dashboard stats connected to real database
- [ ] Employee management CRUD
- [ ] Onboarding workflow tracking
- [ ] Payroll processing UI
- [ ] Leave request approvals
- [ ] Activity log display

#### Phase 2: Manager Console
- [ ] Team overview dashboard
- [ ] Team attendance tracking
- [ ] Leave approval workflow
- [ ] Team payroll view (read-only)

#### Phase 3: Employee Portal
- [ ] Personal dashboard
- [ ] My attendance/clock in/out
- [ ] Leave request submission
- [ ] Payslip viewing
- [ ] Document upload

---

## Technical Notes

### Database Schema (Prisma)
- Employee: status, onboardingStatus, onboardingProgress
- Timesheet: clockIn, clockOut, hoursWorked
- LeaveRequest: startDate, endDate, status, leaveType
- Payroll: grossPay, netPay, status
- ActivityLog: action, metadata, userId

### Color Palette (Dark Theme)
- bg-page: #0a0e1a
- bg-card: #1e2230
- bg-subtle: #1a1d29
- primary: #2463eb
- text-head: #ffffff
- text-body: #9ca3af
- danger: #ef4444

### Files Modified This Session
- app/globals.css - cursor glow CSS
- app/api/dashboard/stats/route.ts - NEW
- app/api/dashboard/workflow/route.ts - NEW
- app/api/dashboard/activity/route.ts - NEW
- components/dashboard/StatsSection.tsx
- components/dashboard/WorkflowSection.tsx
- components/dashboard/ActivitySection.tsx
