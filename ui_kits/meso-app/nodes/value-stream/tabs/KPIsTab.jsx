import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const CONTRIBUTION_STYLES = {
  owns:        { background: colors.tealSoft,   color: colors.teal   },
  contributes: { background: colors.stone2,     color: colors.textSecondary },
  influences:  { background: colors.stone2,     color: colors.textTertiary  },
}

const ContributionPill = ({ type }) => {
  const s = CONTRIBUTION_STYLES[type] ?? CONTRIBUTION_STYLES.contributes
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      padding:      '2px 8px',
      borderRadius: radii.sm,
      background:   s.background,
      fontFamily:   fontFamilies.body,
      fontSize:     typeScale.labelB.size,
      fontWeight:   500,
      color:        s.color,
      flexShrink:   0,
    }}>
      {type}
    </span>
  )
}

const KPIsTab = ({ detail }) => {
  const kpis = detail.kpis ?? []

  return (
    <SectionCard>
      <SectionHeading>KPI contributions</SectionHeading>
      {kpis.length === 0 ? (
        <EmptyState text="No KPIs have been mapped to this value stream." />
      ) : (
        kpis.map((kpi, i) => (
          <div
            key={kpi.id}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           spacing.m,
              paddingTop:    spacing.s,
              paddingBottom: spacing.s,
              borderBottom:  i < kpis.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.ui.size,
                fontWeight: 500,
                color:      colors.textPrimary,
              }}>
                {kpi.name}
              </div>
              <div style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.labelB.size,
                color:      colors.textTertiary,
                marginTop:  2,
              }}>
                {kpi.category} · {kpi.unit}
              </div>
            </div>
            <ContributionPill type={kpi.contributionType} />
          </div>
        ))
      )}
    </SectionCard>
  )
}

export { KPIsTab }
