import { useState } from 'react'
import { colors, duration, easing, radii, fontFamilies } from '@/tokens'
import { Icon, Button } from './Components'

const TOP_NAV = [
  { id: 'canvas',    icon: 'layout-grid',  label: 'Canvas'    },
  { id: 'strategy',  icon: 'arrow-up-right', label: 'Strategy' },
  { id: 'analytics', icon: 'bar-chart',    label: 'Analytics' },
]

const RECORDS_ITEMS = [
  { id: 'people',            icon: 'users',       label: 'People'            },
  { id: 'roles',             icon: 'id-card',     label: 'Roles'             },
  { id: 'teams',             icon: 'users-round', label: 'Teams'             },
  { id: 'services',          icon: 'network',     label: 'Services'          },
  { id: 'processes',         icon: 'workflow',    label: 'Processes'         },
  { id: 'governance-bodies', icon: 'gavel',       label: 'Governance Bodies' },
]

const btnRow = {
  display: 'flex', alignItems: 'center',
  background: 'transparent', border: 'none',
  cursor: 'pointer', padding: 0, width: '100%',
  font: 'inherit', textAlign: 'left',
}

const NavItem = ({ item, isActive, onNavigate, expanded, micro, sub = false }) => (
  <button
    aria-label={item.label}
    aria-current={isActive ? 'page' : undefined}
    onClick={() => onNavigate(item.id)}
    style={{
      ...btnRow,
      gap: 14,
      paddingTop: sub ? 7 : 9,
      paddingBottom: sub ? 7 : 9,
      paddingLeft: expanded && sub ? 32 : 20,
      paddingRight: 20,
      background: isActive ? colors.tealSoft : 'transparent',
      transition: `background ${micro}`,
    }}
    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = colors.stone }}
    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
    <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={item.icon} size={sub ? 16 : 20} color={isActive ? colors.teal : colors.textSecondary} strokeWidth={isActive ? 2 : 1.5} />
    </div>
    {expanded && (
      <span style={{ fontSize: sub ? 12 : 13, color: isActive ? colors.teal : colors.textSecondary, fontWeight: isActive ? 500 : 400, whiteSpace: 'nowrap' }}>
        {item.label}
      </span>
    )}
  </button>
)

const Sidebar = ({
  active,
  onNavigate,
  user = { initials: 'AD', name: 'Alain Dunphy', role: 'Admin' },
}) => {
  const [expanded, setExpanded] = useState(false)
  const [recordsOpen, setRecordsOpen] = useState(true)
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
      <div style={{ padding: '10px 12px', borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <button
          aria-label="Search (Ctrl+K)"
          style={{
            ...btnRow,
            justifyContent: expanded ? 'space-between' : 'center',
            padding: expanded ? '8px 10px' : '8px',
            borderRadius: radii.md,
            background: colors.ink,
            transition: `opacity ${micro}`,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="search" size={16} color={colors.white} strokeWidth={1.5} />
            {expanded && <span style={{ fontSize: 13, fontWeight: 500, color: colors.white, whiteSpace: 'nowrap' }}>Search</span>}
          </div>
          {expanded && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap', letterSpacing: '0.2px', fontFamily: fontFamilies.body }}>
              Ctrl K
            </span>
          )}
        </button>
      </div>

      {/* Main nav */}
      <nav style={{ padding: '12px 0', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {TOP_NAV.map(it => (
          <NavItem key={it.id} item={it} isActive={active === it.id} onNavigate={onNavigate} expanded={expanded} micro={micro} />
        ))}

        {/* Records group */}
        <div style={{ marginTop: 4 }}>
          <button
            aria-label="Records"
            aria-expanded={recordsOpen}
            onClick={() => setRecordsOpen(o => !o)}
            style={{
              ...btnRow,
              gap: 14, padding: '9px 20px',
              transition: `background ${micro}`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = colors.stone}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="layers" size={20} color={colors.textSecondary} strokeWidth={1.5} />
            </div>
            {expanded && (
              <>
                <span style={{ fontSize: 13, color: colors.textSecondary, fontWeight: 400, whiteSpace: 'nowrap', flex: 1 }}>
                  Records
                </span>
                <Icon
                  name={recordsOpen ? 'chevron-down' : 'chevron-right'}
                  size={14}
                  color={colors.textTertiary}
                  strokeWidth={1.5}
                  style={{ flexShrink: 0, marginRight: 6 }}
                />
              </>
            )}
          </button>

          {recordsOpen && RECORDS_ITEMS.map(it => (
            <NavItem
              key={it.id}
              item={it}
              isActive={active === it.id}
              onNavigate={onNavigate}
              expanded={expanded}
              micro={micro}
              sub
            />
          ))}
        </div>
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

        {/* Fixed left-align so avatar never jumps on expand/collapse */}
        <button
          aria-label="User profile"
          style={{
            ...btnRow,
            borderTop: `1px solid ${colors.border}`,
            padding: '12px 20px 16px',
            justifyContent: 'flex-start',
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

const Header = ({ pageTitle, breadcrumbs = [], onShare }) => (
  <div style={{
    height: 60,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px',
    borderBottom: `1px solid ${colors.border}`,
    background: colors.stone,
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
      {pageTitle && (
        <span style={{
          fontFamily: fontFamilies.display,
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: '-0.3px',
          color: colors.ink,
          lineHeight: 1.2,
        }}>
          {pageTitle}
        </span>
      )}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize: 11,
            fontWeight: 400,
            color: colors.textTertiary,
            display: 'flex', alignItems: 'center', gap: 3,
            lineHeight: 1,
          }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {i > 0 && <span style={{ color: colors.borderMid }}>›</span>}
                <span>{crumb}</span>
              </span>
            ))}
          </span>
        </nav>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Button variant="stone" size="sm" icon="sparkles">Ask AI</Button>
      <Button variant="secondary" size="sm" icon="share-2" onClick={onShare}>Share</Button>
    </div>
  </div>
)

export { Sidebar, Header }
