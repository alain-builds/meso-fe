import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { PersonCard } from '../../../shared/PersonCard'

const PersonTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* Current holder */}
    <div style={{ background: colors.white, borderRadius: radii.lg, boxShadow: shadows.sm, padding: spacing.l }}>
      <div style={{
        fontFamily:    fontFamilies.body,
        fontSize:      typeScale.labelB.size,
        fontWeight:    600,
        letterSpacing: '0.06em',
        color:         colors.textTertiary,
        textTransform: 'uppercase',
        marginBottom:  spacing.m,
      }}>
        Current holder
      </div>
      <PersonCard
        name={detail.filledByName}
        roleLabel={detail.roleName}
        teamLabel={detail.teamName}
        isVacant={detail.isVacant}
      />
      {detail.isVacant && detail.vacantSince && (
        <div style={{
          fontFamily:  fontFamilies.body,
          fontSize:    typeScale.labelB.size,
          color:       colors.amber,
          marginTop:   spacing.s,
          paddingTop:  spacing.s,
          borderTop:   `1px solid ${colors.border}`,
        }}>
          Vacant since {detail.vacantSince}
        </div>
      )}
    </div>

    {/* Prior holders */}
    {detail.priorHolders?.length > 0 && (
      <div style={{ background: colors.white, borderRadius: radii.lg, boxShadow: shadows.sm, padding: spacing.l }}>
        <div style={{
          fontFamily:    fontFamilies.body,
          fontSize:      typeScale.labelB.size,
          fontWeight:    600,
          letterSpacing: '0.06em',
          color:         colors.textTertiary,
          textTransform: 'uppercase',
          marginBottom:  spacing.m,
        }}>
          History
        </div>
        <div>
          {detail.priorHolders.map((holder, i) => (
            <div key={holder.id} style={{
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'space-between',
              padding:      `${spacing.m} 0`,
              borderBottom: i < detail.priorHolders.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <PersonCard name={holder.name} roleLabel={holder.period} />
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
)

export { PersonTab }
