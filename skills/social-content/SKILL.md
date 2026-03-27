---
name: social-content
description: Create, schedule, repurpose, and optimize social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, and similar platforms. Use when Codex needs to draft posts, threads, carousels, reel or short-form video scripts, content calendars, posting schedules, engagement plans, hook formulas, platform-specific adaptations, or turn long-form content into social assets.
---

# Social Content

## Overview

Turn business goals, brand voice, and source material into platform-native social content that is specific enough to publish and structured enough to repeat.

## Gather Context

Gather only the context that materially changes the output:

- Clarify the primary goal.
- Identify the desired action.
- Confirm whether the brand is personal, company, or both.
- Identify the target audience and primary platform.
- Capture tone, terminology, and topics to avoid.
- Check whether source material already exists.
- Confirm production constraints such as video bandwidth, design support, and posting cadence.

If the user prefers speed, state assumptions explicitly and continue.

## Choose the Deliverable

Map the request to one or more outputs:

- Draft a single post, thread, caption, carousel outline, or short-form script.
- Build a cross-platform content pack from one source asset.
- Create a weekly or 30-day content calendar.
- Recommend posting cadence, engagement habits, and scheduling windows.
- Audit existing content and rewrite it for stronger hooks, clarity, and platform fit.

## Follow the Workflow

1. Clarify the business objective and conversion target.
2. Select 3-5 content pillars that support that objective.
3. Choose the native format for each platform.
4. Build the hook before the body copy.
5. Adapt tone, length, and structure to the platform.
6. Add a CTA that matches the stage of awareness.
7. Include a publishing or engagement plan when the request is strategic rather than copy-only.
8. Adapt cross-platform content instead of copy-pasting it.
9. Balance educational, behind-the-scenes, personal, community, and promotional content when building calendars.

## Apply Output Rules

- Lead with publish-ready content before explanation.
- Separate assumptions from final copy.
- Label each platform clearly in multi-platform outputs.
- Prefer specificity over generic inspiration.
- Keep CTAs natural and low-friction.
- Avoid fabricated metrics, testimonials, or trend claims.
- Treat generic posting windows as starting heuristics and prefer account analytics when available.
- Preserve the substance of provided source material while rewriting for native consumption.
- If the user asks for "viral" content, optimize for clarity, share-worthiness, novelty, and strong hooks without promising outcomes.

## Read the Right Reference

- Read [platform-playbooks.md](./references/platform-playbooks.md) for platform norms, timing baselines, and format guidance.
- Read [templates-and-hooks.md](./references/templates-and-hooks.md) for reusable post structures and hook formulas.
- Read [content-systems.md](./references/content-systems.md) for content pillars, repurposing, calendars, engagement, and analytics.
- Read [reverse-engineering.md](./references/reverse-engineering.md) for evidence-based pattern mining and viral-content analysis.
- Read [subagents.md](./references/subagents.md) when the request is large enough to split into narrow parallel jobs.

## Use Bundled Sub-Agents for Large Requests

For multi-platform packs, calendars, launches, or optimization work, split the task into the smallest useful units and use the bundled agent definitions in `./agents/`.

- Use one agent per job.
- Route first, then run only the needed agents.
- Keep context work separate from drafting work.
- Keep drafting work separate from optimization and QA.
- Prefer combining 3-6 narrow agents over one broad writing pass.

## Handle Common Requests

- Turn a blog post, podcast, launch note, or case study into a cross-platform pack.
- Draft a 30-day content calendar around a founder, product, or campaign goal.
- Rewrite content to sound less corporate, more authoritative, or more native to a platform.
- Generate hooks, CTAs, thread structures, carousel outlines, or short-form scripts.
- Review a content strategy and identify what to change.
