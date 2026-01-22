# Deploy floxr.co Website

## Quick Start: Deploy to Vercel (Recommended)

### Step 1: Deploy Website

```bash
cd /Users/hussainalihaq/Desktop/datadigm/tablrs-site

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Scope: (your account)
# - Link to existing project? No
# - Project name: floxr (or floxr-site)
# - Directory: ./ (current directory)
# - Override settings? No

# Once deployed, you'll get a URL like: https://floxr.vercel.app
```

### Step 2: Connect floxr.co Domain

**If you already own floxr.co:**

1. **Add domain in Vercel:**
   - Go to https://vercel.com/dashboard
   - Select your `floxr` project
   - Settings → Domains
   - Add domain: `floxr.co`
   - Also add: `www.floxr.co`

2. **Update DNS at your registrar:**
   
   Vercel will show you the DNS records. Add these at your domain registrar:

   **For root domain (floxr.co):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5-30 minutes)

4. **Verify:**
   - Visit https://floxr.co
   - Should see your website!

---

## Alternative: Deploy to Netlify

```bash
cd /Users/hussainalihaq/Desktop/datadigm/tablrs-site

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Follow prompts, then:
netlify deploy --prod
```

Then add floxr.co in Netlify Settings → Domain management.

---

## Update Backend URL (After Backend is Deployed)

Currently the waitlist form points to `http://localhost:4000/waitlist`.

Once you deploy your backend (see DEPLOYMENT_GUIDE.md), update line ~670 in `index.html`:

```javascript
// Change from:
const response = await fetch("http://localhost:4000/waitlist", {

// To:
const response = await fetch("https://your-backend-url.onrender.com/waitlist", {
```

---

## Quick Commands

```bash
# Deploy to production
cd /Users/hussainalihaq/Desktop/datadigm/tablrs-site
vercel --prod

# Check deployment
vercel ls

# View logs
vercel logs
```

---

## Checklist

- [ ] Run `vercel` to deploy site
- [ ] Copy deployment URL
- [ ] Add floxr.co to Vercel dashboard
- [ ] Update DNS at domain registrar
- [ ] Wait for DNS propagation
- [ ] Test https://floxr.co
- [ ] Deploy backend (optional, for waitlist)
- [ ] Update backend URL in index.html
- [ ] Redeploy with `vercel --prod`

---

## Need Help?

**Where to buy floxr.co:**
- Namecheap: https://www.namecheap.com
- Cloudflare: https://www.cloudflare.com
- GoDaddy: https://www.godaddy.com

**Check DNS propagation:**
https://dnschecker.org

**Vercel Support:**
https://vercel.com/docs
