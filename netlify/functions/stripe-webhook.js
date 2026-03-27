// stripe-webhook.js
// Handles Stripe checkout.session.completed events.
// Verifies webhook signature, sends notifications, updates Mailchimp.

const stripe = require("stripe");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
    return { statusCode: 500, body: "Stripe not configured" };
  }

  const stripeClient = stripe(STRIPE_SECRET_KEY);

  // Use raw body for signature verification
  const sig = event.headers["stripe-signature"];
  let stripeEvent;

  try {
    stripeEvent = stripeClient.webhooks.constructEvent(
      event.body, // raw body
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Only handle checkout.session.completed
  if (stripeEvent.type !== "checkout.session.completed") {
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  const session = stripeEvent.data.object;
  const customerEmail = session.customer_email || session.customer_details?.email || "";
  const customerName = session.metadata?.customerName || session.customer_details?.name || "Unknown";
  const packageName = session.metadata?.package || "Unknown Package";
  const addons = session.metadata?.addons || "";
  const amountTotal = (session.amount_total / 100).toFixed(2);

  // Run all notifications concurrently; failures are logged but don't block
  const results = await Promise.allSettled([
    sendSlackNotification({ customerName, packageName, amountTotal }),
    sendAdminEmail({ customerName, customerEmail, packageName, amountTotal, addons }),
    sendClientConfirmation({ customerName, customerEmail, packageName, amountTotal }),
    updateMailchimpPaidClient({ customerEmail }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const labels = ["Slack", "Admin email", "Client confirmation", "Mailchimp update"];
      console.error(`${labels[i]} failed:`, r.reason);
    }
  });

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

// ─── Slack notification ───────────────────────────────────────────────────────
async function sendSlackNotification({ customerName, packageName, amountTotal }) {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  if (!SLACK_WEBHOOK_URL) return;

  const text = `New paid client: ${customerName} - ${packageName} - $${amountTotal}`;

  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error(`Slack failed (${res.status})`);
}

// ─── Admin email via Resend ───────────────────────────────────────────────────
async function sendAdminEmail({ customerName, customerEmail, packageName, amountTotal, addons }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  if (!RESEND_API_KEY || !FROM_EMAIL) return;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1623; color: #E8E4DE; padding: 0; border-radius: 8px; overflow: hidden;">
      <div style="background: #28a745; padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 22px; color: #ffffff;">Payment Received!</h1>
        <p style="margin: 6px 0 0; font-size: 14px; color: rgba(255,255,255,0.85);">$${amountTotal} - ${packageName}</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px; width: 120px;">Client</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;"><a href="mailto:${customerEmail}" style="color: #E87C3E;">${customerEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Package</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${packageName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Amount</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">$${amountTotal}</td>
          </tr>
          ${addons ? `<tr>
            <td style="padding: 12px 0; color: #A0A8B8; font-size: 13px;">Add-ons</td>
            <td style="padding: 12px 0; color: #F5F1EB; font-size: 14px;">${addons}</td>
          </tr>` : ""}
        </table>
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: FROM_EMAIL,
      subject: `Payment Received: ${customerName} - ${packageName} - $${amountTotal}`,
      html: htmlBody,
    }),
  });

  if (!res.ok) throw new Error(`Resend admin email failed (${res.status})`);
}

// ─── Client confirmation email ────────────────────────────────────────────────
async function sendClientConfirmation({ customerName, customerEmail, packageName, amountTotal }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  if (!RESEND_API_KEY || !FROM_EMAIL || !customerEmail) return;

  const firstName = customerName.split(" ")[0];

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1623; color: #F5F1EB; padding: 0; border-radius: 8px; overflow: hidden;">
      <div style="padding: 40px 32px 24px; text-align: center;">
        <div style="display: inline-block; width: 48px; height: 48px; background: #E87C3E; border-radius: 6px; line-height: 48px; font-size: 24px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">A</div>
        <h1 style="margin: 0 0 8px; font-size: 26px; color: #F5F1EB;">Payment Received!</h1>
        <p style="margin: 0; font-size: 16px; color: #A0A8B8;">Thanks, ${firstName}. Here's what happens next.</p>
      </div>

      <div style="padding: 0 32px 32px;">
        <div style="background: rgba(232,124,62,0.08); border: 1px solid rgba(232,124,62,0.15); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #A0A8B8; font-size: 13px;">Package</td>
              <td style="padding: 8px 0; color: #F5F1EB; font-size: 14px; text-align: right; font-weight: 600;">${packageName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A0A8B8; font-size: 13px;">Amount Paid</td>
              <td style="padding: 8px 0; color: #E87C3E; font-size: 14px; text-align: right; font-weight: 600;">$${amountTotal}</td>
            </tr>
          </table>
        </div>

        <h2 style="margin: 0 0 16px; font-size: 16px; color: #E87C3E; text-transform: uppercase; letter-spacing: 0.05em;">What Happens Next</h2>
        <ol style="margin: 0 0 24px; padding-left: 20px; color: #F5F1EB; font-size: 14px; line-height: 2.2;">
          <li>I'll reach out within 24 hours to schedule our kickoff call</li>
          <li>We'll gather your content, branding, and preferences</li>
          <li>I'll build your site with regular check-ins for feedback</li>
          <li>Final review, revisions, and launch!</li>
        </ol>

        <div style="text-align: center; margin-bottom: 24px;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #A0A8B8;">Ready to kick things off?</p>
          <a href="https://cal.com/contractor-web-studio/15min" style="display: inline-block; padding: 14px 32px; background: #E87C3E; color: #ffffff; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600;">Schedule Kickoff Call</a>
        </div>
      </div>

      <div style="padding: 24px 32px; background: rgba(232,228,216,0.03); border-top: 1px solid rgba(232,228,216,0.08); text-align: center;">
        <p style="margin: 0 0 4px; font-size: 13px; color: #A0A8B8;">Alex Olson - Contractor Web Studio</p>
        <p style="margin: 0 0 4px; font-size: 13px; color: #607090;">(317) 590-1373 &middot; aolson078@gmail.com</p>
        <p style="margin: 0; font-size: 12px; color: #607090;">Winston-Salem, NC</p>
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Payment Received - Here's What Happens Next`,
      html: htmlBody,
    }),
  });

  if (!res.ok) throw new Error(`Resend client confirmation failed (${res.status})`);
}

// ─── Mailchimp: tag as paid client ────────────────────────────────────────────
async function updateMailchimpPaidClient({ customerEmail }) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !customerEmail) return;

  try {
    const dc = MAILCHIMP_API_KEY.split("-").pop();
    const crypto = require("crypto");
    const subscriberHash = crypto
      .createHash("md5")
      .update(customerEmail.toLowerCase())
      .digest("hex");

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`;
    const authHeader = `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [
          { name: "paid-client", status: "active" },
          { name: "nurture", status: "inactive" },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Mailchimp tag update failed (${res.status}): ${text}`);
    }
  } catch (err) {
    console.error("Mailchimp update (non-blocking):", err.message);
  }
}
