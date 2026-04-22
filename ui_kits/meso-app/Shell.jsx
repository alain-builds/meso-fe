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
  { id: 'governance-bodies', icon: 'gavel',       label: 'Governance'        },
]

const btnRow = {
  display: 'flex', alignItems: 'center',
  background: 'transparent', border: 'none',
  cursor: 'pointer', padding: 0, width: '100%',
  font: 'inherit', textAlign: 'left',
}

const micro  = `${duration.micro} ${easing.out}`
const medium = `${duration.medium} ${easing.out}`

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

const Sidebar = ({ active, onNavigate }) => {
  const [expanded, setExpanded] = useState(false)
  const [recordsOpen, setRecordsOpen] = useState(true)

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
            {expanded && <span style={{ fontSize: 13, fontWeight: 500, color: colors.white, whiteSpace: 'nowrap', lineHeight: '16px' }}>Search</span>}
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

        {/* Section divider */}
        <div style={{ height: 1, background: colors.border, margin: '8px 0' }} />

        {/* Records group */}
        <div>
          {expanded ? (
            <div style={{ display: 'flex', alignItems: 'center', padding: '2px 8px 2px 14px', gap: 4 }}>
              <button
                aria-label="Toggle Records"
                aria-expanded={recordsOpen}
                onClick={() => setRecordsOpen(o => !o)}
                style={{ ...btnRow, width: 'auto', flex: 1, gap: 4, padding: '4px 0' }}>
                <Icon name={recordsOpen ? 'chevron-down' : 'chevron-right'} size={12} color={colors.textTertiary} strokeWidth={2} />
                <span style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, color: colors.ink, whiteSpace: 'nowrap' }}>
                  Records
                </span>
              </button>
              <button
                aria-label="Section settings"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 22, height: 22, borderRadius: radii.sm,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  transition: `background ${micro}`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = colors.stone}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <Icon name="settings" size={13} color={colors.textTertiary} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: fontFamilies.body, fontSize: 9, fontWeight: 500, color: colors.textTertiary, letterSpacing: '0.2px' }}>
                Records
              </span>
            </div>
          )}

          {recordsOpen && RECORDS_ITEMS.map(it => (
            <NavItem
              key={it.id}
              item={it}
              isActive={active === it.id}
              onNavigate={onNavigate}
              expanded={expanded}
              micro={micro}
            />
          ))}
        </div>
      </nav>

      {/* Bottom: Settings → Support → Invite team members */}
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

        <div style={{ borderTop: `1px solid ${colors.border}`, padding: expanded ? '8px 12px 12px' : '8px 0 12px' }}>
          <button
            aria-label="Invite team members"
            style={{
              ...btnRow,
              gap: 8,
              padding: expanded ? '7px 10px' : '9px 20px',
              justifyContent: expanded ? 'flex-start' : 'center',
              borderRadius: expanded ? radii.md : 0,
              border: expanded ? `1px solid ${colors.borderMid}` : 'none',
              transition: `background ${micro}`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = colors.stone2}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="user-plus" size={expanded ? 15 : 20} color={colors.textSecondary} strokeWidth={1.5} />
            </div>
            {expanded && <span style={{ fontSize: 13, color: colors.ink, fontWeight: 500, whiteSpace: 'nowrap' }}>Invite team members</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

const Header = ({
  pageTitle,
  breadcrumbs = [],
  onShare,
  user = { initials: 'AD', name: 'Alain Dunphy', role: 'Admin' },
}) => (
  <div style={{
    height: 60,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px',
    borderBottom: `1px solid ${colors.border}`,
    background: colors.stone,
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      {pageTitle && (
        <span style={{
          fontFamily: fontFamilies.display,
          fontWeight: 600,
          fontSize: 20,
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
            fontSize: 13,
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

    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button variant="secondary" size="sm" icon="share-2" onClick={onShare}>Share</Button>

      <button
        aria-label="Notifications"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 34, height: 34, borderRadius: radii.md,
          background: 'transparent', border: `1px solid ${colors.borderMid}`, cursor: 'pointer',
          transition: `all ${micro}`,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = colors.borderStrong; e.currentTarget.style.background = colors.stone2 }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = colors.borderMid; e.currentTarget.style.background = 'transparent' }}>
        <Icon name="bell" size={16} color={colors.ink} strokeWidth={1.5} />
      </button>

      <Button variant="stone" size="sm" icon="sparkles">Ask AI</Button>

      <button
        aria-label={`${user.name} – profile`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: '50%',
          background: colors.ink, color: colors.stone,
          fontSize: 11, fontWeight: 500,
          border: 'none', cursor: 'pointer',
          transition: `opacity ${micro}`,
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        {user.initials}
      </button>
    </div>
  </div>
)

export { Sidebar, Header }
