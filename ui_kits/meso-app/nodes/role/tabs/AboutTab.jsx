import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'
import { LinksAndChannels }                        from '../../../shared/LinksAndChannels'

const AboutTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* Purpose */}
    <SectionCard>
      <SectionHeading>Purpose</SectionHeading>
      <p style={{
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.bodyLg.size,
        lineHeight: typeScale.bodyLg.lineHeight,
        color:      colors.ink,
        margin:     0,
      }}>
        {detail.purpose}
      </p>
    </SectionCard>

    {/* Responsibilities */}
    <SectionCard>
      <SectionHeading>Responsibilities</SectionHeading>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: spacing.s }}>
        {detail.responsibilities.map(r => (
          <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.s, fontFamily: fontFamilies.body, fontSize: typeScale.body.size, lineHeight: typeScale.body.lineHeight, color: colors.textSecondary }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: colors.teal, flexShrink: 0, marginTop: '8px' }} />
            {r}
          </li>
        ))}
      </ul>
    </SectionCard>

    {/* Decision authorities */}
    <SectionCard>
      <SectionHeading>Decision authorities</SectionHeading>
      {detail.decisionAuthorities.length === 0 ? (
        <EmptyState text="No decision authorities defined." />
      ) : (
        detail.decisionAuthorities.map((d, i) => (
          <div key={d.title} style={{
            display: 'grid', gridTemplateColumns: '1fr 160px 100px',
            alignItems: 'center', gap: spacing.m,
            padding: `${spacing.m} 0`,
            borderBottom: i < detail.decisionAuthorities.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}>
            <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink }}>{d.title}</div>
            <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textSecondary }}>{d.authorityType}</div>
            <div style={{ fontFamily: fontFamilies.mono, fontSize: typeScale.mono.size, color: colors.textTertiary, textAlign: 'right' }}>{d.threshold}</div>
          </div>
        ))
      )}
    </SectionCard>

    {/* Links + channels */}
    <LinksAndChannels
      links={detail.workspaceLinks}
      channels={detail.communicationChannels}
    />

  </div>
)

export { AboutTab }
