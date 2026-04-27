import { memo, useState } from 'react'
import { colors, duration, easing, radii, fontFamilies, typeScale, spacing } from '@/tokens'
import { Icon, Button } from './Components'

// Dimension constants that don't map to the spacing scale — derived from the
// collapsed sidebar width (60px) which centers a 20px icon with 20px padding each side.
const SIDEBAR_COLLAPSED  = 60
const SIDEBAR_EXPANDED   = 200
const CHROME_HEIGHT      = 60   // shared by the logo strip and page header
const NAV_PAD_X          = 20   // horizontal padding; centers icon in collapsed sidebar
const NAV_INDENT_SUB     = 32   // left indent for sub-items when expanded
const LOGO_WORDMARK_SIZE = '22px'
// NAV_PAD_X minus the 8px container margin — keeps the search icon at x=30 in both states
const SEARCH_PAD_X       = 12
const RECORDS_HEADER_H   = 28   // fixed height shared by collapsed and expanded Records header

const TOP_NAV = [
  { id: 'canvas',    icon: 'layout-grid',    label: 'Canvas'    },
  { id: 'strategy',  icon: 'arrow-up-right', label: 'Strategy'  },
  { id: 'analytics', icon: 'bar-chart',      label: 'Analytics' },
]

const BOTTOM_NAV = [
  { id: 'settings', icon: 'settings', label: 'Settings' },
  { id: 'support',  icon: 'info',     label: 'Support'  },
]

const RECORDS_ITEMS = [
  { id: 'people',            icon: 'users',       label: 'People'     },
  { id: 'roles',             icon: 'id-card',     label: 'Roles'      },
  { id: 'teams',             icon: 'users-round', label: 'Teams'      },
  { id: 'services',          icon: 'network',     label: 'Services'   },
  { id: 'processes',         icon: 'workflow',    label: 'Processes'  },
  { id: 'governance-bodies', icon: 'gavel',       label: 'Governance' },
]

const baseButtonStyle = {
  display: 'flex', alignItems: 'center',
  background: 'transparent', border: 'none',
  cursor: 'pointer', padding: 0, width: '100%',
  font: 'inherit', textAlign: 'left',
}

const micro  = `${duration.micro} ${easing.out}`
const medium = `${duration.medium} ${easing.out}`

const NavItem = memo(({ item, isActive, onNavigate, expanded, sub = false }) => (
  <button
    aria-label={item.label}
    aria-current={isActive ? 'page' : undefined}
    onClick={() => onNavigate(item.id)}
    style={{
      ...baseButtonStyle,
      gap:           spacing.m,
      paddingTop:    spacing.s,
      paddingBottom: spacing.s,
      paddingLeft:   expanded && sub ? `${NAV_INDENT_SUB}px` : `${NAV_PAD_X}px`,
      paddingRight:  `${NAV_PAD_X}px`,
      background:    isActive ? colors.tealSoft : 'transparent',
      transition:    `background ${micro}`,
    }}
    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = colors.stone }}
    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
    <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={item.icon} size={sub ? 16 : 20} color={isActive ? colors.teal : colors.textSecondary} strokeWidth={isActive ? 2 : 1.5} />
    </div>
    {expanded && (
      <span style={{ fontSize: typeScale.ui.size, color: isActive ? colors.teal : colors.textSecondary, fontWeight: isActive ? 500 : 400, whiteSpace: 'nowrap' }}>
        {item.label}
      </span>
    )}
  </button>
))
NavItem.displayName = 'NavItem'

const Sidebar = ({ active, onNavigate }) => {
  const [expanded, setExpanded] = useState(false)
  const [recordsOpen, setRecordsOpen] = useState(true)

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
        background: colors.white,
        borderRight: `1px solid ${colors.border}`,
        transition: `width ${medium}`,
        zIndex: 50, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>

      {/* Logo */}
      <div style={{
        height: CHROME_HEIGHT, padding: `0 ${NAV_PAD_X}px`,
        display: 'flex', alignItems: 'center', gap: spacing.s,
        borderBottom: `1px solid ${colors.border}`, flexShrink: 0,
      }}>
        <svg width="22" height="22" viewBox="0 0 52 52" style={{ flexShrink: 0 }} aria-hidden="true">
          <path d="M 6 20 Q 16 10, 26 20 Q 36 30, 46 20" stroke={colors.ink} strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
          <path d="M 6 33 Q 16 23, 26 33 Q 36 43, 46 33" stroke={colors.ink} strokeWidth="5" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
        </svg>
        {expanded && (
          <span style={{ fontFamily: fontFamilies.display, fontWeight: 600, fontSize: LOGO_WORDMARK_SIZE, letterSpacing: typeScale.h2.letterSpacing, color: colors.ink }}>
            meso
          </span>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: `${spacing.m} ${spacing.s}`, borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <button
          aria-label="Search (Ctrl+K)"
          style={{
            ...baseButtonStyle,
            justifyContent: 'space-between',
            paddingTop:    spacing.s,
            paddingBottom: spacing.s,
            paddingLeft:   `${SEARCH_PAD_X}px`,
            paddingRight:  `${SEARCH_PAD_X}px`,
            borderRadius:  radii.md,
            background:    colors.ink,
            transition:    `opacity ${micro}`,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
            <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="search" size={16} color={colors.white} strokeWidth={1.5} />
            </div>
            {expanded && <span style={{ fontSize: typeScale.ui.size, fontWeight: 500, color: colors.white, whiteSpace: 'nowrap', lineHeight: 1 }}>Search</span>}
          </div>
          {expanded && (
            <span style={{ fontSize: typeScale.labelB.size, color: colors.whiteDim, whiteSpace: 'nowrap', letterSpacing: '0.2px', fontFamily: fontFamilies.body }}>
              Ctrl K
            </span>
          )}
        </button>
      </div>

      {/* Main nav */}
      <nav style={{ padding: `${spacing.s} 0`, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {TOP_NAV.map(it => (
          <NavItem key={it.id} item={it} isActive={active === it.id} onNavigate={onNavigate} expanded={expanded} />
        ))}

        {/* Section divider */}
        <div style={{ height: 1, background: colors.border, margin: `${spacing.s} 0` }} />

        {/* Records group */}
        <div>
          {expanded ? (
            <div style={{ height: RECORDS_HEADER_H, display: 'flex', alignItems: 'center', paddingLeft: spacing.m, paddingRight: spacing.s, gap: spacing.xs }}>
              <button
                aria-label="Toggle Records"
                aria-expanded={recordsOpen}
                onClick={() => setRecordsOpen(o => !o)}
                style={{ ...baseButtonStyle, width: 'auto', flex: 1, gap: spacing.xs }}>
                <Icon name={recordsOpen ? 'chevron-down' : 'chevron-right'} size={12} color={colors.textTertiary} strokeWidth={2} />
                <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, fontWeight: 600, color: colors.ink, whiteSpace: 'nowrap' }}>
                  Records
                </span>
              </button>
              <button
                aria-label="Records section options"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 22, height: 22, borderRadius: radii.sm,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  transition: `background ${micro}`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = colors.stone}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <Icon name="pencil" size={13} color={colors.textSecondary} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div style={{ height: RECORDS_HEADER_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, fontWeight: 600, color: colors.ink }}>
                Rec
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
              sub
            />
          ))}
        </div>
      </nav>

      {/* Settings + Support + Invite */}
      <nav aria-label="Account" style={{ borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <div style={{ padding: `${spacing.s} 0` }}>
          {BOTTOM_NAV.map(({ id, icon, label }) => (
            <button
              key={id}
              aria-label={label}
              style={{ ...baseButtonStyle, gap: spacing.m, padding: `${spacing.s} ${NAV_PAD_X}px`, transition: `background ${micro}` }}
              onMouseEnter={e => e.currentTarget.style.background = colors.stone}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} size={20} color={colors.textSecondary} strokeWidth={1.5} />
              </div>
              {expanded && <span style={{ fontSize: typeScale.ui.size, color: colors.textSecondary, whiteSpace: 'nowrap' }}>{label}</span>}
            </button>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${colors.border}`, padding: `${spacing.s} 0` }}>
          <button
            aria-label="Invite team members"
            style={{ ...baseButtonStyle, gap: spacing.m, padding: `${spacing.s} ${NAV_PAD_X}px`, transition: `background ${micro}` }}
            onMouseEnter={e => e.currentTarget.style.background = colors.stone}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="user-plus" size={20} color={colors.textSecondary} strokeWidth={1.5} />
            </div>
            {expanded && <span style={{ fontSize: typeScale.ui.size, color: colors.ink, fontWeight: 500, whiteSpace: 'nowrap' }}>Invite team members</span>}
          </button>
        </div>
      </nav>
    </div>
  )
}

// breadcrumbs: Array<{ label: string, onClick: (() => void) | null }>
// Last item is the current page (non-clickable). Items with onClick: null render as plain text.
const Header = ({
  breadcrumbs = [],
  boldLastBreadcrumb = false,
  onShare,
  user = { initials: 'U', name: 'User', role: 'Member' },
}) => {
  const backTarget = breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2] : null

  return (
  <div style={{
    height: CHROME_HEIGHT,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: `0 ${spacing.xl}`,
    borderBottom: `1px solid ${colors.border}`,
    background: colors.stone,
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.m }}>
      {backTarget?.onClick && (
        <button
          onClick={backTarget.onClick}
          aria-label="Go back"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: radii.md,
            background: 'transparent', border: `1px solid ${colors.borderMid}`,
            cursor: 'pointer', flexShrink: 0,
            transition: `all ${micro}`,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = colors.borderStrong; e.currentTarget.style.background = colors.stone2 }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = colors.borderMid; e.currentTarget.style.background = 'transparent' }}
        >
          <Icon name="chevron-left" size={16} color={colors.ink} strokeWidth={1.5} />
        </button>
      )}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.ui.size,
            display:    'flex', alignItems: 'center', gap: spacing.s,
            lineHeight: 1,
          }}>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
                  {i > 0 && (
                    <span style={{ color: colors.textTertiary, userSelect: 'none' }}>/</span>
                  )}
                  {isLast ? (
                    <span style={{
                      fontFamily:  fontFamilies.body,
                      fontSize:    typeScale.ui.size,
                      fontWeight:  boldLastBreadcrumb ? 600 : 400,
                      color:       colors.ink,
                    }}>
                      {crumb.label}
                    </span>
                  ) : crumb.onClick ? (
                    <button
                      onClick={crumb.onClick}
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontFamily: fontFamilies.body, fontSize: typeScale.ui.size,
                        fontWeight: 400, color: colors.textTertiary, padding: 0,
                        transition: `color ${micro}`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = colors.textSecondary}
                      onMouseLeave={e => e.currentTarget.style.color = colors.textTertiary}>
                      {crumb.label}
                    </button>
                  ) : (
                    <span style={{
                      fontFamily: fontFamilies.body, fontSize: typeScale.ui.size,
                      fontWeight: 400, color: colors.textTertiary,
                    }}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              )
            })}
          </span>
        </nav>
      )}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
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
          fontSize: typeScale.labelB.size, fontWeight: 500,
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
}

export { Sidebar, Header }
