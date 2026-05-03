# AboutTab.jsx — Team Node — Implementation Plan

**Spec:** Session conversation spec (spec for four blocks; delegation rules and contribution type removed)
**Scope:** Rewrite `AboutTab.jsx` to implement Purpose, Responsibilities, Decision Authorities, and Capabilities Owned + Value Streams. Remove MetricsBar, WorkspaceLinks, Channels (covered by sidebar).

**Files touched:**
- `tokens/colors.ts`
- `colors_and_type.css`
- `ui_kits/meso-app/nodes/team/TeamDetail.jsx` (DEFAULTS mock data only)
- `ui_kits/meso-app/nodes/team/tabs/AboutTab.jsx` (full rewrite)

---

## Dependency Graph

```
Layer 0 — unchanged
  @/tokens (colors, colorVars, fontFamilies, typeScale, spacing, radii, shadows)
  Components.jsx (Icon — no longer used in new AboutTab; import can be removed)

Layer 1 — token additions (T1)
  tokens/colors.ts         ← add blueSoft, indigoSoft, amberSoft (raw values + colorVars entries)
  colors_and_type.css      ← add --blue-soft, --indigo-soft, --amber-soft (light + both dark blocks)
  ↳ Required by: CHIP_VARIANTS in T3 (Decision Authorities)

Layer 2 — mock data (T2)
  TeamDetail.jsx DEFAULTS  ← fix decisionAuthorities shape, add domains[], ownedCapabilities[],
                              update valueStreams to businessOutcomes[]
  ↳ Required by: T3, T4, T5

Layer 3 — component blocks (T3 → T4 → T5, all in AboutTab.jsx)
  T3: Decision Authorities block
  T4: Capabilities Owned block
  T5: Value Streams block
```

T3/T4/T5 all modify the same file and are sequentially dependent. Do not parallelize.

---

## Task 1 — Token additions

**Files:** `tokens/colors.ts`, `colors_and_type.css`

**What:** Add three soft-variant tokens for authority chip backgrounds.

### tokens/colors.ts

Add to `colors` object (raw light-mode values):
```ts
blueSoft:   'rgba(58, 92, 168, 0.09)',
indigoSoft: 'rgba(88, 68, 186, 0.09)',
amberSoft:  'rgba(194, 124, 36, 0.09)',
```

Add to `colorVars` object (CSS var references):
```ts
blueSoft:   'var(--blue-soft)',
indigoSoft: 'var(--indigo-soft)',
amberSoft:  'var(--amber-soft)',
```

### colors_and_type.css

Add to `:root` (after `--teal-border`):
```css
--blue-soft:   rgba(58, 92, 168, 0.09);
--indigo-soft: rgba(88, 68, 186, 0.09);
--amber-soft:  rgba(194, 124, 36, 0.09);
```

Add to both `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]` blocks (doubled alpha, matching tealSoft dark pattern):
```css
--blue-soft:   rgba(58, 92, 168, 0.18);
--indigo-soft: rgba(88, 68, 186, 0.18);
--amber-soft:  rgba(194, 124, 36, 0.18);
```

**Acceptance criteria:**
- `colorVars.blueSoft === 'var(--blue-soft)'`
- `colorVars.indigoSoft === 'var(--indigo-soft)'`
- `colorVars.amberSoft === 'var(--amber-soft)'`
- All 3 vars present in `:root` and both dark override blocks in `colors_and_type.css`

**Verification:** `console.log(colorVars.blueSoft)` → `'var(--blue-soft)'`. Remove log after confirming.

---

## Task 2 — Mock data update (TeamDetail.jsx DEFAULTS)

**File:** `ui_kits/meso-app/nodes/team/TeamDetail.jsx`

**What:** Update DEFAULTS so all new blocks have well-shaped data. Only DEFAULTS changes — t2/t3 overrides inherit automatically via spread.

### 1. Replace decisionAuthorities (currently `{title, approver, threshold}` shape)

```js
decisionAuthorities: [
  {
    authorityType: 'decides',
    description:   'Determines platform-wide architecture changes without prior approval.',
    domainId:      'domain-engineering',
  },
  {
    authorityType: 'approves',
    description:   'Signs off all production deployments affecting shared infrastructure.',
    domainId:      'domain-engineering',
  },
  {
    authorityType: 'advises',
    description:   'Provides technical input on security posture decisions raised by other teams.',
    domainId:      'domain-security',
  },
  {
    authorityType: 'ratifies',
    description:   'Confirms post-incident remediation plans before the incident is closed.',
    domainId:      'domain-engineering',
  },
],
```

### 2. Add domains array

```js
domains: [
  { id: 'domain-engineering', name: 'Engineering' },
  { id: 'domain-security',    name: 'Security'    },
  { id: 'domain-product',     name: 'Product'     },
],
```

### 3. Add ownedCapabilities array

Two root capabilities; one with a child; one with a co-owner annotation:

```js
ownedCapabilities: [
  {
    id:                 'cap-platform-reliability',
    name:               'Platform Reliability',
    description:        'Uptime, incident response, and SLA attainment.',
    parentCapabilityId: null,
    coOwners:           [],
  },
  {
    id:                 'cap-observability',
    name:               'Observability',
    description:        'Telemetry, logging, and alerting infrastructure.',
    parentCapabilityId: 'cap-platform-reliability',
    coOwners:           [{ teamId: 't2', teamName: 'Data Platform' }],
  },
  {
    id:                 'cap-developer-tooling',
    name:               'Developer Tooling',
    description:        'Internal tools that accelerate delivery cycles.',
    parentCapabilityId: null,
    coOwners:           [],
  },
  {
    id:                 'cap-ci-cd',
    name:               'CI/CD Pipeline',
    description:        'Automated build, test, and deployment pipelines.',
    parentCapabilityId: 'cap-developer-tooling',
    coOwners:           [],
  },
],
```

### 4. Update valueStreams to businessOutcomes[] shape

```js
valueStreams: [
  {
    id:               'vs1',
    name:             'Developer Experience',
    businessOutcomes: [
      'Reduce time-to-deploy across all product teams.',
      'Increase deployment frequency to a daily cadence.',
    ],
  },
  {
    id:               'vs2',
    name:             'Platform Reliability',
    businessOutcomes: [
      'Maintain 99.9% platform SLA across all hosted services.',
      'Reduce mean time to recovery below one hour.',
    ],
  },
],
```

**Note:** Remove the old `businessOutcome` (singular) key — it is replaced by `businessOutcomes[]`.

**Acceptance criteria:**
- All 5 existing tabs still render without JS errors after this change
- `detail.decisionAuthorities[0].authorityType === 'decides'`
- `detail.domains.length === 3`
- `detail.ownedCapabilities.length === 4`
- `detail.valueStreams[0].businessOutcomes` is an array

**Verification:** Browser → open any team → cycle through all 5 tabs → no console errors.

---

## Task 3 — Rewrite AboutTab.jsx: foundation + Decision Authorities

**File:** `ui_kits/meso-app/nodes/team/tabs/AboutTab.jsx`

**What:** Full file rewrite. Sets up the new file structure, fixes sub-component typography, removes MetricsBar/WorkspaceLinks/Channels, implements Purpose and Responsibilities (minor polish), implements Decision Authorities.

### File structure after this task

```
imports
constants (AUTHORITY_ORDER, CHIP_VARIANTS)
SectionHeading (fixed to labelA)
SectionCard (switch colors.white → colorVars.white)
AuthorityChip (new file-local sub-component)
AboutTab
  ├─ Purpose SectionCard
  ├─ Responsibilities SectionCard
  └─ Decision Authorities SectionCard
```

### Import line

```js
import { colors, colorVars, fontFamilies, typeScale, spacing, radii, shadows } from '@/tokens'
```

Remove `Icon` import — no longer used in this file.

### SectionHeading — corrected typography

Current stub uses `typeScale.labelB.size` (11px) + custom tracking. Spec requires `labelA`:

```js
const SectionHeading = ({ children }) => (
  <div style={{
    fontFamily:    fontFamilies.body,
    fontSize:      typeScale.labelA.size,         // 10px
    fontWeight:    typeScale.labelA.weight,        // 600
    letterSpacing: typeScale.labelA.letterSpacing, // 0.10em
    textTransform: typeScale.labelA.textTransform, // uppercase
    color:         colorVars.textTertiary,
    marginBottom:  spacing.m,
  }}>
    {children}
  </div>
)
```

### SectionCard — switch to colorVars

```js
const SectionCard = ({ children, style = {} }) => (
  <div style={{
    background:   colorVars.white,
    borderRadius: radii.lg,
    boxShadow:    shadows.sm,
    padding:      spacing.l,
    ...style,
  }}>
    {children}
  </div>
)
```

### Constants

```js
const AUTHORITY_ORDER = { decides: 0, approves: 1, advises: 2, ratifies: 3 }

const CHIP_VARIANTS = {
  decides:  { bg: colorVars.tealSoft,   text: colorVars.teal   },
  approves: { bg: colorVars.blueSoft,   text: colorVars.blue   },
  advises:  { bg: colorVars.indigoSoft, text: colorVars.indigo },
  ratifies: { bg: colorVars.amberSoft,  text: colorVars.amber  },
}
```

### AuthorityChip sub-component

```js
const AuthorityChip = ({ type }) => {
  const v = CHIP_VARIANTS[type] ?? CHIP_VARIANTS.advises
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      padding:       '3px 8px',
      borderRadius:  radii.sm,
      background:    v.bg,
      fontFamily:    fontFamilies.body,
      fontSize:      typeScale.labelA.size,
      fontWeight:    typeScale.labelA.weight,
      letterSpacing: typeScale.labelA.letterSpacing,
      textTransform: typeScale.labelA.textTransform,
      color:         v.text,
      flexShrink:    0,
      width:         80,              // fixed-width column
      justifyContent: 'center',
    }}>
      {type}
    </span>
  )
}
```

### Decision Authorities block

```js
const sorted = [...detail.decisionAuthorities]
  .sort((a, b) => AUTHORITY_ORDER[a.authorityType] - AUTHORITY_ORDER[b.authorityType])

const domainsById = Object.fromEntries((detail.domains ?? []).map(d => [d.id, d]))

// Inside SectionCard:
{sorted.length === 0 ? (
  <p style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colorVars.textTertiary, fontStyle: 'italic', margin: 0 }}>
    No decision authorities have been defined.
  </p>
) : (
  sorted.map((a, i) => (
    <div
      key={`${a.authorityType}-${a.domainId}`}
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          spacing.m,
        paddingTop:   spacing.m,
        paddingBottom: spacing.m,
        borderBottom: i < sorted.length - 1 ? `1px solid ${colors.border}` : 'none',
      }}
    >
      <AuthorityChip type={a.authorityType} />
      <span style={{
        flex:       1,
        fontFamily: fontFamilies.body,
        fontSize:   typeScale.ui.size,
        fontWeight: typeScale.ui.weight,
        color:      colors.textPrimary,
      }}>
        {a.description}
      </span>
      {domainsById[a.domainId] && (
        <span style={{
          flexShrink:   0,
          padding:      '2px 6px',
          borderRadius: radii.sm,
          background:   colors.stone2,
          fontFamily:   fontFamilies.body,
          fontSize:     typeScale.labelB.size,
          fontWeight:   typeScale.labelB.weight,
          color:        colors.textSecondary,
        }}>
          {domainsById[a.domainId].name}
        </span>
      )}
    </div>
  ))
)}
```

**Note on color mixing:** `AuthorityChip` uses `colorVars.*` (required — new CSS var tokens). Row separators and domain pill use `colors.*` (consistent with project convention; no dark-mode concern for these neutral tones in this phase).

### Sections removed

Remove entirely from the file:
- `MetricsBar` import and chip calculation
- Workspace links SectionCard
- Channels SectionCard
- The 2-column grid wrapper for links/channels

**Acceptance criteria:**
- 4 authority rows render in order: Decides → Approves → Advises → Ratifies
- Each chip shows correct background and text colour per `CHIP_VARIANTS`
- Domain pill resolves to domain name (e.g. "Engineering", "Security")
- Last row has no border-bottom
- Empty state renders correctly when `decisionAuthorities` is `[]`
- Purpose and Responsibilities blocks render visually correctly
- No MetricsBar, WorkspaceLinks, or Channels sections remain

**Verification:** Browser → About tab → Purpose, Responsibilities, Decision Authorities all visible. 4 authority rows with coloured chips.

---

## Task 4 — Capabilities Owned block

**File:** `ui_kits/meso-app/nodes/team/tabs/AboutTab.jsx`

**What:** Add the Capabilities Owned `SectionCard` after Decision Authorities.

### Tree construction (inside AboutTab)

```js
const ownedCapabilities = detail.ownedCapabilities ?? []
const ownedIds = new Set(ownedCapabilities.map(c => c.id))
const capRoots = ownedCapabilities.filter(
  c => !c.parentCapabilityId || !ownedIds.has(c.parentCapabilityId)
)
const childrenOf = (id) => ownedCapabilities.filter(c => c.parentCapabilityId === id)
```

### CapabilityRow sub-component

File-local, not memoised (tree is read-only, no UI state):

```js
const CapabilityRow = ({ cap, depth }) => {
  const children = childrenOf(cap.id)   // childrenOf must be in scope
  return (
    <>
      <div style={{
        display:     'flex',
        alignItems:  'baseline',
        gap:         spacing.xs,
        paddingLeft: depth * 20,          // 20px per level (structural constant)
        paddingTop:  spacing.xs,
        paddingBottom: spacing.xs,
      }}>
        <span style={{
          fontFamily: fontFamilies.body,
          fontSize:   typeScale.ui.size,
          fontWeight: typeScale.ui.weight,
          color:      colors.textPrimary,
          flex:       1,
        }}>
          {cap.name}
        </span>
        {cap.coOwners?.length > 0 && (
          <span style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.labelB.size,
            color:      colors.textTertiary,
            fontStyle:  'italic',
            flexShrink: 0,
          }}>
            shared with {cap.coOwners.map(o => o.teamName).join(', ')}
          </span>
        )}
      </div>
      {depth < 3 && children.map(child => (
        <CapabilityRow key={child.id} cap={child} depth={depth + 1} />
      ))}
    </>
  )
}
```

**Note:** `CapabilityRow` is defined inside `AboutTab` so it closes over `childrenOf`. This is intentional — it keeps the tree logic self-contained without prop-drilling.

### Block rendering

```jsx
<SectionCard>
  <SectionHeading>Capabilities owned</SectionHeading>
  {ownedCapabilities.length === 0 ? (
    <p style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colorVars.textTertiary, fontStyle: 'italic', margin: 0 }}>
      No capabilities have been assigned to this team.
    </p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {capRoots.map(root => (
        <CapabilityRow key={root.id} cap={root} depth={0} />
      ))}
    </div>
  )}
</SectionCard>
```

**Acceptance criteria:**
- `Platform Reliability` and `Developer Tooling` render at depth 0 (no indent)
- `Observability` renders indented under `Platform Reliability`, shows "shared with Data Platform" annotation
- `CI/CD Pipeline` renders indented under `Developer Tooling`, no annotation
- Recursion stops at depth 3 (guard present; not reachable with current mock data)
- Empty state renders when `ownedCapabilities` is `[]`

**Verification:** Browser → About tab → Capabilities Owned section → tree structure correct, shared annotation visible.

---

## Task 5 — Value Streams block

**File:** `ui_kits/meso-app/nodes/team/tabs/AboutTab.jsx`

**What:** Add the Value Stream Contribution `SectionCard` after Capabilities Owned. Each value stream renders as a `stone`-background inset row within the outer card — no shadow-on-shadow nesting.

### Block rendering

```jsx
<SectionCard>
  <SectionHeading>Value stream contribution</SectionHeading>
  {(detail.valueStreams ?? []).length === 0 ? (
    <p style={{ fontFamily: fontFamilies.body, fontSize: typeScale.body.size, color: colorVars.textTertiary, fontStyle: 'italic', margin: 0 }}>
      This team has not been mapped to any value streams.
    </p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.s }}>
      {detail.valueStreams.map(vs => (
        <div
          key={vs.id}
          style={{
            background:   colors.stone,
            borderRadius: radii.md,
            padding:      spacing.m,
          }}
        >
          <div style={{
            fontFamily: fontFamilies.body,
            fontSize:   typeScale.ui.size,
            fontWeight: 600,
            color:      colors.textPrimary,
            marginBottom: spacing.xs,
          }}>
            {vs.name}
          </div>
          <p style={{
            fontFamily:          fontFamilies.body,
            fontSize:            typeScale.body.size,
            lineHeight:          typeScale.body.lineHeight,
            color:               colors.textSecondary,
            overflow:            'hidden',
            display:             '-webkit-box',
            WebkitLineClamp:     2,
            WebkitBoxOrient:     'vertical',
            margin:              0,
          }}>
            {vs.businessOutcomes.slice(0, 2).join(' · ')}
          </p>
        </div>
      ))}
    </div>
  )}
</SectionCard>
```

**Design note:** Each VS row uses `colors.stone` (page background colour) against the outer card's `colors.white`. This creates a legible inset without shadow nesting. `radii.md` (not `radii.lg`) signals secondary hierarchy within the card.

**Acceptance criteria:**
- 2 value stream rows render with correct names
- Business outcomes join with `·` separator, clamped to 2 lines
- Empty state renders when `valueStreams` is `[]`
- No contribution type badge (removed per spec simplification)

**Verification:** Browser → About tab → Value Stream Contribution section → 2 rows visible, outcomes text truncates on long content.

---

## Checkpoints

| # | After task | What to verify |
|---|---|---|
| CP1 | T1 | `colorVars.blueSoft` resolves correctly; no broken imports anywhere |
| CP2 | T2 | All 5 existing tabs render without console errors; new mock data shape confirmed |
| CP3 | T3 | Purpose, Responsibilities, Decision Authorities all visible; 4 coloured chips in correct order |
| CP4 | T4 | Capabilities tree renders with correct indent; co-owner annotation on Observability |
| CP5 | T5 | Value stream rows visible; outcomes clamped to 2 lines |

---

## Build Order

```
T1 (tokens)  →  T2 (mock data)  →  T3 (foundation + authorities)  →  T4 (capabilities)  →  T5 (value streams)
```

T3 → T4 → T5 are sequential edits to the same file. Complete and verify each before starting the next.

---

## Conventions for this work

- `colorVars.*` used for the new chip tokens (CSS vars required; `blueSoft/indigoSoft/amberSoft` have no static value alternative). This is the first component file to use `colorVars.*` — consistent with CLAUDE.md intent. Other neutral color references in the same file continue to use `colors.*` to minimize unintended scope creep.
- No new files — all sub-components (`AuthorityChip`, `CapabilityRow`) are file-local.
- React keys from stable `id` fields — never array index.
- No hardcoded hex or px font sizes — tokens only.
- `CapabilityRow` is defined inside `AboutTab` to close over `childrenOf` without prop drilling. This is intentional and acceptable for a file-local recursive renderer.
