import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Pill }            from '../../../Components'
import { MetricsBar }      from '../../../shared/MetricsBar'
import { EdgeListDrawer }  from '../../../shared/EdgeListDrawer'

const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelB.size,
    fontWeight:    600,
    letterSpacing: '0.06em',
    color:         colors.textTertiary,
    textTransform: 'uppercase',
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)

const SectionCard = ({ children }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
  }}>
    {children}
  </div>
)

const SLA_DOT_COLOR = {
  green: colors.teal,
  amber: colors.amber,
  red:   colors.error,
}

const SlaDot = ({ status }) => (
  <span style={{
    display:      'inline-block',
    width:        8,
    height:       8,
    borderRadius: '50%',
    background:   SLA_DOT_COLOR[status] ?? colors.textTertiary,
    flexShrink:   0,
  }} />
)

const ServiceRow = memo(({ name, meta, pill, slaStatus, last }) => (
  <div style={{
    display:      'flex',
    alignItems:   'center',
    gap:          spacing.m,
    padding:      `10px 0`,
    borderBottom: last ? 'none' : `1px solid ${colors.border}`,
  }}>
    <SlaDot status={slaStatus} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        colors.ink,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {name}
      </div>
      {meta && (
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          color:        colors.textSecondary,
          marginTop:    '2px',
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {meta}
        </div>
      )}
    </div>
    {pill && <Pill variant="neutral">{pill}</Pill>}
  </div>
))
ServiceRow.displayName = 'ServiceRow'

const ServicesTab = ({ detail }) => {
  const provided = detail.servicesProvidedList ?? []
  const consumed  = detail.servicesConsumedList ?? []
  const deps      = detail.serviceDependencies  ?? { inbound: [], outbound: [] }

  const slaGreenCount = provided.filter(s => s.slaStatus === 'green').length
  const slaHealthLabel = provided.length === 0 ? '—' : `${slaGreenCount}/${provided.length}`

  const chips = [
    { id: 'provided', value: `${provided.length}`,  label: 'provided'   },
    { id: 'consumed', value: `${consumed.length}`,  label: 'consumed'   },
    { id: 'sla',      value: slaHealthLabel,          label: 'SLA green'  },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      <MetricsBar chips={chips} />

      {/* Provided services */}
      <SectionCard>
        <SectionHeading>Provided services</SectionHeading>
        {provided.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No services provided.
          </div>
        ) : provided.map((s, i) => (
          <ServiceRow
            key={s.id}
            name={s.name}
            meta={s.sla}
            pill={s.type}
            slaStatus={s.slaStatus}
            last={i === provided.length - 1}
          />
        ))}
      </SectionCard>

      {/* Consumed services */}
      <SectionCard>
        <SectionHeading>Consumed services</SectionHeading>
        {consumed.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No services consumed.
          </div>
        ) : consumed.map((s, i) => (
          <ServiceRow
            key={s.id}
            name={s.name}
            meta={s.providerTeam ? `Provided by ${s.providerTeam}` : null}
            pill={null}
            slaStatus={s.slaStatus}
            last={i === consumed.length - 1}
          />
        ))}
      </SectionCard>

      {/* Dependency chain */}
      <SectionCard>
        <SectionHeading>Dependency chain</SectionHeading>
        <EdgeListDrawer inbound={deps.inbound} outbound={deps.outbound} />
      </SectionCard>

    </div>
  )
}

export { ServicesTab }
