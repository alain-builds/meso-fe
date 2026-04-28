import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'
import { Icon } from '../Components'

const FieldLabel = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      '10px',
    fontWeight:    600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color:         colors.textTertiary,
    marginBottom:  spacing.xs,
  }}>
    {children}
  </div>
)

const Divider = () => (
  <div style={{ borderTop: `1px solid ${colors.border}`, margin: `${spacing.m} 0` }} />
)

const initials = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PersonRow = ({ person }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s, marginBottom: spacing.xs }}>
    <div style={{
      width:          28,
      height:         28,
      borderRadius:   '50%',
      background:     person.isVacant ? colors.stone2 : colors.tealSoft,
      flexShrink:     0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     fontFamilies.body,
      fontSize:       '10px',
      fontWeight:     600,
      color:          person.isVacant ? colors.textTertiary : colors.teal,
    }}>
      {person.isVacant ? '?' : initials(person.name)}
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily:   fontFamilies.body,
        fontSize:     typeScale.ui.size,
        fontWeight:   500,
        color:        person.isVacant ? colors.textTertiary : colors.ink,
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {person.isVacant ? 'Vacant' : person.name}
      </div>
      {person.role && (
        <div style={{
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          color:        colors.textSecondary,
          whiteSpace:   'nowrap',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
        }}>
          {person.role}
        </div>
      )}
    </div>
  </div>
)

const renderContent = (field) => {
  switch (field.type) {
    case 'description':
      return (
        <p style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.body.size,
          lineHeight: typeScale.body.lineHeight,
          color:      colors.textSecondary,
          margin:     0,
        }}>
          {field.value}
        </p>
      )

    case 'text':
      return (
        <>
          <FieldLabel>{field.label}</FieldLabel>
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.ui.size,
            fontWeight: 500,
            color:      colors.ink,
          }}>
            {field.value}
          </div>
        </>
      )

    case 'pill':
      return (
        <>
          <FieldLabel>{field.label}</FieldLabel>
          <span style={{
            display:      'inline-flex',
            alignItems:   'center',
            padding:      '3px 10px',
            borderRadius: radii.sm,
            fontSize:     '11px',
            fontWeight:   500,
            background:   colors.stone2,
            color:        colors.textSecondary,
          }}>
            {field.value}
          </span>
        </>
      )

    case 'person':
      return (
        <>
          <FieldLabel>{field.label}</FieldLabel>
          {field.people.map((p, i) => <PersonRow key={p.id ?? i} person={p} />)}
        </>
      )

    case 'date':
      return (
        <>
          <FieldLabel>{field.label}</FieldLabel>
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.ui.size,
            color:      colors.ink,
          }}>
            {field.date}
          </div>
          {field.by && (
            <div style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textSecondary,
            }}>
              by {field.by}
            </div>
          )}
        </>
      )

    case 'links':
      return (
        <>
          <FieldLabel>{field.label}</FieldLabel>
          {field.links.length === 0 ? (
            <span style={{
              fontFamily: fontFamilies.body,
              fontSize:   typeScale.labelB.size,
              color:      colors.textTertiary,
            }}>
              No links added.
            </span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
              {field.links.map((link, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                  <Icon name="arrow-up-right" size={13} color={colors.textTertiary} strokeWidth={1.5} />
                  <span style={{
                    fontFamily:   fontFamilies.body,
                    fontSize:     typeScale.ui.size,
                    color:        colors.teal,
                    cursor:       'pointer',
                    whiteSpace:   'nowrap',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {link.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )

    default:
      return null
  }
}

const NodeOverviewPanel = ({ name, fields = [] }) => (
  <div>
    <div style={{
      fontFamily:    fontFamilies.display,
      fontSize:      '18px',
      fontWeight:    700,
      letterSpacing: '-0.4px',
      color:         colors.ink,
      lineHeight:    1.2,
      marginBottom:  spacing.m,
    }}>
      {name}
    </div>

    {fields.map((field, i) => (
      <div key={`${field.type}-${i}`}>
        {renderContent(field)}
        {i < fields.length - 1 && <Divider />}
      </div>
    ))}
  </div>
)

export { NodeOverviewPanel }
