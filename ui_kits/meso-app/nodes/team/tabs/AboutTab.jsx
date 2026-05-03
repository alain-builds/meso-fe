import { colors, colorVars, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'

// ── Sort order for authority rows ─────────────────────────────────────────────

const AUTHORITY_ORDER = { decides: 0, approves: 1, advises: 2, ratifies: 3 }

const CHIP_VARIANTS = {
  decides:  { bg: colorVars.tealSoft,   text: colorVars.teal   },
  approves: { bg: colorVars.blueSoft,   text: colorVars.blue   },
  advises:  { bg: colorVars.indigoSoft, text: colorVars.indigo },
  ratifies: { bg: colorVars.amberSoft,  text: colorVars.amber  },
}

// ── Shared sub-components ─────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelA.size,
    fontWeight:    typeScale.labelA.weight,
    letterSpacing: typeScale.labelA.letterSpacing,
    textTransform: typeScale.labelA.textTransform,
    color:         colorVars.textTertiary,
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)

const SectionCard = ({ children, style = {} }) => (
  <div style={{
    background:   colorVars.white,
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
    color:      colorVars.textTertiary,
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

// ── AboutTab ──────────────────────────────────────────────────────────────────

const AboutTab = ({ detail }) => {
  const ownedCapabilities  = detail.ownedCapabilities ?? []
  const ownedIds           = new Set(ownedCapabilities.map(c => c.id))
  const capRoots           = ownedCapabilities.filter(
    c => !c.parentCapabilityId || !ownedIds.has(c.parentCapabilityId)
  )
  const childrenOf = (id) => ownedCapabilities.filter(c => c.parentCapabilityId === id)

  const CapabilityRow = ({ cap, depth }) => {
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
          <CapabilityRow key={child.id} cap={child} depth={depth + 1} />
        ))}
      </>
    )
  }

  const sorted = [...(detail.decisionAuthorities ?? [])]
    .sort((a, b) => AUTHORITY_ORDER[a.authorityType] - AUTHORITY_ORDER[b.authorityType])

  const domainsById = Object.fromEntries((detail.domains ?? []).map(d => [d.id, d]))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      {/* ── Purpose ─────────────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeading>Purpose</SectionHeading>
        {detail.purpose ? (
          <p style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.bodyLg.size,
            lineHeight: typeScale.bodyLg.lineHeight,
            color:      colorVars.textPrimary,
            margin:     0,
          }}>
            {detail.purpose}
          </p>
        ) : (
          <EmptyState text="No purpose statement has been added." />
        )}
      </SectionCard>

      {/* ── Responsibilities ─────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeading>Responsibilities</SectionHeading>
        {(detail.responsibilities ?? []).length === 0 ? (
          <EmptyState text="No responsibilities have been defined." />
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: spacing.s }}>
            {detail.responsibilities.map(r => (
              <li key={r} style={{
                display:    'flex',
                alignItems: 'flex-start',
                gap:        spacing.s,
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.body.size,
                lineHeight: typeScale.body.lineHeight,
                color:      colors.textSecondary,
              }}>
                <span style={{
                  width:        5,
                  height:       5,
                  borderRadius: '50%',
                  background:   colors.teal,
                  flexShrink:   0,
                  marginTop:    '8px',
                }} />
                {r}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* ── Decision authorities ─────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeading>Decision authorities</SectionHeading>
        {sorted.length === 0 ? (
          <EmptyState text="No decision authorities have been defined." />
        ) : (
          sorted.map((a, i) => (
            <div
              key={`${a.authorityType}-${a.domainId}`}
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

      {/* ── Capabilities owned ───────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeading>Capabilities owned</SectionHeading>
        {ownedCapabilities.length === 0 ? (
          <EmptyState text="No capabilities have been assigned to this team." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {capRoots.map(root => (
              <CapabilityRow key={root.id} cap={root} depth={0} />
            ))}
          </div>
        )}
      </SectionCard>

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
