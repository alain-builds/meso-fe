import { colors, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
import { RoleCard } from '../../../shared/RoleCard'

const PositionsTab = ({ detail }) => (
  <div style={{
    background:   colors.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
  }}>
    <div style={{
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelB.size,
      fontWeight:    600,
      letterSpacing: '0.06em',
      color:         colors.textTertiary,
      textTransform: 'uppercase',
      marginBottom:  spacing.m,
    }}>
      Roles filled ({detail.positions.length})
    </div>

    {detail.positions.length === 0 ? (
      <div style={{
        padding:    `${spacing.m} 0`,
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.body.size,
        color:      colors.textTertiary,
      }}>
        No roles currently filled.
      </div>
    ) : (
      <div>
        {detail.positions.map((pos, i) => (
          <div
            key={pos.id}
            style={{ borderBottom: i < detail.positions.length - 1 ? `1px solid ${colors.border}` : 'none' }}
          >
            <RoleCard
              roleName={pos.roleName}
              masterRoleLabel={pos.masterRoleLabel}
              filledByName={detail.name}
              teamLabel={pos.teamName}
              isVacant={false}
            />
          </div>
        ))}
      </div>
    )}
  </div>
)

export { PositionsTab }
