# Findings & Decisions

## Requirements
- Explore the repository without editing product code.
- Identify concrete unfinished or missing work.
- Focus on work an AI coding agent can reasonably complete.
- Include stack summary, prioritized tasks, automatable classification, and risks.

## Research Findings
- Repository layout suggests a Vite React frontend with Netlify Functions for backend behavior.
- The repo appears small enough for targeted inspection of all major entry points and data files.
- `package.json` only exposes `dev`, `build`, and `preview`; there is no test or lint script.
- `src/pages/ServicesPage.jsx` builds quote query params and includes a disabled deposit CTA, while `src/pages/ContactPage.jsx` does not consume those params and there is no frontend call to `/.netlify/functions/create-checkout`.
- `netlify/functions/create-checkout.js` trusts a client-supplied `amount`, so pricing is not enforced server-side yet.
- Marketing copy promises SMS alerts, CRM/review automation, and follow-up sequences, but implemented integrations are Netlify Forms, Resend, Slack/Discord webhooks, Mailchimp, and Stripe.
- `src/pages/ContactPage.jsx` defines the Netlify form in React only; `dist/index.html` does not contain a static form blueprint. Current Netlify documentation says JavaScript-rendered forms still need an HTML form present at deploy time for detection.
- `netlify/functions/get-leads.js` requires `NETLIFY_AUTH_TOKEN` and optionally `SITE_ID`, but `docs/GO-LIVE-CHECKLIST.md` does not document them.
- An unsandboxed `npm.cmd run build` succeeds, so the repo is not obviously failing to compile.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Inspect package, routing, docs, public assets, and Netlify functions first | Those files define implemented scope and expose obvious gaps quickly |
| Distinguish code-ready gaps from business-content gaps | The user asked what an AI agent can take care of, so product ambiguity matters |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| PowerShell blocked direct `npm` execution | Switched to `npm.cmd` |
| Sandboxed Vite build could not spawn `esbuild` | Re-ran build with escalation and verified success |

## Resources
- `package.json`
- `src/App.jsx`
- `docs/GO-LIVE-CHECKLIST.md`
- `netlify/functions/*`
- Netlify Forms docs on JavaScript-rendered forms and form detection

## Visual/Browser Findings
- No browser inspection was needed for this audit.
