// ─── Spacing scale (8px base) ─────────────────────────────────────────────────

export const spacing = {
  xs:  '4px',
  s:   '8px',
  m:   '16px',
  l:   '24px',
  xl:  '40px',
  xl2: '48px',
  xl3: '80px',
  xl4: '120px',
} as const

export const spacingVars = {
  xs:  'var(--sp-xs)',
  s:   'var(--sp-s)',
  m:   'var(--sp-m)',
  l:   'var(--sp-l)',
  xl:  'var(--sp-xl)',
  xl2: 'var(--sp-2xl)',
  xl3: 'var(--sp-3xl)',
  xl4: 'var(--sp-4xl)',
} as const

// ─── Layout constants ─────────────────────────────────────────────────────────

export const layout = {
  pageMax:       '1040px',
  pagePad:       '48px',
  pagePadMobile: '20px',
} as const

export const layoutVars = {
  pageMax:       'var(--page-max)',
  pagePad:       'var(--page-pad)',
  pagePadMobile: 'var(--page-pad-mobile)',
} as const

export type SpacingToken = keyof typeof spacing
export type LayoutToken  = keyof typeof layout
