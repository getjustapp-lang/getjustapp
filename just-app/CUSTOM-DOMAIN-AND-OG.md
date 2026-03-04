# usejust.co: Custom domain + OG image

---

## 1. Netlify custom domain (usejust.co)

### What this does
Your site currently lives at something like `random-name-12345.netlify.app`. Adding a custom domain makes it load at **https://usejust.co** (and optionally **https://www.usejust.co**).

### Step-by-step

**A. Add the domain in Netlify**
1. Log in at [app.netlify.com](https://app.netlify.com).
2. Open your JUST site.
3. Go to **Site configuration** (or **Domain settings**) → **Domain management** (or **Domains**).
4. Click **Add custom domain** or **Add domain**.
5. Type **usejust.co** and follow the prompts. Netlify will show you what to do next.

**B. Point your domain to Netlify (at your registrar)**
You bought usejust.co from a registrar (e.g. Namecheap, GoDaddy, Google Domains, Cloudflare, etc.). There you manage DNS.

- **Option 1 — Netlify DNS (simplest)**  
  In Netlify, when you add usejust.co, choose **Use Netlify DNS** or **Transfer DNS to Netlify**. Netlify will give you **nameservers** (e.g. `dns1.p01.nsone.net`). In your registrar’s control panel, change the domain’s **nameservers** to those. Netlify then controls DNS and sets everything for you.

- **Option 2 — Keep DNS at your registrar**  
  In your registrar’s DNS settings for **usejust.co**, add the records Netlify shows you. Usually:
  - **A record:**  
    - Name: `@` (or leave blank, meaning “usejust.co”)  
    - Value: `75.2.60.5` (Netlify’s load balancer IP — confirm in Netlify’s UI, it can change).
  - **CNAME for www (if you want www.usejust.co):**  
    - Name: `www`  
    - Value: `random-name-12345.netlify.app` (your actual Netlify site URL).

**C. HTTPS**
After DNS propagates (minutes to 48 hours), Netlify will issue a free SSL certificate. **HTTPS** will work automatically for **usejust.co**.

**D. Redirect www to non-www (optional)**
In Netlify → **Domain management** → you can set **usejust.co** as primary and redirect **www.usejust.co** → **usejust.co** (or the other way around). One canonical host is enough.

---

## 2. OG image (link preview image)

### What it is
When someone shares **https://usejust.co** on Twitter, LinkedIn, Slack, iMessage, etc., the app shows a **preview card**: title, description, and an image. That image is the **Open Graph image** (og-image). Your HTML already points to:

`https://usejust.co/og-image.png`

If that file doesn’t exist, the preview will have no image or a generic one.

### Specs
- **Filename:** `og-image.png` (must match what’s in your `<meta property="og:image" ...>`).
- **Size:** **1200 × 630 pixels** is the standard (works well on Twitter, Facebook, LinkedIn, Slack).
- **Format:** PNG or JPG. PNG is fine.
- **Content:** Usually your logo + tagline or a simple “JUST. — Stop Planning. Start Doing.” style graphic. Keep text and logo readable at small sizes.

### Where to put it
1. Create or export the image as **og-image.png** (1200×630).
2. Put it in the **just-app** folder (same folder as **index.html**):
   ```
   just-app/
     index.html
     og-image.png   ← here
     founder.jpeg
     ...
   ```
3. Commit and push:
   ```bash
   cd ~/.cursor/JUST
   git add just-app/og-image.png
   git commit -m "Add OG image for link previews"
   git push
   ```
4. After deploy, **https://usejust.co/og-image.png** will work and link previews will show your image.

### Testing
- **Facebook:** [Sharing Debugger](https://developers.facebook.com/tools/debug/) — paste `https://usejust.co` and click Scrape Again after you deploy.
- **Twitter:** Share the link in a tweet or use [Twitter Card Validator](https://cards-dev.twitter.com/validator) if available.
- **LinkedIn:** Post the link; LinkedIn fetches og-image. Updating can be cached for a while.

---

## Quick checklist

- [ ] Netlify: Add custom domain **usejust.co**.
- [ ] Registrar: Point DNS to Netlify (nameservers or A + CNAME).
- [ ] Wait for DNS + SSL (Netlify shows “HTTPS” when ready).
- [ ] Create **og-image.png** (1200×630), put in **just-app/**.
- [ ] Commit, push, deploy so **https://usejust.co/og-image.png** is live.
- [ ] Test a share (e.g. Slack or Twitter) to confirm the preview image appears.
