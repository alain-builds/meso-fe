// ─── Font families ────────────────────────────────────────────────────────────

export const fontFamilies = {
  display: "'Funnel Display', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
} as const

export const fontFamilyVars = {
  display: 'var(--font-display)',
  body:    'var(--font-body)',
  mono:    'var(--font-mono)',
} as const

// ─── Type scale ───────────────────────────────────────────────────────────────
// Each entry maps to a semantic CSS class in colors_and_type.css (.t-hero, .t-h1, …)

export const typeScale = {
  eyebrow: {
    family:        'display' as const,
    size:          '12px',
    weight:        600,
    letterSpacing: '-0.2px',
  },
  hero: {
    family:        'display' as const,
    size:          '84px',
    weight:        700,
    letterSpacing: '-3px',
    lineHeight:    1.0,
  },
  h1: {
    family:        'display' as const,
    size:          '44px',
    weight:        700,
    letterSpacing: '-1.5px',
    lineHeight:    1.04,
  },
  h2: {
    family:        'display' as const,
    size:          '28px',
    weight:        700,
    letterSpacing: '-0.8px',
    lineHeight:    1.1,
  },
  h3: {
    family:        'display' as const,
    size:          '20px',
    weight:        600,
    letterSpacing: '-0.4px',
    lineHeight:    1.2,
  },
  bodyLg: {
    family:     'body' as const,
    size:       '17px',
    lineHeight: 1.70,
  },
  body: {
    family:     'body' as const,
    size:       '14px',
    lineHeight: 1.65,
  },
  ui: {
    family: 'body' as const,
    size:   '13px',
    weight: 500,
  },
  labelA: {
    family:        'body' as const,
    size:          '10px',
    weight:        600,
    letterSpacing: '0.10em',
    textTransform: 'uppercase' as const,
  },
  labelB: {
    family: 'body' as const,
    size:   '11px',
    weight: 500,
  },
  mono: {
    family:     'mono' as const,
    size:       '12px',
    lineHeight: 1.8,
  },
} as const

export type TypeScaleToken   = keyof typeof typeScale
export type FontFamilyToken  = keyof typeof fontFamilies
