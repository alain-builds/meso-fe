import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const AboutTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    <SectionCard>
      <SectionHeading>Business outcomes</SectionHeading>
      {(detail.businessOutcomes ?? []).length === 0 ? (
        <EmptyState text="No business outcomes have been defined for this value stream." />
      ) : (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {detail.businessOutcomes.map((outcome, i) => (
            <li
              key={i}
              style={{
                display:       'flex',
                alignItems:    'flex-start',
                gap:           spacing.m,
                paddingTop:    spacing.s,
                paddingBottom: spacing.s,
                borderBottom:  i < detail.businessOutcomes.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <span style={{
                flexShrink:  0,
                width:        6,
                height:       6,
                marginTop:    7,
                borderRadius: '50%',
                background:   colors.teal,
              }} />
              <span style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.body.size,
                lineHeight: typeScale.body.lineHeight,
                color:      colors.textPrimary,
              }}>
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>

  </div>
)

export { AboutTab }
