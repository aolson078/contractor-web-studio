# RevOps and Automation

Last updated: 2026-03-17

## Goal

Create a simple, disciplined system that tracks every lead from first touch through closed won or closed lost without heavy software overhead.

## Pipeline Stages

- Prospect
- Contacted
- Replied
- Qualified
- Audit Sent
- Call Booked
- Proposal
- Closed Won
- Closed Lost
- Nurture

## Stage Rules

### Prospect

Lead is researched and scored but has not been contacted.

### Contacted

At least one outbound or partner touch has been sent.

### Replied

Lead has responded in any meaningful way.

### Qualified

Lead is in-scope, has real need, and is worth a call or audit.

### Audit Sent

The teardown or quick website audit has been delivered.

### Call Booked

Discovery or strategy call is scheduled.

### Proposal

Proposal is sent or actively in motion.

### Closed Won / Closed Lost

Final outcome is clear and documented.

### Nurture

Good fit, wrong timing, or not ready yet.

## Required Fields

Every lead must support:

- lead_source
- campaign
- trade
- city
- stage
- partner_name
- next_action_at
- last_contact_at
- quote_value_estimate
- owner
- notes
- created_at

## Source Taxonomy

Use exactly:

- organic_search
- gbp
- blog
- linkedin
- cold_email
- partner_referral
- direct
- portfolio

## SLA Rules

- inbound reply within 15 minutes during business hours
- proposal within 48 hours of call
- every open lead must have a next action
- every lead must have source and stage populated

## Automation Scope

Automate:

- form routing
- source capture
- hidden field population
- notifications
- stage updates where appropriate
- reminder tasks
- follow-up prompts
- spreadsheet or CRM sync
- booked-call alerts

Do not automate:

- sales calls
- proposal judgment
- closing conversation

## Suggested Lean Stack

- website forms: current Netlify setup
- admin alerts: Slack webhook
- autoresponder and notifications: Resend
- nurture tags: Mailchimp
- scheduling: Cal.com
- system of record: Google Sheet first, then light CRM if needed

## Upgrade Trigger

Move from spreadsheet-first to a light CRM once either of these is true:

- more than 15 active opportunities are open in a month
- the team spends too much time manually updating stages and next actions
