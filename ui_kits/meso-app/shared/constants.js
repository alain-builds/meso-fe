import { duration, easing } from '@/tokens'

// Sticky chrome height shared by Shell and NodeDetailShell for offset calculations.
export const CHROME_HEIGHT = 60

// Collapsed sidebar is 60px wide. A 20px icon centred in that column needs
// paddingLeft=20. When a button sits inside a container with its own horizontal
// padding (e.g. spacing.s = 8px per side), subtract that margin so the icon
// lands at the same x position as bare nav items: 20 − 8 = 12.
export const NAV_PAD_X    = 20
export const SEARCH_PAD_X = 12  // NAV_PAD_X minus the 8px container margin

export const micro  = `${duration.micro} ${easing.out}`
export const medium = `${duration.medium} ${easing.out}`
