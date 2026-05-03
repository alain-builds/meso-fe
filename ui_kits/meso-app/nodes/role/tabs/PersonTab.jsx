import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { PersonCard }                              from '../../../shared/PersonCard'
import { SectionHeading, SectionCard }             from '../../../shared/SectionParts'

const PersonTab = ({ detail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.l }}>

    {/* Current holder */}
    <SectionCard>
      <SectionHeading>Current holder</SectionHeading>
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
    </SectionCard>

    {/* Prior holders */}
    {detail.priorHolders?.length > 0 && (
      <SectionCard>
        <SectionHeading>History</SectionHeading>
        <div>
          {detail.priorHolders.map((holder, i) => (
            <div key={holder.id} style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        `${spacing.m} 0`,
              borderBottom:   i < detail.priorHolders.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <PersonCard name={holder.name} roleLabel={holder.period} />
            </div>
          ))}
        </div>
      </SectionCard>
    )}

  </div>
)

export { PersonTab }
