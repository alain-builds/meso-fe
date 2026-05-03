import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const LEVEL_STYLES = {
  l1: { background: colors.tealSoft,   color: colors.teal   },
  l2: { background: colors.stone2,     color: colors.textSecondary },
  l3: { background: colors.stone2,     color: colors.textTertiary  },
}

const LevelBadge = ({ level }) => {
  const s = LEVEL_STYLES[level] ?? LEVEL_STYLES.l1
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      padding:      '2px 8px',
      borderRadius: radii.sm,
      background:   s.background,
      fontFamily:   fontFamilies.body,
      fontSize:     typeScale.labelB.size,
      fontWeight:   600,
      color:        s.color,
      flexShrink:   0,
      textTransform:'uppercase',
      letterSpacing:'0.04em',
    }}>
      {level?.toUpperCase()}
    </span>
  )
}

const CapabilitiesTab = ({ detail }) => {
  const capabilities = detail.capabilities ?? []

  return (
    <SectionCard>
      <SectionHeading>Enabling capabilities</SectionHeading>
      {capabilities.length === 0 ? (
        <EmptyState text="No capabilities have been mapped to this value stream." />
      ) : (
        capabilities.map((cap, i) => (
          <div
            key={cap.id}
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'space-between',
              gap:           spacing.m,
              paddingTop:    spacing.s,
              paddingBottom: spacing.s,
              borderBottom:  i < capabilities.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}
          >
            <span style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.ui.size,
              fontWeight: 500,
              color:      colors.textPrimary,
              flex:       1,
            }}>
              {cap.name}
            </span>
            <LevelBadge level={cap.level} />
          </div>
        ))
      )}
    </SectionCard>
  )
}

export { CapabilitiesTab }
