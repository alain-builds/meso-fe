import { memo } from 'react'
import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Pill } from '../Components'

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase() ?? '').join('')
}

const MemberRow = memo(({ member }) => (
  <div style={{
    display:     'grid',
    gridTemplateColumns: '32px 1fr 1fr 80px',
    alignItems:  'center',
    gap:         spacing.m,
    padding:     `12px 0`,
    borderBottom: `1px solid ${colors.border}`,
  }}>
    {/* Avatar */}
    <div style={{
      width:          32,
      height:         32,
      borderRadius:   '50%',
      background:     member.isVacant ? colors.stone2 : colors.ink,
      color:          member.isVacant ? colors.textTertiary : colors.stone,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontSize:       '10px',
      fontWeight:     600,
      fontFamily:     fontFamilies.body,
      border:         member.isVacant ? `1px dashed ${colors.borderMid}` : 'none',
    }}>
      {member.isVacant ? '—' : initials(member.name)}
    </div>

    {/* Name */}
    <div style={{
      fontFamily:   fontFamilies.body,
      fontSize:     typeScale.ui.size,
      fontWeight:   member.isVacant ? 400 : 500,
      color:        member.isVacant ? colors.textTertiary : colors.ink,
      overflow:     'hidden',
      textOverflow: 'ellipsis',
      whiteSpace:   'nowrap',
    }}>
      {member.isVacant ? 'Vacant' : member.name}
    </div>

    {/* Role */}
    <div style={{
      fontFamily:   fontFamilies.body,
      fontSize:     typeScale.labelB.size,
      color:        colors.textSecondary,
      overflow:     'hidden',
      textOverflow: 'ellipsis',
      whiteSpace:   'nowrap',
    }}>
      {member.role ?? '—'}
    </div>

    {/* Status pill */}
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {member.isVacant
        ? <Pill variant="neutral" dot="warn">Vacant</Pill>
        : member.isExternal
          ? <Pill variant="outline">External</Pill>
          : <Pill variant="teal" dot="live">Active</Pill>
      }
    </div>
  </div>
))
MemberRow.displayName = 'MemberRow'

const MemberTable = ({ members = [], emptyMessage = 'No members yet.' }) => {
  if (members.length === 0) {
    return (
      <div style={{
        padding:    `${spacing.l} 0`,
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.body.size,
        color:      colors.textTertiary,
      }}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div>
      {/* Table header */}
      <div style={{
        display:     'grid',
        gridTemplateColumns: '32px 1fr 1fr 80px',
        gap:         spacing.m,
        padding:     `${spacing.xs} 0 ${spacing.s}`,
        borderBottom: `1px solid ${colors.borderMid}`,
      }}>
        {['', 'Name', 'Role', 'Status'].map(col => (
          <div key={col} style={{
            fontFamily:    fontFamilies.body,
            fontSize:      typeScale.labelB.size,
            fontWeight:    600,
            color:         colors.textTertiary,
            letterSpacing: '0.04em',
          }}>
            {col}
          </div>
        ))}
      </div>

      {/* Rows — keyed by member.id, never index */}
      {members.map(member => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  )
}

export { MemberTable }
