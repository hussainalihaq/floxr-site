# Deploy Waitlist Backend to Render (Free Tier)

## Quick Deploy Steps

### 1. Push Backend to GitHub

```bash
cd /Users/hussainalihaq/Desktop/datadigm/backend
git init
git add .
git commit -m "Waitlist backend with Prisma"
git remote add origin https://github.com/YOUR_USERNAME/floxr-backend.git
git push -u origin main
```

---

### 2. Create Free PostgreSQL Database on Render

1. Go to [render.com](https://render.com) → Sign up/Login
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `floxr-db`
   - **Region:** Oregon (or nearest)
   - **Instance Type:** **Free**
4. Click **"Create Database"**
5. Wait for it to be ready, then copy the **Internal Database URL**

---

### 3. Deploy the Backend Service

1. In Render, click **"New +"** → **"Web Service"**
2. Connect your GitHub repo (`floxr-backend`)
3. Configure:
   - **Name:** `floxr-waitlist-api`
   - **Region:** Same as your database
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**

4. Add Environment Variable:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the Internal Database URL from step 2

5. Click **"Create Web Service"**

---

### 4. Run Database Migration

After deployment, open the **Shell** tab in your Render service and run:

```bash
npx prisma db push
```

This creates the `Waitlist` table in your database.

---

### 5. Update Your Website

In your deployed website's JavaScript, update the waitlist form to use your new backend URL:

```javascript
// Find this in index.html (waitlist form submit)
const response = await fetch("https://floxr-waitlist-api.onrender.com/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, source: "website" })
});
```

Replace `floxr-waitlist-api.onrender.com` with your actual Render URL.

---

## Your API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/waitlist` | POST | Add email to waitlist |
| `/waitlist` | GET | View all signups |
| `/waitlist/count` | GET | Get total count |
| `/waitlist/export` | GET | Download CSV |

---

## Test It

```bash
# Add a signup
curl -X POST https://YOUR-APP.onrender.com/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# View signups
curl https://YOUR-APP.onrender.com/waitlist
```

---

## View Your Waitlist Data

Open in browser:
```
https://YOUR-APP.onrender.com/waitlist
```

Download as CSV:
```
https://YOUR-APP.onrender.com/waitlist/export
```

---

## Free Tier Notes

- Render free tier spins down after 15 min of inactivity
- First request after spin-down takes ~30 seconds
- Good for early startups; upgrade to paid ($7/mo) for always-on

🎉 **Your waitlist is now production-ready!**
