import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const OwnerRow = ({ owner, isLast }) => (
  <div style={{
    display:       'flex',
    alignItems:    'center',
    justifyContent:'space-between',
    gap:           spacing.m,
    paddingTop:    spacing.s,
    paddingBottom: spacing.s,
    borderBottom:  isLast ? 'none' : `1px solid ${colors.border}`,
  }}>
    <span style={{
      fontFamily: fontFamilies.body,
      fontSize:   typeScale.ui.size,
      fontWeight: 500,
      color:      colors.textPrimary,
    }}>
      {owner.name}
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
      {owner.nodeType === 'team' ? 'Team' : 'Role'}
    </span>
  </div>
)

const OwnersTab = ({ detail }) => {
  const owners  = detail.owners ?? []
  const teams   = owners.filter(o => o.nodeType === 'team')
  const roles   = owners.filter(o => o.nodeType === 'role')

  if (owners.length === 0) {
    return (
      <SectionCard>
        <EmptyState text="No owners have been assigned to this capability." />
      </SectionCard>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>
      {teams.length > 0 && (
        <SectionCard>
          <SectionHeading>Owning teams</SectionHeading>
          {teams.map((o, i) => <OwnerRow key={o.id} owner={o} isLast={i === teams.length - 1} />)}
        </SectionCard>
      )}
      {roles.length > 0 && (
        <SectionCard>
          <SectionHeading>Owning roles</SectionHeading>
          {roles.map((o, i) => <OwnerRow key={o.id} owner={o} isLast={i === roles.length - 1} />)}
        </SectionCard>
      )}
    </div>
  )
}

export { OwnersTab }
