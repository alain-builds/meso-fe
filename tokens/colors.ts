// ─── Raw values (light mode baseline) ────────────────────────────────────────

export const colors = {
  // Surfaces
  stone:        '#F4F3F0',
  stone2:       '#ECEAE7',
  white:        '#FFFFFF',
  ink:          '#141412',
  inkSoft:      '#1E1D1B',

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
  white:         'var(--white)',
  ink:           'var(--ink)',
  inkSoft:       'var(--ink-soft)',
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
  error:         'var(--error)',
  success:       'var(--success)',
  border:        'var(--border)',
  borderMid:     'var(--border-mid)',
  borderStrong:  'var(--border-strong)',
} as const

export type ColorToken    = keyof typeof colors
export type ColorVar      = keyof typeof colorVars
export type DarkColorToken = keyof typeof darkColors
