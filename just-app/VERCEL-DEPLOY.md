# Deploy JUST to Vercel

## What’s in place

- **Static site:** `index.html` and assets in `just-app/`.
- **API route:** `api/signup.js` — same Beehiiv signup as before (POST, CORS, returns `{ success, count }`).
- **Frontend:** Form posts to **`/api/signup`** (no Netlify path).

## Deploy steps

### 1. Import project

1. Go to [vercel.com](https://vercel.com) and sign in.
2. **Add New** → **Project**.
3. Import your Git repo (e.g. **getjustapp-lang/getjustapp**).
4. **Root Directory:** set to **`just-app`** (so Vercel builds from the folder that has `index.html` and `api/`).
5. **Framework Preset:** leave as **Other** (or **None**).
6. **Build Command:** leave empty.
7. **Output Directory:** leave empty or `.` (root of `just-app`).
8. Click **Deploy**. First deploy may succeed with no env vars; the form will work after Step 2.

### 2. Environment variables

1. Project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `BEEHIIV_API_KEY`  
     **Value:** your Beehiiv API key  
     **Environment:** Production (and Preview if you want).
   - **Name:** `BEEHIIV_PUB_ID`  
     **Value:** your Beehiiv publication ID (e.g. `pub_xxxxxxxx`)  
     **Environment:** Production (and Preview if you want).
3. **Redeploy** so the API route sees the new vars: **Deployments** → latest → **⋯** → **Redeploy**.

### 3. Custom domain (usejust.co)

1. Project → **Settings** → **Domains**.
2. Add **usejust.co** and **www.usejust.co** (if you use it).
3. Follow Vercel’s DNS instructions (A record or CNAME). If the domain is already on Netlify DNS, you’ll need to point it to Vercel’s targets instead (Vercel will show the exact records).
4. After DNS propagates, Vercel will issue SSL automatically.

### 4. Stop using Netlify

- In Netlify, you can leave the site as is or delete it.
- Update any links (e.g. in docs or social) from the old `*.netlify.app` URL to **https://usejust.co** once the domain is live on Vercel.

## Summary

| Item        | Netlify              | Vercel        |
|------------|----------------------|---------------|
| Signup URL | `/.netlify/functions/signup` | `/api/signup` |
| Config     | `netlify.toml`       | `vercel.json` (optional) |
| Env vars   | Netlify UI           | Vercel → Settings → Environment Variables |
| Root       | `base = "just-app"`  | Root Directory = `just-app` |

After deploy, test the form at your Vercel URL (or https://usejust.co) and check the browser console for the `[JUST signup]` logs.
