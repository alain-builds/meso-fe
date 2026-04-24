import { useState } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows, duration, easing, layout } from '@/tokens'
import { Icon, Button, Pill } from './Components'
import { StatStrip } from './StatStrip'
import { RelationshipMapSlot } from './RelationshipMapSlot'

// Must match Shell.jsx CHROME_HEIGHT — the sticky page header height.
const CHROME_HEIGHT = 60

const STATUS_CONFIG = {
  active:   { variant: 'teal',    dot: 'live', label: 'Active'   },
  archived: { variant: 'neutral', dot: 'off',  label: 'Archived' },
  draft:    { variant: 'neutral', dot: 'warn', label: 'Draft'    },
  pipeline: { variant: 'outline', dot: null,   label: 'Pipeline' },
}

const micro  = `${duration.micro} ${easing.out}`
const medium = `${duration.medium} ${easing.out}`

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
  tabs = [],
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? null)

  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.active
  const activeContent = tabs.find(t => t.id === activeTab)?.content ?? null

  return (
    <div style={{
      padding:   `${spacing.xl} ${spacing.xl2} ${spacing.xl3}`,
      width:     '100%',
      boxSizing: 'border-box',
    }}>

      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: spacing.l, marginBottom: spacing.l,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Node type label */}
          <div style={{
            fontFamily:    fontFamilies.body,
            fontSize:      typeScale.labelB.size,
            fontWeight:    600,
            letterSpacing: '0.06em',
            color:         colors.teal,
            textTransform: 'uppercase',
            marginBottom:  spacing.s,
          }}>
            {nodeType}{nodeSubtype ? ` · ${nodeSubtype.replace(/_/g, ' ')}` : ''}
          </div>

          {/* Back arrow + Node name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, marginBottom: spacing.m }}>
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
            <h1 style={{
              fontFamily:    fontFamilies.display,
              fontSize:      typeScale.h1.size,
              fontWeight:    typeScale.h1.weight,
              letterSpacing: typeScale.h1.letterSpacing,
              lineHeight:    typeScale.h1.lineHeight,
              color:         colors.ink,
              margin:        0,
            }}>
              {name}
            </h1>
          </div>

          {/* Status + breadcrumb pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flexWrap: 'wrap' }}>
            {statusCfg.dot
              ? <Pill variant={statusCfg.variant} dot={statusCfg.dot}>{statusCfg.label}</Pill>
              : <Pill variant={statusCfg.variant}>{statusCfg.label}</Pill>
            }
            {breadcrumb.map(crumb => (
              <Pill key={crumb} variant="outline">{crumb}</Pill>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: spacing.s, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" icon="history">History</Button>
          <Button variant="secondary" size="sm" icon="share-2">Share</Button>
          <Button variant="primary"   size="sm" icon="arrow-up-right">Open in graph</Button>
        </div>
      </div>

      {/* At-a-glance stat strip */}
      {statTiles.length > 0 && (
        <div style={{ marginBottom: spacing.l }}>
          <StatStrip tiles={statTiles} />
        </div>
      )}

      {/* Sticky tab nav */}
      <nav
        aria-label={`${nodeType ?? 'Node'} sections`}
        style={{
          position:    'sticky',
          top:         CHROME_HEIGHT,
          zIndex:      10,
          background:  colors.stone,
          borderBottom: `1px solid ${colors.border}`,
          marginBottom: spacing.l,
          marginLeft:  `-${spacing.xl2}`,
          marginRight: `-${spacing.xl2}`,
          paddingLeft:  spacing.xl2,
          paddingRight: spacing.xl2,
        }}
      >
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            spacing.xs,
                padding:        `${spacing.m} ${spacing.m}`,
                background:     'transparent',
                border:         'none',
                borderBottom:   `2px solid ${activeTab === tab.id ? colors.teal : 'transparent'}`,
                cursor:         'pointer',
                fontFamily:     fontFamilies.body,
                fontSize:       typeScale.ui.size,
                fontWeight:     activeTab === tab.id ? 500 : 400,
                color:          activeTab === tab.id ? colors.ink : colors.textSecondary,
                whiteSpace:     'nowrap',
                transition:     `all ${micro}`,
                marginBottom:   '-1px',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.ink }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = colors.textSecondary }}
            >
              {tab.label}
              {tab.badge > 0 && (
                <span style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  minWidth:        16,
                  height:          16,
                  padding:         '0 4px',
                  borderRadius:    radii.sm,
                  background:      activeTab === tab.id ? colors.teal : colors.stone2,
                  color:           activeTab === tab.id ? colors.white : colors.textSecondary,
                  fontSize:        '10px',
                  fontWeight:      600,
                  lineHeight:      1,
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
  )
}

export { NodeDetailShell }
