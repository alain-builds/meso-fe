import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Pill } from '../../../Components'

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

const PROCESS_STATUS_PILL = {
  active:   { variant: 'teal',    dot: 'live', label: 'Active'   },
  pipeline: { variant: 'neutral', dot: null,   label: 'Pipeline' },
  archived: { variant: 'neutral', dot: 'off',  label: 'Archived' },
}

const ValueStreamRow = memo(({ name, contribution, businessOutcome, last }) => (
  <div style={{
    padding:      `${spacing.m} 0`,
    borderBottom: last ? 'none' : `1px solid ${colors.border}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, marginBottom: '6px' }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        colors.ink,
        flex:         1,
        minWidth:     0,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {name}
      </div>
      <Pill variant={contribution === 'owns' ? 'teal' : 'neutral'}>
        {contribution}
      </Pill>
    </div>
    {businessOutcome && (
      <div style={{
        fontFamily:  fontFamilies.body,
        fontSize:    typeScale.labelB.size,
        color:       colors.textSecondary,
        lineHeight:  1.5,
      }}>
        {businessOutcome}
      </div>
    )}
  </div>
))
ValueStreamRow.displayName = 'ValueStreamRow'

const ProcessRow = memo(({ name, type, status, last }) => {
  const pill = PROCESS_STATUS_PILL[status] ?? PROCESS_STATUS_PILL.active
  return (
    <div style={{
      display:      'flex',
      alignItems:   'center',
      gap:          spacing.m,
      padding:      `10px 0`,
      borderBottom: last ? 'none' : `1px solid ${colors.border}`,
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
        }}>
          {name}
        </div>
        {type && (
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textSecondary,
            marginTop:  '2px',
          }}>
            {type}
          </div>
        )}
      </div>
      <Pill variant={pill.variant} dot={pill.dot ?? undefined}>{pill.label}</Pill>
    </div>
  )
})
ProcessRow.displayName = 'ProcessRow'

const DeliveryTab = ({ detail }) => {
  const valueStreams = detail.valueStreams ?? []
  const processes   = detail.processes   ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      {/* Value streams */}
      <SectionCard>
        <SectionHeading>Value streams</SectionHeading>
        {valueStreams.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No value streams linked.
          </div>
        ) : valueStreams.map((vs, i) => (
          <ValueStreamRow
            key={vs.id}
            name={vs.name}
            contribution={vs.contribution}
            businessOutcome={vs.businessOutcome}
            last={i === valueStreams.length - 1}
          />
        ))}
      </SectionCard>

      {/* Processes */}
      <SectionCard>
        <SectionHeading>Processes</SectionHeading>
        {processes.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No processes linked.
          </div>
        ) : processes.map((p, i) => (
          <ProcessRow
            key={p.id}
            name={p.name}
            type={p.type}
            status={p.status}
            last={i === processes.length - 1}
          />
        ))}
      </SectionCard>

    </div>
  )
}

export { DeliveryTab }
