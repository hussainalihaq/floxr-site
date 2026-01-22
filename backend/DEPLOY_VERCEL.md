# Deploy Waitlist Backend to Vercel (FREE)

Your backend is now converted to Vercel Serverless Functions! This will work perfectly with Supabase.

---

## ✅ Step 1: Push to GitHub

```bash
cd /Users/hussainalihaq/Desktop/datadigm/backend
git add .
git commit -m "Convert to Vercel serverless functions"
git push
```

---

## ✅ Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Login** with GitHub
3. **Click:** "Add New" → "Project"
4. **Import:** `hussainalihaq/floxr-backend`
5. **Configure:**
   - Framework Preset: **Other**
   - Root Directory: **/** (leave as is)
   - Click **"Environment Variables"**

6. **Add Environment Variable:**
   - **Key:** `DATABASE_URL`
   - **Value:**
     ```
     postgresql://postgres.fdxjlintswfjrkfqzczq:dezci6-Cavrox-jicbys@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
   - Click **"Add"**

7. **Click:** "Deploy"

Wait ~1 minute for deployment...

---

## ✅ Step 3: Get Your API URL

After deployment, you'll get a URL like:
```
https://floxr-backend.vercel.app
```

or

```
https://floxr-backend-username.vercel.app
```

---

## ✅ Step 4: Test Your API

**Test in browser:**

```
https://YOUR-URL.vercel.app/api/waitlist
```

Should show `[]` (empty array)

**Count:**
```
https://YOUR-URL.vercel.app/api/waitlist/count
```

Should show `{"count":0}`

---

## ✅ Step 5: Update Your Website

In `tablrs-site/index.html` line 771, change to your Vercel URL:

```javascript
const response = await fetch("https://YOUR-URL.vercel.app/api/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, source: "homepage" })
});
```

Then push your website changes and redeploy!

---

## Your API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/waitlist` | GET all / POST new signup |
| `/api/waitlist/count` | GET total count |
| `/api/waitlist/export` | GET CSV download |

---

## 🎉 Advantages of Vercel

- ✅ **Free tier** (generous limits)
- ✅ **Works perfectly** with Supabase
- ✅ **Auto-deploys** on git push
- ✅ **Same platform** as your frontend
- ✅ **Global CDN** (fast everywhere)

---

Let's deploy! Run the commands above and let me know your Vercel URL!
