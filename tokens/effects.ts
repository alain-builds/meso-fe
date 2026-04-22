// ─── Shadows — three levels, cards only ──────────────────────────────────────
// Never inner shadows. Never coloured shadows. Never borders on cards.

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.06)',    // rest state
  md: '0 4px 16px rgba(0, 0, 0, 0.10)',   // hover + dropdowns
  lg: '0 16px 48px rgba(0, 0, 0, 0.18)',  // modals + toasts
} as const

export const shadowVars = {
  sm: 'var(--shadow-1)',
  md: 'var(--shadow-2)',
  lg: 'var(--shadow-3)',
} as const

// ─── Border radii ─────────────────────────────────────────────────────────────
// Nothing above 16px. No fully pill-shaped elements.

export const radii = {
  sm: '5px',    // pills
  md: '8px',    // buttons, inputs
  lg: '12px',   // cards, toasts
  xl: '16px',   // modals
} as const

export const radiiVars = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
} as const

export type ShadowToken = keyof typeof shadows
export type RadiusToken = keyof typeof radii
