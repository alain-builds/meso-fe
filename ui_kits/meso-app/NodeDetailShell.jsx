import { useState } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows, duration, easing } from '@/tokens'
import { Icon, Button, Pill } from './Components'
import { RelationshipMapSlot } from './RelationshipMapSlot'

// Must match Shell.jsx CHROME_HEIGHT — the sticky page header height.
const CHROME_HEIGHT = 60

const STATUS_CONFIG = {
  active:   { variant: 'teal',    dot: 'live', label: 'Active'   },
  archived: { variant: 'neutral', dot: 'off',  label: 'Archived' },
  draft:    { variant: 'neutral', dot: 'warn', label: 'Draft'    },
  pipeline: { variant: 'outline', dot: null,   label: 'Pipeline' },
}

const SIDE_TABS = [
  { id: 'details',  label: 'Details'  },
  { id: 'comments', label: 'Comments' },
]

const micro = `${duration.micro} ${easing.out}`

const SidebarStatGrid = ({ tiles }) => (
  <div style={{
    display:      'grid',
    gridTemplateColumns: '1fr 1fr',
    border:       `1px solid ${colors.border}`,
    borderRadius: radii.md,
    overflow:     'hidden',
  }}>
    {tiles.map((tile, i) => (
      <div
        key={tile.id}
        style={{
          padding:      `${spacing.m} ${spacing.m}`,
          borderRight:  i % 2 === 0 ? `1px solid ${colors.border}` : 'none',
          borderBottom: i < tiles.length - 2 ? `1px solid ${colors.border}` : 'none',
        }}
      >
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          fontWeight:   typeScale.labelB.weight,
          color:        colors.textTertiary,
          marginBottom: spacing.xs,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {tile.label}
        </div>
        <div style={{
          fontFamily:    fontFamilies.display,
          fontSize:      typeScale.h3.size,
          fontWeight:    typeScale.h3.weight,
          letterSpacing: typeScale.h3.letterSpacing,
          color:         colors.ink,
          lineHeight:    1.1,
          marginBottom:  tile.sub ? spacing.xs : 0,
          whiteSpace:    'nowrap',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
        }}>
          {tile.value}
        </div>
        {tile.sub && (
          <div style={{
            fontFamily:   fontFamilies.body,
            fontSize:     typeScale.labelB.size,
            color:        colors.textSecondary,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
          }}>
            {tile.sub}
          </div>
        )}
      </div>
    ))}
  </div>
)

const CollapsibleStub = ({ label, iconName }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: colors.white, borderRadius: radii.lg, boxShadow: shadows.sm, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: `${spacing.m} ${spacing.l}`,
          background: 'transparent', border: 'none', cursor: 'pointer',
          transition: `background ${micro}`,
        }}
        onMouseEnter={e => e.currentTarget.style.background = colors.stone}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
          <Icon name={iconName} size={14} color={colors.textTertiary} strokeWidth={1.5} />
          <span style={{
            fontFamily:    fontFamilies.body,
            fontSize:      typeScale.labelB.size,
            fontWeight:    600,
            color:         colors.textTertiary,
            letterSpacing: '0.04em',
          }}>
            {label}
          </span>
        </div>
        <Icon
          name="chevron-down"
          size={14}
          color={colors.textTertiary}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: `transform ${micro}` }}
        />
      </button>
      {open && (
        <div style={{ padding: `${spacing.m} ${spacing.l} ${spacing.l}`, borderTop: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: typeScale.body.size, color: colors.textTertiary, lineHeight: typeScale.body.lineHeight }}>
            No records yet.
          </div>
        </div>
      )}
    </div>
  )
}

const NodeDetailShell = ({
  nodeType,
  nodeSubtype,
  name,
  status = 'active',
  breadcrumb = [],
  statTiles = [],
  sidebarContent,
  tabs = [],
  onBack,
}) => {
  const [activeTab,     setActiveTab]     = useState(tabs[0]?.id ?? null)
  const [activeSideTab, setActiveSideTab] = useState('details')
  const [starred,       setStarred]       = useState(false)

  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.active
  const activeContent = tabs.find(t => t.id === activeTab)?.content ?? null

  return (
    <div style={{
      paddingTop:    '10px',
      paddingLeft:   spacing.xl2,
      paddingRight:  spacing.xl2,
      paddingBottom: spacing.xl3,
      width:     '100%',
      boxSizing: 'border-box',
    }}>

      {/* Header bar — back + title + actions on one line */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: spacing.m,
        marginBottom: spacing.m,
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            color: colors.textSecondary, flexShrink: 0,
            transition: `color ${micro}`,
          }}
          onMouseEnter={e => e.currentTarget.style.color = colors.ink}
          onMouseLeave={e => e.currentTarget.style.color = colors.textSecondary}
          aria-label="Go back"
        >
          <Icon name="chevron-left" size={20} strokeWidth={2} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontFamily:    fontFamilies.display,
            fontSize:      typeScale.h1.size,
            fontWeight:    typeScale.h1.weight,
            letterSpacing: typeScale.h1.letterSpacing,
            lineHeight:    typeScale.h1.lineHeight,
            color:         colors.ink,
            margin:        0,
            minWidth:      0,
          }}>
            {name}
          </h1>

          <button
            onClick={() => setStarred(s => !s)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              color: starred ? '#FBBF24' : colors.textTertiary, flexShrink: 0,
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

      {/* Status + breadcrumb pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flexWrap: 'wrap', marginBottom: spacing.l }}>
        {statusCfg.dot
          ? <Pill variant={statusCfg.variant} dot={statusCfg.dot}>{statusCfg.label}</Pill>
          : <Pill variant={statusCfg.variant}>{statusCfg.label}</Pill>
        }
        {breadcrumb.map(crumb => (
          <Pill key={crumb} variant="outline">{crumb}</Pill>
        ))}
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: spacing.l, alignItems: 'flex-start' }}>

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
            <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display:      'inline-flex',
                    alignItems:   'center',
                    gap:          spacing.xs,
                    padding:      `${spacing.m} ${spacing.m}`,
                    background:   'transparent',
                    border:       'none',
                    borderBottom: `2px solid ${activeTab === tab.id ? colors.teal : 'transparent'}`,
                    cursor:       'pointer',
                    fontFamily:   fontFamilies.body,
                    fontSize:     typeScale.ui.size,
                    fontWeight:   activeTab === tab.id ? 500 : 400,
                    color:        activeTab === tab.id ? colors.ink : colors.textSecondary,
                    whiteSpace:   'nowrap',
                    transition:   `all ${micro}`,
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.ink }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.textSecondary }}
                >
                  {tab.label}
                  {tab.badge > 0 && (
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
                      fontSize:       '10px',
                      fontWeight:     600,
                      lineHeight:     1,
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Tab content */}
          <div style={{ marginBottom: spacing.xl }}>
            {activeContent}
          </div>

          {/* Relationship map slot */}
          <div style={{ marginBottom: spacing.l }}>
            <RelationshipMapSlot nodeName={name} />
          </div>

          {/* Collapsible stubs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
            <CollapsibleStub label="Activity & history" iconName="history" />
            <CollapsibleStub label="Audit"              iconName="check-check" />
          </div>
        </div>

        {/* Right: sticky details sidebar */}
        <div style={{
          flex:         '1 1 0',
          minWidth:     0,
          position:     'sticky',
          top:          CHROME_HEIGHT,
          maxHeight:    `calc(100vh - ${CHROME_HEIGHT}px)`,
          overflowY:    'auto',
          background:   colors.white,
          borderRadius: radii.lg,
          boxShadow:    shadows.sm,
          border:       `1px solid ${colors.border}`,
        }}>

          {/* Sidebar tab bar */}
          <div style={{
            display:      'flex',
            borderBottom: `1px solid ${colors.border}`,
            position:     'sticky',
            top:          0,
            background:   colors.white,
            zIndex:       1,
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

          {/* Sidebar body */}
          {activeSideTab === 'details' ? (
            <div style={{ padding: spacing.m }}>
              {statTiles.length > 0 && (
                <section style={{ marginBottom: sidebarContent ? spacing.l : 0 }}>
                  <div style={{
                    fontFamily:    fontFamilies.body,
                    fontSize:      typeScale.labelB.size,
                    fontWeight:    600,
                    color:         colors.textTertiary,
                    letterSpacing: '0.04em',
                    marginBottom:  spacing.s,
                  }}>
                    KEY METRICS
                  </div>
                  <SidebarStatGrid tiles={statTiles} />
                </section>
              )}
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
