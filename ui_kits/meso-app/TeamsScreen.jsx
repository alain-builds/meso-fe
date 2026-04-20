// TeamsScreen.jsx
const TEAMS = [
  { id: 't1', name: 'Platform Engineering', owner: 'Sarah van der Berg', services: 12, roles: 8, status: 'active', updated: '2 hours ago' },
  { id: 't2', name: 'Data Infrastructure', owner: 'Marco Lehmann', services: 8, roles: 6, status: 'active', updated: '1 day ago' },
  { id: 't3', name: 'Security & Compliance', owner: null, services: 5, roles: 3, status: 'no-owner', updated: '3 days ago' },
  { id: 't4', name: 'Product Operations', owner: 'Lena Hoffmann', services: 3, roles: 4, status: 'active', updated: '5 hours ago' },
  { id: 't5', name: 'Finance Systems', owner: 'Jeroen de Vries', services: 6, roles: 5, status: 'active', updated: '12 hours ago' },
  { id: 't6', name: 'People Operations', owner: 'Anett Tarnokova', services: 4, roles: 7, status: 'active', updated: '1 day ago' },
  { id: 't7', name: 'Legacy Billing', owner: null, services: 2, roles: 1, status: 'inactive', updated: '3 weeks ago' },
];

const TeamsScreen = ({ onOpenTeam, loading }) => {
  return (
    <div style={{ padding: '40px 40px 80px', maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontFamily: 'Funnel Display, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: '#1A6B5C', marginBottom: 8 }}>Operating model</div>
          <h1 style={{ fontFamily: 'Funnel Display', fontSize: 38, fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.04, color: '#141412' }}>Teams</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill variant="outline">{TEAMS.length} teams</Pill>
          <Pill variant="teal" dot="live">1 coverage gap</Pill>
        </div>
      </div>
      <p style={{ fontSize: 15, color: '#6B6966', lineHeight: 1.7, maxWidth: 580, marginTop: 14, marginBottom: 40 }}>
        Every team is a node in your operating model. Owners, roles, and service dependencies route through here.
      </p>

      <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Team', 'Owner', 'Roles', 'Services', 'Status', 'Updated'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#A8A6A2', borderBottom: '1px solid rgba(20,20,18,0.14)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', height: 52 }}><Skeleton w="70%" h={12} /></td>)}</tr>
            )) : TEAMS.map(t => (
              <tr key={t.id}
                onClick={() => onOpenTeam(t)}
                style={{ cursor: 'pointer', transition: 'background 150ms cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F4F3F0'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', fontSize: 14, fontWeight: 500, color: '#141412' }}>{t.name}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', fontSize: 13, color: '#6B6966' }}>{t.owner || '—'}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', fontSize: 13, color: '#6B6966', fontVariantNumeric: 'tabular-nums' }}>{t.roles}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', fontSize: 13, color: '#6B6966', fontVariantNumeric: 'tabular-nums' }}>{t.services}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)' }}>
                  {t.status === 'active' ? <Pill variant="neutral" dot="live">Active</Pill>
                   : t.status === 'no-owner' ? <Pill variant="neutral" dot="warn">No owner</Pill>
                   : <Pill variant="neutral" dot="off">Inactive</Pill>}
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,20,18,0.09)', fontSize: 12, color: '#A8A6A2' }}>{t.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

Object.assign(window, { TeamsScreen, TEAMS });
