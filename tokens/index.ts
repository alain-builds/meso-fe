export * from './colors'
export * from './typography'
export * from './spacing'
export * from './motion'
export * from './effects'

import { colors, colorVars, darkColors }               from './colors'
import { fontFamilies, fontFamilyVars, typeScale }      from './typography'
import { spacing, spacingVars, layout, layoutVars }     from './spacing'
import { easing, easingVars, duration, durationVars }   from './motion'
import { shadows, shadowVars, radii, radiiVars }        from './effects'

// Combined tokens object — use for passing the full system to theme providers
export const tokens = {
  colors,
  colorVars,
  darkColors,
  fontFamilies,
  fontFamilyVars,
  typeScale,
  spacing,
  spacingVars,
  layout,
  layoutVars,
  easing,
  easingVars,
  duration,
  durationVars,
  shadows,
  shadowVars,
  radii,
  radiiVars,
} as const

export type Tokens = typeof tokens
