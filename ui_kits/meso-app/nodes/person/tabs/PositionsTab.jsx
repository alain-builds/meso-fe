import { colors, spacing } from '@/tokens'
import { RoleCard }        from '../../../shared/RoleCard'
import { SectionHeading, SectionCard, EmptyState } from '../../../shared/SectionParts'

const PositionsTab = ({ detail }) => (
  <SectionCard>
    <SectionHeading>Roles filled ({detail.positions.length})</SectionHeading>

    {detail.positions.length === 0 ? (
      <EmptyState text="No roles currently filled." />
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
  </SectionCard>
)

export { PositionsTab }
