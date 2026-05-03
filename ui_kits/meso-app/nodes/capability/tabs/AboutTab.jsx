import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { SectionHeading, SectionCard, EmptyState }        from '../../../shared/SectionParts'

const LEVEL_STYLES = {
  l1: { background: colors.tealSoft,   color: colors.teal,          label: 'L1' },
  l2: { background: colors.stone2,     color: colors.textSecondary,  label: 'L2' },
  l3: { background: colors.stone2,     color: colors.textTertiary,   label: 'L3' },
}

const LevelBadge = ({ level }) => {
  const s = LEVEL_STYLES[level] ?? LEVEL_STYLES.l1
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      padding:       '3px 10px',
      borderRadius:  radii.sm,
      background:    s.background,
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelA.size,
      fontWeight:    600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color:         s.color,
    }}>
      {s.label}
    </span>
  )
}

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
