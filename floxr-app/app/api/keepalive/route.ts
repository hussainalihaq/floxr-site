import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Supabase pauses free-tier projects after ~7 days without database activity.
// A daily Vercel cron hits this route, and the query below is what actually
// counts as activity — an HTTP ping that never reaches Postgres would not.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Vercel sends this header on cron invocations when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [audits, contacts, waitlist] = await Promise.all([
      prisma.auditSubmission.count(),
      prisma.contactSubmission.count(),
      prisma.waitlist.count(),
    ]);

    return NextResponse.json({
      ok: true,
      db: 'reachable',
      counts: { audits, contacts, waitlist },
      at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Keepalive failed — database unreachable:', error);
    return NextResponse.json(
      { ok: false, db: 'unreachable', at: new Date().toISOString() },
      { status: 503 }
    );
  }
}
