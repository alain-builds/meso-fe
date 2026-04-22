import { useState } from 'react'
import { colors, duration, easing, radii, fontFamilies } from '@/tokens'
import { Icon, Button } from './Components'

const NAV_ITEMS = [
  { id: 'organization', icon: 'building-2', label: 'Organization' },
  { id: 'governance',   icon: 'shield',     label: 'Governance'   },
  { id: 'services',     icon: 'network',    label: 'Services'     },
]

const btnRow = {
  display: 'flex', alignItems: 'center',
  background: 'transparent', border: 'none',
  cursor: 'pointer', padding: 0, width: '100%',
  font: 'inherit', textAlign: 'left',
}

const Sidebar = ({
  active,
  onNavigate,
  user = { initials: 'AD', name: 'Alain Dunphy', role: 'Admin' },
}) => {
  const [expanded, setExpanded] = useState(false)
  const micro  = `${duration.micro}  ${easing.out}`
  const medium = `${duration.medium} ${easing.out}`

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: expanded ? 200 : 60,
        background: colors.white,
        borderRight: `1px solid ${colors.border}`,
        transition: `width ${medium}`,
        zIndex: 50, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>

      {/* Logo */}
      <div style={{
        height: 60, padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${colors.border}`, flexShrink: 0,
      }}>
        <svg width="22" height="22" viewBox="0 0 52 52" style={{ flexShrink: 0 }} aria-hidden="true">
          <path d="M 6 20 Q 16 10, 26 20 Q 36 30, 46 20" stroke={colors.ink} strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
          <path d="M 6 33 Q 16 23, 26 33 Q 36 43, 46 33" stroke={colors.ink} strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
        </svg>
        {expanded && (
          <span style={{ fontFamily: fontFamilies.display, fontWeight: 600, fontSize: 22, letterSpacing: '-0.8px', color: colors.ink }}>
            meso
          </span>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: '10px 12px', borderBottom: `1px solid ${colors.border}` }}>
        <button
          aria-label="Search"
          style={{
            ...btnRow,
            justifyContent: 'center',
            gap: expanded ? 8 : 0,
            padding: '8px', borderRadius: radii.md,
            background: colors.ink,
            transition: `opacity ${micro}`,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <Icon name="search" size={16} color={colors.white} strokeWidth={1.5} />
          {expanded && <span style={{ fontSize: 13, fontWeight: 500, color: colors.white, whiteSpace: 'nowrap' }}>Search</span>}
        </button>
      </div>

      {/* Main nav */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        {NAV_ITEMS.map(it => {
          const isActive = active === it.id
          return (
            <button
              key={it.id}
              aria-label={it.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(it.id)}
              style={{
                ...btnRow,
                gap: 14, padding: '9px 20px',
                background: isActive ? colors.tealSoft : 'transparent',
                transition: `background ${micro}`,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = colors.stone }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={it.icon} size={20} color={isActive ? colors.teal : colors.textSecondary} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              {expanded && (
                <span style={{ fontSize: 13, color: isActive ? colors.teal : colors.textSecondary, fontWeight: isActive ? 500 : 400, whiteSpace: 'nowrap' }}>
                  {it.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom: Settings → Support → User profile */}
      <div style={{ borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <div style={{ padding: '8px 0' }}>
          {[['settings', 'Settings'], ['info', 'Support']].map(([icon, label]) => (
            <button
              key={label}
              aria-label={label}
              style={{ ...btnRow, gap: 14, padding: '9px 20px', transition: `background ${micro}` }}
              onMouseEnter={e => e.currentTarget.style.background = colors.stone}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} size={20} color={colors.textSecondary} strokeWidth={1.5} />
              </div>
              {expanded && <span style={{ fontSize: 13, color: colors.textSecondary, whiteSpace: 'nowrap' }}>{label}</span>}
            </button>
          ))}
        </div>

        <button
          aria-label="User profile"
          style={{
            ...btnRow,
            borderTop: `1px solid ${colors.border}`,
            padding: expanded ? '12px 20px 16px' : '12px 0 16px',
            justifyContent: expanded ? 'flex-start' : 'center',
            gap: 10,
            transition: `background ${micro}`,
          }}
          onMouseEnter={e => e.currentTarget.style.background = colors.stone}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: colors.ink, color: colors.stone,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 500, flexShrink: 0,
          }}>
            {user.initials}
          </div>
          {expanded && (
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: 13, color: colors.ink, fontWeight: 500, whiteSpace: 'nowrap' }}>{user.name}</span>
              <span style={{ fontSize: 11, color: colors.textTertiary, whiteSpace: 'nowrap' }}>{user.role}</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const Header = ({ onNewTeam }) => (
  <div style={{
    height: 60,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px',
    borderBottom: `1px solid ${colors.border}`,
    background: colors.stone,
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <span style={{ fontFamily: fontFamilies.display, fontWeight: 600, fontSize: 20, letterSpacing: '-0.4px', color: colors.ink }}>
      {getGreeting()}, Alain
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Button variant="stone" size="sm" icon="sparkles">Ask AI</Button>
      <Button variant="primary" size="sm" icon="plus" onClick={onNewTeam}>Add</Button>
    </div>
  </div>
)

export { Sidebar, Header }
