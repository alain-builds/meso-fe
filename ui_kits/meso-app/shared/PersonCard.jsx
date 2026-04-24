import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { Pill } from '../Components'

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase() ?? '').join('')
}

const PersonCard = memo(({ name, roleLabel, teamLabel, isExternal = false, isVacant = false }) => (
  <div style={{
    display:     'flex',
    alignItems:  'center',
    gap:         spacing.m,
    padding:     `${spacing.m} 0`,
  }}>
    {/* Avatar */}
    <div style={{
      width:          40,
      height:         40,
      borderRadius:   '50%',
      background:     isVacant ? colors.stone2 : colors.ink,
      color:          isVacant ? colors.textTertiary : colors.stone,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontSize:       typeScale.labelB.size,
      fontWeight:     600,
      fontFamily:     fontFamilies.body,
      flexShrink:     0,
      border:         isVacant ? `1px dashed ${colors.borderMid}` : 'none',
    }}>
      {isVacant ? '—' : initials(name)}
    </div>

    {/* Text */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        isVacant ? colors.textTertiary : colors.ink,
        marginBottom: '2px',
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {isVacant ? 'Vacant' : name}
      </div>
      {roleLabel && (
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          color:        colors.textSecondary,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {roleLabel}
          {teamLabel ? ` · ${teamLabel}` : ''}
        </div>
      )}
    </div>

    {/* Badges */}
    <div style={{ display: 'flex', gap: spacing.xs, flexShrink: 0 }}>
      {isVacant   && <Pill variant="neutral" dot="off">Vacant</Pill>}
      {isExternal && <Pill variant="outline">External</Pill>}
    </div>
  </div>
))
PersonCard.displayName = 'PersonCard'

export { PersonCard }
