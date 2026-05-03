import { colorVars, colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { micro } from '../../shared/constants'

// 220px is the agreed column width from the capability map spec.
const COLUMN_W = '220px'

const CapabilityMap = ({ capabilities, onOpenCapability }) => {
  const l1s = capabilities.filter(c => !c.parentCapabilityId)

  return (
    <div style={{ overflowX: 'auto', paddingBottom: spacing.xl }}>
      <div style={{ display: 'flex', gap: spacing.m, alignItems: 'flex-start', width: 'max-content' }}>

        {l1s.map(l1 => {
          const l2s = capabilities.filter(c => c.parentCapabilityId === l1.id)

          return (
            <div key={l1.id} style={{ width: COLUMN_W, flexShrink: 0 }}>

              {/* L1 header */}
              <button
                onClick={() => onOpenCapability(l1)}
                style={{
                  display:      'block',
                  width:        '100%',
                  padding:      spacing.m,
                  background:   colorVars.teal,
                  color:        colors.white,
                  border:       'none',
                  borderRadius: `${radii.md} ${radii.md} 0 0`,
                  cursor:       'pointer',
                  textAlign:    'left',
                  fontFamily:   fontFamilies.display,
                  fontSize:     typeScale.ui.size,
                  fontWeight:   600,
                  lineHeight:   1.3,
                  transition:   `filter ${micro}`,
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.88)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
              >
                {l1.name}
              </button>

              {/* L2 cards */}
              <div style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           spacing.xs,
                marginTop:     spacing.xs,
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
                          fontFamily: fontFamilies.body,
                          fontSize:   typeScale.ui.size,
                          fontWeight: 500,
                          color:      colorVars.ink,
                          lineHeight: 1.4,
                        }}
                      >
                        {l2.name}
                      </button>

                      {/* L3 items */}
                      {l3s.length > 0 && (
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
