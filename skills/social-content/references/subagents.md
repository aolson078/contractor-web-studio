# Bundled Sub-Agents

Use these agent definitions when the request is large, parallelizable, or needs tighter role separation.

## Routing and Context

| Agent | Single job |
| --- | --- |
| `social-request-router` | Map a request to the smallest useful set of social sub-agents |
| `objective-clarifier` | Convert a request into a clear business objective and CTA |
| `audience-profiler` | Distill audience pain points, awareness level, and platform fit |
| `brand-voice-calibrator` | Turn rough tone guidance into reusable writing rules |
| `content-pillar-designer` | Define 3-5 content pillars and mix guidance |
| `source-content-extractor` | Pull reusable claims, quotes, lessons, and proof from source material |
| `angle-finder` | Choose the strongest editorial angle for a topic |

## Writing Components

| Agent | Single job |
| --- | --- |
| `hook-generator` | Generate platform-fit hooks before drafting |
| `cta-designer` | Generate low-friction CTA options |
| `contrarian-take-shaper` | Build a defensible contrarian angle |
| `story-post-writer` | Turn a lesson or event into a narrative-led post |
| `social-proof-post-builder` | Turn proof points into trust-building content |

## Platform Drafting

| Agent | Single job |
| --- | --- |
| `linkedin-post-architect` | Draft a LinkedIn-native post |
| `x-thread-architect` | Draft an X-native thread |
| `instagram-carousel-architect` | Draft a slide-by-slide Instagram carousel |
| `instagram-caption-writer` | Draft an Instagram caption |
| `reel-script-writer` | Draft an Instagram Reel or Shorts script |
| `tiktok-script-writer` | Draft a TikTok-native short-form script |
| `facebook-community-post-writer` | Draft a Facebook community-first post |

## Repurposing and Distribution

| Agent | Single job |
| --- | --- |
| `repurposing-mapper` | Map one source asset into platform-specific outputs |
| `platform-native-adapter` | Rewrite one asset for a different platform without copy-paste |
| `content-calendar-planner` | Build a weekly or monthly content calendar |
| `posting-schedule-optimizer` | Recommend cadence and posting windows |
| `launch-campaign-socializer` | Build a social rollout around a launch or announcement |
| `evergreen-recycling-planner` | Plan how and when to resurface evergreen content |

## Engagement and Conversion

| Agent | Single job |
| --- | --- |
| `engagement-plan-builder` | Design a pre- and post-publish engagement routine |
| `comment-reply-drafter` | Draft public comment replies |
| `dm-follow-up-drafter` | Draft warm follow-up DMs from social engagement |

## Analysis and QA

| Agent | Single job |
| --- | --- |
| `analytics-reviewer` | Summarize content metrics and notable signals |
| `performance-diagnostician` | Explain weak performance and propose tests |
| `viral-pattern-analyst` | Reverse engineer high-performing niche content |
| `content-qa-editor` | Final-check content for voice, clarity, platform fit, and risk |

## Recommended Sequencing

Use this order as a default:

1. `social-request-router`
2. Context agents such as `objective-clarifier`, `audience-profiler`, `brand-voice-calibrator`
3. Strategy agents such as `content-pillar-designer`, `source-content-extractor`, `angle-finder`
4. Drafting agents such as `hook-generator` plus one platform writer
5. Distribution agents such as `repurposing-mapper`, `content-calendar-planner`, `posting-schedule-optimizer`
6. Optimization agents such as `analytics-reviewer`, `performance-diagnostician`, `content-qa-editor`
