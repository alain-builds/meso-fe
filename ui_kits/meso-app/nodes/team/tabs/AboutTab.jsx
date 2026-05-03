import { useMemo, useState } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows, duration, easing } from '@/tokens'
import { Icon } from '../../../Components'

// ── Sort order for authority rows ─────────────────────────────────────────────

const AUTHORITY_ORDER = { decides: 0, approves: 1, advises: 2, ratifies: 3 }

const CHIP_VARIANTS = {
  decides:  { bg: colors.tealSoft,   text: colors.teal   },
  approves: { bg: colors.blueSoft,   text: colors.blue   },
  advises:  { bg: colors.indigoSoft, text: colors.indigo },
  ratifies: { bg: colors.amberSoft,  text: colors.amber  },
}

// ── Shared sub-components ─────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelA.size,
    fontWeight:    typeScale.labelA.weight,
    letterSpacing: typeScale.labelA.letterSpacing,
    textTransform: typeScale.labelA.textTransform,
    color:         colors.textTertiary,
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)

const SectionCard = ({ children, style = {} }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
    ...style,
  }}>
    {children}
  </div>
)

const EmptyState = ({ text }) => (
  <p style={{
    fontFamily: fontFamilies.body,
    fontSize:   typeScale.body.size,
    color:      colors.textTertiary,
    fontStyle:  'italic',
    margin:     0,
  }}>
    {text}
  </p>
)

// ── Authority chip ────────────────────────────────────────────────────────────

const AuthorityChip = ({ type }) => {
  const v = CHIP_VARIANTS[type] ?? CHIP_VARIANTS.advises
  return (
    <span style={{
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      width:          80,
      flexShrink:     0,
      padding:        '3px 8px',
      borderRadius:   radii.sm,
      background:     v.bg,
      fontFamily:     fontFamilies.body,
      fontSize:       typeScale.labelA.size,
      fontWeight:     typeScale.labelA.weight,
      letterSpacing:  typeScale.labelA.letterSpacing,
      textTransform:  typeScale.labelA.textTransform,
      color:          v.text,
    }}>
      {type}
    </span>
  )
}

// ── Capability tree row ───────────────────────────────────────────────────────

const CapabilityRow = ({ cap, depth, childrenOf }) => {
  const children = childrenOf(cap.id)
  return (
    <>
      <div style={{
        display:       'flex',
        alignItems:    'baseline',
        gap:           spacing.xs,
        paddingLeft:   depth * 20,
        paddingTop:    spacing.xs,
        paddingBottom: spacing.xs,
      }}>
        <span style={{
          flex:       1,
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.ui.size,
          fontWeight: typeScale.ui.weight,
          color:      colors.textPrimary,
        }}>
          {cap.name}
        </span>
        {cap.coOwners?.length > 0 && (
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textTertiary,
            fontStyle:  'italic',
            flexShrink: 0,
          }}>
            shared with {cap.coOwners.map(o => o.teamName).join(', ')}
          </span>
        )}
      </div>
      {depth < 3 && children.map(child => (
        <CapabilityRow key={child.id} cap={child} depth={depth + 1} childrenOf={childrenOf} />
      ))}
    </>
  )
}

// ── Responsibility accordion ──────────────────────────────────────────────────

const RESP_INDENT = 20 // chevron 12px + gap 8px

const RolePill = ({ role }) => (
  <span style={{
    display:      'inline-flex',
    alignItems:   'center',
    padding:      '3px 10px',
    borderRadius: radii.sm,
    background:   colors.stone2,
    fontFamily:   fontFamilies.body,
    fontSize:     typeScale.labelB.size,
    fontWeight:   500,
    color:        colors.textSecondary,
  }}>
    {role}
  </span>
)

const ResponsibilityRow = ({ responsibility }) => {
  const [open, setOpen] = useState(false)
  const roles = responsibility.roles ?? []
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:    'flex',
          alignItems: 'flex-start',
          gap:        spacing.s,
          width:      '100%',
          background: 'none',
          border:     'none',
          padding:    `${spacing.s} 0`,
          cursor:     roles.length > 0 ? 'pointer' : 'default',
          textAlign:  'left',
        }}
      >
        <Icon
          name="chevron-right"
          size={12}
          color={roles.length > 0 ? colors.textTertiary : 'transparent'}
          strokeWidth={2}
          style={{
            flexShrink: 0,
            marginTop:  3,
            transform:  open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: `transform ${duration.micro} ${easing.out}`,
          }}
        />
        <span style={{
          flex:       1,
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.body.size,
          lineHeight: typeScale.body.lineHeight,
          color:      colors.textSecondary,
        }}>
          {responsibility.text}
        </span>
      </button>
      {open && roles.length > 0 && (
        <div style={{
          paddingLeft:   RESP_INDENT,
          paddingBottom: spacing.s,
          display:       'flex',
          flexWrap:      'wrap',
          gap:           spacing.xs,
        }}>
          {roles.map(role => <RolePill key={role} role={role} />)}
        </div>
      )}
    </div>
  )
}

// ── AboutTab ──────────────────────────────────────────────────────────────────

const AboutTab = ({ detail }) => {
  const ownedCapabilities = useMemo(
    () => detail.ownedCapabilities ?? [],
    [detail.ownedCapabilities]
  )

  const ownedIds = useMemo(
    () => new Set(ownedCapabilities.map(c => c.id)),
    [ownedCapabilities]
  )

  const capRoots = useMemo(
    () => ownedCapabilities.filter(
      c => !c.parentCapabilityId || !ownedIds.has(c.parentCapabilityId)
    ),
    [ownedCapabilities, ownedIds]
  )

  const childrenOf = useMemo(() => {
    const map = ownedCapabilities.reduce((acc, c) => {
      if (c.parentCapabilityId) {
        ;(acc[c.parentCapabilityId] ??= []).push(c)
      }
      return acc
    }, {})
    return (id) => map[id] ?? []
  }, [ownedCapabilities])

  const sorted = useMemo(
    () => [...(detail.decisionAuthorities ?? [])]
      .sort((a, b) => AUTHORITY_ORDER[a.authorityType] - AUTHORITY_ORDER[b.authorityType]),
    [detail.decisionAuthorities]
  )

  const domainsById = useMemo(
    () => Object.fromEntries((detail.domains ?? []).map(d => [d.id, d])),
    [detail.domains]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      {/* ── Purpose + Responsibilities (side by side) ───────────────────── */}
      <div style={{ display: 'flex', gap: spacing.l, alignItems: 'stretch' }}>

        <SectionCard style={{ flex: 1 }}>
          <SectionHeading>Purpose</SectionHeading>
          {detail.purpose ? (
            <p style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.body.size,
              lineHeight: typeScale.body.lineHeight,
              color:      colors.textPrimary,
              margin:     0,
            }}>
              {detail.purpose}
            </p>
          ) : (
            <EmptyState text="No purpose statement has been added." />
          )}
        </SectionCard>

        <SectionCard style={{ flex: 3 }}>
          <SectionHeading>Responsibilities</SectionHeading>
          {(detail.responsibilities ?? []).length === 0 ? (
            <EmptyState text="No responsibilities have been defined." />
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {detail.responsibilities.map((r, i) => (
                <li
                  key={r.text ?? r}
                  style={{ borderBottom: i < detail.responsibilities.length - 1 ? `1px solid ${colors.border}` : 'none' }}
                >
                  <ResponsibilityRow responsibility={typeof r === 'string' ? { text: r, roles: [] } : r} />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

      </div>

      {/* ── Capabilities + Decision authorities (side by side, 1:3) ────────── */}
      <div style={{ display: 'flex', gap: spacing.l, alignItems: 'stretch' }}>

        <SectionCard style={{ flex: 1 }}>
          <SectionHeading>Capabilities owned</SectionHeading>
          {ownedCapabilities.length === 0 ? (
            <EmptyState text="No capabilities have been assigned to this team." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {capRoots.map(root => (
                <CapabilityRow key={root.id} cap={root} depth={0} childrenOf={childrenOf} />
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard style={{ flex: 3 }}>
          <SectionHeading>Decision authorities</SectionHeading>
          {sorted.length === 0 ? (
            <EmptyState text="No decision authorities have been defined." />
          ) : (
            sorted.map((a, i) => (
              <div
                key={a.description}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           spacing.m,
                  paddingTop:    spacing.m,
                  paddingBottom: spacing.m,
                  borderBottom:  i < sorted.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <AuthorityChip type={a.authorityType} />
                <span style={{
                  flex:       1,
                  fontFamily: fontFamilies.body,
                  fontSize:   typeScale.ui.size,
                  fontWeight: typeScale.ui.weight,
                  color:      colors.textPrimary,
                }}>
                  {a.description}
                </span>
                {domainsById[a.domainId] && (
                  <span style={{
                    flexShrink:   0,
                    padding:      '2px 6px',
                    borderRadius: radii.sm,
                    background:   colors.stone2,
                    fontFamily:   fontFamilies.body,
                    fontSize:     typeScale.labelB.size,
                    fontWeight:   typeScale.labelB.weight,
                    color:        colors.textSecondary,
                  }}>
                    {domainsById[a.domainId].name}
                  </span>
                )}
              </div>
            ))
          )}
        </SectionCard>

      </div>

      {/* ── Value stream contribution ────────────────────────────────────── */}
      <SectionCard>
        <SectionHeading>Value stream contribution</SectionHeading>
        {(detail.valueStreams ?? []).length === 0 ? (
          <EmptyState text="This team has not been mapped to any value streams." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
            {detail.valueStreams.map(vs => (
              <div
                key={vs.id}
                style={{
                  background:   colors.stone,
                  borderRadius: radii.md,
                  padding:      spacing.m,
                }}
              >
                <div style={{
                  fontFamily:   fontFamilies.body,
                  fontSize:     typeScale.ui.size,
                  fontWeight:   600,
                  color:        colors.textPrimary,
                  marginBottom: spacing.xs,
                }}>
                  {vs.name}
                </div>
                <p style={{
                  fontFamily:          fontFamilies.body,
                  fontSize:            typeScale.body.size,
                  lineHeight:          typeScale.body.lineHeight,
                  color:               colors.textSecondary,
                  overflow:            'hidden',
                  display:             '-webkit-box',
                  WebkitLineClamp:     2,
                  WebkitBoxOrient:     'vertical',
                  margin:              0,
                }}>
                  {(vs.businessOutcomes ?? []).slice(0, 2).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

    </div>
  )
}

export { AboutTab }
