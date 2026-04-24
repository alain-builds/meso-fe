import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Pill } from '../../../Components'

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

const GroupRow = ({ item, isLast }) => (
  <div style={{
    display:      'flex',
    alignItems:   'center',
    justifyContent: 'space-between',
    padding:      `${spacing.m} 0`,
    borderBottom: isLast ? 'none' : `1px solid ${colors.border}`,
  }}>
    <div>
      <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink, marginBottom: '2px' }}>
        {item.name}
      </div>
      {item.domain && (
        <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textSecondary }}>
          {item.domain}
        </div>
      )}
    </div>
    {item.isLead
      ? <Pill variant="teal" dot="live">Lead</Pill>
      : <Pill variant="neutral">Member</Pill>
    }
  </div>
)

const TeamsCommunitiesTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    <SectionCard>
      <SectionHeading>Teams ({detail.teams.length})</SectionHeading>
      {detail.teams.length === 0
        ? <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>Not a member of any team.</div>
        : detail.teams.map((t, i) => <GroupRow key={t.id} item={t} isLast={i === detail.teams.length - 1} />)
      }
    </SectionCard>

    <SectionCard>
      <SectionHeading>Communities ({detail.communities.length})</SectionHeading>
      {detail.communities.length === 0
        ? <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>Not a member of any community.</div>
        : detail.communities.map((c, i) => <GroupRow key={c.id} item={c} isLast={i === detail.communities.length - 1} />)
      }
    </SectionCard>

  </div>
)

export { TeamsCommunitiesTab }
