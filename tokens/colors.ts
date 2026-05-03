// ─── Raw values (light mode baseline) ────────────────────────────────────────

export const colors = {
  // Surfaces
  stone:        '#F4F3F0',
  stone2:       '#ECEAE7',
  stone3:       '#DCDAD7', // button stone hover state
  white:        '#FFFFFF',
  ink:          '#141412',
  inkSoft:      '#1E1D1B',
  whiteDim:     'rgba(255, 255, 255, 0.38)', // muted text/labels on ink surfaces
  stoneText:    'rgba(244, 243, 240, 0.92)',  // primary text on dark ink surfaces
  stoneFaint:   'rgba(244, 243, 240, 0.40)',  // muted icons/text on dark ink surfaces

  // Text hierarchy
  textPrimary:   '#141412',
  textSecondary: '#6B6966',
  textTertiary:  '#A8A6A2',

  // Primary accent
  teal:         '#1A6B5C',
  tealMid:      '#23876E',
  tealSoft:     'rgba(26, 107, 92, 0.09)',
  tealBorder:   'rgba(26, 107, 92, 0.25)',

  // Secondary accents — blooms only, never flat fills or text
  blue:         '#3A5CA8',
  indigo:       '#5844BA',
  amber:        '#C27C24',
  rose:         '#A84458',

  // Soft chip backgrounds for authority type chips
  blueSoft:     'rgba(58, 92, 168, 0.09)',
  indigoSoft:   'rgba(88, 68, 186, 0.09)',
  amberSoft:    'rgba(194, 124, 36, 0.09)',

  // Semantic
  error:        '#C0392B',
  success:      '#1A6B5C',

  // Borders
  border:       'rgba(20, 20, 18, 0.09)',
  borderMid:    'rgba(20, 20, 18, 0.14)',
  borderStrong: 'rgba(20, 20, 18, 0.22)',
} as const

// ─── Dark mode overrides ──────────────────────────────────────────────────────

export const darkColors = {
  stone:         '#0F0F0D',
  stone2:        '#161613',
  white:         '#1E1D1B',
  textPrimary:   'rgba(244, 243, 240, 0.92)',
  textSecondary: 'rgba(244, 243, 240, 0.62)',
  textTertiary:  'rgba(244, 243, 240, 0.36)',
  tealSoft:      'rgba(26, 107, 92, 0.20)',
  tealBorder:    'rgba(26, 107, 92, 0.30)',
  border:        'rgba(255, 255, 255, 0.07)',
  borderMid:     'rgba(255, 255, 255, 0.12)',
  borderStrong:  'rgba(255, 255, 255, 0.20)',
} as const

// ─── CSS var references (dark-mode aware, use in inline styles) ───────────────

export const colorVars = {
  stone:         'var(--stone)',
  stone2:        'var(--stone-2)',
  stone3:        'var(--stone-3)',
  white:         'var(--white)',
  ink:           'var(--ink)',
  inkSoft:       'var(--ink-soft)',
  whiteDim:      'var(--white-dim)',
  textPrimary:   'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textTertiary:  'var(--text-tertiary)',
  teal:          'var(--teal)',
  tealMid:       'var(--teal-mid)',
  tealSoft:      'var(--teal-soft)',
  tealBorder:    'var(--teal-border)',
  blue:          'var(--blue)',
  indigo:        'var(--indigo)',
  amber:         'var(--amber)',
  rose:          'var(--rose)',
  blueSoft:      'var(--blue-soft)',
  indigoSoft:    'var(--indigo-soft)',
  amberSoft:     'var(--amber-soft)',
  error:         'var(--error)',
  success:       'var(--success)',
  border:        'var(--border)',
  borderMid:     'var(--border-mid)',
  borderStrong:  'var(--border-strong)',
} as const

// Deterministic palette for entity (company) badge backgrounds — algorithm-based, not semantic.
export const entityBadgeColors = ['#1a1a2e', '#0f3460', '#533483', '#1b4332', '#7c3626'] as const

export type ColorToken    = keyof typeof colors
export type ColorVar      = keyof typeof colorVars
export type DarkColorToken = keyof typeof darkColors
