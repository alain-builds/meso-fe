# Spec: Team Detail Page — Five-Tab Redesign

## Objective

Replace the current 10-tab stub layout on the Team detail page with five purposeful, content-rich tabs that answer a clear question each. The result should feel like a coherent operating-model record, not a list of disconnected data panels.

**Target users:** Org designers, team leads, and leadership using the Meso app to understand how a team fits into the operating model.

---

## Scope

### In scope
- Restructure `TeamDetail.jsx` tabs array from 10 tabs → 5 tabs
- Rename `MembersTab` → `PeopleTab` and expand content
- Implement three new tab components: `ServicesTab`, `DeliveryTab`, `PerformanceTab`
- Expand mock data in `TeamDetail.jsx` to support all new fields
- `AboutTab.jsx` is **unchanged**

### Out of scope
- Real API/graph data wiring (all data stays as mock)
- Editing or inline update interactions
- The Governance and Relationships tabs are **removed** from the team detail tab bar (they were stubs; no content is lost)

---

## Five Tabs

### Tab 1 — About
**Question answered:** What is this team for?

**Status:** Existing `AboutTab.jsx` — no changes needed.

**Content already implemented:**
- Purpose
- Responsibilities
- Decision authorities
- Workspace links
- Communication channels

---

### Tab 2 — People & roles
**Question answered:** Who works here, and how?

**File:** `tabs/PeopleTab.jsx` (rename/replace of `MembersTab.jsx`)

**Sections:**
1. **Metrics bar** — headcount, vacancy count, internal count, external count
2. **Team leads** — `PersonCard` list, same as current
3. **Members & roles** — `MemberTable` with vacancy + external status, same as current
4. **Internal / external split** — simple two-stat summary row (e.g. "9 internal · 3 external")

**Mock data fields needed** (already exist in DEFAULTS):
- `leads[]`, `members[]` (with `isVacant`, `isExternal`)
- `directMemberCount`, `directInternalMemberCount`, `directExternalMemberCount`

---

### Tab 3 — Services
**Question answered:** What does this team provide and depend on?

**File:** `tabs/ServicesTab.jsx` (new)

**Sections:**
1. **Metrics bar** — services provided count, services consumed count, SLA health (% green)
2. **Provided services** — list of service objects: name, type pill, SLA status indicator
3. **Consumed services** — list: name, provider team, SLA status
4. **Dependency chain** — uses `EdgeListDrawer` pattern: inbound dependencies (services this team's services depend on) and outbound (services that depend on this team's services)

**Mock data fields to add to DEFAULTS:**
```js
servicesProvided: [
  { id: 's1', name: 'CI/CD Platform', type: 'technical', sla: '99.5% uptime', slaStatus: 'green' },
  { id: 's2', name: 'Observability Stack', type: 'technical', sla: '99% uptime', slaStatus: 'green' },
  // ...
],
servicesConsumed: [
  { id: 'sc1', name: 'Identity & Access', providerTeam: 'Security', slaStatus: 'green' },
  { id: 'sc2', name: 'HR Data Feed', providerTeam: 'People Ops', slaStatus: 'amber' },
],
serviceDependencies: {
  inbound:  [ { id: 'd1', name: 'Feature Teams', meta: 'depends on CI/CD Platform' } ],
  outbound: [ { id: 'd2', name: 'Cloud Infra', meta: 'CI/CD Platform depends on this' } ],
},
```

---

### Tab 4 — Delivery
**Question answered:** What does this team deliver and enable?

**File:** `tabs/DeliveryTab.jsx` (new)

**Sections:**
1. **Value streams** — list of value streams this team contributes to (name, contribution type, business outcome)
2. **Processes** — list of processes this team executes (name, type, status pill)

**Mock data fields to add:**
```js
valueStreams: [
  { id: 'vs1', name: 'Developer Experience', contribution: 'contributes', businessOutcome: 'Reduce time-to-deploy' },
  { id: 'vs2', name: 'Platform Reliability', contribution: 'owns', businessOutcome: 'Maintain 99.9% platform SLA' },
],
processes: [
  { id: 'p1', name: 'Incident Response', type: 'operational', status: 'active' },
  { id: 'p2', name: 'Deployment Pipeline', type: 'technical', status: 'active' },
],
```

> Business capabilities are deferred to a later pass pending `graph.ts` data model additions.

---

### Tab 5 — Performance
**Question answered:** How well is this team doing?

**File:** `tabs/PerformanceTab.jsx` (new)

**Sections:**
1. **Metrics bar** — OKR health %, KPI count, cost center count
2. **OKRs owned** — list of objectives with status pill (`on_track`, `at_risk`, `off_track`, `achieved`), period badge, confidence score bar; key results nested under each objective
3. **KPIs contributed to** — list: name, category pill, contribution type (`owns` / `contributes` / `influences`), direction indicator
4. **Cost center bookings** — list: cost center name, code, type, allocation %

**Mock data fields to add:**
```js
okrs: [
  {
    id: 'okr1', nodeType: 'objective', title: 'Achieve zero-downtime deployments', period: 'Q2-2025',
    progressStatus: 'on_track', confidenceScore: 80,
    keyResults: [
      { id: 'kr1', title: 'Reduce failed deploys to < 0.5%', progressStatus: 'on_track', currentValue: 0.8, targetValue: 0.5, unit: '%' },
    ],
  },
],
kpis: [
  { id: 'kpi1', name: 'MTTR', category: 'operational', contributionType: 'owns', direction: 'lower_is_better', unit: 'hours' },
  { id: 'kpi2', name: 'Deploy frequency', category: 'operational', contributionType: 'contributes', direction: 'higher_is_better', unit: 'deploys/week' },
],
costCenters: [
  { id: 'cc1', name: 'Platform Engineering', code: 'CC-4720', type: 'operational', allocationPercent: 100 },
],
```

---

## Tab Array (TeamDetail.jsx)

Replace the current 10-tab array with:

```js
const tabs = [
  { id: 'about',       label: 'About',          content: <AboutTab    detail={detail} /> },
  { id: 'people',      label: 'People & roles',  badge: vacancyCount,  content: <PeopleTab       detail={detail} /> },
  { id: 'services',    label: 'Services',         content: <ServicesTab     detail={detail} /> },
  { id: 'delivery',    label: 'Delivery',         content: <DeliveryTab     detail={detail} /> },
  { id: 'performance', label: 'Performance',      content: <PerformanceTab  detail={detail} /> },
]
```

---

## Design Conventions (match existing code)

| Pattern | Where to use |
|---|---|
| `SectionHeading` local component | Every section title within a tab |
| `SectionCard` (white, radii.lg, shadows.sm, spacing.l) | Each logical section block |
| `MetricsBar` with chips | Top of tabs that have summary numbers |
| `Pill` | Status badges (SLA, OKR progress, service status, process status) |
| `EdgeListDrawer` | Dependency chain in ServicesTab |
| `RoleCard` | Role fill/vacancy display |
| Token-only inline styles | No Tailwind, no CSS modules — inline style objects with `@/tokens` imports |

---

## Acceptance Criteria

1. TeamDetail renders exactly 5 tabs; no stubs or placeholder tabs remain visible.
2. People & roles tab shows headcount metrics bar, leads, full member table with vacancy + external indicators, and internal/external split summary.
3. Services tab shows provided services list with SLA status, consumed services list, and dependency chain section.
4. Delivery tab shows value streams (with contribution type), processes list, and a capabilities section (even if mock-only).
5. Performance tab shows OKR list with nested key results, KPI list, and cost center bookings.
6. All components use inline styles with `@/tokens` only — no new CSS files.
7. All mock data lives in `TeamDetail.jsx` DEFAULTS/TEAM_DETAILS objects.
8. No TypeScript errors or console warnings.

---

## Decisions

| # | Decision |
|---|---|
| 1 | `AboutTab.jsx` is unchanged |
| 2 | `Governance` and `Relationships` tabs are **removed** from the team detail view |
| 3 | `MembersTab.jsx` is **renamed and replaced** by `PeopleTab.jsx` |
| 4 | Business capabilities section is **omitted** from DeliveryTab for now; revisited in a later pass |
| 5 | All data remains static mock — no real API calls |
