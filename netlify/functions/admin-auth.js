// admin-auth.js
// Simple auth check: POST with { password } body.
// Returns { authenticated: true/false } and a short-lived session token.

import { createAdminSessionToken, getAdminTokenTtlSeconds } from './admin-token.js';

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Admin password not configured" }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);

    if (password === ADMIN_PASSWORD) {
      const token = createAdminSessionToken();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authenticated: true,
          token,
          expiresIn: getAdminTokenTtlSeconds(),
        }),
      };
    }

    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authenticated: false }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }
}
