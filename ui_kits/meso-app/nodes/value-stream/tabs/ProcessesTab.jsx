import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const ProcessesTab = ({ detail }) => {
  const processes = detail.processes ?? []

  return (
    <SectionCard>
      <SectionHeading>Processes</SectionHeading>
      {processes.length === 0 ? (
        <EmptyState text="No processes have been mapped to this value stream." />
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
            <span style={{
              padding:      '2px 8px',
              borderRadius: radii.sm,
              background:   colors.stone2,
              fontFamily:   fontFamilies.body,
              fontSize:     typeScale.labelB.size,
              color:        colors.textSecondary,
              flexShrink:   0,
            }}>
              {p.type}
            </span>
          </div>
        ))
      )}
    </SectionCard>
  )
}

export { ProcessesTab }
