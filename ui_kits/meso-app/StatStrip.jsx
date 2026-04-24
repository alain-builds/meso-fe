import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'

const StatStrip = ({ tiles = [] }) => (
  <div style={{
    background: colors.white,
    borderRadius: radii.lg,
    boxShadow: shadows.sm,
    display: 'flex',
    overflow: 'hidden',
  }}>
    {tiles.map((tile, i) => (
      <div
        key={tile.id}
        style={{
          flex: 1,
          padding: `${spacing.m} ${spacing.l}`,
          borderLeft: i > 0 ? `1px solid ${colors.border}` : 'none',
          minWidth: 0,
        }}
      >
        <div style={{
          fontFamily:  fontFamilies.body,
          fontSize:    typeScale.labelB.size,
          fontWeight:  typeScale.labelB.weight,
          color:       colors.textTertiary,
          marginBottom: spacing.xs,
          whiteSpace:  'nowrap',
          overflow:    'hidden',
          textOverflow: 'ellipsis',
        }}>
          {tile.label}
        </div>
        <div style={{
          fontFamily:    fontFamilies.display,
          fontSize:      typeScale.h3.size,
          fontWeight:    typeScale.h3.weight,
          letterSpacing: typeScale.h3.letterSpacing,
          color:         colors.ink,
          lineHeight:    1,
          marginBottom:  tile.sub ? spacing.xs : 0,
        }}>
          {tile.value}
        </div>
        {tile.sub && (
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textSecondary,
            whiteSpace: 'nowrap',
            overflow:   'hidden',
            textOverflow: 'ellipsis',
          }}>
            {tile.sub}
          </div>
        )}
      </div>
    ))}
  </div>
)

export { StatStrip }
