// netlify/functions/signup.js
// Subscribes an email to Beehiiv and returns the REAL subscriber count.
//
// Required environment variables (set in Netlify UI → Site settings → Environment variables):
//   BEEHIIV_API_KEY   — your Beehiiv API key  (Settings → API)
//   BEEHIIV_PUB_ID    — your publication ID   (e.g. pub_xxxxxxxx)

exports.handler = async (event) => {
  // ── CORS pre-flight ──────────────────────────────────────────────────────
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let email;
  try {
    ({ email } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address' }) };
  }

  const API_KEY = process.env.BEEHIIV_API_KEY;
  const PUB_ID  = process.env.BEEHIIV_PUB_ID;

  if (!API_KEY || !PUB_ID) {
    console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUB_ID environment variables');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  // ── 1. Subscribe the email to Beehiiv ────────────────────────────────────
  try {
    const subRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'waitlist',
          utm_medium: 'landing_page',
        }),
      }
    );

    // Beehiiv returns 201 on new sub, 200 on existing — both are fine.
    // 4xx means something is wrong with the request.
    if (!subRes.ok && subRes.status !== 409) {
      const errBody = await subRes.text();
      console.error('Beehiiv subscribe error:', subRes.status, errBody);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Could not subscribe. Please try again.' }),
      };
    }
  } catch (err) {
    console.error('Fetch error (subscribe):', err);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'Network error reaching Beehiiv. Try again.' }),
    };
  }

  // ── 2. Fetch the real total subscriber count from Beehiiv ─────────────────
  // We request page 1 with limit=1; the response includes a `total_results` field.
  let totalCount = null;
  try {
    const countRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions?limit=1&status=active`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    if (countRes.ok) {
      const countData = await countRes.json();
      // Beehiiv v2 wraps results in { data: [...], total_results: N, ... }
      totalCount = countData.total_results ?? null;
    }
  } catch (err) {
    // Non-fatal — we still return success even if count fetch fails
    console.error('Fetch error (count):', err);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      count: totalCount,   // null if count fetch failed — frontend handles gracefully
    }),
  };
};
