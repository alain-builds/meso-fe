// ─── Easing curves ────────────────────────────────────────────────────────────
// Never bounce, spring, or linear — quiet-authority brand.

export const easing = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in:  'cubic-bezier(0.7, 0, 0.84, 0)',
} as const

export const easingVars = {
  out: 'var(--ease)',
  in:  'var(--ease-in)',
} as const

// ─── Durations ────────────────────────────────────────────────────────────────

export const duration = {
  fast:    '100ms',   // hover fills, icon colour shifts
  micro:   '150ms',   // hover interactions (buttons, cards, icons)
  medium:  '200ms',   // layout transitions (sidebar, modal enter)
  slow:    '400ms',   // scroll entrances (fade + 12px translate)
  stagger: '60ms',    // per-item delay for staggered lists
} as const

export const durationVars = {
  fast:    'var(--t-fast)',
  micro:   'var(--t-micro)',
  medium:  'var(--t-medium)',
  slow:    'var(--t-slow)',
  stagger: 'var(--stagger)',
} as const

export type EasingToken   = keyof typeof easing
export type DurationToken = keyof typeof duration
