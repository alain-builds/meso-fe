import { colorVars, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { micro }                                                       from '../../shared/constants'

const COLUMN_W = '220px'

const CapabilityMap = ({ capabilities, onOpenCapability, contentRef, onScroll, showL3 }) => {
  const l1s = capabilities.filter(c => !c.parentCapabilityId)

  return (
    <div
      ref={contentRef}
      onScroll={onScroll}
      style={{ overflowX: 'auto', paddingBottom: spacing.xl }}
    >
      <div style={{ display: 'flex', gap: spacing.m, alignItems: 'flex-start', width: 'max-content' }}>

        {l1s.map(l1 => {
          const l2s = capabilities.filter(c => c.parentCapabilityId === l1.id)

          return (
            <div key={l1.id} style={{ width: COLUMN_W, flexShrink: 0 }}>
              <div style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           spacing.xs,
              }}>
                {l2s.map(l2 => {
                  const l3s = capabilities.filter(c => c.parentCapabilityId === l2.id)

                  return (
                    <div
                      key={l2.id}
                      style={{
                        background:   colorVars.white,
                        border:       `1px solid ${colorVars.border}`,
                        borderRadius: radii.md,
                        boxShadow:    shadows.sm,
                        overflow:     'hidden',
                        transition:   `box-shadow ${micro}, transform ${micro}`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = shadows.md
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = shadows.sm
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      {/* L2 name */}
                      <button
                        onClick={() => onOpenCapability(l2)}
                        style={{
                          display:    'block',
                          width:      '100%',
                          padding:    spacing.m,
                          background: 'transparent',
                          border:     'none',
                          cursor:     'pointer',
                          textAlign:  'left',
                          fontFamily:   fontFamilies.body,
                          fontSize:     typeScale.ui.size,
                          fontWeight:   500,
                          color:        colorVars.ink,
                          lineHeight:   1.4,
                          whiteSpace:   'nowrap',
                          overflow:     'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {l2.name}
                      </button>

                      {/* L3 items */}
                      {showL3 && l3s.length > 0 && (
                        <div style={{ borderTop: `1px solid ${colorVars.border}` }}>
                          {l3s.map((l3, i) => (
                            <button
                              key={l3.id}
                              onClick={() => onOpenCapability(l3)}
                              style={{
                                display:      'block',
                                width:        '100%',
                                padding:      `${spacing.xs} ${spacing.m}`,
                                background:   'transparent',
                                border:       'none',
                                borderBottom: i < l3s.length - 1 ? `1px solid ${colorVars.border}` : 'none',
                                cursor:       'pointer',
                                textAlign:    'left',
                                fontFamily:   fontFamilies.body,
                                fontSize:     typeScale.labelB.size,
                                color:        colorVars.textSecondary,
                                lineHeight:   1.4,
                                transition:   `background ${micro}`,
                                whiteSpace:   'nowrap',
                                overflow:     'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = colorVars.stone }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                            >
                              {l3.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export { CapabilityMap }
