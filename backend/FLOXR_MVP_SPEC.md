# FLOXR MVP - COMPLETE BACKEND FEATURE SPECIFICATION

## PROJECT CONTEXT
Building a global employee onboarding automation SaaS platform. Target markets: North America (primary), Pakistan, Middle East, and worldwide. Must support companies from 10 to 10,000+ employees with multi-tenant architecture.

---

## 1. CORE DATA MODELS & RELATIONSHIPS

### Companies/Organizations
- Company profile (name, industry, size, location)
- Subscription plan (Starter/Growth/Enterprise/Founding Member)
- Billing information (email, payment method, invoice history)
- Regional settings (country, timezone, currency, language)
- Feature flags per plan (API access, custom integrations, SSO, etc.)
- Trial period tracking (start date, end date, trial status)
- Account status (active, suspended, churned, trial)
- Usage metrics (employees onboarded this month, storage used, API calls)

### Users (HR Admins & Managers)
- User authentication (email/password, Google OAuth, SSO for Enterprise)
- User roles & permissions (Owner, Admin, Manager, Member, Viewer)
- Multi-company access (for agencies managing multiple clients)
- Profile information (name, avatar, phone, department)
- Language preference (English, Arabic, Urdu for Pakistan/ME)
- Timezone for scheduling
- Activity logs (last login, actions performed)
- Email notification preferences (instant, daily digest, weekly)
- WhatsApp notification opt-in (for Pakistan/ME markets)

### New Hires (Employees Being Onboarded)
- Personal information (name, email, personal email, phone)
- Employment details (job title, department, start date, employee ID)
- Employment type (full-time, part-time, contractor, intern)
- Work arrangement (remote, office, hybrid + location)
- Manager assignment (who oversees this hire)
- Onboarding status (pending, in progress, completed, failed, cancelled)
- Progress tracking (completion percentage, tasks completed vs total)
- Timeline tracking (date added, onboarding started, completed)
- Custom fields per company (visa status, nationality, emergency contact, etc.)
- Documents to collect (I-9, tax forms, contracts, bank details)

### Onboarding Tasks (Automation Steps)
- Task type (create Slack account, create Google account, send email, collect document, assign equipment, schedule meeting)
- Execution order/sequence (some tasks depend on others)
- Task status (pending, in progress, completed, failed, skipped)
- Retry logic (auto-retry failed tasks, max attempts)
- Error logging (what failed, why, error message)
- Execution timestamps (queued at, started at, completed at)
- Task assignment (automated vs manual, who's responsible)
- Conditional tasks (only run if certain conditions met)

### Workflow Templates
- Pre-built templates per role (Engineer, Sales, HR, Executive)
- Custom workflow builder (drag-and-drop task sequencing)
- Template marketplace (share templates between companies - Enterprise only)
- Conditional branching (if remote, skip office tour; if contractor, skip benefits)
- Time-based triggers (send survey 7 days after start, schedule check-in at 30 days)
- Template versioning (track changes, rollback)

### Integrations (Connected Services)
- Integration type (Slack, Google Workspace, Microsoft 365, email, future: Notion, Asana, BambooHR)
- Authentication credentials (OAuth tokens, API keys, encrypted storage)
- Connection status (connected, disconnected, expired, error)
- Scope/permissions granted
- Last sync timestamp
- Integration health monitoring (detect when token expires or API fails)
- Webhook endpoints (for real-time updates from external services)

### Documents & Files
- Document type (contract, policy, handbook, I-9, tax form)
- File storage (PDFs, Word docs, images)
- Document templates (populate with hire data: name, start date, salary)
- Signature requirements (which docs need e-signature)
- Document status (pending, signed, rejected, expired)
- Version control (track document updates)
- Access control (who can view/download each document)
- Compliance tracking (ensure required docs collected per country)

### Email Templates
- Template categories (welcome, pre-boarding, first day, manager notification)
- Personalization variables ({{name}}, {{start_date}}, {{manager_name}})
- Multi-language support (English, Arabic, Urdu)
- HTML email builder (drag-and-drop editor)
- Email sequences (drip campaigns: Day -7, Day 0, Day 1, Day 30, Day 90)
- A/B testing (test subject lines, content)
- Analytics (open rates, click rates)

### Analytics & Reporting
- Dashboard metrics (total hires, completion rate, average time-to-onboard)
- Time-series data (hires per month, onboarding trends)
- Task success/failure rates
- Integration health status
- User activity logs (audit trail for compliance)
- Export capabilities (CSV, PDF reports for management)
- Custom reports (filter by department, date range, status)
- Benchmarking (compare to industry averages)

---

## 2. AUTHENTICATION & AUTHORIZATION

### Authentication Methods
- Email/password (with strong password requirements)
- Magic link login (passwordless for simplicity)
- Google OAuth (most HR teams use Google)
- SSO/SAML (Enterprise plan only: Okta, Azure AD, OneLogin)
- Two-factor authentication (optional for security-conscious customers)
- Session management (token expiration, refresh tokens)
- Device tracking (see where users logged in from)

### Role-Based Access Control (RBAC)
- **Owner**: Full access, billing, delete company
- **Admin**: Manage users, integrations, workflows, view all data
- **Manager**: View their team's hires, approve tasks, limited settings access
- **Member**: Add new hires, view status, cannot change settings
- **Viewer**: Read-only access (for executives, auditors)

### Permissions System
- Granular permissions (can_add_hires, can_edit_workflows, can_view_analytics)
- Team-based access (users only see their department's hires)
- Data isolation (companies cannot see each other's data)
- API key management (generate/revoke API keys for integrations)

### Security Features
- Row-level security (users only query their company's data)
- Encryption at rest (sensitive data like API keys, SSNs)
- Encryption in transit (HTTPS only)
- Rate limiting (prevent API abuse)
- IP whitelisting (Enterprise: restrict access to office IPs)
- Audit logs (track who did what, when)
- GDPR compliance (data export, right to deletion)
- SOC 2 Type II compliance tracking (for Enterprise customers)

---

## 3. INTEGRATION CAPABILITIES

### Slack Integration
- OAuth flow (company authorizes Floxr to access Slack)
- Auto-invite new hires to Slack workspace
- Add to default channels (#general, #announcements, team channel)
- Send welcome DM from HR bot
- Create user groups automatically (by department)
- Sync user profile (name, title, department)
- Handle errors (email already in Slack, workspace full)

### Google Workspace Integration
- OAuth flow (authorize Google Workspace Admin SDK)
- Create Google account (email address, password, recovery email)
- Add to organizational unit (by department)
- Assign Google groups (by role: all-engineers@, all-sales@)
- Provision licenses (Gmail, Drive, Calendar)
- Set up email aliases
- Configure email forwarding rules
- Calendar invites (first day agenda, team intro meeting)
- Drive folder creation (personal folder with welcome docs)

### Microsoft 365 Integration (Future)
- Create Office 365 account
- Assign licenses (Office apps, Teams, OneDrive)
- Add to Teams channels
- SharePoint access provisioning

### Email Service Integration
- SMTP for transactional emails (welcome, notifications)
- Support for SendGrid, Mailgun, Resend, AWS SES
- Email deliverability monitoring
- Bounce/spam complaint handling
- Unsubscribe management

### Webhook System
- Outbound webhooks (notify external systems when hire added/completed)
- Inbound webhooks (receive updates from Slack, Google)
- Webhook signature verification (security)
- Retry logic for failed webhook deliveries
- Webhook logs (debug failed calls)

### API for Third-Party Integrations
- RESTful API (JSON responses)
- API documentation (OpenAPI/Swagger spec)
- API versioning (v1, v2 for backward compatibility)
- Rate limiting per API key
- Pagination for list endpoints
- Filtering, sorting, search
- Bulk operations (add 50 hires at once via CSV import)

---

## 4. AUTOMATION & WORKFLOW ENGINE

### Workflow Execution
- Task queue system (process tasks asynchronously)
- Parallel execution (run independent tasks simultaneously)
- Sequential execution (wait for Slack before Google)
- Retry failed tasks (exponential backoff)
- Task timeout handling (cancel stuck tasks after 5 minutes)
- Priority queue (urgent hires get processed first)

### Conditional Logic
- If/then rules (if location = "Pakistan", skip US tax forms)
- Boolean operators (AND, OR, NOT)
- Dynamic task generation (create tasks based on hire data)
- Skip tasks based on conditions (contractor skips benefits enrollment)

### Scheduling & Time-Based Triggers
- Schedule tasks for specific dates (send welcome email 7 days before start date)
- Recurring tasks (send satisfaction survey every 30 days)
- Timezone-aware scheduling (send at 9am in hire's timezone)
- Calendar integration (check manager availability, avoid holidays)

### Error Handling & Recovery
- Automatic retries (3 attempts with 5-minute delays)
- Fallback actions (if Slack fails, send email instead)
- Manual intervention prompts (notify admin when task fails)
- Rollback capability (undo onboarding if hire cancels)

### Notifications & Alerts
- In-app notifications (bell icon with unread count)
- Email notifications (task completed, errors, weekly summary)
- SMS/WhatsApp notifications (for Pakistan/ME markets via Twilio)
- Slack notifications (post to company's Slack when hire completes)
- Manager notifications (your new hire starts tomorrow)

---

## 5. REGIONAL & LOCALIZATION FEATURES

### Multi-Currency Support
- Display pricing in local currency (USD, PKR, SAR, AED, EUR, GBP)
- Currency conversion (real-time exchange rates)
- Payment processing in local currency (via Stripe)

### Multi-Language Support (i18n)
- Interface languages: English, Arabic (RTL), Urdu
- Email templates in multiple languages
- Auto-detect browser language
- User preference override

### Regional Compliance
- Pakistan: NTN collection, EOBI forms, local tax documents
- UAE/Saudi: Labor card tracking, visa sponsorship workflows
- USA: I-9 verification, W-4 tax forms, state-specific requirements
- EU: GDPR compliance, right to erasure, data portability
- Canada: SIN collection, provincial tax forms

### Country-Specific Workflows
- Different onboarding steps per country
- Compliance document collection based on nationality
- Local holiday calendars (don't start onboarding on Eid, Christmas)
- Working hours by timezone (send emails during business hours)

### Regional Pricing
- PPP-adjusted pricing (Pakistan pays 60% less than US)
- Special emerging market discounts
- Annual billing required for discounted regions
- Transparent regional pricing (no hidden "contact sales")

---

## 6. BILLING & SUBSCRIPTION MANAGEMENT

### Subscription Plans
- Plan tiers (Starter, Growth, Enterprise, Founding Member)
- Feature gating (API access only on Growth+, SSO only on Enterprise)
- Usage tracking (count active employees per month)
- Overage handling (charge extra if exceed plan limits)

### Payment Processing
- Stripe integration (card payments, ACH, SEPA)
- Invoice generation (PDF invoices via email)
- Payment method management (update card, add backup payment)
- Failed payment handling (retry, dunning emails, grace period)
- Refund processing (prorated refunds for cancellations)

### Billing Cycles
- Monthly billing (charge on same day each month)
- Annual billing (discount for annual prepay)
- Proration (charge/credit when upgrading/downgrading mid-cycle)
- Billing history (view past invoices)

### Usage Metering
- Track employees onboarded per month
- Count active users (admins using platform)
- API call tracking (for rate limiting)
- Storage usage monitoring
- Usage-based pricing calculations

### Trial Management
- 14-day free trial (no credit card required)
- Trial expiration reminders (7 days left, 1 day left)
- Smooth transition from trial to paid
- Trial extension for special cases

---

## 7. COMPLIANCE & SECURITY

### Data Privacy
- GDPR compliance (EU users)
- CCPA compliance (California users)
- Data residency options (store EU data in EU servers - Enterprise)
- Data retention policies (delete after X years)
- Right to erasure (users can request data deletion)
- Data export (download all company data as JSON/CSV)

### Audit & Compliance
- Activity logs (who did what, when)
- Change tracking (see what was modified, previous values)
- Compliance reports (prove you onboarded correctly)
- Document signing audit trail (e-signature timestamps)
- SOC 2 Type II certification tracking

### Security Measures
- Penetration testing (annual security audits)
- Vulnerability scanning (automated tools)
- Bug bounty program (reward security researchers)
- Incident response plan (breach notification procedures)
- Data backup & recovery (daily backups, point-in-time restore)
- Disaster recovery plan (RTO, RPO targets)

---

## 8. ANALYTICS & INSIGHTS

### Dashboard Metrics
- Total hires (all time, this month, this quarter)
- Onboarding completion rate (% completed vs started)
- Average time to onboard (days from added to completed)
- Task success rate (% tasks completed without errors)
- Integration health (uptime, error rates)
- User engagement (logins per week, active users)

### Trends & Reports
- Hires over time (line chart: monthly trend)
- Completion funnel (how many drop off at each stage)
- Department breakdown (which teams hire most)
- Geography breakdown (hires by country/city)
- Time-to-productivity (how fast hires become effective)
- Manager performance (which managers onboard fastest)

### Export & Sharing
- Export data as CSV, Excel, PDF
- Schedule automated reports (email weekly summary to execs)
- Share reports via link (public or password-protected)
- Custom report builder (choose metrics, filters, date range)

---

## 9. ADMIN & SUPPORT FEATURES

### Company Settings
- Company profile editing
- Logo upload (for emails, documents)
- Brand colors (customize email templates)
- Custom domain (onboarding.yourcompany.com - Enterprise)
- Email sender configuration (from: hr@yourcompany.com)

### User Management
- Invite team members (send invite email)
- Bulk user import (CSV upload)
- User deactivation (keep data, revoke access)
- User deletion (GDPR compliance)
- Role changes (promote to admin, demote to viewer)

### Integration Management
- View connected services
- Reconnect expired integrations
- Test connection (verify credentials work)
- Disconnect integration (revoke access)
- View integration logs (debug issues)

### Support & Help
- In-app help docs (knowledge base)
- Support ticket system (email support, priority tiers)
- Live chat (for Growth+ plans)
- Status page (is Floxr experiencing issues?)
- Changelog (what's new in latest version)

---

## 10. NOTIFICATIONS & COMMUNICATION

### Notification Types
- New hire added (notify assigned manager)
- Onboarding started (notify HR admin)
- Onboarding completed (notify HR + manager)
- Task failed (notify admin with error details)
- Integration disconnected (alert admin immediately)
- Trial expiring soon (7 days, 3 days, 1 day)
- Payment failed (notify billing contact)
- New feature released (product updates)

### Notification Channels
- In-app notifications (red badge, notification center)
- Email notifications (with digest option)
- SMS notifications (critical alerts only)
- WhatsApp notifications (for Pakistan/ME markets)
- Slack notifications (post to company's Slack)

### Notification Preferences
- Per-user settings (choose which notifications to receive)
- Per-channel settings (email vs Slack vs SMS)
- Quiet hours (don't notify between 10pm-8am)
- Digest mode (bundle notifications into daily summary)

---

## 11. PERFORMANCE & SCALABILITY

### Performance Requirements
- API response time < 200ms (p95)
- Dashboard load time < 2 seconds
- Support 10,000 concurrent users
- Process 1,000 onboarding tasks simultaneously
- Handle 1 million API requests/day

### Scalability Considerations
- Horizontal scaling (add more servers as load increases)
- Database optimization (indexes, query optimization)
- Caching strategy (Redis for frequently accessed data)
- CDN for static assets (images, CSS, JS)
- Background job processing (task queue with workers)
- Rate limiting (prevent abuse, ensure fair usage)

### Monitoring & Alerting
- Uptime monitoring (99.9% SLA for Enterprise)
- Error tracking (Sentry for exception monitoring)
- Performance monitoring (track slow queries, API endpoints)
- Infrastructure alerts (high CPU, low disk space)
- User behavior analytics (how people use the product)

---

## 12. FUTURE-PROOFING & EXTENSIBILITY

### API-First Architecture
- All features accessible via API
- Public API documentation
- Webhooks for event-driven integrations
- GraphQL endpoint (future: more flexible queries)

### Marketplace & Integrations
- Integration marketplace (browse & install integrations)
- Custom integration builder (no-code connector tool)
- Community integrations (users can build & share)

### Advanced Features (Post-MVP)
- AI-powered recommendations (suggest optimal workflows)
- Predictive analytics (predict time-to-productivity)
- Chatbot assistant (answer HR questions)
- Mobile app (iOS, Android for managers on-the-go)
- Offboarding automation (reverse of onboarding)
- Equipment tracking (assign laptops, return on exit)
- Background checks integration (Checkr, Sterling)
- Video onboarding (record welcome videos)

---

## TECHNICAL REQUIREMENTS

### Backend Stack
- RESTful API architecture
- Database: PostgreSQL with proper indexing
- Authentication: JWT tokens with refresh mechanism
- File storage: Cloud storage (S3, GCS, or Supabase Storage)
- Task queue: Background job processor
- Real-time updates: WebSocket or Server-Sent Events
- Caching: In-memory cache for performance

### Data Relationships
- Companies → Users (one-to-many)
- Companies → New Hires (one-to-many)
- New Hires → Onboarding Tasks (one-to-many)
- Companies → Integrations (one-to-many)
- Companies → Workflow Templates (one-to-many)
- Users → Activity Logs (one-to-many)

### API Endpoints Needed
- Auth: `POST /auth/login`, `/auth/register`, `/auth/logout`
- Companies: `GET/PUT /companies/:id`
- Users: `GET/POST/PUT/DELETE /users`
- New Hires: `GET/POST/PUT/DELETE /hires`
- Onboarding: `POST /hires/:id/start`, `GET /hires/:id/status`
- Integrations: `GET/POST/DELETE /integrations`
- Workflows: `GET/POST/PUT/DELETE /workflows`
- Analytics: `GET /analytics/dashboard`, `/analytics/reports`
- Webhooks: `POST /webhooks/:service`

---

## SUCCESS CRITERIA

The backend must support:

- ✅ 10,000+ companies without performance degradation
- ✅ Multi-tenant with complete data isolation
- ✅ Global reach (Pakistan, US, Middle East, Europe)
- ✅ 99.9% uptime SLA
- ✅ Sub-200ms API response times
- ✅ Horizontal scalability (add servers as needed)
- ✅ GDPR, SOC 2, CCPA compliant
- ✅ Extensible (easy to add new integrations)
- ✅ Developer-friendly API (clear docs, consistent design)
