import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { PersonCard } from '../../../shared/PersonCard'
import { MemberTable } from '../../../shared/MemberTable'

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

const MembersTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* Team leads */}
    <div style={{
      background:   colors.white,
      borderRadius: radii.lg,
      boxShadow:    shadows.sm,
      padding:      spacing.l,
    }}>
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
              style={{
                borderBottom: i < detail.leads.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
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
    </div>

    {/* All members */}
    <div style={{
      background:   colors.white,
      borderRadius: radii.lg,
      boxShadow:    shadows.sm,
      padding:      spacing.l,
    }}>
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
    </div>

  </div>
)

export { MembersTab }
