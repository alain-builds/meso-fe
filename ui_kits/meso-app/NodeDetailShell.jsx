import { useState, useRef, useEffect } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Icon, Button, Pill }           from './Components'
import { CHROME_HEIGHT, micro }         from './shared/constants'

const STATUS_CONFIG = {
  active:   { variant: 'teal',    dot: 'live', label: 'Active',   pill: { background: colors.tealSoft, color: colors.teal          }, dotColor: colors.teal          },
  archived: { variant: 'neutral', dot: 'off',  label: 'Archived', pill: { background: colors.stone2,  color: colors.textSecondary  }, dotColor: colors.textTertiary  },
  draft:    { variant: 'neutral', dot: 'warn', label: 'Draft',    pill: { background: colors.stone2,  color: colors.textSecondary  }, dotColor: '#F59E0B'             },
  pipeline: { variant: 'outline', dot: null,   label: 'Pipeline', pill: { background: 'transparent',  color: colors.textTertiary, border: `1px solid ${colors.borderMid}` }, dotColor: null },
}

const SIDE_TABS = [
  { id: 'details',  label: 'Details'  },
  { id: 'comments', label: 'Comments' },
]



const OverflowTabBar = ({ tabs, activeTab, onTabChange }) => {
  const containerRef = useRef(null)
  const measureRef   = useRef(null)
  const dropdownRef  = useRef(null)
  const [visibleCount, setVisibleCount] = useState(tabs.length)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const measure   = measureRef.current
    if (!container || !measure) return

    const recalculate = () => {
      const containerWidth = container.offsetWidth
      const tabWidths      = Array.from(measure.children).map(el => el.offsetWidth)
      const totalWidth     = tabWidths.reduce((a, b) => a + b, 0)

      if (totalWidth <= containerWidth) {
        setVisibleCount(tabs.length)
        return
      }

      // Reserve ~88px for the "+N more" button
      let used  = 88
      let count = 0
      for (const w of tabWidths) {
        if (used + w > containerWidth) break
        used += w
        count++
      }
      setVisibleCount(Math.max(0, count))
    }

    recalculate()
    const ro = new ResizeObserver(recalculate)
    ro.observe(container)
    return () => ro.disconnect()
  }, [tabs])

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const visibleTabs      = tabs.slice(0, visibleCount)
  const overflowTabs     = tabs.slice(visibleCount)
  const activeInOverflow = overflowTabs.some(t => t.id === activeTab)

  const tabBtnStyle = (id) => ({
    display:      'inline-flex',
    alignItems:   'center',
    gap:          spacing.xs,
    padding:      `${spacing.m} ${spacing.m}`,
    background:   'transparent',
    border:       'none',
    borderBottom: `2px solid ${activeTab === id ? colors.teal : 'transparent'}`,
    cursor:       'pointer',
    fontFamily:   fontFamilies.body,
    fontSize:     typeScale.ui.size,
    fontWeight:   activeTab === id ? 500 : 400,
    color:        activeTab === id ? colors.ink : colors.textSecondary,
    whiteSpace:   'nowrap',
    transition:   `all ${micro}`,
    marginBottom: '-1px',
  })

  const showBadge = (b) => b != null && b !== '' && b !== 0 && b !== false
  const renderBadge = (tab) => showBadge(tab.badge) ? (
    <span style={{
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      minWidth:       16,
      height:         16,
      padding:        '0 4px',
      borderRadius:   radii.sm,
      background:     activeTab === tab.id ? colors.teal : colors.stone2,
      color:          activeTab === tab.id ? colors.white : colors.textSecondary,
      fontSize:       typeScale.labelA.size,
      fontWeight:     600,
      lineHeight:     1,
    }}>
      {tab.badge}
    </span>
  ) : null

  return (
    <div style={{ position: 'relative' }}>
      {/* Hidden measurement strip — renders all tabs at natural width */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          visibility:    'hidden',
          pointerEvents: 'none',
          display:       'flex',
          top:           0,
          left:          0,
        }}
      >
        {tabs.map(tab => (
          <button key={tab.id} style={tabBtnStyle(tab.id)}>
            {tab.label}
            {renderBadge(tab)}
          </button>
        ))}
      </div>

      {/* Visible tab row */}
      <div ref={containerRef} style={{ display: 'flex' }}>
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={tabBtnStyle(tab.id)}
            onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.ink }}
            onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.textSecondary }}
          >
            {tab.label}
            {renderBadge(tab)}
          </button>
        ))}

        {overflowTabs.length > 0 && (
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          spacing.xs,
                padding:      `${spacing.m} ${spacing.m}`,
                background:   'transparent',
                border:       'none',
                borderBottom: `2px solid ${activeInOverflow ? colors.teal : 'transparent'}`,
                cursor:       'pointer',
                fontFamily:   fontFamilies.body,
                fontSize:     typeScale.ui.size,
                fontWeight:   activeInOverflow ? 500 : 400,
                color:        activeInOverflow ? colors.ink : colors.textSecondary,
                whiteSpace:   'nowrap',
                transition:   `all ${micro}`,
                marginBottom: '-1px',
              }}
              onMouseEnter={e => { if (!activeInOverflow) e.currentTarget.style.color = colors.ink }}
              onMouseLeave={e => { if (!activeInOverflow) e.currentTarget.style.color = colors.textSecondary }}
            >
              +{overflowTabs.length} more
              <Icon
                name="chevron-down"
                size={12}
                color="currentColor"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: `transform ${micro}` }}
              />
            </button>

            {dropdownOpen && (
              <div style={{
                position:     'absolute',
                top:          'calc(100% + 4px)',
                right:        0,
                zIndex:       30,
                background:   colors.white,
                border:       `1px solid ${colors.border}`,
                borderRadius: radii.md,
                boxShadow:    shadows.sm,
                minWidth:     160,
                overflow:     'hidden',
              }}>
                {overflowTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { onTabChange(tab.id); setDropdownOpen(false) }}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        spacing.xs,
                      width:      '100%',
                      padding:    `${spacing.s} ${spacing.m}`,
                      background: activeTab === tab.id ? colors.stone : 'transparent',
                      border:     'none',
                      cursor:     'pointer',
                      fontFamily: fontFamilies.body,
                      fontSize:   typeScale.ui.size,
                      fontWeight: activeTab === tab.id ? 500 : 400,
                      color:      activeTab === tab.id ? colors.ink : colors.textSecondary,
                      textAlign:  'left',
                      transition: `background ${micro}`,
                    }}
                    onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = colors.stone }}
                    onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    {tab.label}
                    {showBadge(tab.badge) && (
                      <span style={{
                        marginLeft:     'auto',
                        display:        'inline-flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        minWidth:       16,
                        height:         16,
                        padding:        '0 4px',
                        borderRadius:   radii.sm,
                        background:     activeTab === tab.id ? colors.teal : colors.stone2,
                        color:          activeTab === tab.id ? colors.white : colors.textSecondary,
                        fontSize:       typeScale.labelA.size,
                        fontWeight:     600,
                        lineHeight:     1,
                      }}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const NodeDetailShell = ({
  nodeType,
  nodeSubtype,
  name,
  status = 'active',
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  sidebarContent,
  tabs = [],
  onTitleVisibilityChange,
}) => {
  const [activeTab,     setActiveTab]     = useState(tabs[0]?.id ?? null)
  const [activeSideTab, setActiveSideTab] = useState('details')
  const [starred,       setStarred]       = useState(false)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!onTitleVisibilityChange) return
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => onTitleVisibilityChange(entry.isIntersecting),
      { rootMargin: `-${CHROME_HEIGHT}px 0px 0px 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onTitleVisibilityChange])

  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.active
  const activeContent = tabs.find(t => t.id === activeTab)?.content ?? null

  return (
    <div style={{
      paddingTop:    spacing.m,
      paddingLeft:   spacing.xl2,
      paddingRight:  spacing.xl2,
      paddingBottom: spacing.xl3,
      width:     '100%',
      boxSizing: 'border-box',
    }}>

      {/* Header bar — title + actions on one line */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: spacing.m,
        marginBottom: spacing.s,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flex: 1, minWidth: 0 }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily:    fontFamilies.display,
              fontSize:      '34px',
              fontWeight:    700,
              letterSpacing: '-1px',
              lineHeight:    1.1,
              color:         colors.ink,
              margin:        0,
              minWidth:      0,
            }}
          >
            {name}
          </h1>

          <button
            onClick={() => setStarred(s => !s)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              color: starred ? colors.amber : colors.textTertiary, flexShrink: 0,
              transition: `color ${micro}`,
            }}
            onMouseEnter={e => { if (!starred) e.currentTarget.style.color = colors.textSecondary }}
            onMouseLeave={e => { if (!starred) e.currentTarget.style.color = colors.textTertiary }}
            aria-label={starred ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Icon name={starred ? 'star-filled' : 'star'} size={18} strokeWidth={1.5} />
          </button>

        </div>

        <div style={{ display: 'flex', gap: spacing.s, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" icon="history">History</Button>
          <Button variant="secondary" size="sm" icon="check-check">Audit</Button>
          <Button variant="primary"   size="sm" icon="arrow-up-right">Open in Canvas</Button>
        </div>
      </div>

      {/* Timestamps — status pill + single date line */}
      {(updatedAt || createdAt) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: spacing.s,
          marginBottom: spacing.m,
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          color:        colors.textTertiary,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '1px 6px', borderRadius: radii.sm, flexShrink: 0,
            fontSize: typeScale.labelA.size, fontWeight: 500,
            ...statusCfg.pill,
          }}>
            {statusCfg.dot && (
              <span style={{ width: 4, height: 4, borderRadius: '50%', flexShrink: 0, background: statusCfg.dotColor }} />
            )}
            {statusCfg.label}
          </span>
          {updatedAt
            ? <span>Last updated {updatedAt}{updatedBy ? ` by ${updatedBy}` : ''}</span>
            : <span>Created {createdAt}{createdBy ? ` by ${createdBy}` : ''}</span>
          }
        </div>
      )}

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: spacing.l, alignItems: 'stretch' }}>

        {/* Left: main content */}
        <div style={{ flex: '2 1 0', minWidth: 0 }}>

          {/* Sticky tab nav — bleeds to left edge only */}
          <nav
            aria-label={`${nodeType ?? 'Node'} sections`}
            style={{
              position:     'sticky',
              top:          CHROME_HEIGHT,
              zIndex:       10,
              background:   colors.stone,
              borderBottom: `1px solid ${colors.border}`,
              marginBottom: spacing.l,
              marginLeft:   `-${spacing.xl2}`,
              paddingLeft:  spacing.xl2,
            }}
          >
            <OverflowTabBar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </nav>

          {/* Tab content */}
          <div>
            {activeContent}
          </div>
        </div>

        {/* Right: sticky details sidebar */}
        <div style={{
          flex:         '1 1 0',
          minWidth:     0,
          position:     'sticky',
          top:          CHROME_HEIGHT,
          alignSelf:    'flex-start',
          background:   colors.white,
          borderRadius: radii.lg,
          boxShadow:    shadows.sm,
        }}>

          {/* Sidebar tab bar — outside the scroll container so the scrollbar starts below it */}
          <div style={{
            display:      'flex',
            flexShrink:   0,
            borderBottom: `1px solid ${colors.border}`,
            background:   colors.white,
            borderRadius: `${radii.lg} ${radii.lg} 0 0`,
          }}>
            {SIDE_TABS.map(sideTab => (
              <button
                key={sideTab.id}
                onClick={() => setActiveSideTab(sideTab.id)}
                style={{
                  flex:         1,
                  padding:      `${spacing.m} ${spacing.s}`,
                  background:   'transparent',
                  border:       'none',
                  borderBottom: `2px solid ${activeSideTab === sideTab.id ? colors.teal : 'transparent'}`,
                  cursor:       'pointer',
                  fontFamily:   fontFamilies.body,
                  fontSize:     typeScale.ui.size,
                  fontWeight:   activeSideTab === sideTab.id ? 500 : 400,
                  color:        activeSideTab === sideTab.id ? colors.ink : colors.textSecondary,
                  whiteSpace:   'nowrap',
                  transition:   `all ${micro}`,
                  marginBottom: '-1px',
                }}
                onMouseEnter={e => { if (activeSideTab !== sideTab.id) e.currentTarget.style.color = colors.ink }}
                onMouseLeave={e => { if (activeSideTab !== sideTab.id) e.currentTarget.style.color = colors.textSecondary }}
              >
                {sideTab.label}
              </button>
            ))}
          </div>

          {/* Sidebar body — only this region scrolls */}
          {activeSideTab === 'details' ? (
            <div style={{ padding: spacing.m }}>
              {sidebarContent}
            </div>
          ) : (
            <div style={{
              padding:   spacing.xl2,
              textAlign: 'center',
              fontSize:  typeScale.body.size,
              color:     colors.textTertiary,
            }}>
              No comments yet.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export { NodeDetailShell }
