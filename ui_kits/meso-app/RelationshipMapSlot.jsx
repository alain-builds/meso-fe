import { colors, fontFamilies, typeScale, spacing, radii } from '@/tokens'

const RelationshipMapSlot = ({ nodeName }) => (
  <div style={{
    borderRadius: radii.lg,
    background:   colors.ink,
    backgroundImage: [
      'radial-gradient(ellipse 70% 60% at 85% 15%, rgba(26,107,92,0.40) 0%, transparent 65%)',
      'radial-gradient(ellipse 50% 60% at 10% 90%, rgba(58,92,168,0.30) 0%, transparent 65%)',
    ].join(', '),
    padding: spacing.xl,
  }}>
    <div style={{
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelB.size,
      fontWeight:    600,
      color:         'rgba(244,243,240,0.50)',
      marginBottom:  spacing.s,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      Relationship map
    </div>
    <div style={{
      fontFamily:    fontFamilies.display,
      fontSize:      typeScale.h3.size,
      fontWeight:    typeScale.h3.weight,
      letterSpacing: typeScale.h3.letterSpacing,
      color:         colors.stone,
      marginBottom:  spacing.s,
    }}>
      {nodeName ? `${nodeName} — graph view` : 'Graph view'} · coming soon
    </div>
    <div style={{
      fontFamily:  fontFamilies.body,
      fontSize:    typeScale.body.size,
      lineHeight:  typeScale.body.lineHeight,
      color:       'rgba(244,243,240,0.55)',
      maxWidth:    420,
    }}>
      The interactive canvas showing this node's connections, dependencies, and reporting lines
      is being designed as a separate workstream.
    </div>
  </div>
)

export { RelationshipMapSlot }
