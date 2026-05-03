import { colors, fontFamilies, typeScale, radii } from '@/tokens'

const LEVEL_STYLES = {
  l1: { background: colors.tealSoft, color: colors.teal          },
  l2: { background: colors.stone2,   color: colors.textSecondary },
  l3: { background: colors.stone2,   color: colors.textTertiary  },
}

const LevelBadge = ({ level }) => {
  const s = LEVEL_STYLES[level] ?? LEVEL_STYLES.l1
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      padding:       '2px 8px',
      borderRadius:  radii.sm,
      background:    s.background,
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelB.size,
      fontWeight:    600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color:         s.color,
      flexShrink:    0,
    }}>
      {level?.toUpperCase()}
    </span>
  )
}

export { LevelBadge, LEVEL_STYLES }
