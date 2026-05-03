# Plan — Business Capability Map (Visual Column Layout)

Spec: `SPEC-CAPABILITY-MAP.md`
Touches: `capabilityData.js`, `CapabilityMap.jsx` (new), `CapabilityScreen.jsx`
Does not touch: `main.jsx`, `CapabilityDetail.jsx`, any tab, any shared component.

---

## Dependency graph

```
Task 1: capabilityData.js   ← data layer; everything else depends on this
    ↓
Task 2: CapabilityMap.jsx   ← L1 columns + L2 cards (no L3 yet); isolated component
    ↓
Task 3: L3 nested items     ← extend CapabilityMap with L3 list inside L2 cards
    ↓
Task 4: Wire + verify       ← replace table in CapabilityScreen, run tests, smoke-test clicks
```

Each task produces a visible, runnable result before the next task begins.

---

## Task 1 — Replace capability data with the full SaaS model

**Files:** `nodes/capability/capabilityData.js`

**What to build:**
- Delete all existing CAPABILITIES records (5 sparse stubs).
- Populate a new flat array with the complete SaaS model:
  - 8 L1 capabilities (null `parentCapabilityId`)
  - ~56 L2 capabilities (one level deep)
  - ~130 L3 stubs (two levels deep, 2–3 per L2)
- Every record uses the existing shape (`id`, `name`, `description`, `parentCapabilityId`, `status`, `subCapabilities`, `owners`, `processes`, `valueStreams`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`).
- L2 and L3 records have `subCapabilities: []`, `owners: []`, `processes: []`, `valueStreams: []`.
- L1 records have `subCapabilities` populated with references to their direct L2 children (id + name).
- `DEFAULT_CAPABILITY` unchanged and still exported.
- ID scheme: `cap-l1-[slug]`, `cap-l2-[slug]`, `cap-l3-[slug]`.

**L1 → L2 mapping (from spec):**

| L1 id | L1 name | L2 count |
|---|---|---|
| cap-l1-product-development | Product Development | 7 |
| cap-l1-platform-operations | Platform & Service Operations | 5 |
| cap-l1-account-management | Account Management | 8 |
| cap-l1-enterprise-support | Enterprise Support | 9 |
| cap-l1-demand-generation | Demand Generation | 8 |
| cap-l1-people-operations | People Operations | 7 |
| cap-l1-financial-services | Financial Services | 6 |
| cap-l1-it-management | IT Management | 6 |

**Acceptance criteria:**
- `CAPABILITIES.filter(c => !c.parentCapabilityId).length === 8`
- `CAPABILITIES.filter(c => c.parentCapabilityId?.startsWith('cap-l1')).length >= 50`
- `CAPABILITIES.filter(c => c.parentCapabilityId?.startsWith('cap-l2')).length >= 100`
- `deriveLevel` returns `'l1'` / `'l2'` / `'l3'` correctly for spot-checked records
- `DEFAULT_CAPABILITY` still exported

**Verification:** Dev server restart → browser console spot-check of level derivation.

---

## Checkpoint A — Data shape verified

Before Task 2: confirm 8 L1s present and `deriveLevel` returns correct values.

---

## Task 2 — Build CapabilityMap component (L1 columns + L2 cards)

**Files:** `nodes/capability/CapabilityMap.jsx` (new)

**What to build:**
- Props: `{ capabilities, onOpenCapability }`
- Derive tree from flat array (no useMemo — pure from props):
  - `l1s = capabilities.filter(c => !c.parentCapabilityId)`
  - per l1: `l2s = capabilities.filter(c => c.parentCapabilityId === l1.id)`
- Horizontally scrollable flex row, one 220px fixed-width column per L1.
- Each column:
  - **L1 header** — `colors.teal` bg, `colors.white` text, `fontFamilies.display`, `typeScale.ui.size`, `fontWeight 600`, `radii.md` on top corners. Clickable → `onOpenCapability(l1)`.
  - **L2 cards** stacked below — `colors.white`, `1px solid colors.border`, `radii.md`, `shadows.sm` at rest → `shadows.md` + `translateY(-2px)` on hover. `fontFamilies.body`, `typeScale.ui.size`, `fontWeight 500`, `colors.ink`. Clickable → `onOpenCapability(l2)`.
- L3 items not yet rendered.
- Transitions: `easing.out`.

**Acceptance criteria:**
- 8 teal column headers in a scrollable row.
- L2 cards beneath each header; card hover state works.
- Clicking L1 and L2 opens `CapabilityDetail`. No hardcoded colours.

---

## Task 3 — Add L3 nested items inside L2 cards

**Files:** `nodes/capability/CapabilityMap.jsx` (extend)

**What to build:**
- Per L2: `l3s = capabilities.filter(c => c.parentCapabilityId === l2.id)`
- If `l3s.length > 0`: render list below L2 name, separated by `1px solid colors.border` top border.
- Each L3 item: `fontFamilies.body`, `typeScale.labelB.size`, `colors.textSecondary`, `spacing.xs` vertical padding, `spacing.m` horizontal, hover bg `colorVars.stone`. Clickable → `onOpenCapability(l3)`.
- L2 cards with no L3 children unchanged.

**Acceptance criteria:**
- L3 items visible inside L2 cards.
- Empty-L3 cards have no extra whitespace.
- Clicking any L3 item → `CapabilityDetail` with correct name and "L3" level badge.

---

## Checkpoint B — Map component complete

Before Task 4: all three levels render, are clickable, navigate correctly. Visual issues resolved here.

---

## Task 4 — Wire CapabilityMap into CapabilityScreen + verify

**Files:** `nodes/capability/CapabilityScreen.jsx`

**What to build:**
- Import `CapabilityMap`.
- Remove `<Card>` + `<table>` block.
- Replace with `<CapabilityMap capabilities={CAPABILITIES} onOpenCapability={onOpenCapability} />`.
- Remove `CAPABILITY_ROWS` constant (no longer needed).
- Remove unused imports (`Card`, `Pill`, `LevelBadge`, `deriveLevel`) — only those confirmed unused.

**Acceptance criteria:**
- Map renders; table is gone.
- Page header unchanged.
- `npm run test` exits clean.
- Click L1, L2, L3 → correct `CapabilityDetail`; back/breadcrumb returns to map.
- No regressions on Teams, People, Roles, Value Streams.

**Verification steps:**
1. `npm run test`
2. Navigate to Capabilities — map renders.
3. Click one of each level — correct detail opens.
4. Breadcrumb / back — returns to map.
5. Switch to Teams, People, Roles, Value Streams — no breakage.

---

## Summary

| Task | File(s) | Deliverable |
|---|---|---|
| 1 | `capabilityData.js` | Full SaaS model — 8 L1 + 56 L2 + ~130 L3 |
| **Checkpoint A** | — | Data shape verified |
| 2 | `CapabilityMap.jsx` | L1 columns + L2 cards, interactive |
| 3 | `CapabilityMap.jsx` | L3 items nested in L2 cards |
| **Checkpoint B** | — | Map component complete |
| 4 | `CapabilityScreen.jsx` | Table replaced, tests passing |

**New files:** 1 (`CapabilityMap.jsx`).
**Files modified:** 2 (`capabilityData.js`, `CapabilityScreen.jsx`).
**Files untouched:** everything else.

---

## Dependency graph

```
graph.go (read-only reference)
    │
    ▼
mock data arrays (inside each Detail file)
    │
    ├──▶ Tab components (AboutTab, ContributorsTab, …)
    │         └── SectionParts, Components (already exist)
    │
    ├──▶ Detail component (NodeDetailShell wrapper)
    │         └── NodeDetailShell (already exists)
    │
    ├──▶ Screen component (imports mock array from Detail)
    │
    └──▶ main.jsx (imports Screen + Detail, adds state + routing)
```

**Key constraints:**
- `ValueStreamScreen` imports `VALUE_STREAMS` array exported from `ValueStreamDetail` — same pattern as `RolesScreen` importing `ROLES` from `RoleDetail`.
- `main.jsx` imports must be added in the same task that creates the target files.
- `buildBreadcrumbs` change is safe to do before the files exist (it's pure logic).

---

## Slice strategy

Work is cut **vertically by node type**, not horizontally by layer. Each task delivers a complete navigatable path.

- **Task 1** — main.jsx plumbing only (state, breadcrumbs, guard). No new imports yet. Existing app stays green.
- **Task 2** — Complete Value Stream node: all 7 files + main.jsx imports/routing. After this task, Value Streams is fully interactive.
- **Task 3** — Complete Capability node: all 7 files + main.jsx imports/routing. After this task, Capabilities is fully interactive.

---

## Task 1 — main.jsx plumbing

**Files touched:** `ui_kits/meso-app/main.jsx` only.

**Changes:**
1. Add `const [openValueStream, setOpenValueStream] = useState(null)`
2. Add `const [openCapability,  setOpenCapability]  = useState(null)`
3. Update `openNode` expression:
   ```js
   const openNode = openTeam ?? openPerson ?? openRole ?? openValueStream ?? openCapability
   ```
4. Extend `navigateTo` to clear `setOpenValueStream(null)` and `setOpenCapability(null)`.
5. Extend `closeNode` to clear both.
6. Replace `RECORD_IDS` + `buildBreadcrumbs` with the version from SPEC.md that adds `TOP_SECTION_IDS` and handles non-Records detail breadcrumbs.
7. Extend `EmptyPanel` guard to exclude `'value-streams'` and `'capabilities'`.

**NOT done in this task:** imports, routing blocks (nothing to import yet).

**Acceptance criteria:**
- App loads without errors.
- Teams, People, Roles all behave identically to before.
- Navigating to `value-streams` or `capabilities` still shows the `EmptyPanel` fallback (routing blocks not yet added).
- No console errors.

**Verification:** `npm run dev` → browser → click Value Streams and Capabilities in sidebar → EmptyPanel renders → click Teams → Teams still works.

---

## Task 2 — Value Stream node (complete vertical slice)

**New files (7):**

```
nodes/value-stream/
├── ValueStreamDetail.jsx
├── ValueStreamScreen.jsx
└── tabs/
    ├── AboutTab.jsx
    ├── ContributorsTab.jsx
    ├── ProcessesTab.jsx
    ├── CapabilitiesTab.jsx
    └── KPIsTab.jsx
```

**main.jsx additions:**
- 2 new imports (ValueStreamDetail, ValueStreamScreen)
- 2 routing blocks (list + detail)

### ValueStreamDetail.jsx

Mock data array `VALUE_STREAMS` — 3 records:

| id | name |
|---|---|
| `value-stream-customer-onboarding` | Customer Onboarding |
| `value-stream-product-delivery` | Product Delivery |
| `value-stream-support-resolution` | Support Resolution |

Each record has: `id`, `name`, `businessOutcomes[]`, `status`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy` + relationship mock arrays (contributors, processes, capabilities, kpis).

`DEFAULT_VALUE_STREAM` covers all fields. `getValueStream(node)` merges node with defaults.

Tabs (5):

| id | label | badge | component |
|---|---|---|---|
| `about` | About | — | `AboutTab` |
| `contributors` | Contributors | `{count}` | `ContributorsTab` |
| `processes` | Processes | `{count}` | `ProcessesTab` |
| `capabilities` | Capabilities | `{count}` | `CapabilitiesTab` |
| `kpis` | KPIs | `{count}` | `KPIsTab` |

`NodeDetailShell` props: `nodeType="Value stream"`, `name`, `status`, `createdAt/By`, `updatedAt/By`, `tabs`, `onTitleVisibilityChange`.

### Tab content

**AboutTab** — renders:
- `businessOutcomes[]` as a bulleted list inside a `SectionCard`
- Status summary (active/archived)

**ContributorsTab** — renders contributors grouped by node type (`Teams`, `Roles`, `Services`, `Processes`) in `SectionCard` blocks. Each contributor: name + node type pill. Source edge: `contributes_to`.

**ProcessesTab** — renders a list of child processes inside a `SectionCard`. Each row: process name + type badge. Source edge: `value_stream_parent_of_process`.

**CapabilitiesTab** — renders enabling capabilities in a `SectionCard`. Each row: capability name + level badge (L1/L2/L3). Source edge: `enables_value_stream` (incoming to VS).

**KPIsTab** — renders KPI rows in a `SectionCard`. Each row: KPI name + `contributionType` pill (owns / contributes / influences) + category. Source edge: `contributes_to_kpi`.

### ValueStreamScreen.jsx

Mirrors `RolesScreen` pattern:
- Imports `VALUE_STREAMS` from `ValueStreamDetail`
- Table columns: Name · Business outcomes (truncated, first item) · Status · (View →)
- `onOpenValueStream(record)` on row click

**Acceptance criteria:**
- Sidebar → Value Streams → list renders 3 rows.
- Click a row → detail opens, title shows stream name.
- All 5 tabs are clickable and render their content with mock data.
- Breadcrumb: `Value Streams` on list; `Value Streams / [name]` on detail.
- Back button / breadcrumb click returns to list.
- No regressions on Teams, People, Roles.

**Verification:** browser click-through of all 5 tabs on all 3 records.

---

## Task 3 — Capability node (complete vertical slice)

**New files (7):**

```
nodes/capability/
├── CapabilityDetail.jsx
├── CapabilityScreen.jsx
└── tabs/
    ├── AboutTab.jsx
    ├── SubCapabilitiesTab.jsx
    ├── OwnersTab.jsx
    ├── ProcessesTab.jsx
    └── ValueStreamsTab.jsx
```

**main.jsx additions:**
- 2 new imports (CapabilityDetail, CapabilityScreen)
- 2 routing blocks (list + detail)

### CapabilityDetail.jsx

Mock data array `CAPABILITIES` — 5 records covering L1, L2, L3:

| id | name | level | parentCapabilityId |
|---|---|---|---|
| `capability-customer-management` | Customer Management | L1 | `null` |
| `capability-digital-acquisition` | Digital Acquisition | L2 | `capability-customer-management` |
| `capability-data-analytics` | Data Analytics | L1 | `null` |
| `capability-reporting` | Reporting | L2 | `capability-data-analytics` |
| `capability-risk-management` | Risk Management | L1 | `null` |

Each record has: `id`, `name`, `description`, `parentCapabilityId`, `status`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy` + relationship mock arrays (subCapabilities, owners, processes, valueStreams, kpis).

`DEFAULT_CAPABILITY` covers all fields. `getCapability(node)` merges node with defaults.

**Level derivation helper** (`deriveLevel(cap, all)`): returns `'l1'` if `parentCapabilityId` is null; looks up the parent's `parentCapabilityId` to distinguish L2 from L3.

Tabs (5):

| id | label | badge | component |
|---|---|---|---|
| `about` | About | — | `AboutTab` |
| `sub-capabilities` | Sub-capabilities | `{count}` | `SubCapabilitiesTab` |
| `owners` | Owners | `{count}` | `OwnersTab` |
| `processes` | Processes | `{count}` | `ProcessesTab` |
| `value-streams` | Value streams | `{count}` | `ValueStreamsTab` |

`NodeDetailShell` props: `nodeType="Capability"`, `nodeSubtype` = level label (`L1 / L2 / L3`), `name`, `status`, `createdAt/By`, `updatedAt/By`, `tabs`, `onTitleVisibilityChange`.

### Tab content

**AboutTab** — renders:
- `description` in a `SectionCard`
- Hierarchy section: level badge (L1/L2/L3) + parent capability name (if L2/L3)

**SubCapabilitiesTab** — child capabilities via `capability_parent_of`. Each row: name + level badge. `EmptyState` if none.

**OwnersTab** — Roles and Teams that `owns_capability`. Grouped into two `SectionCard` blocks: "Owning roles" and "Owning teams". Each row: name + type pill.

**ProcessesTab** — processes via `capability_parent_of_process`. Each row: process name + type badge + status.

**ValueStreamsTab** — value streams this capability `enables_value_stream`. Each row: VS name + first business outcome (truncated).

### CapabilityScreen.jsx

Table columns: Name · Level · Description (truncated) · Status · (View →)
Derives level from `parentCapabilityId` for each record in the `CAPABILITIES` array.

**Acceptance criteria:**
- Sidebar → Capabilities → list renders 5 rows with correct level shown.
- Click a row → detail opens, `nodeSubtype` shows correct level (L1/L2/L3).
- All 5 tabs clickable and render mock data.
- Breadcrumb: `Capabilities` on list; `Capabilities / [name]` on detail.
- Back button / breadcrumb click returns to list.
- No regressions on any existing section, including Value Streams.

**Verification:** browser click-through all 5 tabs on all 5 capability records.

---

## Checkpoints

| After | Gate |
|---|---|
| Task 1 | `npm run dev` — no errors, existing nav unaffected |
| Task 2 | Full VS click-through in browser: list → 3 detail views → 5 tabs each |
| Task 3 | Full Cap click-through in browser: list → 5 detail views → 5 tabs each; no regression on VS or Records |

---

## What is out of scope

- Services, Processes, Governance Bodies screens (remain EmptyPanel)
- Backend / API integration
- Any changes to Teams, People, Roles behaviour
