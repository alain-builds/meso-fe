import { memo, useState } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { Pill } from '../Components'

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase() ?? '').join('')
}

// Fixed-pixel tracks assume a minimum panel width of ~640px; flex columns absorb narrower widths.
const GRID = '1fr 1fr 80px 140px 80px 88px'

const COLUMNS = [
  { key: 'name',   label: 'Name',         sortable: true },
  { key: 'role',   label: 'Role',         sortable: true },
  { key: 'type',   label: 'Type',         sortable: true },
  { key: 'entity', label: 'Legal Entity', sortable: true },
  { key: 'since',  label: 'Since',        sortable: true },
  { key: 'status', label: 'Status',       sortable: true },
]

const getSortValue = (member, col) => {
  switch (col) {
    case 'name':   return member.isVacant ? '' : (member.name ?? '').toLowerCase()
    case 'role':   return (member.role ?? '').toLowerCase()
    case 'type':   return member.isVacant ? 'z_vacant' : member.isExternal ? 'b_external' : 'a_internal'
    case 'entity': return (member.legalEntity ?? '').toLowerCase()
    case 'since':  return member.staffedAt ?? ''
    case 'status': return member.isVacant ? 1 : 0
    default:       return ''
  }
}

const ENTITY_BADGE_FONT_SIZE = '9px'

// Deterministic color from company name — picks from a small dark palette
const ENTITY_COLORS = ['#1a1a2e', '#0f3460', '#533483', '#1b4332', '#7c3626']
const entityColor = (name) => {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff
  return ENTITY_COLORS[hash % ENTITY_COLORS.length]
}

const CompanyBadge = ({ name }) => {
  if (!name) return (
    <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textTertiary }}>
      —
    </span>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
      <div style={{
        width:          18,
        height:         18,
        borderRadius:   radii.sm,
        background:     entityColor(name),
        color:          '#fff',
        fontSize:       ENTITY_BADGE_FONT_SIZE,
        fontWeight:     700,
        fontFamily:     fontFamilies.body,
        letterSpacing:  '0.02em',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}>
        {name.trim()[0]?.toUpperCase() ?? '?'}
      </div>
      <span style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.labelB.size,
        color:        colors.textSecondary,
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        whiteSpace:   'nowrap',
      }}>
        {name}
      </span>
    </div>
  )
}

const HoverChip = ({ children, style }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          spacing.s,
        // Negative margin cancels the padding so content position stays aligned in the grid;
        // the background bleeds slightly beyond the cell boundary on hover.
        padding:      `4px 8px`,
        margin:       `-4px -8px`,
        borderRadius: radii.md,
        background:   hovered ? colors.stone : 'transparent',
        cursor:       'pointer',
        transition:   'background 100ms ease',
        maxWidth:     'calc(100% + 16px)',
        overflow:     'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const MemberRow = memo(({ member }) => (
  <div style={{
    display:             'grid',
    gridTemplateColumns: GRID,
    alignItems:          'center',
    gap:                 spacing.m,
    padding:             `10px 0`,
    borderBottom:        `1px solid ${colors.border}`,
  }}>

    {/* Avatar + Name — single clickable chip for non-vacant */}
    {member.isVacant ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
        <div style={{
          width:          32,
          height:         32,
          borderRadius:   '50%',
          background:     colors.stone2,
          color:          colors.textTertiary,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '10px',
          fontWeight:     600,
          fontFamily:     fontFamilies.body,
          border:         `1px dashed ${colors.borderMid}`,
          flexShrink:     0,
        }}>
          —
        </div>
        <span style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.ui.size,
          fontWeight:   400,
          color:        colors.textTertiary,
          minWidth:     0,
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          Vacant
        </span>
      </div>
    ) : (
      <HoverChip>
        <div style={{
          width:          32,
          height:         32,
          borderRadius:   '50%',
          background:     colors.ink,
          color:          colors.stone,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '10px',
          fontWeight:     600,
          fontFamily:     fontFamilies.body,
          flexShrink:     0,
        }}>
          {initials(member.name)}
        </div>
        <span style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.ui.size,
          fontWeight:   500,
          color:        colors.ink,
          minWidth:     0,
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          {member.name}
        </span>
      </HoverChip>
    )}

    {/* Role — chip stretches to fill full row height */}
    <HoverChip style={{ gap: 0, display: 'flex', alignSelf: 'stretch', alignItems: 'center' }}>
      <span style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.labelB.size,
        color:        colors.textSecondary,
        minWidth:     0,
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        whiteSpace:   'nowrap',
      }}>
        {member.role ?? '—'}
      </span>
    </HoverChip>

    {/* Type */}
    <div style={{
      fontFamily: fontFamilies.body,
      fontSize:   typeScale.labelB.size,
      color:      member.isVacant ? colors.textTertiary : colors.textSecondary,
    }}>
      {member.isVacant ? '—' : member.isExternal ? 'External' : 'Internal'}
    </div>

    {/* Legal Entity */}
    {member.legalEntity ? (
      <HoverChip style={{ gap: 0, display: 'flex', alignSelf: 'stretch', alignItems: 'center' }}>
        <CompanyBadge name={member.legalEntity} />
      </HoverChip>
    ) : (
      <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textTertiary }}>—</span>
    )}

    {/* Since */}
    <div style={{
      fontFamily: fontFamilies.body,
      fontSize:   typeScale.labelB.size,
      color:      colors.textTertiary,
    }}>
      {member.staffedAt ?? '—'}
    </div>

    {/* Status pill */}
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {member.isVacant
        ? <Pill variant="neutral" dot="warn">Vacant</Pill>
        : <Pill variant="teal" dot="live">Active</Pill>
      }
    </div>
  </div>
))
MemberRow.displayName = 'MemberRow'

const MemberTable = ({ members = [], emptyMessage = 'No members yet.' }) => {
  const [sort, setSort] = useState({ col: null, dir: 'asc' })

  if (members.length === 0) {
    return (
      <div style={{
        padding:    `${spacing.l} 0`,
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.body.size,
        color:      colors.textTertiary,
      }}>
        {emptyMessage}
      </div>
    )
  }

  const toggleSort = (col) => {
    setSort(prev =>
      prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: 'asc' }
    )
  }

  const sorted = sort.col
    ? [...members].sort((a, b) => {
        const av = getSortValue(a, sort.col)
        const bv = getSortValue(b, sort.col)
        const cmp = (typeof av === 'number' && typeof bv === 'number')
          ? av - bv
          : String(av).localeCompare(String(bv))
        return sort.dir === 'asc' ? cmp : -cmp
      })
    : members

  return (
    <div>
      {/* Table header */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: GRID,
        gap:                 spacing.m,
        padding:             `${spacing.xs} 0 ${spacing.s}`,
        borderBottom:        `1px solid ${colors.borderMid}`,
      }}>
        {COLUMNS.map(({ key, label, sortable }) => (
          <div
            key={key}
            onClick={sortable ? () => toggleSort(key) : undefined}
            style={{
              fontFamily:    fontFamilies.body,
              fontSize:      typeScale.labelB.size,
              fontWeight:    600,
              color:         sort.col === key ? colors.ink : colors.textTertiary,
              letterSpacing: '0.04em',
              cursor:        sortable ? 'pointer' : 'default',
              userSelect:    'none',
              display:       'flex',
              alignItems:    'center',
              gap:           4,
            }}
          >
            {label}
            {sortable && (
              <span style={{
                fontSize:   '10px',
                color:      sort.col === key ? colors.ink : colors.borderMid,
                lineHeight: 1,
              }}>
                {sort.col === key ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Rows — keyed by member.id, never index */}
      {sorted.map(member => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  )
}

export { MemberTable }
