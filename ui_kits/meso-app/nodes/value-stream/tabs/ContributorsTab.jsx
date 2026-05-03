import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const TYPE_LABEL = {
  team:    'Team',
  role:    'Role',
  service: 'Service',
  process: 'Process',
}

const TYPE_ORDER = ['team', 'role', 'service', 'process']

const NodeTypePill = ({ nodeType }) => (
  <span style={{
    display:      'inline-flex',
    alignItems:   'center',
    padding:      '2px 8px',
    borderRadius: radii.sm,
    background:   colors.stone2,
    fontFamily:   fontFamilies.body,
    fontSize:     typeScale.labelB.size,
    fontWeight:   500,
    color:        colors.textSecondary,
    flexShrink:   0,
  }}>
    {TYPE_LABEL[nodeType] ?? nodeType}
  </span>
)

const ContributorsTab = ({ detail }) => {
  const contributors = detail.contributors ?? []

  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const items = contributors.filter(c => c.nodeType === type)
    if (items.length > 0) acc.push({ type, items })
    return acc
  }, [])

  if (contributors.length === 0) {
    return (
      <SectionCard>
        <EmptyState text="No contributors have been mapped to this value stream." />
      </SectionCard>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>
      {grouped.map(({ type, items }) => (
        <SectionCard key={type}>
          <SectionHeading>{TYPE_LABEL[type]}s</SectionHeading>
          {items.map((c, i) => (
            <div
              key={c.id}
              style={{
                display:       'flex',
                alignItems:    'center',
                justifyContent:'space-between',
                gap:           spacing.m,
                paddingTop:    spacing.s,
                paddingBottom: spacing.s,
                borderBottom:  i < items.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <span style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.ui.size,
                fontWeight: 500,
                color:      colors.textPrimary,
              }}>
                {c.name}
              </span>
              <NodeTypePill nodeType={c.nodeType} />
            </div>
          ))}
        </SectionCard>
      ))}
    </div>
  )
}

export { ContributorsTab }
