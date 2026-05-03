import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import { Icon } from '../../../Components'

const TabStub = ({ section }) => (
  <div style={{
    padding:     `${spacing.xl} 0`,
    display:     'flex',
    alignItems:  'center',
    gap:         spacing.m,
  }}>
    <Icon name="layers" size={18} color={colors.textTertiary} strokeWidth={1.5} />
    <div>
      <div style={{
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.ui.size,
        fontWeight: 500,
        color:      colors.textSecondary,
        marginBottom: '2px',
      }}>
        Content coming soon
      </div>
      {section && (
        <div style={{
          fontFamily: fontFamilies.mono,
          fontSize:   typeScale.labelB.size,
          color:      colors.textTertiary,
        }}>
          {section}
        </div>
      )}
    </div>
  </div>
)

export { TabStub }
