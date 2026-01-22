# Add Waitlist Table to Supabase

Your backend is deployed at: https://floxr-waitlist-api.onrender.com

But the Waitlist table doesn't exist yet in your Supabase database. Here's how to add it:

---

## Quick Fix (2 minutes)

### Option 1: Using Supabase SQL Editor (Easiest)

1. Go to [supabase.com](https://supabase.com) → Your project
2. Click **SQL Editor** in the left sidebar
3. Click **"New query"**
4. Paste this SQL:

```sql
-- Create Waitlist table
CREATE TABLE IF NOT EXISTS "Waitlist" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    source TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS "Waitlist_email_idx" ON "Waitlist"(email);
CREATE INDEX IF NOT EXISTS "Waitlist_createdAt_idx" ON "Waitlist"("createdAt" DESC);
```

5. Click **"Run"** or press `Cmd+Enter`
6. You should see: "Success. No rows returned"

---

### Option 2: Using Render Shell

1. Go to your Render service: https://dashboard.render.com
2. Click on `floxr-waitlist-api`
3. Click the **"Shell"** tab
4. Run this command:

```bash
npx prisma db push
```

This will create the table from your Prisma schema.

---

## Test It Works

After creating the table, test your backend:

```bash
# Add a test signup
curl -X POST https://floxr-waitlist-api.onrender.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@floxr.co"}'

# View signups
curl https://floxr-waitlist-api.onrender.com/waitlist
```

You should see your test email!

---

## Verify in Supabase

1. Go to Supabase → **Table Editor**
2. You should now see the **Waitlist** table
3. Click it to view any signups

---

✅ **Once done, your waitlist is fully live!**

Test it on your website at https://floxr.co
