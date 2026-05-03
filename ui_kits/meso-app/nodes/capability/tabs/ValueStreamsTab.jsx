import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const ValueStreamsTab = ({ detail }) => {
  const valueStreams = detail.valueStreams ?? []

  return (
    <SectionCard>
      <SectionHeading>Enabled value streams</SectionHeading>
      {valueStreams.length === 0 ? (
        <EmptyState text="This capability has not been mapped to any value streams." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {valueStreams.map(vs => (
            <div
              key={vs.id}
              style={{
                background:   colors.stone,
                borderRadius: radii.md,
                padding:      spacing.m,
              }}
            >
              <div style={{
                fontFamily:   fontFamilies.body,
                fontSize:     typeScale.ui.size,
                fontWeight:   600,
                color:        colors.textPrimary,
                marginBottom: spacing.xs,
              }}>
                {vs.name}
              </div>
              {vs.firstOutcome && (
                <p style={{
                  fontFamily:        fontFamilies.body,
                  fontSize:          typeScale.body.size,
                  lineHeight:        typeScale.body.lineHeight,
                  color:             colors.textSecondary,
                  overflow:          'hidden',
                  display:           '-webkit-box',
                  WebkitLineClamp:   2,
                  WebkitBoxOrient:   'vertical',
                  margin:            0,
                }}>
                  {vs.firstOutcome}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

export { ValueStreamsTab }
