# Outbound Deliverability Setup Guide

Last updated: 2026-03-29

## Purpose

Step-by-step setup instructions to launch cold outbound email from a
protected sending domain with proper DNS authentication, warm-up
discipline, and compliance guardrails.

Complete every step before sending the first outbound email.

## Phase 1: Domain and Mailbox Setup

### 1.1 Choose an outbound sending domain

Do not send cold outreach from contractorwebstudio.com.

Options:

- contractorwebstudio.co
- cws-outreach.com
- contractorwebmail.com

Pick one, register it, and redirect the root domain to
contractorwebstudio.com so recipients who type it in land on the
real site.

### 1.2 Set up a Google Workspace or outbound-specific mailbox

Create a sending address like:

- alex@<outbound-domain>

Use Google Workspace ($7/mo) or a similar provider that supports
custom domain email with native SPF/DKIM support.

### 1.3 Configure DNS records

Add these records for the outbound domain:

#### SPF

```
Type: TXT
Host: @
Value: v=spf1 include:_spf.google.com ~all
```

(Adjust the include if using a non-Google provider.)

#### DKIM

Follow your email provider's DKIM setup. For Google Workspace:

1. Admin console → Apps → Google Workspace → Gmail → Authenticate email
2. Generate a DKIM key
3. Add the provided TXT record to DNS
4. Activate signing

#### DMARC

```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@<outbound-domain>
```

Start with `p=none` to monitor. After 2-4 weeks of clean data,
move to `p=quarantine`.

### 1.4 Verify DNS propagation

Use these tools to confirm all records are live:

- MXToolbox SPF check
- MXToolbox DKIM check
- MXToolbox DMARC check
- Google Admin Toolbox Check MX

Do not proceed until all three pass.

## Phase 2: Warm-Up

### 2.1 Manual warm-up schedule

| Week | Daily New Sends | Cumulative Target | Notes |
| --- | ---: | ---: | --- |
| 1 | 5-10 | 35-70 total | Real conversations only, reply to every response |
| 2 | 10-15 | 105-175 total | Add first batch of ICP prospects |
| 3 | 15-25 | 210-350 total | Full outbound cadence if signals are healthy |
| 4+ | 20-25 | Steady state | Only increase if bounce < 3% and spam = 0 |

### 2.2 Warm-up best practices

- Send to real people you know in week 1 (colleagues, friends, past contacts)
- Ask recipients to reply (even a short "got it")
- Do not use a warm-up automation service — manual sends with real replies build reputation faster for low-volume senders
- Send at natural intervals (not 25 emails at 9:00 AM sharp)
- Mix in legitimate non-outbound emails from the same mailbox

### 2.3 Stop signals during warm-up

Pause and investigate if any of these appear:

- bounce rate above 5%
- emails landing in spam (check with a seed test)
- provider sends a sending limit warning
- replies mentioning spam or unwanted contact

## Phase 3: Compliance Checklist

Before sending any outbound email, confirm all of these:

- [ ] Separate outbound domain is registered and DNS is verified
- [ ] SPF, DKIM, and DMARC records are live and passing
- [ ] Mailbox is set up and has been active for at least 48 hours
- [ ] Week 1 warm-up plan is ready with real contacts
- [ ] Lead list is qualified per lead-research-sop.md (score 65+)
- [ ] Email copy is plain text, no images, no attachments
- [ ] Each email has exactly one CTA
- [ ] Opt-out process is clear (reply "stop" or similar)
- [ ] 4-touch stop rule is documented and enforced
- [ ] Sender identity is honest (real name, real business)
- [ ] Subject lines are from the approved list in assets/subject-lines.md
- [ ] Sequence templates match outbound-engine.md

## Phase 4: Ongoing Monitoring

Track these weekly in the warm-up tracker (see `outbound-warmup-tracker.md`):

| Metric | Healthy | Warning | Action |
| --- | --- | --- | --- |
| Bounce rate | < 3% | 3-5% | Clean list, slow down |
| Positive reply rate | > 5% | 2-5% | Refine copy and targeting |
| Overall reply rate | > 10% | 5-10% | Refine copy and targeting |
| Spam complaints | 0 | 1+ | Stop immediately, investigate |
| Unsubscribes | < 2/week | 2+/week | Review targeting and frequency |

## Phase 5: Scale Decision

Only increase volume beyond 25/day if all of these are true for
2+ consecutive weeks:

- bounce rate under 3%
- zero spam complaints
- positive reply rate above 5%
- at least one booked call from outbound

If any metric fails, reduce volume by 50% before adjusting copy
or targeting.

## Related Files

- `outbound-engine.md` — email sequences, DM scripts, scoring rubric
- `lead-research-sop.md` — how to build the weekly prospect list
- `assets/subject-lines.md` — approved subject lines
- `outbound-warmup-tracker.md` — weekly tracking spreadsheet
- `measurement.md` — overall KPIs and review cadence
