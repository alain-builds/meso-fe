# Team Detail Five-Tab Redesign — Task List

> Spec: `SPEC.md` · Plan: `tasks/plan.md`

## Phase 1: Data Foundation

- [ ] **Task 1** — Expand DEFAULTS mock data in `TeamDetail.jsx`
  - Add `servicesProvided[]` (3 entries, mixed slaStatus)
  - Add `servicesConsumed[]` (2 entries)
  - Add `serviceDependencies` (inbound + outbound arrays)
  - Add `valueStreams[]` (2 entries with contribution type + businessOutcome)
  - Add `processes[]` (3 entries)
  - Add `okrs[]` (2 objectives with nested keyResults[])
  - Add `kpis[]` (3 entries with contributionType + direction)
  - Add `costCenters[]` (1 entry)
  - Verify: no console errors, existing About + People tabs unaffected

  **CP1:** Existing tabs still render. ✓

## Phase 2: Tab Components

- [ ] **Task 2** — `tabs/PeopleTab.jsx` (replaces MembersTab)
  - MetricsBar: 4 chips (total members, vacancies, internal, external)
  - Team leads card (PersonCard list — same as current)
  - Members & roles card (MemberTable — same as current)
  - Internal/external split summary card
  - Delete `MembersTab.jsx`; update import in `TeamDetail.jsx`
  - Verify in browser: 4 sections visible; counts match mock data

- [ ] **Task 3** — `tabs/ServicesTab.jsx` (new)
  - MetricsBar: 3 chips (provided count, consumed count, SLA health)
  - Provided services card (name, type pill, SLA string, status dot)
  - Consumed services card (name, provider team, status dot)
  - Dependency chain card (EdgeListDrawer)
  - Verify in browser: 4 sections; dots coloured green/amber correctly

- [ ] **Task 4** — `tabs/DeliveryTab.jsx` (new)
  - Value streams card (name, contribution pill, business outcome)
  - Processes card (name, type, status pill)
  - Verify in browser: both sections render

- [ ] **Task 5** — `tabs/PerformanceTab.jsx` (new)
  - MetricsBar: 3 chips (OKR health %, KPI count, cost center count)
  - OKRs card (objectives with nested key results, status pills, confidence score)
  - KPIs card (name, category pill, contribution type pill, direction)
  - Cost centers card (name, code mono, type pill, allocation %)
  - Verify in browser: all sections render; status pills correctly coloured

  **CP3:** Tasks 3–5 each fully render before wiring. ✓

## Phase 3: Integration

- [ ] **Task 6** — Wire `TeamDetail.jsx`
  - Remove imports: `MembersTab`, `TabStub`
  - Add imports: `PeopleTab`, `ServicesTab`, `DeliveryTab`, `PerformanceTab`
  - Replace 10-tab array with 5-tab array per SPEC.md
  - Verify in browser:
    - [ ] Exactly 5 tabs visible (About, People & roles, Services, Delivery, Performance)
    - [ ] All 3 mock teams (default, t2, t3) load without errors
    - [ ] Vacancy badge correct on People & roles tab
    - [ ] No console errors or React key warnings
    - [ ] No `TabStub` or `MembersTab` references remain in codebase

  **CP4:** All acceptance criteria from SPEC.md met. ✓
