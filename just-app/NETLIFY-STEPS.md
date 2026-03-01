# Netlify deploy — step by step (where to paste what)

---

## Part 1: Put your code on GitHub

### Step 1.1 — Create a new repo on GitHub
1. Open: **https://github.com/new**
2. **Repository name:** paste: `JUST`
3. **Description:** (optional) e.g. `JUST — productivity app landing`
4. Choose **Public**.
5. Do **not** check "Add a README" (you already have code).
6. Click **Create repository**.

### Step 1.2 — Push your local JUST folder from your machine
1. Open Git Bash (or terminal).
2. Go to your repo folder. Paste and run (use your real path if different):
   ```bash
   cd ~/.cursor/JUST
   ```
3. If this repo isn’t linked to GitHub yet, paste (replace `YOUR_GITHUB_USERNAME` with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/JUST.git
   ```
4. Push the code. Paste and run:
   ```bash
   git push -u origin main
   ```
   (If Git says your branch is `master`, use: `git push -u origin master` instead.)

---

## Part 2: Connect the repo to Netlify

### Step 2.1 — Start “Add new site”
1. Open: **https://app.netlify.com**
2. Log in (or sign up).
3. Click the green **“Add new site”** button.
4. Click **“Import an existing project”**.

### Step 2.2 — Connect to GitHub
1. Click **“Deploy with GitHub”** (or GitLab/Bitbucket if you use that).
2. If asked, click **“Authorize Netlify”** and approve access.
3. In **“Import from Git”**, find and click your **JUST** repository in the list.

### Step 2.3 — Build settings (what to paste/choose)
Netlify may read these from your `netlify.toml`. If it shows a form:

| Field | What to paste/choose |
|--------|----------------------|
| **Branch to deploy** | `main` (or `master` if that’s your default) |
| **Base directory** | `just-app` |
| **Build command** | Leave **empty** |
| **Publish directory** | Leave as **empty** or `.` (Netlify will use the base dir) |

Then click **“Deploy site”** (or **“Save”** then **“Deploy site”**).

---

## Part 3: Set environment variables (for the waitlist form)

### Step 3.1 — Open env vars
1. After the first deploy, open your site in Netlify.
2. Go to **“Site configuration”** (or **“Site settings”**).
3. In the left sidebar, click **“Environment variables”**.

### Step 3.2 — Add each variable
Click **“Add a variable”** / **“Add env var”** / **“New variable”** and add these **one by one**:

**Variable 1**
- **Key:** paste: `BEEHIIV_API_KEY`
- **Value:** paste your Beehiiv API key (from Beehiiv dashboard → Settings → API).
- **Scopes:** leave default (all).
- Save.

**Variable 2**
- **Key:** paste: `BEEHIIV_PUB_ID`
- **Value:** paste your Beehiiv publication ID (e.g. `pub_xxxxxxxx` from your Beehiiv publication URL or settings).
- **Scopes:** leave default.
- Save.

### Step 3.3 — Redeploy so the function sees the vars
1. Go to **“Deploys”**.
2. Click **“Trigger deploy”** → **“Deploy site”** (or **“Clear cache and deploy site”**).

---

## Part 4: Check the live site

1. At the top of the Netlify site page, you’ll see the **live URL** (e.g. `https://something.netlify.app`). Click it.
2. Test the waitlist form: enter an email and submit. If the env vars are set and the function is deployed, it should succeed.

---

## Quick reference — where to paste what

| Where | What to paste |
|-------|----------------|
| GitHub: Repository name | `JUST` |
| Terminal: remote add | `https://github.com/YOUR_GITHUB_USERNAME/JUST.git` |
| Netlify: Base directory | `just-app` |
| Netlify: Env var key 1 | `BEEHIIV_API_KEY` |
| Netlify: Env var key 2 | `BEEHIIV_PUB_ID` |
| Netlify: Env var values | Your real Beehiiv API key and publication ID |

That’s the full flow: GitHub first, then Netlify “Import”, then env vars, then redeploy.
