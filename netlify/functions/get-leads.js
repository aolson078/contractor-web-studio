import { verifyAdminSessionToken } from './admin-token.js';

// get-leads.js
// Protected endpoint — fetches form submissions from Netlify Forms API.

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const authHeader = event.headers.authorization || "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return { statusCode: 500, body: JSON.stringify({ error: "Admin password not configured" }) };
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  try {
    if (!verifyAdminSessionToken(token)) {
      return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Token verification failed" }) };
  }

  const NETLIFY_AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
  if (!NETLIFY_AUTH_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: "Netlify auth token not configured" }) };
  }

  try {
    const siteId = process.env.SITE_ID || "";
    const formsUrl = siteId
      ? `https://api.netlify.com/api/v1/sites/${siteId}/forms`
      : "https://api.netlify.com/api/v1/forms";

    const formsRes = await fetch(formsUrl, {
      headers: { Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}` },
    });

    if (!formsRes.ok) {
      throw new Error(`Failed to fetch forms (${formsRes.status})`);
    }

    const forms = await formsRes.json();
    const contactForm = forms.find((f) => f.name === "contact");
    if (!contactForm) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const subsUrl = `https://api.netlify.com/api/v1/forms/${contactForm.id}/submissions?per_page=100`;
    const subsRes = await fetch(subsUrl, {
      headers: { Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}` },
    });

    if (!subsRes.ok) {
      throw new Error(`Failed to fetch submissions (${subsRes.status})`);
    }

    const submissions = await subsRes.json();
    const leads = submissions.map((sub) => ({
      id: sub.id,
      name: sub.data?.name || "",
      email: sub.data?.email || "",
      phone: sub.data?.phone || "",
      business: sub.data?.business || "",
      service: sub.data?.service || "",
      addons: sub.data?.addons || "",
      message: sub.data?.message || "",
      leadSource: sub.data?.lead_source || sub.data?.utm_source || "direct",
      campaign: sub.data?.campaign || sub.data?.utm_campaign || "",
      trade: sub.data?.trade || "",
      city: sub.data?.city || "",
      partnerName: sub.data?.partner_name || "",
      stage: sub.data?.stage || "Replied",
      utmSource: sub.data?.utm_source || "",
      utmMedium: sub.data?.utm_medium || "",
      utmCampaign: sub.data?.utm_campaign || "",
      utmContent: sub.data?.utm_content || "",
      firstTouchPath: sub.data?.first_touch_path || "",
      latestPath: sub.data?.latest_path || "",
      date: sub.created_at,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leads),
    };
  } catch (err) {
    console.error("get-leads error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
