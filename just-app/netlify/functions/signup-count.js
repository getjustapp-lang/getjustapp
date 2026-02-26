// netlify/functions/signup-count.js
// Returns the real active subscriber count from Beehiiv.
// Called on page load so the waitlist bar shows the true number to every visitor.
//
// Required environment variables (same as signup.js):
//   BEEHIIV_API_KEY   — your Beehiiv API key
//   BEEHIIV_PUB_ID    — your publication ID (e.g. pub_xxxxxxxx)

exports.handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // Cache for 60 seconds so rapid page loads don't hammer the API
    'Cache-Control': 'public, max-age=60',
  };

  const API_KEY = process.env.BEEHIIV_API_KEY;
  const PUB_ID  = process.env.BEEHIIV_PUB_ID;

  if (!API_KEY || !PUB_ID) {
    return { statusCode: 500, headers, body: JSON.stringify({ count: null }) };
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions?limit=1&status=active`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    if (!res.ok) {
      return { statusCode: 200, headers, body: JSON.stringify({ count: null }) };
    }

    const data = await res.json();
    const count = data.total_results ?? null;

    return { statusCode: 200, headers, body: JSON.stringify({ count }) };
  } catch (err) {
    console.error('signup-count error:', err);
    return { statusCode: 200, headers, body: JSON.stringify({ count: null }) };
  }
};
