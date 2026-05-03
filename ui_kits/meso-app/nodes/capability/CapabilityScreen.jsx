import { colors, fontFamilies, spacing } from '@/tokens'
import { Button }                        from '../../Components'
import { CAPABILITIES }                  from './capabilityData.js'
import { CapabilityMap }                 from './CapabilityMap'

const CapabilityScreen = ({ onOpenCapability }) => (
  <div style={{
    paddingTop:    spacing.m,
    paddingLeft:   spacing.xl2,
    paddingRight:  spacing.xl2,
    paddingBottom: spacing.xl3,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.m, marginBottom: spacing.xl }}>
      <h1 style={{
        fontFamily:    fontFamilies.display,
        fontSize:      '34px',
        fontWeight:    700,
        letterSpacing: '-1px',
        lineHeight:    1.1,
        color:         colors.ink,
        margin:        0,
        flex:          1,
        minWidth:      0,
      }}>
        Business Capability Map
      </h1>
      <div style={{ display: 'flex', gap: spacing.s, flexShrink: 0 }}>
        <Button variant="secondary" size="sm" icon="history">History</Button>
        <Button variant="secondary" size="sm" icon="check-check">Audit</Button>
        <Button variant="primary"   size="sm" icon="arrow-up-right">Open in Canvas</Button>
      </div>
    </div>
    <CapabilityMap capabilities={CAPABILITIES} onOpenCapability={onOpenCapability} />
  </div>
)

export { CapabilityScreen }
