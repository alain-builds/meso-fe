import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'
import { LevelBadge }                              from '../LevelBadge'

const AboutTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    <div style={{ display: 'flex', gap: spacing.l, alignItems: 'stretch' }}>

      <SectionCard style={{ flex: 1 }}>
        <SectionHeading>Hierarchy</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.m }}>
            <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textTertiary, width: 48 }}>Level</span>
            <LevelBadge level={detail.level} />
          </div>
          {detail.parentCapabilityName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.m }}>
              <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textTertiary, width: 48 }}>Parent</span>
              <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textPrimary }}>
                {detail.parentCapabilityName}
              </span>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard style={{ flex: 3 }}>
        <SectionHeading>Description</SectionHeading>
        {detail.description ? (
          <p style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.body.size,
            lineHeight: typeScale.body.lineHeight,
            color:      colors.textPrimary,
            margin:     0,
          }}>
            {detail.description}
          </p>
        ) : (
          <EmptyState text="No description has been added." />
        )}
      </SectionCard>

    </div>

  </div>
)

export { AboutTab }
