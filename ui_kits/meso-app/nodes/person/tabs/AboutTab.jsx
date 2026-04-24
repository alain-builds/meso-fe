import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Icon } from '../../../Components'

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
            : <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>Not specified</div>
          }
        </div>
      </SectionCard>
    </div>

    {/* Social links + channels */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.l }}>

      <SectionCard>
        <SectionHeading>Social links</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {detail.socialLinks?.length > 0
            ? detail.socialLinks.map(link => (
                <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
                  <Icon name="arrow-up-right" size={14} color={colors.textTertiary} strokeWidth={1.5} />
                  <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.teal, cursor: 'pointer' }}>
                    {link.label}
                  </span>
                </div>
              ))
            : <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>No links added.</div>
          }
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Channels</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {detail.communicationChannels?.length > 0
            ? detail.communicationChannels.map(ch => (
                <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
                  <Icon name="share-2" size={14} color={colors.textTertiary} strokeWidth={1.5} />
                  <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary }}>
                    {ch.name}
                  </span>
                </div>
              ))
            : <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>No channels added.</div>
          }
        </div>
      </SectionCard>
    </div>
  </div>
)

export { AboutTab }
