import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { Pill }       from '../../../Components'
import { MetricsBar } from '../../../shared/MetricsBar'

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

const PROGRESS_PILL = {
  on_track:    { variant: 'teal',    dot: 'live', label: 'On track'    },
  achieved:    { variant: 'teal',    dot: 'live', label: 'Achieved'    },
  at_risk:     { variant: 'neutral', dot: 'warn', label: 'At risk'     },
  off_track:   { variant: 'neutral', dot: 'off',  label: 'Off track'   },
  not_started: { variant: 'neutral', dot: null,   label: 'Not started' },
  missed:      { variant: 'neutral', dot: 'off',  label: 'Missed'      },
}

const DIRECTION_LABEL = {
  higher_is_better: '↑ higher',
  lower_is_better:  '↓ lower',
  target_is_better: '→ target',
}

const progressPill = (status) => PROGRESS_PILL[status] ?? PROGRESS_PILL.not_started

const KeyResultRow = memo(({ kr, last }) => {
  const pill = progressPill(kr.progressStatus)
  return (
    <div style={{
      display:      'flex',
      alignItems:   'flex-start',
      gap:          spacing.m,
      padding:      `${spacing.s} 0`,
      paddingLeft:  spacing.m,
      borderBottom: last ? 'none' : `1px solid ${colors.border}`,
    }}>
      <div style={{
        width:        3,
        alignSelf:    'stretch',
        background:   colors.tealSoft,
        borderRadius: '2px',
        flexShrink:   0,
        marginTop:    '2px',
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.body.size,
          color:      colors.textSecondary,
          lineHeight: typeScale.body.lineHeight,
        }}>
          {kr.title}
        </div>
        {kr.currentValue != null && kr.targetValue != null && (
          <div style={{
            fontFamily: fontFamilies.mono,
            fontSize:   typeScale.mono.size,
            color:      colors.textTertiary,
            marginTop:  '3px',
          }}>
            {kr.currentValue} / {kr.targetValue} {kr.unit}
          </div>
        )}
      </div>
      <Pill variant={pill.variant} dot={pill.dot ?? undefined}>{pill.label}</Pill>
    </div>
  )
})
KeyResultRow.displayName = 'KeyResultRow'

const OKRRow = memo(({ okr, last }) => {
  const pill = progressPill(okr.progressStatus)
  return (
    <div style={{
      paddingBottom: last ? 0 : spacing.l,
      marginBottom:  last ? 0 : spacing.l,
      borderBottom:  last ? 'none' : `1px solid ${colors.border}`,
    }}>
      {/* Objective header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.m, marginBottom: spacing.s }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:  fontFamilies.body,
            fontSize:    typeScale.ui.size,
            fontWeight:  500,
            color:       colors.ink,
            lineHeight:  1.4,
            marginBottom: '4px',
          }}>
            {okr.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s }}>
            <span style={{
              fontFamily: fontFamilies.mono,
              fontSize:   typeScale.mono.size,
              color:      colors.textTertiary,
            }}>
              {okr.period}
            </span>
            {okr.confidenceScore != null && (
              <span style={{
                fontFamily: fontFamilies.body,
                fontSize:   typeScale.labelB.size,
                color:      colors.textTertiary,
              }}>
                · {okr.confidenceScore}% confidence
              </span>
            )}
          </div>
        </div>
        <Pill variant={pill.variant} dot={pill.dot ?? undefined}>{pill.label}</Pill>
      </div>

      {/* Key results */}
      {okr.keyResults?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: spacing.s }}>
          {okr.keyResults.map((kr, i) => (
            <KeyResultRow
              key={kr.id}
              kr={kr}
              last={i === okr.keyResults.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
})
OKRRow.displayName = 'OKRRow'

const KPIRow = memo(({ kpi, last }) => (
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
        {kpi.name}
        {kpi.unit && (
          <span style={{ fontFamily: fontFamilies.mono, fontSize: typeScale.mono.size, color: colors.textTertiary, marginLeft: spacing.s }}>
            {kpi.unit}
          </span>
        )}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flexShrink: 0 }}>
      {kpi.direction && (
        <span style={{ fontFamily: fontFamilies.body, fontSize: typeScale.labelB.size, color: colors.textTertiary }}>
          {DIRECTION_LABEL[kpi.direction]}
        </span>
      )}
      <Pill variant="neutral">{kpi.category}</Pill>
      <Pill variant={kpi.contributionType === 'owns' ? 'teal' : 'neutral'}>{kpi.contributionType}</Pill>
    </div>
  </div>
))
KPIRow.displayName = 'KPIRow'

const CostCenterRow = memo(({ cc, last }) => (
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
        {cc.name}
      </div>
      <div style={{
        fontFamily: fontFamilies.mono,
        fontSize:   typeScale.mono.size,
        color:      colors.textTertiary,
        marginTop:  '2px',
      }}>
        {cc.code}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, flexShrink: 0 }}>
      <Pill variant="neutral">{cc.type}</Pill>
      {cc.allocationPercent != null && (
        <span style={{
          fontFamily: fontFamilies.mono,
          fontSize:   typeScale.mono.size,
          color:      colors.textTertiary,
        }}>
          {cc.allocationPercent}%
        </span>
      )}
    </div>
  </div>
))
CostCenterRow.displayName = 'CostCenterRow'

const PerformanceTab = ({ detail }) => {
  const okrs        = detail.okrs        ?? []
  const kpis        = detail.kpis        ?? []
  const costCenters = detail.costCenters ?? []

  const onTrackCount  = okrs.filter(o => o.progressStatus === 'on_track' || o.progressStatus === 'achieved').length
  const okrHealthPct  = okrs.length === 0 ? '—' : `${Math.round(onTrackCount / okrs.length * 100)}%`

  const chips = [
    { id: 'okr-health', value: okrHealthPct,         label: 'OKR health'    },
    { id: 'kpis',       value: `${kpis.length}`,     label: 'KPIs'          },
    { id: 'cost',       value: `${costCenters.length}`, label: 'cost centers' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

      <MetricsBar chips={chips} />

      {/* OKRs */}
      <SectionCard>
        <SectionHeading>OKRs owned</SectionHeading>
        {okrs.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No OKRs assigned.
          </div>
        ) : okrs.map((okr, i) => (
          <OKRRow key={okr.id} okr={okr} last={i === okrs.length - 1} />
        ))}
      </SectionCard>

      {/* KPIs */}
      <SectionCard>
        <SectionHeading>KPIs contributed to</SectionHeading>
        {kpis.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No KPIs linked.
          </div>
        ) : kpis.map((kpi, i) => (
          <KPIRow key={kpi.id} kpi={kpi} last={i === kpis.length - 1} />
        ))}
      </SectionCard>

      {/* Cost centers */}
      <SectionCard>
        <SectionHeading>Cost center bookings</SectionHeading>
        {costCenters.length === 0 ? (
          <div style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colors.textTertiary }}>
            No cost centers booked.
          </div>
        ) : costCenters.map((cc, i) => (
          <CostCenterRow key={cc.id} cc={cc} last={i === costCenters.length - 1} />
        ))}
      </SectionCard>

    </div>
  )
}

export { PerformanceTab }
