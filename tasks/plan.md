# Team Detail — Five-Tab Redesign: Implementation Plan

**Spec:** `SPEC.md`  
**Scope:** Replace the 10-tab stub layout with 5 purposeful, content-rich tabs on the Team detail page.  
**Files touched:** `TeamDetail.jsx` (data + wiring), `tabs/PeopleTab.jsx` (replaces MembersTab), `tabs/ServicesTab.jsx` (new), `tabs/DeliveryTab.jsx` (new), `tabs/PerformanceTab.jsx` (new).

---

## Dependency Graph

```
Layer 0 — Existing building blocks (no changes needed)
  shared/MetricsBar.jsx
  shared/PersonCard.jsx
  shared/MemberTable.jsx
  shared/EdgeListDrawer.jsx
  Components (Pill, Icon)
  @/tokens

Layer 1 — Mock data expansion
  TeamDetail.jsx (DEFAULTS object)
  ↳ All tab components depend on the data fields defined here

Layer 2 — Tab components (each depends on Layer 0 + 1)
  tabs/PeopleTab.jsx       ← replaces MembersTab.jsx
  tabs/ServicesTab.jsx     ← new
  tabs/DeliveryTab.jsx     ← new
  tabs/PerformanceTab.jsx  ← new

Layer 3 — Integration
  TeamDetail.jsx (tabs array + imports)
  ↳ Depends on all Layer 2 components existing
```

---

## Vertical Slices

Each task is a complete vertical slice — data shape → component → wired in. No horizontal layers.

### Task 1 — Expand mock data in TeamDetail.jsx

**What:** Add all new data fields to the DEFAULTS object so tab components have something to render from the start.

**Fields to add:**
```js
// Services tab
servicesProvided: [
  { id: 's1', name: 'CI/CD Platform',      type: 'technical', sla: '99.5% uptime', slaStatus: 'green'  },
  { id: 's2', name: 'Observability Stack', type: 'technical', sla: '99% uptime',   slaStatus: 'green'  },
  { id: 's3', name: 'Dev Portal',          type: 'business',  sla: null,           slaStatus: 'amber'  },
],
servicesConsumed: [
  { id: 'sc1', name: 'Identity & Access', providerTeam: 'Security',  slaStatus: 'green' },
  { id: 'sc2', name: 'HR Data Feed',      providerTeam: 'People Ops', slaStatus: 'amber' },
],
serviceDependencies: {
  inbound:  [ { id: 'd1', name: 'Feature Teams',       meta: 'depends on CI/CD Platform'          } ],
  outbound: [ { id: 'd2', name: 'Cloud Infrastructure', meta: 'CI/CD Platform depends on this'    } ],
},

// Delivery tab
valueStreams: [
  { id: 'vs1', name: 'Developer Experience', contribution: 'contributes', businessOutcome: 'Reduce time-to-deploy across all product teams' },
  { id: 'vs2', name: 'Platform Reliability', contribution: 'owns',        businessOutcome: 'Maintain 99.9% platform SLA' },
],
processes: [
  { id: 'p1', name: 'Incident Response',  type: 'operational', status: 'active' },
  { id: 'p2', name: 'Deployment Pipeline', type: 'technical',  status: 'active' },
  { id: 'p3', name: 'Capacity Planning',  type: 'operational', status: 'active' },
],

// Performance tab
okrs: [
  {
    id: 'okr1', title: 'Achieve zero-downtime deployments', period: 'Q2-2025',
    progressStatus: 'on_track', confidenceScore: 80,
    keyResults: [
      { id: 'kr1', title: 'Reduce failed deploys to < 0.5%',        progressStatus: 'on_track',  currentValue: 0.8,  targetValue: 0.5,  unit: '%'          },
      { id: 'kr2', title: 'Deploy frequency ≥ 10 deploys/week',     progressStatus: 'on_track',  currentValue: 8,    targetValue: 10,   unit: 'deploys/wk' },
    ],
  },
  {
    id: 'okr2', title: 'Reduce platform operational toil by 40%', period: 'Q2-2025',
    progressStatus: 'at_risk', confidenceScore: 55,
    keyResults: [
      { id: 'kr3', title: 'Automated toil < 20% of engineering time', progressStatus: 'at_risk', currentValue: 32, targetValue: 20, unit: '%' },
    ],
  },
],
kpis: [
  { id: 'kpi1', name: 'MTTR',             category: 'operational', contributionType: 'owns',        direction: 'lower_is_better',  unit: 'hours'        },
  { id: 'kpi2', name: 'Deploy frequency', category: 'operational', contributionType: 'contributes', direction: 'higher_is_better', unit: 'deploys/week' },
  { id: 'kpi3', name: 'Infra cost / head', category: 'financial', contributionType: 'influences',  direction: 'lower_is_better',  unit: 'EUR'          },
],
costCenters: [
  { id: 'cc1', name: 'Platform Engineering', code: 'CC-4720', type: 'operational', allocationPercent: 100 },
],
```

**Acceptance criteria:**
- All fields present on DEFAULTS at runtime; no undefined errors when accessed in tab components
- TEAM_DETAILS overrides for t2/t3 still work (they spread DEFAULTS, so new fields are inherited)

**Verification:** Open browser → Team detail → no console errors. Tab components will still show stubs until Task 2+.

---

### Task 2 — PeopleTab.jsx (rename and expand MembersTab)

**What:** Replace `MembersTab.jsx` with `PeopleTab.jsx`. Add a MetricsBar at the top and an internal/external split summary row below the member table.

**Sections (top to bottom):**
1. `MetricsBar` — 4 chips: total members, vacancies, internal count, external count
2. Team leads card (existing PersonCard list — unchanged)
3. Members & roles card (existing MemberTable — unchanged)
4. Internal/external split summary row — a single card with two stats: "N internal · N external"

**Key implementation notes:**
- MetricsBar chips: `{ id: 'total', value: directMemberCount, label: 'members' }`, `{ id: 'vacancies', value: vacancyCount || 'None', label: 'vacancies' }`, `{ id: 'internal', value: directInternalMemberCount, label: 'internal' }`, `{ id: 'external', value: directExternalMemberCount, label: 'external' }`
- Delete `MembersTab.jsx` after `PeopleTab.jsx` is verified
- Update import in `TeamDetail.jsx` at the same time (do not leave a broken import)

**Acceptance criteria:**
- MetricsBar shows correct counts for each mock team (t1, t2, t3)
- Leads and member table render identically to the old MembersTab
- Internal/external split summary displays correctly
- No `MembersTab` import remains anywhere in the codebase

**Verification:** Browser → Team detail → People & roles tab → all 4 sections visible.

---

### Task 3 — ServicesTab.jsx

**What:** New tab component for the Services tab.

**Sections (top to bottom):**
1. `MetricsBar` — 3 chips: services provided count, services consumed count, SLA health ("N/N green")
2. **Provided services** card — rows: service name (medium weight), type pill (technical / business / customer_facing), SLA string, SLA status dot (green/amber/red)
3. **Consumed services** card — rows: service name, provider team label, SLA status dot
4. **Dependency chain** card — reuse `EdgeListDrawer` component with `inbound` and `outbound` arrays from `detail.serviceDependencies`

**SLA status dot:** small coloured circle (8px, border-radius 50%) — green = `colors.teal`, amber = `colors.amber` (or fallback `#F59E0B`), red = `colors.danger` (or fallback `#EF4444`).

**Acceptance criteria:**
- Three sections render with correct mock data
- Dependency chain correctly passes inbound/outbound to EdgeListDrawer
- SLA status dots show correct colour per `slaStatus` value
- Empty state ("No services.") shown when array is empty

**Verification:** Browser → Team detail → Services tab → 4 sections visible.

---

### Task 4 — DeliveryTab.jsx

**What:** New tab component for the Delivery tab.

**Sections (top to bottom):**
1. **Value streams** card — for each value stream: name (medium weight), contribution type pill (`owns` in teal, `contributes` in neutral), business outcome in secondary text below
2. **Processes** card — for each process: name, type in secondary text, status pill (`active` / `pipeline` / `archived`)

**Acceptance criteria:**
- Value streams section renders with contribution pill coloured by type (`owns` → teal, `contributes` → neutral)
- Business outcome renders as secondary text below the name
- Processes render with status pill
- Empty states shown for both sections when arrays are empty

**Verification:** Browser → Team detail → Delivery tab → both sections visible.

---

### Task 5 — PerformanceTab.jsx

**What:** New tab component for the Performance tab. Most complex — OKRs have nested key results.

**Sections (top to bottom):**
1. `MetricsBar` — 3 chips: OKR health ("N%"), KPI count, cost center count
2. **OKRs owned** card — for each objective:
   - Header row: title (medium weight), period badge (mono), progress status pill, confidence score (e.g. "80% confidence" in tertiary text)
   - Nested key results list: title, progress status pill, progress value display ("0.8 / 0.5 %")
   - Separator between objectives
3. **KPIs** card — for each KPI: name, category pill, contribution type pill (`owns` teal, `contributes` neutral, `influences` neutral), direction indicator (arrow icon or label)
4. **Cost centers** card — for each cost center: name + code in mono, type pill, allocation % right-aligned

**Progress status pill colours:**
- `on_track` → teal/green
- `at_risk` → amber/warn
- `off_track` → red/danger
- `achieved` → teal
- `not_started` / `missed` → neutral/grey

**OKR health chip calculation:** percentage of OKRs (objectives) with `on_track` or `achieved` status.

**Acceptance criteria:**
- MetricsBar calculates OKR health dynamically from the `okrs` array
- Each objective renders with at least one nested key result
- Progress status pills use correct colour per status value
- KPIs show all three metadata pills
- Cost centers show code in mono font

**Verification:** Browser → Team detail → Performance tab → all 4 sections visible.

---

### Task 6 — Wire TeamDetail.jsx

**What:** Update imports and tabs array. This is the integration step — do it last.

**Changes:**
1. Remove imports: `MembersTab`, `TabStub`
2. Add imports: `PeopleTab`, `ServicesTab`, `DeliveryTab`, `PerformanceTab`
3. Replace 10-tab array with 5-tab array (see SPEC.md Tab Array section)
4. `vacancyCount` calculation remains the same — still used for the badge on People & roles tab

**Acceptance criteria:**
- TeamDetail renders exactly 5 tabs
- No `TabStub` or `MembersTab` import remains
- All 3 mock team variants (default, t2, t3) load without errors
- Vacancy badge still shows correct count on People & roles tab

**Verification:** Browser → cycle through all 3 mock teams → all 5 tabs navigable, no console errors.

---

## Checkpoints

| # | After task | What to verify |
|---|---|---|
| CP1 | Task 1 | Open any team → no JS errors, old tabs still work |
| CP2 | Task 2 | People & roles tab: metrics bar, leads, table, split row all visible |
| CP3 | Task 5 | Tasks 3–5 tabs each render fully before wiring |
| CP4 | Task 6 | Exactly 5 tabs; all 3 mock teams load cleanly; no stale imports |

---

## Build Order

```
Task 1 (data)  →  Task 2 (PeopleTab)  →  Task 3 (ServicesTab)
                                      →  Task 4 (DeliveryTab)
                                      →  Task 5 (PerformanceTab)
                                      →  Task 6 (wire TeamDetail)
```

Tasks 3, 4, and 5 are independent of each other — each depends only on Task 1 data being in place. Task 6 depends on all of them.

---

## Conventions (enforced)

- Inline styles only — `@/tokens` imports, no CSS files
- `SectionHeading` and `SectionCard` defined locally in each tab file (same pattern as `AboutTab.jsx`)
- `colors.*` for all color references (project uses `colors.*` not `colorVars.*`)
- `React.memo` on any list-row sub-component
- Keys from stable `id` fields — never array index
- No hardcoded hex values
