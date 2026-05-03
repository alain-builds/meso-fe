import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const ProcessesTab = ({ detail }) => {
  const processes = detail.processes ?? []

  return (
    <SectionCard>
      <SectionHeading>Processes</SectionHeading>
      {processes.length === 0 ? (
        <EmptyState text="No processes have been mapped to this capability." />
      ) : (
        processes.map((p, i) => (
          <div
            key={p.id}
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'space-between',
              gap:           spacing.m,
              paddingTop:    spacing.s,
              paddingBottom: spacing.s,
              borderBottom:  i < processes.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}
          >
            <span style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.ui.size,
              fontWeight: 500,
              color:      colors.textPrimary,
              flex:       1,
            }}>
              {p.name}
            </span>
            <div style={{ display: 'flex', gap: spacing.s, flexShrink: 0 }}>
              <span style={{
                padding:      '2px 8px',
                borderRadius: radii.sm,
                background:   colors.stone2,
                fontFamily:   fontFamilies.body,
                fontSize:     typeScale.labelB.size,
                color:        colors.textSecondary,
              }}>
                {p.type}
              </span>
              {p.status === 'active' && (
                <span style={{
                  padding:      '2px 8px',
                  borderRadius: radii.sm,
                  background:   colors.tealSoft,
                  fontFamily:   fontFamilies.body,
                  fontSize:     typeScale.labelB.size,
                  color:        colors.teal,
                }}>
                  Active
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </SectionCard>
  )
}

export { ProcessesTab }
