import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { adminLogin, adminLogout, isAdminAuthed } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin — Responses',
  robots: { index: false, follow: false },
};

type AuditRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  objective: string;
  createdAt: Date;
};
type ContactRow = {
  id: string;
  name: string;
  email: string;
  budget: string | null;
  scope: string;
  createdAt: Date;
};
type WaitlistRow = { id: string; email: string; source: string | null; createdAt: Date };

function fmt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border hairline bg-white p-6">
      <div className="text-[36px] font-bold tracking-tight leading-none mb-2">{value}</div>
      <div className="eyebrow" style={{ color: 'var(--color-mist)' }}>{label}</div>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="flex items-baseline gap-4 mb-5">
        <h2 className="text-[22px] font-bold tracking-tight">{title}</h2>
        <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{count} total</span>
      </div>
      <div className="rounded-2xl border hairline bg-white overflow-x-auto">{children}</div>
    </section>
  );
}

const th = 'text-left eyebrow px-5 py-4 whitespace-nowrap';
const td = 'px-5 py-4 text-[14px] align-top border-t';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAdminAuthed();
  const { error } = await searchParams;

  // ── Login gate ──
  if (!authed) {
    return (
      <div className="mkt min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border hairline bg-white p-8 md:p-10">
          <img src="/floxr-logo.svg" alt="FLOXR" className="h-7 mb-8" />
          <p className="eyebrow text-[var(--color-rust)] mb-3">Admin</p>
          <h1 className="text-[24px] font-bold tracking-tight mb-6">Responses Dashboard</h1>
          {!process.env.ADMIN_PASSWORD && (
            <div className="rounded-lg p-4 mb-5 text-[13px] bg-[var(--color-rust)]/10 text-[var(--color-rust)]">
              ADMIN_PASSWORD is not set in the environment. Add it to .env.local (and your host)
              to enable login.
            </div>
          )}
          {error && (
            <div className="rounded-lg p-4 mb-5 text-[13px] bg-[var(--color-rust)]/10 text-[var(--color-rust)]">
              Wrong password.
            </div>
          )}
          <form action={adminLogin} className="flex flex-col gap-4">
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="Password"
              className="w-full border hairline rounded-xl px-4 py-3.5 text-[15px] bg-transparent outline-none focus:border-[var(--color-ink)] transition-colors"
            />
            <button type="submit" className="btn-pill btn-ink w-full">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Data ──
  let audits: AuditRow[] = [];
  let contacts: ContactRow[] = [];
  let waitlist: WaitlistRow[] = [];
  let dbError: string | null = null;

  try {
    [audits, contacts, waitlist] = await Promise.all([
      prisma.auditSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
      prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
      prisma.waitlist.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
    ]);
  } catch (e) {
    console.error('Admin dashboard DB error:', e);
    dbError =
      'Database unreachable. Check that DATABASE_URL in the environment points to a live database (the old Supabase project no longer resolves).';
  }

  return (
    <div className="mkt min-h-screen">
      {/* Top bar */}
      <header className="border-b hairline" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-6" />
            <span className="eyebrow text-[var(--color-rust)]">Admin — Responses</span>
          </div>
          <form action={adminLogout}>
            <button type="submit" className="eyebrow text-[var(--color-mist)] hover:text-[var(--color-ink)] transition-colors cursor-pointer">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {dbError ? (
          <div className="rounded-2xl border p-8 text-[15px] leading-relaxed bg-[var(--color-rust)]/8 border-[var(--color-rust)]/30 text-[var(--color-rust)] max-w-2xl">
            {dbError}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              <StatCard label="Audit Requests" value={audits.length} />
              <StatCard label="Contact Submissions" value={contacts.length} />
              <StatCard label="Waitlist Signups" value={waitlist.length} />
            </div>

            {/* Audit requests */}
            <Section title="Audit Requests" count={audits.length}>
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr style={{ color: 'var(--color-mist)' }}>
                    <th className={th}>Name</th>
                    <th className={th}>Email</th>
                    <th className={th}>Objective</th>
                    <th className={th}>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {audits.length === 0 && (
                    <tr>
                      <td className={`${td} hairline`} colSpan={4} style={{ color: 'var(--color-mist)' }}>
                        No audit requests yet.
                      </td>
                    </tr>
                  )}
                  {audits.map((row) => (
                    <tr key={row.id}>
                      <td className={`${td} hairline font-semibold whitespace-nowrap`}>
                        {row.firstName} {row.lastName}
                      </td>
                      <td className={`${td} hairline`}>
                        <a href={`mailto:${row.email}`} className="underline underline-offset-2 hover:text-[var(--color-rust)]">
                          {row.email}
                        </a>
                      </td>
                      <td className={`${td} hairline`}>{row.objective}</td>
                      <td className={`${td} hairline whitespace-nowrap`} style={{ color: 'var(--color-mist)' }}>
                        {fmt(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* Contact submissions */}
            <Section title="Contact Submissions" count={contacts.length}>
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr style={{ color: 'var(--color-mist)' }}>
                    <th className={th}>Name</th>
                    <th className={th}>Email</th>
                    <th className={th}>Project</th>
                    <th className={th}>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 && (
                    <tr>
                      <td className={`${td} hairline`} colSpan={4} style={{ color: 'var(--color-mist)' }}>
                        No contact submissions yet.
                      </td>
                    </tr>
                  )}
                  {contacts.map((row) => (
                    <tr key={row.id}>
                      <td className={`${td} hairline font-semibold whitespace-nowrap`}>{row.name}</td>
                      <td className={`${td} hairline`}>
                        <a href={`mailto:${row.email}`} className="underline underline-offset-2 hover:text-[var(--color-rust)]">
                          {row.email}
                        </a>
                      </td>
                      <td className={`${td} hairline max-w-[420px]`}>
                        <span className="line-clamp-4 whitespace-pre-wrap">{row.scope}</span>
                      </td>
                      <td className={`${td} hairline whitespace-nowrap`} style={{ color: 'var(--color-mist)' }}>
                        {fmt(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* Waitlist */}
            <Section title="Waitlist" count={waitlist.length}>
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr style={{ color: 'var(--color-mist)' }}>
                    <th className={th}>Email</th>
                    <th className={th}>Source</th>
                    <th className={th}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.length === 0 && (
                    <tr>
                      <td className={`${td} hairline`} colSpan={3} style={{ color: 'var(--color-mist)' }}>
                        No waitlist signups yet.
                      </td>
                    </tr>
                  )}
                  {waitlist.map((row) => (
                    <tr key={row.id}>
                      <td className={`${td} hairline`}>
                        <a href={`mailto:${row.email}`} className="underline underline-offset-2 hover:text-[var(--color-rust)]">
                          {row.email}
                        </a>
                      </td>
                      <td className={`${td} hairline`} style={{ color: 'var(--color-mist)' }}>{row.source || '—'}</td>
                      <td className={`${td} hairline whitespace-nowrap`} style={{ color: 'var(--color-mist)' }}>
                        {fmt(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </>
        )}
      </main>
    </div>
  );
}
