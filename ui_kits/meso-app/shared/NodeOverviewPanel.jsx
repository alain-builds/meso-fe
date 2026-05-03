import { Fragment, useState }                                              from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, duration, easing } from '@/tokens'
import { Icon }                                                               from '../Components'

// ── Shared style constants ────────────────────────────────────────────────────

const SECTION_LABEL_STYLE = {
  fontFamily:    fontFamilies.body,
  fontSize:      '10px',
  fontWeight:    600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         colors.textTertiary,
  lineHeight:    1.4,
}

const PROP_LABEL_STYLE = {
  fontFamily: fontFamilies.body,
  fontSize:   typeScale.ui.size,
  color:      colors.textTertiary,
  lineHeight: 1.4,
}

const PROP_VALUE_STYLE = {
  fontFamily: fontFamilies.body,
  fontSize:   typeScale.ui.size,
  fontWeight: 500,
  color:      colors.ink,
  lineHeight: 1.5,
}

// ── Hover row — shared style for every interactive row ────────────────────────

const hoverRowStyle = (hovered) => ({
  display:      'flex',
  alignItems:   'center',
  gap:          spacing.s,
  padding:      `${spacing.xs} ${spacing.s}`,
  margin:       `0 -${spacing.s}`,
  borderRadius: radii.md,
  background:   hovered ? colors.stone2 : 'transparent',
  cursor:       'pointer',
  transition:   `background ${duration.micro} ${easing.out}`,
})

// ── Sub-components ────────────────────────────────────────────────────────────

const SubHeading = ({ children }) => (
  <div style={{
    fontFamily:   fontFamilies.body,
    fontSize:     typeScale.labelB.size,
    fontWeight:   500,
    color:        colors.textTertiary,
    marginBottom: spacing.xs,
  }}>
    {children}
  </div>
)

const Dot = ({ active }) => (
  <div style={{
    width:        6,
    height:       6,
    borderRadius: '50%',
    background:   active ? colors.teal : colors.textTertiary,
    flexShrink:   0,
    marginTop:    4,
  }} />
)

const PillChip = ({ value, variant = 'neutral' }) => {
  const variants = {
    neutral: { background: colors.stone2,   color: colors.textSecondary, border: 'none' },
    teal:    { background: colors.tealSoft, color: colors.teal,          border: `1px solid ${colors.tealBorder}` },
  }
  const s = variants[variant] ?? variants.neutral
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      padding:       '3px 10px',
      borderRadius:  radii.sm,
      fontSize:      typeScale.labelB.size,
      fontWeight:    500,
      textTransform: 'capitalize',
      background:    s.background,
      color:         s.color,
      border:        s.border,
    }}>
      {value}
    </span>
  )
}

// ── Interactive row components ────────────────────────────────────────────────

const initials = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PersonRow = ({ person }) => {
  const [hovered, setHovered] = useState(false)
  const interactive = !person.isVacant
  return (
    <div
      style={hoverRowStyle(hovered && interactive)}
      onMouseEnter={() => { if (interactive) setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      onClick={interactive ? (() => {}) : undefined}
    >
      <div style={{
        width:          32,
        height:         32,
        borderRadius:   '50%',
        background:     person.isVacant ? colors.stone2 : colors.tealSoft,
        flexShrink:     0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontFamily:     fontFamilies.body,
        fontSize:       '11px',
        fontWeight:     600,
        color:          person.isVacant ? colors.textTertiary : colors.teal,
      }}>
        {person.isVacant ? '?' : initials(person.name)}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.ui.size,
          fontWeight:   600,
          color:        person.isVacant ? colors.textTertiary : colors.ink,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {person.isVacant ? 'Vacant' : person.name}
        </div>
        {person.role && (
          <div style={{
            fontFamily:   fontFamilies.body,
            fontSize:     typeScale.labelB.size,
            color:        colors.textSecondary,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
          }}>
            {person.role}
          </div>
        )}
      </div>
    </div>
  )
}

const HierarchyItem = ({ name, dotActive, label }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={hoverRowStyle(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
    >
      <Dot active={dotActive} />
      <span style={{
        flex:         1,
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        color:        colors.teal,
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        whiteSpace:   'nowrap',
      }}>
        {name}
      </span>
      {label && (
        <span style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.labelB.size,
          color:      colors.textTertiary,
          flexShrink: 0,
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

// Gray box on just the value, not the label
const ValueLinkCell = ({ value }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        display:      'inline-block',
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        color:        colors.teal,
        padding:      `${spacing.xs} ${spacing.s}`,
        margin:       `0 -${spacing.s}`,
        borderRadius: radii.md,
        background:   hovered ? colors.stone2 : 'transparent',
        cursor:       'pointer',
        transition:   `background ${duration.micro} ${easing.out}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
    >
      {value}
    </span>
  )
}

const ChannelChip = ({ channel }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        padding:      `${spacing.xs} ${spacing.s}`,
        borderRadius: radii.sm,
        border:       `1px solid ${hovered ? colors.teal : colors.borderMid}`,
        background:   hovered ? colors.tealSoft : 'transparent',
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.labelB.size,
        fontWeight:   500,
        color:        hovered ? colors.teal : colors.textSecondary,
        cursor:       'pointer',
        transition:   `border-color ${duration.micro} ${easing.out}, background ${duration.micro} ${easing.out}, color ${duration.micro} ${easing.out}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
    >
      # {channel.name.replace(/^#/, '')}
    </span>
  )
}

const WorkspaceLink = ({ link }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={hoverRowStyle(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
    >
      <Icon
        name="arrow-up-right"
        size={13}
        color={hovered ? colors.teal : colors.textTertiary}
        strokeWidth={1.5}
      />
      <span style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        color:        colors.teal,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {link.label}
      </span>
    </div>
  )
}

// ── Field renderers ───────────────────────────────────────────────────────────

const renderField = (field, i) => {
  switch (field.type) {

    // ── Large display name ──────────────────────────────────────────────────

    case 'heading':
      return (
        <div key={i} style={{
          gridColumn:    'span 2',
          fontFamily:    fontFamilies.display,
          fontSize:      '18px',
          fontWeight:    700,
          letterSpacing: '-0.4px',
          color:         colors.ink,
          lineHeight:    1.2,
        }}>
          {field.value}
        </div>
      )

    // ── Body text paragraph ─────────────────────────────────────────────────

    case 'description':
      return (
        <p key={i} style={{
          gridColumn:   'span 2',
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.body.size,
          lineHeight:   typeScale.body.lineHeight,
          color:        colors.textSecondary,
          margin:       0,
          marginBottom: spacing.m,
        }}>
          {field.value}
        </p>
      )

    // ── Informational badge (e.g. managed by external entity) ───────────────

    case 'badge':
      return (
        <div key={i} style={{
          gridColumn:   'span 2',
          display:      'inline-flex',
          alignItems:   'center',
          gap:          spacing.xs,
          padding:      `${spacing.xs} ${spacing.s}`,
          borderRadius: radii.sm,
          background:   colors.stone2,
          border:       `1px solid ${colors.borderMid}`,
        }}>
          <Icon name="building-2" size={12} color={colors.textTertiary} strokeWidth={1.5} />
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            fontWeight: 500,
            color:      colors.textSecondary,
          }}>
            {field.value}
          </span>
        </div>
      )

    // ── Two-column property row ─────────────────────────────────────────────

    case 'property':
      return (
        <Fragment key={i}>
          <div style={PROP_LABEL_STYLE}>{field.label}</div>
          <div>
            {field.pill ? (
              <PillChip value={field.value} variant={field.pillVariant ?? 'neutral'} />
            ) : field.link ? (
              <ValueLinkCell value={field.value} />
            ) : (
              <span style={PROP_VALUE_STYLE}>{field.value}</span>
            )}
          </div>
        </Fragment>
      )

    // ── Full-width people list (no label column) ────────────────────────────

    case 'people':
      return (
        <div key={i} style={{
          gridColumn:    'span 2',
          display:       'flex',
          flexDirection: 'column',
          gap:           spacing.m,
        }}>
          {field.people.map((p, j) => <PersonRow key={p.id ?? j} person={p} />)}
        </div>
      )

    // ── Hierarchy: parent + typed children ──────────────────────────────────

    case 'hierarchy': {
      const permanent = (field.children ?? []).filter(c => !c.isTemporary)
      const temporary = (field.children ?? []).filter(c =>  c.isTemporary)
      return (
        <div key={i} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: spacing.s }}>
          {field.parent && (
            <div>
              <SubHeading>Parent</SubHeading>
              <HierarchyItem name={field.parent.name} dotActive={true} />
            </div>
          )}
          {(permanent.length > 0 || temporary.length > 0) && (
            <div>
              <SubHeading>Children</SubHeading>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[...permanent, ...temporary].map(c => (
                  <HierarchyItem
                    key={c.id}
                    name={c.name}
                    dotActive={!c.isTemporary}
                    label={c.isTemporary ? 'Temporary' : 'Permanent'}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    // ── Workspace links ─────────────────────────────────────────────────────

    case 'links':
      return (
        <div key={i} style={{
          gridColumn:    'span 2',
          display:       'flex',
          flexDirection: 'column',
          gap:           spacing.xs,
        }}>
          {field.links.length === 0 ? (
            <span style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textTertiary,
            }}>
              No links added.
            </span>
          ) : (
            field.links.map((link, j) => <WorkspaceLink key={link.label ?? j} link={link} />)
          )}
        </div>
      )

    // ── Communication channels (inline chips) ───────────────────────────────

    case 'channels':
      return (
        <div key={i} style={{
          gridColumn: 'span 2',
          display:    'flex',
          flexWrap:   'wrap',
          gap:        spacing.s,
        }}>
          {field.channels.map((ch, j) => <ChannelChip key={ch.name ?? j} channel={ch} />)}
        </div>
      )

    // ── Audit trail — last edited by person · date ──────────────────────────

    case 'audit':
      return (
        <div key={i} style={{
          gridColumn:  'span 2',
          display:     'flex',
          alignItems:  'center',
          flexWrap:    'wrap',
          gap:         spacing.xs,
          fontFamily:  fontFamilies.body,
          fontSize:    typeScale.labelB.size,
          color:       colors.textTertiary,
        }}>
          <span>Last {field.action ?? 'edited'} by</span>
          <ValueLinkCell value={field.person} />
          <span>· {field.date}</span>
        </div>
      )

    default:
      return null
  }
}

// ── Panel ─────────────────────────────────────────────────────────────────────

const SECTION_INDENT = 10 + 4  // chevron width + gap (spacing.xs)

const GRID_STYLE = {
  display:             'grid',
  gridTemplateColumns: '110px 1fr',
  columnGap:           spacing.s,
  rowGap:              spacing.s,
  alignItems:          'start',
}

const groupBySection = (fields) => {
  const pre    = []
  const groups = []
  let current  = null
  for (const field of fields) {
    if (field.type === 'section') {
      current = { section: field, items: [] }
      groups.push(current)
    } else if (current) {
      current.items.push(field)
    } else {
      pre.push(field)
    }
  }
  return { pre, groups }
}

const NodeOverviewPanel = ({ fields = [] }) => {
  const [collapsed, setCollapsed] = useState(new Set())
  const toggle = (label) => setCollapsed(prev => {
    const next = new Set(prev)
    next.has(label) ? next.delete(label) : next.add(label)
    return next
  })

  const { pre, groups } = groupBySection(fields)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {pre.length > 0 && (
        <div style={{ ...GRID_STYLE, marginBottom: spacing.l }}>
          {pre.map((field, i) => renderField(field, i))}
        </div>
      )}

      {groups.map((group, gi) => {
        const isCollapsed = collapsed.has(group.section.label)
        return (
          <div key={group.section.label ?? gi}>

            <button
              onClick={() => toggle(group.section.label)}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          spacing.xs,
                width:        '100%',
                background:   'none',
                border:       'none',
                borderTop:    group.section.first ? 'none' : `1px solid ${colors.border}`,
                padding:      0,
                paddingTop:   group.section.first ? 0 : spacing.m,
                marginBottom: isCollapsed ? spacing.m : spacing.s,
                cursor:       'pointer',
              }}
            >
              <Icon
                name="chevron-down"
                size={10}
                color={colors.textTertiary}
                strokeWidth={2}
                style={{
                  flexShrink: 0,
                  transform:  isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                  transition: `transform ${duration.micro} ${easing.out}`,
                }}
              />
              <span style={SECTION_LABEL_STYLE}>{group.section.label}</span>
            </button>

            {!isCollapsed && (
              <div style={{ ...GRID_STYLE, paddingLeft: SECTION_INDENT, paddingBottom: spacing.m }}>
                {group.items.map((field, i) => renderField(field, i))}
              </div>
            )}

          </div>
        )
      })}
    </div>
  )
}

export { NodeOverviewPanel }
