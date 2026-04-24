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

const SectionCard = ({ children, style = {} }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
    ...style,
  }}>
    {children}
  </div>
)

const AboutTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* Purpose */}
    <SectionCard>
      <SectionHeading>Purpose</SectionHeading>
      <p style={{
        fontFamily:  fontFamilies.body,
        fontSize:    typeScale.bodyLg.size,
        lineHeight:  typeScale.bodyLg.lineHeight,
        color:       colors.ink,
        margin:      0,
      }}>
        {detail.purpose}
      </p>
    </SectionCard>

    {/* Responsibilities */}
    <SectionCard>
      <SectionHeading>Responsibilities</SectionHeading>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: spacing.s }}>
        {detail.responsibilities.map((r, i) => (
          <li key={r} style={{
            display:     'flex',
            alignItems:  'flex-start',
            gap:         spacing.s,
            fontFamily:  fontFamilies.body,
            fontSize:    typeScale.body.size,
            lineHeight:  typeScale.body.lineHeight,
            color:       colors.textSecondary,
          }}>
            <span style={{
              width:        5,
              height:       5,
              borderRadius: '50%',
              background:   colors.teal,
              flexShrink:   0,
              marginTop:    '8px',
            }} />
            {r}
          </li>
        ))}
      </ul>
    </SectionCard>

    {/* Decision authorities */}
    <SectionCard>
      <SectionHeading>Decision authorities</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {detail.decisionAuthorities.map((d, i) => (
          <div
            key={d.title}
            style={{
              display:      'grid',
              gridTemplateColumns: '1fr 160px 100px',
              alignItems:   'center',
              gap:          spacing.m,
              padding:      `${spacing.m} 0`,
              borderBottom: i < detail.decisionAuthorities.length - 1
                ? `1px solid ${colors.border}`
                : 'none',
            }}
          >
            <div style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.ui.size,
              fontWeight: 500,
              color:      colors.ink,
            }}>
              {d.title}
            </div>
            <div style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textSecondary,
            }}>
              {d.approver}
            </div>
            <div style={{
              fontFamily: fontFamilies.mono,
              fontSize:   '11px',
              color:      colors.textTertiary,
              textAlign:  'right',
            }}>
              {d.threshold}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>

    {/* Workspace links + channels */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.l }}>

      <SectionCard>
        <SectionHeading>Workspace links</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {detail.workspaceLinks.map(link => (
            <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
              <Icon name="arrow-up-right" size={14} color={colors.textTertiary} strokeWidth={1.5} />
              <span style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.ui.size,
                color:      colors.teal,
                cursor:     'pointer',
              }}>
                {link.label}
              </span>
            </div>
          ))}
          {detail.workspaceLinks.length === 0 && (
            <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
              No links added.
            </span>
          )}
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Channels</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {detail.communicationChannels.map(ch => (
            <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
              <Icon name="share-2" size={14} color={colors.textTertiary} strokeWidth={1.5} />
              <span style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.ui.size,
                color:      colors.textSecondary,
              }}>
                {ch.name}
              </span>
            </div>
          ))}
          {detail.communicationChannels.length === 0 && (
            <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
              No channels added.
            </span>
          )}
        </div>
      </SectionCard>

    </div>
  </div>
)

export { AboutTab }
