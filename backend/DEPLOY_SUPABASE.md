# Deploy Waitlist Backend to Render (Using Your Supabase DB)

Since you already have Supabase set up, you just need to deploy the backend to Render!

---

## Step 1: Get Your Supabase Database URL

1. Go to [supabase.com](https://supabase.com) → Your project
2. Go to **Settings** → **Database**
3. Scroll to **Connection string** → **URI**
4. Copy the connection string (looks like: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`)
5. Add `?pgbouncer=true` at the end for connection pooling

**Final format:**
```
postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres?pgbouncer=true
```

---

## Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com) → Login/Sign up
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Connect your GitHub: `hussainalihaq/floxr-backend`
5. Configure:
   - **Name:** `floxr-waitlist-api`
   - **Region:** Oregon (or nearest)
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**

6. **Add Environment Variable:**
   - Click **"Advanced"** → **"Add Environment Variable"**
   - **Key:** `DATABASE_URL`
   - **Value:** (Paste your Supabase connection string from Step 1)

7. Click **"Create Web Service"**

---

## Step 3: Wait for Deployment

Render will:
1. Clone your repo
2. Install dependencies
3. Run `npm run build` (generates Prisma client)
4. Start the server

This takes ~2 minutes. You'll get a URL like:
```
https://floxr-waitlist-api.onrender.com
```

---

## Step 4: Test Your Backend

```bash
# Test the API
curl https://floxr-waitlist-api.onrender.com/waitlist

# Add a test signup
curl -X POST https://floxr-waitlist-api.onrender.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Check your Supabase dashboard - you should see the email in the Waitlist table!

---

## Step 5: Update Your Website

In `tablrs-site/index.html` line 771, change:

```javascript
// Change from:
const response = await fetch("http://localhost:4000/waitlist", {

// To:
const response = await fetch("https://floxr-waitlist-api.onrender.com/waitlist", {
```

Then redeploy your website!

---

## Your API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /waitlist` | View all signups (JSON) |
| `POST /waitlist` | Add new signup |
| `GET /waitlist/count` | Get total count |
| `GET /waitlist/export` | Download CSV |

---

## View Waitlist Data

**In Browser:**
```
https://floxr-waitlist-api.onrender.com/waitlist
```

**Or in Supabase:**
- Table Editor → Waitlist table

**Download CSV:**
```
https://floxr-waitlist-api.onrender.com/waitlist/export
```

---

🎉 **You're all set!** The waitlist table already exists in Supabase, so you don't need to run any migrations.
