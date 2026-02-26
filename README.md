# JUST. — Landing page

## Deploy with Git + Netlify (recommended)

### 1. Git (one-time setup in this folder)

```bash
cd C:\Users\chait\.cursor\JUST
git init
git add .
git commit -m "Initial commit: JUST landing page"
```

### 2. GitHub

- Create a new repo at github.com (e.g. `just-landing`), **no** README, **no** .gitignore.
- Then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.)

### 3. Netlify

- Netlify → **Add new site** → **Import from Git** → choose **GitHub** → pick your repo.
- **Build settings:** leave default (Netlify will use `netlify.toml` in the repo).
- **Deploy.**

### 4. Beehiiv env vars

- Netlify → your site → **Site configuration** → **Environment variables** → **Add**:
  - `BEEHIIV_API_KEY` = your key  
  - `BEEHIIV_PUB_ID` = `pub_5dd3fcb6-6d09-4b12-a42a-2db06d8a8de6`
- **Deploys** → **Trigger deploy** → **Deploy site**.

### 5. Custom domain (getjustapp.com)

- **Domain management** → **Add custom domain** → `getjustapp.com`.
- In Namecheap: set the domain’s **nameservers** to the ones Netlify gives you (or add the A/CNAME records Netlify shows). Wait for DNS to verify.

---

## Other: Deploy without Git (drag folder)

You can also deploy by dragging the whole `JUST` folder onto Netlify. For signups to work you still need to set `BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID` in Netlify env vars and redeploy. *Note: “Netlify Drop” (single file) is static-only and won’t run the signup function.*

## Waitlist counter

The “spots claimed” number increases with each successful signup (stored in `localStorage` and updated when the Beehiiv API returns success). It is not hardcoded.

## OG image

`og-image.png` is in the root so shares on WhatsApp, LinkedIn, TikTok, etc. show the correct card.

## Quick static test (no Beehiiv)

To test the page without the backend, open `index.html` in a browser. The form will try to POST to `/.netlify/functions/signup` and show a network error until deployed to Netlify with the function and env vars.
