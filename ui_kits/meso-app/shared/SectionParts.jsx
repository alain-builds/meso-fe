import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'

const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelA.size,
    fontWeight:    typeScale.labelA.weight,
    letterSpacing: typeScale.labelA.letterSpacing,
    textTransform: typeScale.labelA.textTransform,
    color:         colors.textTertiary,
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)

const SectionCard = ({ children, style = {} }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
    ...style,
  }}>
    {children}
  </div>
)

const EmptyState = ({ text }) => (
  <p style={{
    fontFamily: fontFamilies.body,
    fontSize:   typeScale.body.size,
    color:      colors.textTertiary,
    margin:     0,
  }}>
    {text}
  </p>
)

export { SectionHeading, SectionCard, EmptyState }
