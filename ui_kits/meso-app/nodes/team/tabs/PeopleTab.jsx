import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { PersonCard }                                     from '../../../shared/PersonCard'
import { MemberTable }                                    from '../../../shared/MemberTable'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const LegendRow = ({ dotColor, dashed, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
    <div style={{
      width:        8,
      height:       8,
      borderRadius: '50%',
      flexShrink:   0,
      background:   dashed ? 'transparent' : dotColor,
      border:       dashed ? `1.5px dashed ${colors.borderMid}` : 'none',
    }} />
    <span style={{
      fontFamily: fontFamilies.body,
      fontSize:   typeScale.labelB.size,
      color:      colors.textSecondary,
      flex:       1,
    }}>
      {label}
    </span>
    <span style={{
      fontFamily: fontFamilies.body,
      fontSize:   typeScale.ui.size,
      fontWeight: 500,
      color:      colors.ink,
    }}>
      {value}
    </span>
  </div>
)

const PeopleOverviewCard = ({ members, asOf }) => {
  const filledInternal = members.filter(m => !m.isVacant && !m.isExternal).length
  const filledExternal = members.filter(m => !m.isVacant &&  m.isExternal).length
  const vacancies      = members.filter(m =>  m.isVacant).length
  const filled         = filledInternal + filledExternal
  const total          = members.length

  return (
    <SectionCard style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <SectionHeading>Staffing data</SectionHeading>
        {asOf && (
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textTertiary,
            whiteSpace: 'nowrap',
          }}>
            as of {asOf}
          </span>
        )}
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: spacing.s, marginBottom: spacing.m }}>
        <div style={{
          flex:         1,
          background:   colors.stone,
          borderRadius: radii.md,
          padding:      `${spacing.s} ${spacing.m}`,
          display:      'flex',
          alignItems:   'baseline',
          gap:          spacing.xs,
        }}>
          <div style={{
            fontFamily:    fontFamilies.display,
            fontSize:      typeScale.h3.size,
            fontWeight:    typeScale.h3.weight,
            letterSpacing: typeScale.h3.letterSpacing,
            lineHeight:    1.1,
            color:         colors.ink,
          }}>
            {filled}
          </div>
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            fontWeight: 600,
            color:      colors.textSecondary,
          }}>
            members
          </div>
        </div>

        <div style={{
          flex:         1,
          background:   colors.stone,
          borderRadius: radii.md,
          padding:      `${spacing.s} ${spacing.m}`,
          display:      'flex',
          alignItems:   'baseline',
          gap:          spacing.xs,
        }}>
          <div style={{
            fontFamily:    fontFamilies.display,
            fontSize:      typeScale.h3.size,
            fontWeight:    typeScale.h3.weight,
            letterSpacing: typeScale.h3.letterSpacing,
            lineHeight:    1.1,
            color:         colors.ink,
          }}>
            {total}
          </div>
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            fontWeight: 600,
            color:      colors.textSecondary,
          }}>
            roles
          </div>
        </div>
      </div>

      {/* Composition bar — 3 segments always sum to 100% */}
      <div style={{
        display:      'flex',
        height:       6,
        borderRadius: radii.sm,
        overflow:     'hidden',
        marginBottom: spacing.m,
      }}>
        {total > 0 && (
          <>
            <div style={{ width: `${(filledInternal / total) * 100}%`, background: colors.teal      }} />
            <div style={{ width: `${(filledExternal / total) * 100}%`, background: colors.ink       }} />
            <div style={{ width: `${(vacancies      / total) * 100}%`, background: colors.borderMid }} />
          </>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
        <LegendRow dotColor={colors.teal}      label="Internal"  value={filledInternal} />
        <LegendRow dotColor={colors.ink}       label="External"  value={filledExternal} />
        <LegendRow dotColor={colors.borderMid} label="Vacancies" value={vacancies}      />
      </div>
    </SectionCard>
  )
}

const PeopleTab = ({ detail }) => {
  const roleCount    = detail.members.length
  const memberCount  = detail.members.filter(m => !m.isVacant).length
  const vacancyCount = roleCount - memberCount

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      {/* Top row: composition overview + team leads */}
      <div style={{ display: 'flex', gap: spacing.l, alignItems: 'stretch' }}>
        <PeopleOverviewCard members={detail.members} asOf={detail.updatedAt} />

        <SectionCard style={{ flex: 1 }}>
          <SectionHeading>Team leads</SectionHeading>
          {(detail.leads ?? []).length === 0 ? (
            <EmptyState text="No leads assigned." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {(detail.leads ?? []).map((lead, i) => (
                <div
                  key={lead.id}
                  style={{ borderBottom: i < (detail.leads ?? []).length - 1 ? `1px solid ${colors.border}` : 'none' }}
                >
                  <PersonCard
                    name={lead.name}
                    roleLabel={lead.role}
                    isVacant={lead.isVacant}
                    isExternal={lead.isExternal}
                  />
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Members & roles */}
      <SectionCard>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: spacing.m }}>
          <SectionHeading>Members & roles</SectionHeading>
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textTertiary,
            display:    'flex',
            gap:        spacing.s,
          }}>
            <span>{roleCount} roles</span>
            <span style={{ color: colors.borderMid }}>·</span>
            <span>{memberCount} members</span>
            <span style={{ color: colors.borderMid }}>·</span>
            <span>{vacancyCount} {vacancyCount === 1 ? 'vacancy' : 'vacancies'}</span>
          </span>
        </div>
        <MemberTable members={detail.members} emptyMessage="No members assigned to this team." />
      </SectionCard>

    </div>
  )
}

export { PeopleTab }
