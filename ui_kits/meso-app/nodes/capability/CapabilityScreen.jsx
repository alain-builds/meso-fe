import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { Card, Pill }                                     from '../../Components'
import { CAPABILITIES }                                   from './CapabilityDetail'
import { deriveLevel }                                    from './capabilityUtils.js'

const LEVEL_STYLES = {
  l1: { background: colors.tealSoft,   color: colors.teal          },
  l2: { background: colors.stone2,     color: colors.textSecondary  },
  l3: { background: colors.stone2,     color: colors.textTertiary   },
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
    }}>
      {level?.toUpperCase()}
    </span>
  )
}

const CapabilityScreen = ({ onOpenCapability }) => (
  <div style={{ padding: `${spacing.xl} ${spacing.xl2} ${spacing.xl3}`, maxWidth: 1040 }}>
    <div style={{
      fontFamily:    fontFamilies.display,
      fontSize:      typeScale.eyebrow.size,
      fontWeight:    typeScale.eyebrow.weight,
      letterSpacing: typeScale.eyebrow.letterSpacing,
      color:         colors.teal,
      marginBottom:  spacing.s,
    }}>
      Operating model
    </div>
    <h1 style={{
      fontFamily:    fontFamilies.display,
      fontSize:      typeScale.h1.size,
      fontWeight:    typeScale.h1.weight,
      letterSpacing: typeScale.h1.letterSpacing,
      lineHeight:    typeScale.h1.lineHeight,
      color:         colors.ink,
      marginBottom:  spacing.xl,
    }}>
      Capabilities
    </h1>
    <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Name', 'Level', 'Description', 'Status', ''].map(h => (
              <th key={h} style={{
                textAlign:     'left',
                padding:       '14px 20px',
                fontFamily:    fontFamilies.body,
                fontSize:      typeScale.labelB.size,
                fontWeight:    600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color:         colors.textTertiary,
                borderBottom:  `1px solid ${colors.borderMid}`,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAPABILITIES.map(cap => {
            const level = deriveLevel(cap, CAPABILITIES)
            return (
              <tr
                key={cap.id}
                onClick={() => onOpenCapability(cap)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = colors.stone}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink, whiteSpace: 'nowrap' }}>
                  {cap.name}
                </td>
                <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}` }}>
                  <LevelBadge level={level} />
                </td>
                <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary, maxWidth: 360 }}>
                  <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cap.description || '—'}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}` }}>
                  {cap.status === 'active'
                    ? <Pill variant="teal" dot="live">Active</Pill>
                    : <Pill variant="neutral" dot="warn">Archived</Pill>
                  }
                </td>
                <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, textAlign: 'right' }}>
                  <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.mono.size, color: colors.teal }}>View →</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  </div>
)

export { CapabilityScreen }
