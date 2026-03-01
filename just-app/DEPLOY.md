# Deploy JUST to Netlify

## Option A: Deploy via Netlify website (Git)

1. **Push your code to Git**  
   Commit and push the `JUST` repo (with the `just-app` folder) to GitHub, GitLab, or Bitbucket.

2. **Connect to Netlify**  
   - Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.  
   - Connect your Git provider and select the **JUST** repository.

3. **Build settings** (if Netlify doesn’t pick up `netlify.toml` from repo root):  
   - **Base directory:** `just-app`  
   - **Publish directory:** `just-app` (or `.` if base is already `just-app`)  
   - **Build command:** leave empty (static site)  
   - **Functions directory:** `netlify/functions` (relative to repo root or to base — Netlify will use the one in `just-app` when base is `just-app`)

   If you have a **root** `netlify.toml` in the repo with `base = "just-app"`, Netlify will use that and build from `just-app` automatically.

4. **Environment variables**  
   In Netlify: **Site settings** → **Environment variables** → **Add**:
   - `BEEHIIV_API_KEY` = your Beehiiv API key  
   - `BEEHIIV_PUB_ID` = your Beehiiv publication ID (e.g. `pub_xxxxxxxx`)

5. **Deploy**  
   Click **Deploy site**. Future pushes to your main branch will trigger automatic deploys.

---

## Option B: Deploy from your machine (Netlify CLI)

1. **Install Netlify CLI** (if needed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Log in and deploy from the repo root** (so `netlify.toml` with `base = "just-app"` is used):
   ```bash
   cd C:\Users\chait\.cursor\JUST
   netlify login
   netlify init
   ```
   When asked, create a new site or link to an existing one. Then:
   ```bash
   netlify deploy --prod
   ```
   With a root `netlify.toml` that has `base = "just-app"`, Netlify will build and publish from `just-app` and use `just-app/netlify/functions` for the signup function.

3. **Set env vars in Netlify UI**  
   Same as step 4 in Option A: **Site settings** → **Environment variables** → add `BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID`.

---

## What gets deployed

- **Site:** Everything in `just-app` (e.g. `index.html`, `dashboard-mockup.html`, `midnight-reset-demo.html`, `founder.jpeg`, etc.).
- **Function:** `just-app/netlify/functions/signup.js` handles the waitlist form and Beehiiv signup.

The live site will use `/.netlify/functions/signup` for the form; no build step is required for the static files.
