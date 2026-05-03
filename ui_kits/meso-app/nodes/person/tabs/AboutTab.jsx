import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'
import { LinksAndChannels }                        from '../../../shared/LinksAndChannels'

const AboutTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* About me narrative */}
    {detail.aboutMe && (
      <SectionCard>
        <SectionHeading>About</SectionHeading>
        <p style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.bodyLg.size,
          lineHeight: typeScale.bodyLg.lineHeight,
          color:      colors.ink,
          margin:     0,
        }}>
          {detail.aboutMe}
        </p>
      </SectionCard>
    )}

    {/* Pronouns + personality */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.l }}>

      <SectionCard>
        <SectionHeading>Pronouns</SectionHeading>
        <div style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.ui.size,
          color:      detail.pronouns ? colors.ink : colors.textTertiary,
        }}>
          {detail.pronouns ?? 'Not specified'}
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Personality profiles</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
          {detail.personalityProfiles?.length > 0
            ? detail.personalityProfiles.map(p => (
                <div key={p.type} style={{
                  fontFamily: fontFamilies.body,
                  fontSize:   typeScale.ui.size,
                  color:      colors.textSecondary,
                }}>
                  <span style={{ fontWeight: 500, color: colors.ink }}>{p.type}</span>
                  {' · '}
                  {p.value}
                </div>
              ))
            : <EmptyState text="Not specified" />
          }
        </div>
      </SectionCard>
    </div>

    {/* Social links + channels */}
    <LinksAndChannels
      links={detail.socialLinks}
      channels={detail.communicationChannels}
      linksLabel="Social links"
    />

  </div>
)

export { AboutTab }
