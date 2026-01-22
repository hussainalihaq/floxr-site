# Fix Backend Database Connection

Your backend is deployed but getting "Server error" - this is a Prisma connection issue.

## Quick Fix (Render Dashboard)

### Step 1: Update DATABASE_URL
1. Go to https://dashboard.render.com
2. Click on `floxr-waitlist-api`
3. Click **"Environment"** tab
4. Find `DATABASE_URL` and click **Edit**
5. Make sure it has this **exact** format:

```
postgresql://postgres:dezci6-Cavrox-jicbys@db.fdxjlintswfjrkfqzczq.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

**Important:** Add `&connection_limit=1` at the end if not there.

6. Click **Save Changes**

### Step 2: Redeploy
1. Go to **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait 2 minutes for deployment

### Step 3: Test
After deployment, test:
```bash
curl https://floxr-waitlist-api.onrender.com/waitlist
```

Should return `[]` (empty array) instead of error.

---

## Alternative: Check Render Logs

1. In your Render service, click **"Logs"** tab
2. Look for any Prisma or database errors
3. Common issues:
   - "Can't reach database server" → DATABASE_URL wrong
   - "Prisma Client not generated" → Run `npm run build` failed
   - "Table doesn't exist" → Run Supabase SQL again

---

## Test After Fix

```bash
# Add email
curl -X POST https://floxr-waitlist-api.onrender.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@floxr.co"}'

# Should return: {"success":true,"id":"..."}

# View emails
curl https://floxr-waitlist-api.onrender.com/waitlist

# Should return: [{"id":"...","email":"test@floxr.co",...}]
```

---

## Deploy Website After Backend Works

Once backend test passes:

```bash
cd /Users/hussainalihaq/Desktop/datadigm/tablrs-site

# If using Vercel
git add .
git commit -m "Connect to backend API"
git push
vercel --prod

# Or just push to your main branch and it auto-deploys
```

---

✅ **Once this works, your waitlist is FULLY LIVE!**
