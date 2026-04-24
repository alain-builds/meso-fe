# Node Detail Architecture — Implementation Plan

**Scope:** Team, Person, and Role node detail pages  
**Architecture:** NodeDetailShell + per-node tab files + shared building-block components  
**Spec reference:** `meso-node-detail-specs.md` §3 (Team), §7 (Person), §6 (Role)

---

## File Structure

```
ui_kits/meso-app/
  NodeDetailShell.jsx         ← shared frame: header, stat strip, tab nav, activity stub, audit stub
  StatStrip.jsx               ← 4–6 hero tile strip (accepts config array)
  RelationshipMapSlot.jsx     ← dark-card placeholder (graph canvas deferred)
  shared/
    PersonCard.jsx            ← avatar initials + name + role + team chip
    RoleCard.jsx              ← role name + filled-by + master role badge
    ServiceCard.jsx           ← name + type + status dot + owner chip
    EdgeListDrawer.jsx        ← inbound/outbound edge table with filter
    MemberTable.jsx           ← people rows: avatar | name | role | status pill
  nodes/
    team/
      TeamDetail.jsx          ← replaces root TeamDetail.jsx
      tabs/
        AboutTab.jsx          ← fully built
        MembersTab.jsx        ← fully built
        ServicesTab.jsx       ← stub
        ValueStreamsTab.jsx   ← stub
        CapabilitiesTab.jsx   ← stub
        OKRsKPIsTab.jsx       ← stub
        GovernanceTab.jsx     ← stub
        RelationshipsTab.jsx  ← stub
        CostTab.jsx           ← stub
        ProcessesTab.jsx      ← stub
    person/
      PersonDetail.jsx
      tabs/
        AboutTab.jsx          ← fully built
        PositionsTab.jsx      ← fully built
        OrgViewTab.jsx        ← stub (org tree is separate workstream)
        TeamsCommunitiesTab.jsx ← built
        GovernanceTab.jsx     ← stub
        OKRsKPIsTab.jsx       ← stub
        LegalEntityTab.jsx    ← stub
    role/
      RoleDetail.jsx
      tabs/
        AboutTab.jsx          ← fully built
        PersonTab.jsx         ← fully built
        TeamContextTab.jsx    ← stub
        OwnershipTab.jsx      ← stub
        GovernanceTab.jsx     ← stub
        SponsorshipsTab.jsx   ← stub
        DelegationsTab.jsx    ← stub
  TeamDetail.jsx              ← update import to nodes/team/TeamDetail
  main.jsx                    ← wire PersonDetail + RoleDetail into People/Roles nav
```

---

## NodeDetailShell API

```jsx
<NodeDetailShell
  nodeType="Team"
  nodeSubtype="stream_aligned"    // optional
  name="Platform Engineering"
  status="active"                 // active | archived | draft | pipeline
  breadcrumb={['Engineering']}
  statTiles={[
    { id: 'headcount', label: 'Headcount', value: '12', sub: '9 internal · 3 external' },
    // ...
  ]}
  tabs={[
    { id: 'about', label: 'About', content: <AboutTab team={team} /> },
    // ...
  ]}
  onBack={() => {}}
/>
```

---

## Dependency Graph

```
Layer 1 — Building blocks (no cross-deps)
  PersonCard, RoleCard, ServiceCard, EdgeListDrawer, MemberTable

Layer 2 — Shell (depends on Layer 1 indirectly via consumer)
  StatStrip, RelationshipMapSlot, NodeDetailShell

Layer 3 — Tab components (depend on Layer 1 building blocks)
  team/tabs, person/tabs, role/tabs

Layer 4 — Node detail pages (depend on Layer 2 + 3)
  TeamDetail, PersonDetail, RoleDetail

Layer 5 — App integration
  main.jsx wires all three
```

---

## Conventions (from CLAUDE.md — must be followed)

- All inline styles — no CSS modules, no Tailwind
- Use `colorVars.*` (not `colors.*`) for dark-mode support in inline styles
- Use `spacing.*` tokens for all margins/padding
- Use `typeScale.*` for all font sizes (never hardcoded px)
- `fontFamilies.display` only at ≥ 18px
- Hover via `onMouseEnter / onMouseLeave`
- `React.memo` on list row components
- `<nav aria-label="…">` on all nav regions
- Keys from stable field (id, name) — never list index
- Generic placeholder data in defaults — never real names/emails

---

## Task Sequence

| # | Task | Key files | Status |
|---|------|-----------|--------|
| 1 | Shell foundation | `NodeDetailShell.jsx`, `StatStrip.jsx`, `RelationshipMapSlot.jsx` | pending |
| 1a | Checkpoint: shell renders | — | pending |
| 2 | Shared building blocks | `shared/PersonCard.jsx`, `RoleCard.jsx`, `EdgeListDrawer.jsx`, `MemberTable.jsx` | pending |
| 3 | Team node — About + Members tabs | `nodes/team/TeamDetail.jsx`, `AboutTab.jsx`, `MembersTab.jsx` | pending |
| 4 | Team node — 8 remaining tab stubs | `nodes/team/tabs/*.jsx` (8 files) | pending |
| **A** | **Checkpoint A — Team visual review** | browser test | pending |
| 5 | Person node — full vertical slice | `nodes/person/*` + `shared/ServiceCard.jsx` | pending |
| **B** | **Checkpoint B — Person smoke test** | browser test | pending |
| 6 | Role node — full vertical slice | `nodes/role/*` | pending |
| **C** | **Checkpoint C — Three-node regression** | browser test | pending |

---

## Verification

1. `npm run dev` from `ui_kits/meso-app`
2. Team → all 10 tabs visible; About and Members fully rendered
3. Person → all 7 tabs visible; About and Positions fully rendered
4. Role → all 7 tabs visible; About and Person fully rendered
5. Back navigation from all three detail views returns to list
6. No console errors, no React key warnings
7. Stat strip shows 6 tiles per node type with correct labels
