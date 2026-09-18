# GHMC Design System & Editorial Foundations

## 1. Typography Hierarchy (`ario-sans`)

The typography system is modeled on high-end Swiss editorial and luxury legal/consultancy standards (inspired by Ario Law Firm).

### Font Stack
- **Primary / Luxury Font**: `ario-sans, sans-serif`
  - Bold: `Helvetica-Bold.woff` (Weight 700)
  - Regular: `Helvetica-Regular.woff` (Weight 400)
  - Light: `Helvetica-Light.woff` (Weight 300)
- **Fallback**: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`

### Type Scales & Rules
| Role | Font Family | Size | Weight | Tracking | Line Height | Color |
|---|---|---|---|---|---|---|
| **Eyebrow / Category** | `ario-sans` | `11px – 11.5px` | 600 | `0.22em` (uppercase) | 1.2 | Brand Purple (`#372C5F`) |
| **Main Headline** | `ario-sans` | `2.1rem – 3.35rem` | 700 (Bold) | `-0.04em` (uppercase) | 1.04 | Deep Obsidian (`#020202`) |
| **Supporting Statement** | `ario-sans` | `15px – 15.5px` | 400 (Regular) | `-0.02em` | 1.55 | Neutral Slate (`#4a4d55`) |
| **CTA Button** | `ario-sans` | `13px` | 600 | `0.03em` | 1.0 | Pure White (`#ffffff`) |
| **Credibility Badge** | `ario-sans` | `10.5px – 11px` | 600 | `0.14em` (uppercase) | 1.0 | Brand Purple (`#372C5F`) |
| **GHMC Wordmark** | `ario-sans` | `clamp(3.75rem, 16vw, 17rem)` | 900 / 700 | `-0.05em` | 0.82 | Brand Purple / Pure White on scroll |

---

## 2. Color Palette & Tokens

- **Brand Signature Purple**: `#372C5F`
- **Obsidian Dark (Text Primary)**: `#020202`
- **Pure White**: `#ffffff`
- **Muted Slate (Supporting Text)**: `#4a4d55`
- **Subtle Surface Border**: `rgba(2, 2, 2, 0.08)` / `rgba(2, 2, 2, 0.1)`
- **Atmospheric Glow**: `radial-gradient(rgba(55, 44, 95, 0.06), transparent 60%)`

---

## 3. Motion & Animation Principles

### Entrance Choreography (Post-Preloader Wipe)
- Staggered individual elements reveal smoothly with masking:
  1. Eyebrow: `y: 24 → 0`, `opacity: 0 → 1` (`power3.out`, 0.85s)
  2. Headline Line 1: `y: 36 → 0` through clip mask (`power4.out`, 0.95s)
  3. Headline Line 2: `y: 36 → 0` through clip mask (`power4.out`, 0.95s, +80ms delay)
  4. Supporting Statement: `y: 24 → 0` (`power3.out`, 0.9s)
  5. CTA Button: `y: 28 → 0, scale: 0.96 → 1` (`back.out(1.3)`, 0.85s)
  6. Credibility Badge: `y: 28 → 0` (`power3.out`, 0.8s)

### Scroll Choreography (Pinned 200% Scrub)
- **NO PARALLAX DRIFT**: No differential velocity or vertical stretching on typography lines.
- **Unified Editorial Exit**: The entire headline block fades out cleanly in unison (`opacity: 0`, ease `power2.inOut`).
- **Video Expansion**: Bottom-right video card seamlessly clips outward from corner placeholder to 100% fullscreen coverage (`inset(0px round 0px)`).
- **Wordmark Transition**: "GHMC" glides upward and transitions each letter to `#ffffff` over the expanding video.
