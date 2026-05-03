import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Icon }                                     from '../Components'
import { SectionCard, SectionHeading, EmptyState }  from './SectionParts'

const LinksAndChannels = ({ links = [], channels = [], linksLabel = 'Workspace links' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.l }}>

    <SectionCard>
      <SectionHeading>{linksLabel}</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
        {links.length > 0
          ? links.map(link => (
              <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
                <Icon name="arrow-up-right" size={14} color={colors.textTertiary} strokeWidth={1.5} />
                <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.teal, cursor: 'pointer' }}>
                  {link.label}
                </span>
              </div>
            ))
          : <EmptyState text="No links added." />
        }
      </div>
    </SectionCard>

    <SectionCard>
      <SectionHeading>Channels</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
        {channels.length > 0
          ? channels.map(ch => (
              <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
                <Icon name="share-2" size={14} color={colors.textTertiary} strokeWidth={1.5} />
                <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary }}>
                  {ch.name}
                </span>
              </div>
            ))
          : <EmptyState text="No channels added." />
        }
      </div>
    </SectionCard>

  </div>
)

export { LinksAndChannels }
