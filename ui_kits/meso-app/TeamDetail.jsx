import { colors, fontFamilies } from '@/tokens'
import { Icon, Button, Pill, Card } from './Components'

const TeamDetail = ({ team, onBack, onRemove }) => {
  const roles = [
    { name: 'Engineering Manager', holder: team.owner || 'Unassigned', coverage: 'primary'   },
    { name: 'Staff Engineer',      holder: 'Thomas Weber',             coverage: 'primary'   },
    { name: 'Senior Engineer',     holder: '4 people',                 coverage: 'primary'   },
    { name: 'SRE Lead',            holder: 'Katarina Novak',           coverage: 'primary'   },
    { name: 'On-call escalation',  holder: 'Rotating',                 coverage: 'secondary' },
  ]
  const deps = [
    { name: 'Identity Service', team: 'Security & Compliance', criticality: 'high'   },
    { name: 'Data Pipeline',    team: 'Data Infrastructure',   criticality: 'medium' },
    { name: 'Billing API',      team: 'Finance Systems',       criticality: 'low'    },
  ]
  const decisions = [
    { title: 'Emergency infrastructure spend', approver: 'CIO + team lead',  threshold: '> €25,000' },
    { title: 'Production deploy — off-hours',   approver: 'SRE Lead',         threshold: 'Any'       },
    { title: 'Architecture changes',            approver: 'Staff Engineer',    threshold: 'Cross-team' },
  ]

  const critColor = c => c === 'high' ? colors.error : c === 'medium' ? colors.amber : colors.textTertiary

  return (
    <div style={{ padding: '40px 40px 80px', maxWidth: 1200 }}>
      <div onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textSecondary, cursor: 'pointer', marginBottom: 20 }}>
        <Icon name="chevron-right" size={12} style={{ transform: 'rotate(180deg)' }} /> Teams
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.teal, marginBottom: 8 }}>Team</div>
          <h1 style={{ fontFamily: fontFamilies.display, fontSize: 42, fontWeight: 700, letterSpacing: '-1.8px', lineHeight: 1.04, color: colors.ink, marginBottom: 12 }}>{team.name}</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Pill variant="teal" dot="live">Active</Pill>
            <Pill variant="outline">Updated {team.updated}</Pill>
            <Pill variant="outline">v47</Pill>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="history">History</Button>
          <Button variant="primary" icon="arrow-up-right">Open in graph</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <Card level={1}>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.textTertiary, marginBottom: 16 }}>Roles</div>
            {roles.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < roles.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: colors.ink, marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: colors.textSecondary }}>{r.holder}</div>
                </div>
                <Pill variant={r.coverage === 'primary' ? 'teal' : 'neutral'} dot={r.coverage === 'primary' ? 'live' : 'off'}>
                  {r.coverage === 'primary' ? 'Primary' : 'Backup'}
                </Pill>
              </div>
            ))}
          </Card>

          <Card level={1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.textTertiary }}>Decision rights</div>
              <span style={{ fontSize: 11, color: colors.teal, cursor: 'pointer' }}>Edit →</span>
            </div>
            {decisions.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < decisions.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: colors.ink, marginBottom: 4 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: colors.textSecondary }}>Approver: {d.approver}</div>
                </div>
                <span style={{ fontFamily: fontFamilies.mono, fontSize: 11, color: colors.textTertiary }}>{d.threshold}</span>
              </div>
            ))}
          </Card>

          <Card level={1} style={{
            background: colors.ink, color: colors.stone,
            backgroundImage: `radial-gradient(ellipse 70% 60% at 85% 15%, rgba(26,107,92,0.40) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 10% 90%, rgba(58,92,168,0.30) 0%, transparent 65%)`,
          }}>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: 'rgba(244,243,240,0.6)', marginBottom: 12 }}>Graph view</div>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', color: colors.stone, marginBottom: 8 }}>Nodes and edges — coming soon</div>
            <div style={{ fontSize: 13, color: 'rgba(244,243,240,0.65)', lineHeight: 1.6, maxWidth: 440 }}>
              The canvas that renders this team's relationships, dependencies, and reporting lines is being designed in the next session.
            </div>
          </Card>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <Card level={1} padding={28}>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.textTertiary, marginBottom: 16 }}>Ownership</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: colors.ink, color: colors.stone, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500 }}>
                {team.owner ? team.owner.split(' ').map(s => s[0]).slice(0, 2).join('') : '—'}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: colors.ink }}>{team.owner || 'No owner assigned'}</div>
                <div style={{ fontSize: 12, color: colors.textSecondary }}>Team lead</div>
              </div>
            </div>
            <div style={{ height: 1, background: colors.border, margin: '16px 0' }} />
            <div style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 10, letterSpacing: '0.02em' }}>REPORTS TO</div>
            <div style={{ fontSize: 13, color: colors.ink }}>CTO — Daniel Riemann</div>
          </Card>

          <Card level={1} padding={28}>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.textTertiary, marginBottom: 16 }}>Dependencies</div>
            {deps.map((d, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < deps.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: colors.ink }}>{d.name}</div>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: critColor(d.criticality) }} />
                </div>
                <div style={{ fontSize: 11, color: colors.textSecondary }}>{d.team}</div>
              </div>
            ))}
          </Card>

          <div>
            <Button variant="secondary" onClick={onRemove}>Remove team</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TeamDetail }
