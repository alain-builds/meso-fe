import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Pill, Card, Skeleton }                    from '../../Components'
import { micro }                                   from '../../shared/constants'

const TEAMS = [
  { id: 't1', name: 'Platform Engineering',  owner: 'Sarah van der Berg', services: 12, roles: 8, status: 'active',   updated: '2 hours ago'  },
  { id: 't2', name: 'Data Infrastructure',   owner: 'Marco Lehmann',      services: 8,  roles: 6, status: 'active',   updated: '1 day ago'    },
  { id: 't3', name: 'Security & Compliance', owner: null,                  services: 5,  roles: 3, status: 'no-owner', updated: '3 days ago'   },
  { id: 't4', name: 'Product Operations',    owner: 'Lena Hoffmann',       services: 3,  roles: 4, status: 'active',   updated: '5 hours ago'  },
  { id: 't5', name: 'Finance Systems',       owner: 'Jeroen de Vries',     services: 6,  roles: 5, status: 'active',   updated: '12 hours ago' },
  { id: 't6', name: 'People Operations',     owner: 'Anett Tarnokova',     services: 4,  roles: 7, status: 'active',   updated: '1 day ago'    },
  { id: 't7', name: 'Legacy Billing',        owner: null,                  services: 2,  roles: 1, status: 'inactive', updated: '3 weeks ago'  },
]

const TeamsScreen = ({ onOpenTeam, loading }) => (
  <div style={{ padding: `${spacing.xl} ${spacing.xl} ${spacing.xl3}`, maxWidth: 1200 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: spacing.s }}>
      <div>
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
        }}>
          Teams
        </h1>
      </div>
      <div style={{ display: 'flex', gap: spacing.s }}>
        <Pill variant="outline">{TEAMS.length} teams</Pill>
        <Pill variant="teal" dot="live">1 coverage gap</Pill>
      </div>
    </div>
    <p style={{
      fontFamily:  fontFamilies.body,
      fontSize:    typeScale.bodyLg.size,
      color:       colors.textSecondary,
      lineHeight:  1.7,
      maxWidth:    580,
      marginTop:   14,
      marginBottom: spacing.xl,
    }}>
      Every team is a node in your operating model. Owners, roles, and service dependencies route through here.
    </p>

    <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Team', 'Owner', 'Roles', 'Services', 'Status', 'Updated'].map(h => (
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
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, height: 52 }}>
                      <Skeleton w="70%" h={12} />
                    </td>
                  ))}
                </tr>
              ))
            : TEAMS.map(t => (
                <tr
                  key={t.id}
                  onClick={() => onOpenTeam(t)}
                  style={{ cursor: 'pointer', transition: `background ${micro}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = colors.stone }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.body.size, fontWeight: 500, color: colors.ink }}>{t.name}</td>
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary }}>{t.owner || '—'}</td>
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary, fontVariantNumeric: 'tabular-nums' }}>{t.roles}</td>
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.ui.size, color: colors.textSecondary, fontVariantNumeric: 'tabular-nums' }}>{t.services}</td>
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
                    {t.status === 'active'   ? <Pill variant="neutral" dot="live">Active</Pill>
                   : t.status === 'no-owner' ? <Pill variant="neutral" dot="warn">No owner</Pill>
                   :                           <Pill variant="neutral" dot="off">Inactive</Pill>}
                  </td>
                  <td style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, fontFamily: fontFamilies.body, fontSize: typeScale.mono.size, color: colors.textTertiary }}>{t.updated}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </Card>
  </div>
)

export { TeamsScreen, TEAMS }
