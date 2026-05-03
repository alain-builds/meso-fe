import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const LEVEL_STYLES = {
  l1: { background: colors.tealSoft,   color: colors.teal          },
  l2: { background: colors.stone2,     color: colors.textSecondary  },
  l3: { background: colors.stone2,     color: colors.textTertiary   },
}

const LevelBadge = ({ level }) => {
  const s = LEVEL_STYLES[level] ?? LEVEL_STYLES.l2
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      padding:       '2px 8px',
      borderRadius:  radii.sm,
      background:    s.background,
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelB.size,
      fontWeight:    600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color:         s.color,
      flexShrink:    0,
    }}>
      {level?.toUpperCase()}
    </span>
  )
}

const SubCapabilitiesTab = ({ detail }) => {
  const subCapabilities = detail.subCapabilities ?? []

  return (
    <SectionCard>
      <SectionHeading>Sub-capabilities</SectionHeading>
      {subCapabilities.length === 0 ? (
        <EmptyState text="This capability has no sub-capabilities." />
      ) : (
        subCapabilities.map((cap, i) => (
          <div
            key={cap.id}
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'space-between',
              gap:           spacing.m,
              paddingTop:    spacing.s,
              paddingBottom: spacing.s,
              borderBottom:  i < subCapabilities.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.ui.size,
                fontWeight: 500,
                color:      colors.textPrimary,
              }}>
                {cap.name}
              </div>
              {cap.description && (
                <div style={{
                  fontFamily: fontFamilies.body,
                  fontSize:   typeScale.labelB.size,
                  color:      colors.textTertiary,
                  marginTop:  2,
                  overflow:       'hidden',
                  textOverflow:   'ellipsis',
                  whiteSpace:     'nowrap',
                }}>
                  {cap.description}
                </div>
              )}
            </div>
            <LevelBadge level={cap.level} />
          </div>
        ))
      )}
    </SectionCard>
  )
}

export { SubCapabilitiesTab }
