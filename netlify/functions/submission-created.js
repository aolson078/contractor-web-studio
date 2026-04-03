// submission-created.js
// Auto-triggers on Netlify Form submissions and fans the lead out to admin email,
// the lead auto-responder, Slack, and Mailchimp without blocking on any one step.

const SERVICE_LABELS = {
  'get-found': 'Get Found Online',
  'never-miss': 'Never Miss a Lead',
  'grow-autopilot': 'Grow on Autopilot',
  'not-sure': 'Not Sure Yet',
};

const normalizeValue = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

const humanizeValue = (value, fallback = '') => {
  const normalized = normalizeValue(value, fallback);
  if (!normalized) return '';
  return normalized
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const labelService = (service) =>
  SERVICE_LABELS[normalizeValue(service)] || humanizeValue(service, 'Not specified');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildTrackingDetails = (data = {}) => ({
  leadSource: normalizeValue(data.lead_source, normalizeValue(data.utm_source, 'direct')),
  campaign: normalizeValue(data.campaign, normalizeValue(data.utm_campaign)),
  trade: normalizeValue(data.trade),
  city: normalizeValue(data.city),
  partnerName: normalizeValue(data.partner_name),
  addons: normalizeValue(data.addons),
  stage: normalizeValue(data.stage, 'Replied'),
  utmMedium: normalizeValue(data.utm_medium),
  utmContent: normalizeValue(data.utm_content),
  firstTouchPath: normalizeValue(data.first_touch_path),
  latestPath: normalizeValue(data.latest_path),
});

const buildTrackingRowsHtml = (tracking) =>
  [
    ['Lead source', humanizeValue(tracking.leadSource)],
    ['Campaign', humanizeValue(tracking.campaign)],
    ['Trade', humanizeValue(tracking.trade)],
    ['City', humanizeValue(tracking.city)],
    ['Partner', tracking.partnerName],
    ['Add-ons', tracking.addons],
    ['Stage', humanizeValue(tracking.stage)],
    ['UTM medium', humanizeValue(tracking.utmMedium)],
    ['UTM content', tracking.utmContent],
    ['First touch', tracking.firstTouchPath],
    ['Latest path', tracking.latestPath],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">${escapeHtml(label)}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${escapeHtml(value)}</td>
          </tr>
        `
    )
    .join('');

export async function handler(event, _context) {
  try {
    const payload = JSON.parse(event.body);
    const { data } = payload;

    const name = normalizeValue(data.name, 'Someone');
    const email = normalizeValue(data.email);
    const phone = normalizeValue(data.phone, 'Not provided');
    const business = normalizeValue(data.business, 'Not provided');
    const service = normalizeValue(data.service, 'Not specified');
    const message = normalizeValue(data.message, 'No message');
    const tracking = buildTrackingDetails(data);

    const results = await Promise.allSettled([
      sendAdminNotification({ name, email, phone, business, service, message, tracking }),
      sendLeadAutoResponse({ name, email, service }),
      postToSlack({ name, email, phone, service, tracking }),
      addToMailchimp({ name, email, phone, service, tracking }),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const labels = ['Admin email', 'Lead auto-response', 'Slack webhook', 'Mailchimp'];
        console.error(`${labels[index]} failed:`, result.reason);
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission processed' }),
    };
  } catch (error) {
    console.error('submission-created error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

async function sendAdminNotification({ name, email, phone, business, service, message, tracking }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  if (!RESEND_API_KEY || !FROM_EMAIL) {
    console.warn('Skipping admin email - RESEND_API_KEY or FROM_EMAIL not set.');
    return;
  }

  const serviceLabel = labelService(service);
  const trackingRows = buildTrackingRowsHtml(tracking);

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1623; color: #E8E4DE; padding: 0; border-radius: 8px; overflow: hidden;">
      <div style="background: #E87C3E; padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 22px; color: #ffffff;">New Lead: ${escapeHtml(name)}</h1>
        <p style="margin: 6px 0 0; font-size: 14px; color: rgba(255,255,255,0.85);">Service Interest: ${escapeHtml(serviceLabel)}</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #E87C3E;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Business</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${escapeHtml(business)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px;">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #A0A8B8; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,228,216,0.1); color: #F5F1EB; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</td>
          </tr>
          ${trackingRows}
        </table>
      </div>
      <div style="padding: 16px 32px; background: rgba(232,124,62,0.08); border-top: 1px solid rgba(232,124,62,0.15); text-align: center;">
        <a href="mailto:${escapeHtml(email)}" style="display: inline-block; padding: 10px 28px; background: #E87C3E; color: #ffffff; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600;">Reply to ${escapeHtml(name)}</a>
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: FROM_EMAIL,
      subject: `New Lead: ${name} - ${serviceLabel}`,
      html: htmlBody,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend admin email failed (${response.status}): ${text}`);
  }
}

async function sendLeadAutoResponse({ name, email, service }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  if (!RESEND_API_KEY || !FROM_EMAIL || !email) {
    console.warn('Skipping lead auto-response - missing config or lead email.');
    return;
  }

  const firstName = name.split(' ')[0];
  const serviceLabel = labelService(service);

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1623; color: #F5F1EB; padding: 0; border-radius: 8px; overflow: hidden;">
      <div style="padding: 40px 32px 24px; text-align: center;">
        <div style="display: inline-block; width: 48px; height: 48px; background: #E87C3E; border-radius: 6px; line-height: 48px; font-size: 24px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">A</div>
        <h1 style="margin: 0 0 8px; font-size: 26px; color: #F5F1EB;">Thanks, ${escapeHtml(firstName)}!</h1>
        <p style="margin: 0; font-size: 16px; color: #A0A8B8;">I'll be in touch within 24 hours.</p>
      </div>

      <div style="padding: 0 32px 32px;">
        <div style="background: rgba(232,124,62,0.08); border: 1px solid rgba(232,124,62,0.15); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <h2 style="margin: 0 0 16px; font-size: 16px; color: #E87C3E; text-transform: uppercase; letter-spacing: 0.05em;">What Happens Next</h2>
          <ol style="margin: 0; padding-left: 20px; color: #F5F1EB; font-size: 14px; line-height: 2;">
            <li>I'll review your project details and ${service !== 'Not specified' ? `your interest in the <strong>${escapeHtml(serviceLabel)}</strong> package` : 'your inquiry'}</li>
            <li>I'll send you a personalized response with recommendations</li>
            <li>We'll schedule a free consultation to map out your project</li>
          </ol>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #A0A8B8;">Want to get started right away?</p>
          <a href="https://cal.com/contractor-web-studio/15min" style="display: inline-block; padding: 14px 32px; background: #E87C3E; color: #ffffff; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600;">Book a Free 15-Minute Call</a>
        </div>

        <div style="text-align: center;">
          <a href="https://buildzenstudio.com/portfolio" style="color: #E87C3E; font-size: 14px; text-decoration: underline;">View my portfolio</a>
        </div>
      </div>

      <div style="padding: 24px 32px; background: rgba(232,228,216,0.03); border-top: 1px solid rgba(232,228,216,0.08); text-align: center;">
        <p style="margin: 0 0 4px; font-size: 13px; color: #A0A8B8;">Alex Olson - Contractor Web Studio</p>
        <p style="margin: 0 0 4px; font-size: 13px; color: #607090;">(317) 590-1373 &middot; aolson078@gmail.com</p>
        <p style="margin: 0; font-size: 12px; color: #607090;">Winston-Salem, NC</p>
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: `Thanks for reaching out, ${firstName}!`,
      html: htmlBody,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend lead auto-response failed (${response.status}): ${text}`);
  }
}

async function postToSlack({ name, email, phone, service, tracking }) {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  if (!SLACK_WEBHOOK_URL) {
    console.warn('Skipping Slack notification - SLACK_WEBHOOK_URL not set.');
    return;
  }

  const lines = [
    `New lead: ${name}`,
    `Email: ${email || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    `Service: ${labelService(service)}`,
    `Source: ${humanizeValue(tracking.leadSource, 'Direct')}`,
    tracking.campaign ? `Campaign: ${humanizeValue(tracking.campaign)}` : '',
    tracking.trade ? `Trade: ${humanizeValue(tracking.trade)}` : '',
    tracking.city ? `City: ${humanizeValue(tracking.city)}` : '',
    tracking.partnerName ? `Partner: ${tracking.partnerName}` : '',
    tracking.stage ? `Stage: ${humanizeValue(tracking.stage)}` : '',
    tracking.firstTouchPath ? `First touch: ${tracking.firstTouchPath}` : '',
  ].filter(Boolean);

  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack webhook failed (${response.status}): ${body}`);
  }
}

async function addToMailchimp({ name, email, phone, service, tracking }) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !email) {
    console.warn('Skipping Mailchimp - missing API key, list ID, or email.');
    return;
  }

  const dc = MAILCHIMP_API_KEY.split('-').pop();
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const tags = [
    service && service !== 'Not specified' ? `service:${normalizeValue(service)}` : '',
    tracking.leadSource ? `source:${normalizeValue(tracking.leadSource)}` : '',
    tracking.trade ? `trade:${normalizeValue(tracking.trade)}` : '',
    tracking.city ? `city:${normalizeValue(tracking.city)}` : '',
  ].filter(Boolean);

  const body = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone || '',
      SERVICE: labelService(service),
    },
    tags,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 400 && text.includes('Member Exists')) {
        console.log('Mailchimp: member already exists, skipping.');
        return;
      }
      throw new Error(`Mailchimp API failed (${response.status}): ${text}`);
    }
  } catch (error) {
    console.error('Mailchimp error (non-blocking):', error.message);
  }
}
