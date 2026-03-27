import stripe from "stripe";

export const PACKAGE_PRICING = {
  "get-found": { name: "Get Found Online", price: 800 },
  "never-miss": { name: "Never Miss a Lead", price: 2000 },
  "grow-autopilot": { name: "Grow on Autopilot", price: 4000 },
};

export const ADDON_PRICING = {
  pages: { name: "Additional Pages", price: 200 },
  content: { name: "Content Writing", price: 500 },
  google: { name: "Google Business Profile", price: 300 },
  social: { name: "Social Media Setup", price: 400 },
  maintenance: { name: "Monthly Maintenance", price: 150 },
};

export function buildEstimateForPackage(packageKey, addonKeys = []) {
  const pkg = PACKAGE_PRICING[packageKey];
  if (!pkg) {
    throw new Error(`Unknown package: ${packageKey}`);
  }

  const normalizedAddons = Array.isArray(addonKeys) ? [...new Set(addonKeys)] : [];
  const addons = normalizedAddons
    .map((key) => (ADDON_PRICING[key] ? { key, ...ADDON_PRICING[key] } : null))
    .filter(Boolean);

  const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  const total = pkg.price + addonTotal;

  return {
    packageKey,
    packageName: pkg.name,
    total,
    depositCents: Math.round(total * 0.5 * 100),
    addons,
  };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe is not configured" }),
    };
  }

  const stripeClient = stripe(STRIPE_SECRET_KEY);
  const SITE_URL = process.env.URL || "https://contractorwebstudio.com";

  try {
    const payload = JSON.parse(event.body || "{}");
    const packageKey = payload?.package;
    const addons = Array.isArray(payload?.addons) ? payload.addons : [];
    const customerEmail = payload?.customerEmail?.trim();
    const customerName = payload?.customerName?.trim() || "";

    if (!packageKey || !customerEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields: package, customerEmail" }),
      };
    }

    const estimate = buildEstimateForPackage(packageKey, addons);

    const addonNames = estimate.addons.map((addon) => addon.name);
    const description = addonNames.length
      ? `Deposit for ${estimate.packageName} (includes ${addonNames.join(", ")})`
      : `Deposit for ${estimate.packageName}`;

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${estimate.packageName} Deposit (50%)`,
            description,
          },
          unit_amount: estimate.depositCents,
        },
        quantity: 1,
      },
    ];

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: lineItems,
      success_url: `${SITE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/services`,
      metadata: {
        package: packageKey,
        customerName,
        addons: estimate.addons.map((addon) => addon.key).join(", "),
        estimateTotal: estimate.total.toString(),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("create-checkout error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
