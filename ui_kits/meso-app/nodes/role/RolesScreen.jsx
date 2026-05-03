import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Card, Pill }                              from '../../Components'
import { ROLES }                                   from './RoleDetail'

const RolesScreen = ({ onOpenRole }) => (
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
      Roles
    </h1>
    <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Role', 'Team', 'Domain', 'Status', ''].map(h => (
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
          {ROLES.map(r => (
            <tr
              key={r.id}
              onClick={() => onOpenRole(r)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.stone}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink }}>
                {r.roleName}
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary }}>
                {r.teamName}
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary }}>
                {r.domain}
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}` }}>
                {r.isVacant
                  ? <Pill variant="neutral" dot="warn">Vacant</Pill>
                  : <Pill variant="teal"    dot="live">Filled</Pill>
                }
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, textAlign: 'right' }}>
                <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.mono.size, color: colors.teal }}>View →</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
)

export { RolesScreen }
