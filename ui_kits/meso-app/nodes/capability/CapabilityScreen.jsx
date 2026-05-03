import { useRef, useCallback, useState }                                     from 'react'
import { colorVars, colors, fontFamilies, typeScale, spacing, radii }        from '@/tokens'
import { Button }                                                             from '../../Components'
import { CAPABILITIES }                                                       from './capabilityData.js'
import { CapabilityMap }                                                      from './CapabilityMap'
import { micro, CHROME_HEIGHT }                                               from '../../shared/constants'

const COLUMN_W = '220px'

const CapabilityScreen = ({ onOpenCapability }) => {
  const headerRef  = useRef(null)
  const contentRef = useRef(null)

  const syncScroll = useCallback(() => {
    if (headerRef.current && contentRef.current) {
      headerRef.current.scrollLeft = contentRef.current.scrollLeft
    }
  }, [])

  const [showL3, setShowL3] = useState(true)

  const l1s = CAPABILITIES.filter(c => !c.parentCapabilityId)

  return (
    <div style={{ paddingBottom: spacing.xl3 }}>

      {/* ── Sticky block: page header + L1 teal strip ─────────────── */}
      <div style={{
        position:      'sticky',
        top:           CHROME_HEIGHT,
        zIndex:        10,
        background:    colorVars.stone,
        paddingTop:    spacing.m,
        paddingLeft:   spacing.xl2,
        paddingRight:  spacing.xl2,
        paddingBottom: spacing.xs,
      }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.m, marginBottom: spacing.m }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{
              fontFamily:    fontFamilies.display,
              fontSize:      '34px',
              fontWeight:    700,
              letterSpacing: '-1px',
              lineHeight:    1.1,
              color:         colors.ink,
              margin:        0,
            }}>
              Business Capability Map
            </h1>
            <p style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colorVars.textTertiary,
              margin:     `${spacing.s} 0 ${spacing.xl}`,
              lineHeight: 1.4,
            }}>
              Last updated 2 May 2026 by Alain Dunphy
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.m, flexShrink: 0 }}>
            {/* L3 toggle */}
            <button
              onClick={() => setShowL3(v => !v)}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        spacing.s,
                background: 'transparent',
                border:     'none',
                cursor:     'pointer',
                padding:    0,
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.labelB.size,
                color:      colorVars.textSecondary,
              }}
            >
              <span style={{
                display:      'inline-block',
                width:        32,
                height:       18,
                borderRadius: 9,
                background:   showL3 ? colorVars.teal : colorVars.stone3,
                position:     'relative',
                transition:   `background ${micro}`,
                flexShrink:   0,
              }}>
                <span style={{
                  position:     'absolute',
                  top:          2,
                  left:         showL3 ? 16 : 2,
                  width:        14,
                  height:       14,
                  borderRadius: '50%',
                  background:   colors.white,
                  transition:   `left ${micro}`,
                }} />
              </span>
              Sub-capabilities
            </button>
            <div style={{ display: 'flex', gap: spacing.s }}>
              <Button variant="secondary" size="sm" icon="history">History</Button>
              <Button variant="primary"   size="sm" icon="plus">Add capability</Button>
            </div>
          </div>
        </div>

        {/* L1 teal strip — overflow hidden, scroll-synced to content */}
        <div ref={headerRef} style={{ overflowX: 'hidden' }}>
          <div style={{ display: 'flex', gap: spacing.m, width: 'max-content' }}>
            {l1s.map(l1 => (
              <button
                key={l1.id}
                onClick={() => onOpenCapability(l1)}
                style={{
                  display:      'block',
                  width:        COLUMN_W,
                  flexShrink:   0,
                  padding:      spacing.m,
                  background:   colorVars.teal,
                  color:        colors.white,
                  border:       'none',
                  borderRadius: `${radii.md} ${radii.md} 0 0`,
                  cursor:       'pointer',
                  textAlign:    'left',
                  fontFamily:    fontFamilies.display,
                  fontSize:      typeScale.ui.size,
                  fontWeight:    600,
                  lineHeight:    1.3,
                  transition:    `filter ${micro}`,
                  whiteSpace:    'nowrap',
                  overflow:      'hidden',
                  textOverflow:  'ellipsis',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.88)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
              >
                {l1.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable L2 / L3 content ─────────────────────────────── */}
      <div style={{ paddingLeft: spacing.xl2, paddingRight: spacing.xl2 }}>
        <CapabilityMap
          capabilities={CAPABILITIES}
          onOpenCapability={onOpenCapability}
          contentRef={contentRef}
          onScroll={syncScroll}
          showL3={showL3}
        />
      </div>

    </div>
  )
}

export { CapabilityScreen }
