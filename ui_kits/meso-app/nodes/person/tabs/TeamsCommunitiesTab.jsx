import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Pill }                                    from '../../../Components'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'

const GroupRow = ({ item, isLast }) => (
  <div style={{
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        `${spacing.m} 0`,
    borderBottom:   isLast ? 'none' : `1px solid ${colors.border}`,
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
        ? <EmptyState text="Not a member of any team." />
        : detail.teams.map((t, i) => <GroupRow key={t.id} item={t} isLast={i === detail.teams.length - 1} />)
      }
    </SectionCard>

    <SectionCard>
      <SectionHeading>Communities ({detail.communities.length})</SectionHeading>
      {detail.communities.length === 0
        ? <EmptyState text="Not a member of any community." />
        : detail.communities.map((c, i) => <GroupRow key={c.id} item={c} isLast={i === detail.communities.length - 1} />)
      }
    </SectionCard>

  </div>
)

export { TeamsCommunitiesTab }
