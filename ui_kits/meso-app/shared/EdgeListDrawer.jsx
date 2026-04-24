import { useState } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { Pill } from '../Components'

const EdgeRow = ({ edge }) => (
  <div style={{
    display:      'flex',
    alignItems:   'center',
    justifyContent: 'space-between',
    gap:          spacing.m,
    padding:      `10px 0`,
    borderBottom: `1px solid ${colors.border}`,
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        colors.ink,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        marginBottom: edge.meta ? '2px' : 0,
      }}>
        {edge.name}
      </div>
      {edge.meta && (
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          color:        colors.textSecondary,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {edge.meta}
        </div>
      )}
    </div>
    {edge.edgeType && (
      <Pill variant="neutral">{edge.edgeType}</Pill>
    )}
  </div>
)

const EdgeSection = ({ title, edges = [] }) => {
  const [filter, setFilter] = useState('')
  const visible = filter
    ? edges.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
    : edges

  return (
    <div>
      <div style={{
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'space-between',
        marginBottom: spacing.s,
      }}>
        <div style={{
          fontFamily:    fontFamilies.body,
          fontSize:      typeScale.labelB.size,
          fontWeight:    600,
          color:         colors.textTertiary,
          letterSpacing: '0.04em',
        }}>
          {title}
          <span style={{ marginLeft: spacing.xs, color: colors.textTertiary, fontWeight: 400 }}>
            ({edges.length})
          </span>
        </div>
        {edges.length > 4 && (
          <input
            type="text"
            placeholder="Filter…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              fontFamily:  fontFamilies.body,
              fontSize:    typeScale.labelB.size,
              padding:     `${spacing.xs} ${spacing.s}`,
              border:      `1px solid ${colors.borderMid}`,
              borderRadius: radii.md,
              background:  colors.stone,
              color:       colors.ink,
              outline:     'none',
              width:       120,
            }}
          />
        )}
      </div>

      {visible.length === 0 ? (
        <div style={{
          padding:    `${spacing.m} 0`,
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.body.size,
          color:      colors.textTertiary,
        }}>
          {filter ? 'No matches.' : 'None.'}
        </div>
      ) : (
        visible.map(edge => <EdgeRow key={edge.id} edge={edge} />)
      )}
    </div>
  )
}

const EdgeListDrawer = ({ inbound = [], outbound = [] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>
    <EdgeSection title="Inbound"  edges={inbound}  />
    <EdgeSection title="Outbound" edges={outbound} />
  </div>
)

export { EdgeListDrawer }
