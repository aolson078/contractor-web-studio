# Outbound Warm-Up Tracker

Last updated: 2026-03-29

## Purpose

Track daily outbound sending volume, deliverability signals, and reply
quality during the warm-up period and ongoing outbound operation.

Copy this structure into a spreadsheet (Google Sheets recommended) and
update it daily during warm-up, then weekly during steady state.

## Daily Tracker (Warm-Up Weeks 1-3)

| Date | Sends | Bounces | Bounce % | Replies | Positive | Spam | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| | | | | | | | |

### Column definitions

- **Sends**: new outbound emails sent that day
- **Bounces**: hard bounces returned
- **Bounce %**: bounces / sends (must stay under 5%)
- **Replies**: total replies received (including negative)
- **Positive**: replies that are interested, curious, or open
- **Spam**: spam complaints or "spam" folder reports from seed tests
- **Notes**: any observations, issues, or adjustments made

## Weekly Tracker (Steady State)

| Week | Total Sends | Bounces | Bounce % | Replies | Reply % | Positive | Positive % | Spam | Unsubs | Audits Sent | Calls Booked |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| | | | | | | | | | | | |

### Column definitions

- **Total Sends**: all outbound emails for the week (new + follow-ups)
- **Reply %**: replies / total sends
- **Positive %**: positive replies / total sends (target: > 5%)
- **Unsubs**: explicit opt-outs received
- **Audits Sent**: teardowns delivered to qualified responders
- **Calls Booked**: discovery calls scheduled from outbound

## Health Thresholds

| Metric | Green | Yellow | Red |
| --- | --- | --- | --- |
| Bounce rate | < 3% | 3-5% | > 5% |
| Positive reply rate | > 5% | 2-5% | < 2% |
| Overall reply rate | > 10% | 5-10% | < 5% |
| Spam complaints | 0 | — | 1+ |
| Weekly unsubs | 0-1 | 2 | 3+ |

## Weekly Review Questions

Answer these every week (align with measurement.md review cadence):

1. Is bounce rate healthy? If not, what's the list quality issue?
2. Are replies trending positive or negative?
3. Which subject lines are getting the most opens/replies?
4. Which email in the sequence gets the best response (1, 2, 3, or 4)?
5. Are prospects from one trade or city responding better?
6. How many outbound leads moved to Audit Sent or Call Booked?
7. Should volume increase, hold, or decrease?

## Sequence Performance Tracker

Track which touch in the 4-email sequence generates the most replies:

| Touch | Total Sent | Replies | Reply Rate | Positive | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| Email 1 (observation + offer) | | | | | |
| Email 2 (second issue) | | | | | |
| Email 3 (teardown + credibility) | | | | | |
| Email 4 (polite closeout) | | | | | |

## Subject Line Performance

Track which subject lines work best:

| Subject Line | Sends | Opens (est.) | Replies | Reply Rate |
| --- | ---: | ---: | ---: | ---: |
| one quick fix | | | | |
| another thing I noticed | | | | |
| short teardown | | | | |
| close this out? | | | | |
| Winston-Salem site note | | | | |
| masonry site fix | | | | |

Add new subject lines as they are tested.

## Stop and Escalation Rules

- **Bounce rate > 5% for 2 days**: pause sends, clean list, verify DNS
- **Any spam complaint**: stop immediately, review targeting and copy
- **3+ unsubs in one week**: reduce volume by 50%, review personalization
- **Zero positive replies for 7 days**: pause, rewrite Email 1, check ICP fit
- **Deliverability tool shows inbox rate < 80%**: pause and investigate

## Related Files

- `deliverability-setup-guide.md` — DNS, domain, and warm-up setup
- `deliverability-compliance.md` — sending rules and compliance policy
- `outbound-engine.md` — sequence templates and scoring rubric
- `assets/subject-lines.md` — approved subject lines
- `measurement.md` — overall KPIs and targets
