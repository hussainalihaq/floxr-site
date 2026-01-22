# Fix Prisma Connection to Supabase

The "Server error" is happening because Prisma needs a **different connection string** than what we gave it.

---

## ✅ Get the Correct Connection String

### Option 1: Direct Connection (Recommended for Prisma)

1. **Go to:** https://supabase.com → Your project
2. **Click:** Settings (gear icon) → Database
3. **Scroll to:** "Connection string" section
4. **Click the "URI" tab**
5. **Important:** Look for **"Session mode"** or find the connection string that does **NOT** have `pooler` in the URL
6. It should look like:
   ```
   postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```

7. **Add this at the end:** `?sslmode=require`

**Final format:**
```
postgresql://postgres:[PASSWORD]@db.fdxjlintswfjrkfqzczq.supabase.co:5432/postgres?sslmode=require
```

**OR if it shows the pooler URL:**
```
postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
```

---

## ✅ Update on Render

1. **Go to:** https://dashboard.render.com
2. **Click:** `floxr-waitlist-api`
3. **Click:** "Environment" tab
4. **Edit** `DATABASE_URL`
5. **Replace with the new URL from above**
6. **Save Changes**
7. **Go to "Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Alternative: Try Transaction Mode

If the above doesn't work, try adding `?pgbouncer=true&connection_limit=1` instead:

```
postgresql://postgres:[PASSWORD]@db.fdxjlintswfjrkfqzczq.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
```

**Note:** Use port `6543` (not `5432`) with pgbouncer

---

## ✅ Test After Redeploy

Open in browser:
```
https://floxr-waitlist-api.onrender.com/waitlist
```

**Should see:** `[]` instead of error!

---

## 📝 About the Password

Your password is: `dezci6-Cavrox-jicbys`

Replace `[PASSWORD]` with this in the connection string.

---

## Which URL to Use?

**Try this first (Direct Connection):**
```
postgresql://postgres:dezci6-Cavrox-jicbys@db.fdxjlintswfjrkfqzczq.supabase.co:5432/postgres?sslmode=require
```

**If that fails, try (Transaction Pooling):**
```
postgresql://postgres:dezci6-Cavrox-jicbys@db.fdxjlintswfjrkfqzczq.supabase.co.6543/postgres?pgbouncer=true&connection_limit=1
```

Let me know which one works!
