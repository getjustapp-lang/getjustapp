// Vercel Serverless Function: Beehiiv waitlist signup
// Set in Vercel: BEEHIIV_API_KEY, BEEHIIV_PUB_ID (Environment Variables)

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let email;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    email = body.email;
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const API_KEY = process.env.BEEHIIV_API_KEY;
  const PUB_ID = process.env.BEEHIIV_PUB_ID;

  if (!API_KEY || !PUB_ID) {
    console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUB_ID');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

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

    if (!subRes.ok && subRes.status !== 409) {
      const errBody = await subRes.text();
      console.error('Beehiiv subscribe error:', subRes.status, errBody);
      res.status(502).json({ error: 'Could not subscribe. Please try again.' });
      return;
    }
  } catch (err) {
    console.error('Fetch error (subscribe):', err);
    res.status(502).json({ error: 'Network error reaching Beehiiv. Try again.' });
    return;
  }

  let totalCount = null;
  try {
    const countRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions?limit=1&status=active`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    if (countRes.ok) {
      const countData = await countRes.json();
      totalCount = countData.total_results ?? null;
    }
  } catch (err) {
    console.error('Fetch error (count):', err);
  }

  res.status(200).json({ success: true, count: totalCount });
}
