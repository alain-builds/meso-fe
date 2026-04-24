import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Pill } from '../Components'

const RoleCard = memo(({ roleName, masterRoleLabel, filledByName, teamLabel, isVacant = false }) => (
  <div style={{
    display:      'flex',
    alignItems:   'center',
    justifyContent: 'space-between',
    gap:          spacing.m,
    padding:      `${spacing.m} 0`,
  }}>
    {/* Role info */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        colors.ink,
        marginBottom: '2px',
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {roleName}
      </div>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.labelB.size,
        color:        colors.textSecondary,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {isVacant
          ? (masterRoleLabel ?? 'Unassigned')
          : `${filledByName ?? '—'}${teamLabel ? ` · ${teamLabel}` : ''}`
        }
      </div>
    </div>

    {/* Status badge */}
    <div style={{ flexShrink: 0 }}>
      {isVacant
        ? <Pill variant="neutral" dot="warn">Vacant</Pill>
        : <Pill variant="teal" dot="live">Filled</Pill>
      }
    </div>
  </div>
))
RoleCard.displayName = 'RoleCard'

export { RoleCard }
