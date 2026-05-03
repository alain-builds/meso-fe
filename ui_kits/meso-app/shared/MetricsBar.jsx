import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { micro } from './constants'

const MetricsBar = ({ chips }) => (
  <div style={{
    display:      'flex',
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    overflow:     'hidden',
  }}>
    {chips.map((chip, i) => (
      <button
        key={chip.id}
        style={{
          flex:          '1 1 0',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-start',
          padding:       `${spacing.m} ${spacing.m}`,
          background:    'transparent',
          border:        'none',
          borderRight:   i < chips.length - 1 ? `1px solid ${colors.border}` : 'none',
          cursor:        'pointer',
          textAlign:     'left',
          transition:    `background ${micro}`,
          minWidth:      0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = colors.stone }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        onMouseDown={e =>   { e.currentTarget.style.background = colors.stone2 }}
        onMouseUp={e =>     { e.currentTarget.style.background = colors.stone }}
      >
        <div style={{
          fontFamily:    fontFamilies.display,
          fontSize:      typeScale.h3.size,
          fontWeight:    typeScale.h3.weight,
          letterSpacing: typeScale.h3.letterSpacing,
          color:         colors.ink,
          lineHeight:    1.1,
          whiteSpace:    'nowrap',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          width:         '100%',
        }}>
          {chip.value}
        </div>
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          fontWeight:   typeScale.labelB.weight,
          color:        colors.textTertiary,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          width:        '100%',
          marginTop:    '2px',
        }}>
          {chip.label}
        </div>
      </button>
    ))}
  </div>
)

export { MetricsBar }
