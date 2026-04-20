// Sidebar.jsx
const Sidebar = ({ active, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const items = [
    { id: 'overview', icon: 'layout-grid', label: 'Overview' },
    { id: 'people', icon: 'users', label: 'People' },
    { id: 'teams', icon: 'users-round', label: 'Teams' },
    { id: 'roles', icon: 'id-card', label: 'Roles' },
    { id: 'workflows', icon: 'workflow', label: 'Workflows' },
    { id: 'authority', icon: 'shield', label: 'Authority' },
    { id: 'dependencies', icon: 'network', label: 'Dependencies' },
  ];
  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: expanded ? 200 : 60,
        background: '#fff', borderRight: '1px solid rgba(20,20,18,0.09)',
        transition: 'width 200ms cubic-bezier(0.16,1,0.3,1)',
        zIndex: 50, overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(20,20,18,0.09)' }}>
        <svg width="22" height="22" viewBox="0 0 52 52" style={{ flexShrink: 0 }}>
          <path d="M 6 20 Q 16 10, 26 20 Q 36 30, 46 20" stroke="#141412" strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
          <path d="M 6 33 Q 16 23, 26 33 Q 36 43, 46 33" stroke="#141412" strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
        </svg>
        {expanded && <span style={{ fontFamily: 'Funnel Display', fontWeight: 600, fontSize: 17, letterSpacing: '-0.5px', color: '#141412' }}>meso</span>}
      </div>
      <div style={{ padding: '12px 0', flex: 1 }}>
        {items.map(it => {
          const isActive = active === it.id;
          return (
            <div key={it.id} onClick={() => onNavigate(it.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '9px 20px', cursor: 'pointer',
                background: isActive ? 'rgba(26,107,92,0.09)' : 'transparent',
                transition: 'background 150ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F4F3F0'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={it.icon} size={20} color={isActive ? '#1A6B5C' : '#6B6966'} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              {expanded && <span style={{ fontSize: 13, color: isActive ? '#1A6B5C' : '#6B6966', fontWeight: isActive ? 500 : 400, whiteSpace: 'nowrap' }}>{it.label}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ padding: '12px 0', borderTop: '1px solid rgba(20,20,18,0.09)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 20px', cursor: 'pointer' }}>
          <Icon name="settings" size={20} color="#6B6966" />
          {expanded && <span style={{ fontSize: 13, color: '#6B6966' }}>Settings</span>}
        </div>
      </div>
    </div>
  );
};

// Header.jsx
const Header = ({ crumbs = [], onNewTeam, onSearch }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(20,20,18,0.09)', background: '#F4F3F0', position: 'sticky', top: 0, zIndex: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B6966' }}>
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevron-right" size={12} color="#A8A6A2" />}
          <span style={{ color: i === crumbs.length - 1 ? '#141412' : '#6B6966', fontWeight: i === crumbs.length - 1 ? 500 : 400 }}>{c}</span>
        </React.Fragment>
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#fff', borderRadius: 8, border: '1px solid rgba(20,20,18,0.09)', width: 260 }}>
        <Icon name="search" size={14} color="#A8A6A2" />
        <input placeholder="Search teams, roles, people…" onChange={e => onSearch && onSearch(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, flex: 1, color: '#141412' }} />
        <span style={{ fontSize: 10, color: '#A8A6A2', fontFamily: 'JetBrains Mono' }}>⌘K</span>
      </div>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', border: '1px solid rgba(20,20,18,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <Icon name="bell" size={16} color="#6B6966" />
      </div>
      <Button variant="primary" size="sm" icon="plus" onClick={onNewTeam}>New team</Button>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#141412', color: '#F4F3F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}>SB</div>
    </div>
  </div>
);

Object.assign(window, { Sidebar, Header });
