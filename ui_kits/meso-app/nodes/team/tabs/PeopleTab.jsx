import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { PersonCard } from '../../../shared/PersonCard'
import { MemberTable } from '../../../shared/MemberTable'
import { MetricsBar }  from '../../../shared/MetricsBar'

const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelB.size,
    fontWeight:    600,
    letterSpacing: '0.06em',
    color:         colors.textTertiary,
    textTransform: 'uppercase',
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)

const SectionCard = ({ children }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
  }}>
    {children}
  </div>
)

const PeopleTab = ({ detail }) => {
  const vacancyCount = detail.members?.filter(m => m.isVacant).length ?? 0

  const chips = [
    { id: 'total',     value: `${detail.directMemberCount}`,          label: 'members'  },
    { id: 'vacancies', value: vacancyCount > 0 ? `${vacancyCount}` : 'None', label: 'vacancies' },
    { id: 'internal',  value: `${detail.directInternalMemberCount}`,  label: 'internal' },
    { id: 'external',  value: `${detail.directExternalMemberCount}`,  label: 'external' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      <MetricsBar chips={chips} />

      {/* Team leads */}
      <SectionCard>
        <SectionHeading>Team leads</SectionHeading>
        {detail.leads.length === 0 ? (
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.body.size,
            color:      colors.textTertiary,
            padding:    `${spacing.m} 0`,
          }}>
            No leads assigned.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {detail.leads.map((lead, i) => (
              <div
                key={lead.id}
                style={{ borderBottom: i < detail.leads.length - 1 ? `1px solid ${colors.border}` : 'none' }}
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

      {/* Members & roles */}
      <SectionCard>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: spacing.m }}>
          <SectionHeading>Members & roles</SectionHeading>
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textTertiary,
          }}>
            {detail.members.length} total
          </span>
        </div>
        <MemberTable members={detail.members} emptyMessage="No members assigned to this team." />
      </SectionCard>

      {/* Internal / external split */}
      <SectionCard>
        <SectionHeading>Internal / external split</SectionHeading>
        <div style={{ display: 'flex', gap: spacing.xl }}>
          <div>
            <div style={{
              fontFamily:    fontFamilies.display,
              fontSize:      typeScale.h3.size,
              fontWeight:    typeScale.h3.weight,
              letterSpacing: typeScale.h3.letterSpacing,
              color:         colors.ink,
              lineHeight:    1.1,
            }}>
              {detail.directInternalMemberCount}
            </div>
            <div style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textTertiary,
              marginTop:  '4px',
            }}>
              Internal
            </div>
          </div>
          <div style={{ width: '1px', background: colors.border, alignSelf: 'stretch' }} />
          <div>
            <div style={{
              fontFamily:    fontFamilies.display,
              fontSize:      typeScale.h3.size,
              fontWeight:    typeScale.h3.weight,
              letterSpacing: typeScale.h3.letterSpacing,
              color:         colors.ink,
              lineHeight:    1.1,
            }}>
              {detail.directExternalMemberCount}
            </div>
            <div style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textTertiary,
              marginTop:  '4px',
            }}>
              External
            </div>
          </div>
        </div>
      </SectionCard>

    </div>
  )
}

export { PeopleTab }
