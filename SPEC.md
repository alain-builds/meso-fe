# SPEC: Value Stream and Capability nodes

**Source of truth for relationships:** `data-model/graph.go`

---

## Objective

Add two fully-interactive node types — **Value Stream** and **Capability** — to the meso-fe application. Each follows the identical three-tier pattern already established by Person, Role, and Team: a screen (list view), a detail view composed of tabs, and full wiring into `main.jsx` (state, routing, breadcrumbs).

The implementation must be complete and self-contained — not scaffolded. Every tab renders meaningful mock data that reflects the actual relationships defined in `graph.go`.

---

## Acceptance criteria

1. Navigating to **value-streams** in the sidebar shows `ValueStreamScreen`; clicking a row opens `ValueStreamDetail` with tabs.
2. Navigating to **capabilities** shows `CapabilityScreen`; clicking a row opens `CapabilityDetail` with tabs.
3. Both detail views render inside `NodeDetailShell` with correct `nodeType`, `status`, metadata, and tabs.
4. Breadcrumbs work correctly:
   - List view: `Value Streams` (single crumb, no "Records" prefix)
   - Detail view: `Value Streams` (clickable, calls `closeNode`) → `[name]` (plain)
   - Same pattern for Capabilities.
5. Closing a detail view (back button or breadcrumb click) returns to the list screen.
6. All tabs render mock data consistent with `graph.go` relationship types.
7. No regressions on Teams, People, or Roles.
8. Design system compliance: all styles via `colorVars.*` / `spacingVars.*` (or `colors.*` / `spacing.*` for non-dark-mode JS contexts). No hardcoded hex or pixel values.

---

## Data model (graph.go)

### `ValueStreamNode` (line 426)

```
ID               string    // "value-stream-[slug]"
Name             string
BusinessOutcomes []string
Status           NodeStatus  // "active" | "archived"
CreatedAt        string
UpdatedAt        string
History          []HistoryEntry
```

**Relationships surfaced in the UI:**

| Edge type | Direction | Relationship | What to show |
|---|---|---|---|
| `ContributesToEdge` | → this VS | `contributes_to` | Teams, TemporaryTeams, Roles, Services, Processes that feed this stream |
| `ValueStreamParentOfProcessEdge` | this VS → | `value_stream_parent_of_process` | Child processes belonging to this stream |
| `EnablesValueStreamEdge` | → this VS | `enables_value_stream` | BusinessCapabilities that enable this stream |
| `ContributesToKPIEdge` | this VS → | `contributes_to_kpi` | KPIs this stream contributes to (with `contributionType`: owns / contributes / influences) |

---

### `BusinessCapabilityNode` (line 548) — surfaced as "Capability"

```
ID                  string   // "capability-[slug]"
Name                string
Description         string
ParentCapabilityID  *string  // nil = L1 | one-level deep = L2 | two-levels deep = L3
Status              NodeStatus  // "active" | "archived"
CreatedAt           string
UpdatedAt           string
History             []HistoryEntry
```

`CapabilityLevel` enum: `l1` / `l2` / `l3` (line 250–257). Level is **derived** from `ParentCapabilityID` depth, not stored separately.

**Relationships surfaced in the UI:**

| Edge type | Direction | Relationship | What to show |
|---|---|---|---|
| `CapabilityParentOfEdge` | this cap → child | `capability_parent_of` | Sub-capabilities (children) |
| `OwnsCapabilityEdge` | Role\|Team → this cap | `owns_capability` | Owning roles and teams |
| `BusinessCapabilityParentOfProcessEdge` | this cap → | `capability_parent_of_process` | Processes that execute this capability |
| `EnablesValueStreamEdge` | this cap → | `enables_value_stream` | Value streams this capability enables |
| `ContributesToKPIEdge` | this cap → | `contributes_to_kpi` | KPIs this capability contributes to |

---

## File structure

```
ui_kits/meso-app/nodes/
├── value-stream/
│   ├── ValueStreamScreen.jsx
│   ├── ValueStreamDetail.jsx
│   └── tabs/
│       ├── AboutTab.jsx
│       ├── ContributorsTab.jsx
│       ├── ProcessesTab.jsx
│       ├── CapabilitiesTab.jsx
│       └── KPIsTab.jsx
└── capability/
    ├── CapabilityScreen.jsx
    ├── CapabilityDetail.jsx
    └── tabs/
        ├── AboutTab.jsx
        ├── SubCapabilitiesTab.jsx
        ├── OwnersTab.jsx
        ├── ProcessesTab.jsx
        └── ValueStreamsTab.jsx
```

---

## Tabs

### Value Stream tabs

| id | label | badge | content |
|---|---|---|---|
| `about` | About | — | `name`, `businessOutcomes[]` as a list, `status`, standard metadata section |
| `contributors` | Contributors | count | Teams, Roles, Services, Processes that `contributes_to` this stream — grouped by node type |
| `processes` | Processes | count | Child processes via `value_stream_parent_of_process` |
| `capabilities` | Capabilities | count | BusinessCapabilities that `enables_value_stream` (incoming) |
| `kpis` | KPIs | count | KPIs this stream `contributes_to_kpi` — show `contributionType` as a pill |

### Capability tabs

| id | label | badge | content |
|---|---|---|---|
| `about` | About | — | `name`, `description`, hierarchy level (L1 / L2 / L3 pill), parent capability name if L2/L3, `status`, metadata |
| `sub-capabilities` | Sub-capabilities | count | Child capabilities via `capability_parent_of` — show their level |
| `owners` | Owners | count | Roles and Teams that `owns_capability` this capability |
| `processes` | Processes | count | Processes via `capability_parent_of_process` |
| `value-streams` | Value streams | count | Value streams this capability `enables_value_stream` |

---

## Mock data

Each `Detail` component owns its mock array internally (same pattern as `TeamDetail`, `PersonDetail`, `RoleDetail`). Define **3–5 records** per node type.

**Value stream IDs** follow the format `value-stream-[slug]`, e.g.:
- `value-stream-customer-onboarding`
- `value-stream-product-delivery`
- `value-stream-support-resolution`

**Capability IDs** follow `capability-[slug]`, e.g.:
- `capability-customer-management` (L1)
- `capability-digital-acquisition` (L2, parent: customer-management)
- `capability-data-analytics` (L1)
- `capability-reporting` (L2, parent: data-analytics)
- `capability-risk-management` (L1)

Each `Detail` component must define a `DEFAULT_*` object with all fields populated, and a `get*(node)` merge function identical in pattern to `getTeam()` / `getPerson()` / `getRole()`.

---

## `main.jsx` changes

### New state
```js
const [openValueStream, setOpenValueStream] = useState(null)
const [openCapability,  setOpenCapability]  = useState(null)
```

### `openNode` expression
```js
const openNode = openTeam ?? openPerson ?? openRole ?? openValueStream ?? openCapability
```

### `navigateTo` — clear new states
```js
const navigateTo = (id) => {
  setActive(id)
  setOpenTeam(null)
  setOpenPerson(null)
  setOpenRole(null)
  setOpenValueStream(null)
  setOpenCapability(null)
  setTitleVisible(true)
}
```

### `closeNode` — clear new states
```js
const closeNode = useCallback(() => {
  setOpenTeam(null)
  setOpenPerson(null)
  setOpenRole(null)
  setOpenValueStream(null)
  setOpenCapability(null)
  setTitleVisible(true)
}, [])
```

### Routing blocks (add after Roles block)
```jsx
{/* Value Streams */}
{active === 'value-streams' && !openValueStream && (
  <ValueStreamScreen onOpenValueStream={setOpenValueStream} />
)}
{active === 'value-streams' && openValueStream && (
  <ValueStreamDetail valueStream={openValueStream} onTitleVisibilityChange={setTitleVisible} />
)}

{/* Capabilities */}
{active === 'capabilities' && !openCapability && (
  <CapabilityScreen onOpenCapability={setOpenCapability} />
)}
{active === 'capabilities' && openCapability && (
  <CapabilityDetail capability={openCapability} onTitleVisibilityChange={setTitleVisible} />
)}
```

### `EmptyPanel` guard — extend exclusion list
```js
{!['teams', 'people', 'roles', 'value-streams', 'capabilities'].includes(active) && !openNode && (
  <EmptyPanel label={active} />
)}
```

### Breadcrumb fix — introduce `TOP_SECTION_IDS`

Value Streams and Capabilities are **top-level nav items**, not under Records. Replace the `buildBreadcrumbs` function with:

```js
const RECORD_IDS      = new Set(['people', 'roles', 'teams', 'services', 'processes', 'governance-bodies'])
const TOP_SECTION_IDS = new Set(['value-streams', 'capabilities'])

function buildBreadcrumbs(active, openNode, closeNode) {
  const label = active.charAt(0).toUpperCase() + active.slice(1).replace(/-/g, ' ')
  const nodeName = openNode?.name ?? openNode?.roleName

  if (openNode && RECORD_IDS.has(active)) return [
    { label: 'Records', onClick: null      },
    { label: label,     onClick: closeNode },
    { label: nodeName,  onClick: null      },
  ]
  if (openNode) return [
    { label: label,    onClick: closeNode },
    { label: nodeName, onClick: null      },
  ]
  if (RECORD_IDS.has(active)) return [
    { label: 'Records', onClick: null },
    { label: label,     onClick: null },
  ]
  if (TOP_SECTION_IDS.has(active)) return [
    { label: label, onClick: null },
  ]
  return []
}
```

### New imports (add to top of main.jsx)
```js
import { ValueStreamDetail } from './nodes/value-stream/ValueStreamDetail'
import { ValueStreamScreen }  from './nodes/value-stream/ValueStreamScreen'
import { CapabilityDetail }   from './nodes/capability/CapabilityDetail'
import { CapabilityScreen }   from './nodes/capability/CapabilityScreen'
```

---

## Component patterns (must match existing nodes exactly)

- **Screen** renders a list/table, receives `onOpen{Type}` prop, calls it on row click.
- **Detail** receives `{type}` prop (object with at least `id`), calls `get{Type}(node)` to merge with defaults, wraps in `NodeDetailShell`.
- **Tabs** each receive a `detail` prop (the merged object) and render their content.
- `NodeDetailShell` props: `nodeType`, `name`, `status`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `tabs`, `onTitleVisibilityChange`.
- Status values: **`active`** or **`archived`** only (graph.go `NodeStatus`).
- Icons: `layers` for value-stream nodes, `grid-3x3` for capability nodes (both registered in `Components.jsx`).

---

## Out of scope

- Backend / API integration (all data is mock).
- New icon registrations (both icons already registered).
- Any changes to Teams, People, or Roles behaviour.
- Services, Processes, Governance Bodies screens (remain as `EmptyPanel`).
