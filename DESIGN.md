# Blueprint Design System

Contractor Web Studio portfolio site design system. Navy x Orange x Cream, dark-mode-first.

## Color Tokens

### Navy Foundation
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0B1120` | Page background, hero |
| `--bg-base` | `#111827` | Dark sections |
| `--surface` | `#1A2540` | Card backgrounds |
| `--surface-raised` | `#1E2D4D` | Elevated cards, calculators |
| `--surface-hover` | `#263A5E` | Hover states on surfaces |

### Orange Accent
| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#F2843A` | Primary accent, links, active states |
| `--accent-light` | `#F5A060` | Hover accent |
| `--accent-warm` | `#E06B28` | Gradient endpoint |
| `--accent-pale` | `#FDE8D8` | Light accent backgrounds |
| `--accent-glow` | `rgba(242,132,58,0.08)` | Ambient glow behind elements |
| `--accent-border` | `rgba(242,132,58,0.18)` | Accent-tinted borders |

### Cream / Light
| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#F5F1EB` | Light section backgrounds, headings on dark |
| `--cream-warm` | `#EDE8DC` | Warm cream variant |
| `--cream-dark` | `#D8D0C0` | Muted cream |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#EAE6E0` | Body text on dark backgrounds |
| `--text-secondary` | `#A0AAB8` | Secondary text, descriptions |
| `--text-muted` | `#7A8AA8` | Tertiary text, labels, meta (WCAG AA compliant) |
| `--text-dark` | `#1B2A4A` | Text on light/cream backgrounds |
| `--text-dark-secondary` | `#4A5568` | Secondary text on light backgrounds |

### Borders
| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `rgba(232,228,216,0.06)` | Subtle dividers |
| `--border-strong` | `rgba(232,228,216,0.12)` | Visible borders on cards |
| `--rule` | `rgba(242,132,58,0.18)` | Accent-tinted rules |

### Glass
| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(20,32,56,0.55)` | Frosted glass backgrounds |
| `--glass-border` | `rgba(232,228,216,0.08)` | Glass element borders |
| `--glass-shadow` | `0 8px 32px rgba(0,0,0,0.25)` | Glass drop shadows |

## Accent Glow Opacity Tiers

Three tiers for `rgba(242, 132, 58, X)` usage:

| Tier | Opacity | Usage |
|------|---------|-------|
| Subtle | `0.04` | Card background tints, section `::before` ambient glow |
| Medium | `0.08` | Hover backgrounds, selected states, focused elements |
| Strong | `0.15` | Active states, border highlights, box-shadow glows |

## Gradients

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-accent` | `linear-gradient(135deg, #F2843A 0%, #E06B28 100%)` | Primary buttons, icon backgrounds, gradient text |
| `--gradient-accent-hover` | `linear-gradient(135deg, #F5A060 0%, #F2843A 100%)` | Button hover states |
| `--gradient-surface` | `linear-gradient(145deg, rgba(30,45,77,0.6) 0%, rgba(26,37,64,0.4) 100%)` | Card backgrounds with depth |
| `--gradient-glow` | `radial-gradient(ellipse at center, rgba(242,132,58,0.12) 0%, transparent 70%)` | Ambient section glow |

## Typography

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| Display | Archivo Black | Impact, sans-serif | Headings (h1-h4), stat numbers, card titles |
| Body | Inter | system-ui, sans-serif | Paragraphs, descriptions, form labels |
| Mono | JetBrains Mono | Consolas, monospace | Eyebrow labels, meta text, code snippets |

### Type Scale
| Element | Size | Weight | Font |
|---------|------|--------|------|
| h1 | `clamp(2.5rem, 6vw, 4.5rem)` | 400 | Display |
| h2 | `clamp(1.6rem, 4vw, 2.6rem)` | 400 | Display |
| h3 | `clamp(1rem, 2vw, 1.25rem)` | 400 | Display |
| Body | `1rem` (16px) | 400 | Body |
| Eyebrow | `0.72rem` | 500 | Mono |
| Meta/Label | `0.72rem` | 400-500 | Mono |
| Small | `0.85rem` | 400 | Body |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `6rem 0` | Default section vertical padding |
| Section padding (mobile) | `4rem 0` | Below 768px |
| Container | `min(1200px, 92vw)` | Max content width |
| Container narrow | `min(900px, 92vw)` | Blog posts, focused content |
| Card padding | `2.5rem 2rem` | Standard card internal spacing |
| Grid gap | `2rem` | Default grid gap |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Buttons, small elements |
| `--radius-md` | `10px` | Cards, inputs |
| `--radius-lg` | `16px` | Large cards, images |
| `--radius-xl` | `24px` | Hero elements, modals |

## Component Patterns

### Cards
All card types (`.svc-card`, `.pricing-card`, `.blog-card`) share:
- `border-top: 2px solid var(--accent)`
- `border: 1px solid var(--border-strong)`
- `border-radius: var(--radius-lg)` for service/pricing, `var(--radius-md)` for blog
- Hover: `translateY(-4px)` with enhanced box-shadow
- Background: `var(--gradient-surface)` with `backdrop-filter: blur(12px)`

### Glass Effect
Used on header (scrolled), stats band, overlay elements:
- `backdrop-filter: blur(20px) saturate(1.4)`
- Background: `var(--glass-bg)` or similar low-opacity navy
- Border: `var(--glass-border)`

### Buttons
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `var(--gradient-accent)` | white | none |
| Outline | `rgba(242,132,58,0.04)` | `var(--text-secondary)` | `var(--accent-border)` |
| Light | `var(--cream)` | `var(--text-dark)` | none |

All buttons: `translateY(-3px)` on hover, `translateY(-1px)` on active.

### Eyebrow Labels
- Font: `var(--font-mono)`, `0.72rem`, `500` weight
- Color: `var(--accent)`
- Letter-spacing: `0.06em`
- Uppercase
- Preceded by a 24px x 2px accent line (`::before`)

### Reveal Animations
- Classes: `.reveal-up`, `.reveal-left`, `.reveal-scale`
- Triggered by IntersectionObserver at 15% threshold
- Add `.revealed` class on intersection
- Must respect `prefers-reduced-motion: reduce`

## Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `0.25s cubic-bezier(0.16, 1, 0.3, 1)` | Hovers, focus states |
| `--transition-medium` | `0.45s cubic-bezier(0.16, 1, 0.3, 1)` | Nav underlines, reveals |
| `--transition-slow` | `0.9s cubic-bezier(0.16, 1, 0.3, 1)` | Page transitions |

## Responsive Breakpoints

| Width | Changes |
|-------|---------|
| 1024px | Hero grid stacks, case study stacks |
| 900px | Service/pricing/blog grids to 1 column, process to 2 columns |
| 768px | Hamburger nav, section padding reduces to 4rem, stats band to 2 columns |
| 600px | Form rows stack, process to 1 column |
| 480px | Container to 95vw, hero CTAs stack |

## BEM Naming Convention

All classes follow Block__Element--Modifier:
- `.section__header--center`
- `.svc-card__icon`
- `.pricing-card--featured`
- `.blog-card__excerpt`
- `.hero__proof` (social proof strip)
- `.stats-band__row` (row wrapper)
- `.compare__col--accent` (comparison column)
