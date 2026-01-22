# Deployment Guide for Datafly

This guide walks you through deploying your backend and connecting your domain to Vercel.

---

## Part 1: Deploy Backend (Node.js API)

Your backend is in the `backend/` folder. It has a `/waitlist` endpoint that stores signups.

### Option A: Deploy to Render (Recommended - Free tier available)

1. **Create a Render account**
   - Go to https://render.com
   - Sign up with GitHub (easiest)

2. **Push your code to GitHub**
   ```bash
   cd /Users/hussainalihaq/Desktop/datadigm
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/datadigm.git
   git push -u origin main
   ```

3. **Create a new Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo (`datadigm`)
   - Settings:
     - **Name**: `datfly-backend` (or any name)
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Click "Create Web Service"

4. **Get your backend URL**
   - Render will give you a URL like: `https://datfly-backend.onrender.com`
   - Copy this URL - you'll need it for the frontend

5. **Update your frontend**
   - Open `tablrs-site/index.html`
   - Find the line with `fetch("http://localhost:4000/waitlist", {`
   - Replace it with:
     ```javascript
     fetch("https://datfly-backend.onrender.com/waitlist", {
     ```
   - Save the file

### Option B: Deploy to Railway (Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `datadigm` repo
5. In settings, set:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
6. Railway will give you a URL like `https://datfly-backend.up.railway.app`
7. Update your frontend fetch URL as above

---

## Part 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional, but easier)
   ```bash
   npm install -g vercel
   ```

2. **Deploy from terminal**
   ```bash
   cd /Users/hussainalihaq/Desktop/datadigm/tablrs-site
   vercel
   ```
   - Follow prompts:
     - Link to existing project? **No** (first time)
     - Project name: `datfly` (or any name)
     - Directory: `./` (current directory)
   - Vercel will give you a URL like `https://datfly.vercel.app`

3. **Or deploy via GitHub** (recommended for auto-updates)
   - Push your code to GitHub (if you haven't already)
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your `datadigm` repo
   - Settings:
     - **Root Directory**: `tablrs-site`
     - **Framework Preset**: Other
   - Click "Deploy"

---

## Part 3: Connect Your Domain
### Step 1: Buy a Domain (if you haven't)

1. Go to a registrar like:
   - **Namecheap** (https://namecheap.com) - recommended
   - **Cloudflare** (https://cloudflare.com) - also good
   - **GoDaddy** (https://godaddy.com)

2. Search for `datfly.com` (or `.io`, `.app`, `.ai` if `.com` is taken)
3. Purchase the domain (usually $10-15/year)
### Step 2: Add Domain to Vercel

1. In your Vercel dashboard, go to your project (`datfly`)
2. Click **Settings** → **Domains**
3. Enter your domain: `datfly.com` (or whatever you bought)
4. Click "Add"
5. Vercel will show you DNS records to add:
   - Usually a **CNAME** record for `www` pointing to `cname.vercel-dns.com`
   - And an **A** record or **ALIAS** for the root (`@`) domain

### Step 3: Update DNS at Your Registrar

1. Go to your domain registrar's dashboard
2. Find **DNS Management** or **Domain Settings**
3. Add the records Vercel gave you:
   - **Type**: CNAME
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com` (or what Vercel shows)
   - **TTL**: 3600 (or Auto)
   
   - **Type**: A (or ALIAS/CNAME for root)
   - **Name**: `@` (or leave blank for root)
   - **Value**: The IP or alias Vercel provides
   - **TTL**: 3600

4. **Save** the DNS records

### Step 4: Wait for DNS Propagation

- DNS changes take **5 minutes to 48 hours** (usually 10-30 minutes)
- Check status: https://dnschecker.org
- Enter your domain and check if it resolves

### Step 5: Verify SSL

- Vercel automatically provides SSL (HTTPS) certificates
- Once DNS propagates, your site will be live at `https://datfly.com`
- Vercel will show "Valid" under SSL status in the Domains section

---

## Part 4: Update Frontend to Use Production Backend

After deploying both:

1. **Update `tablrs-site/index.html`**
   - Change the fetch URL from `http://localhost:4000/waitlist` to your deployed backend URL
   - Example: `https://datfly-backend.onrender.com/waitlist`

2. **Redeploy to Vercel**
   - If you used GitHub: just push your changes, Vercel auto-deploys
   - If you used CLI: run `vercel --prod` again

---

## Part 5: Add LinkedIn URL

1. Open `tablrs-site/index.html`
2. Find the footer section with:
   ```html
   <a href="#" id="linkedin-url" ...>
   ```
3. Replace `href="#"` with your LinkedIn profile URL:
   ```html
   <a href="https://linkedin.com/in/your-profile" id="linkedin-url" ...>
   ```
4. Save and redeploy

---

## Quick Checklist

- [ ] Backend deployed (Render/Railway) and URL copied
- [ ] Frontend deployed to Vercel
- [ ] Domain purchased
- [ ] Domain added to Vercel project
- [ ] DNS records added at registrar
- [ ] DNS propagated (check with dnschecker.org)
- [ ] Frontend fetch URL updated to production backend
- [ ] LinkedIn URL added in footer
- [ ] Site accessible at `https://yourdomain.com`

---

## Troubleshooting

**Backend not working?**
- Check Render/Railway logs for errors
- Make sure `PORT` environment variable is set (Render sets this automatically)
- Verify your backend URL is correct in the frontend

**Domain not working?**
- Wait longer for DNS propagation (can take up to 48 hours)
- Double-check DNS records match exactly what Vercel shows
- Use `dig yourdomain.com` or https://dnschecker.org to verify

**Frontend not updating?**
- Clear browser cache (Cmd+Shift+R on Mac)
- Check Vercel deployment logs
- Make sure you pushed changes to GitHub (if using auto-deploy)

---

## Next Steps (Optional)

1. **Add a database** (replace in-memory array in `backend/server.js`):
   - Use **Supabase** (free Postgres) or **MongoDB Atlas** (free tier)
   - Update the `/waitlist` endpoint to save to database

2. **Add email notifications**:
   - Use **SendGrid** or **Resend** to email you when someone signs up
   - Add this in your backend after saving to database

3. **Add analytics**:
   - Add Google Analytics or Plausible to track visitors

4. **Set up environment variables**:
   - Store API keys/secrets in Vercel/Render environment variables (not in code)

---

Good luck! 🚀
