import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'
import { LevelBadge }                              from '../LevelBadge'

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
