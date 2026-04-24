# Node Detail Architecture

## Problem Statement

How might we build a shared, maintainable architecture for 16 node detail pages — starting with Team, Person, and Role — that matches the spec's tab model, without 16 separate one-off implementations?

## Recommended Direction

**Shell + per-node tabs + shared building blocks** — three clear layers, each with a single job.

The shell owns the invariant frame (header, stat strip, description, relationship map slot, tab nav, activity log, audit panel). Per-node tab files own the specifics for each node type. A shared building-block library owns the components that genuinely appear across multiple nodes.

### Folder structure

```
src/
  components/
    node-detail/
      NodeDetailShell.jsx       ← header, stat strip, tabs nav, activity, audit
      StatStrip.jsx             ← 4–6 hero tile strip, accepts a config array
      RelationshipMapSlot.jsx   ← placeholder until graph canvas is built
    shared/
      EdgeListDrawer.jsx        ← reused in almost every tab
      MemberTable.jsx           ← Team members, Person positions
      PersonCard.jsx
      RoleCard.jsx
      ServiceCard.jsx
      CostPill.jsx
      StatusChip.jsx
      OKRProgressBlock.jsx
  pages/
    nodes/
      team/
        TeamDetail.jsx
        tabs/
          AboutTab.jsx
          MembersTab.jsx
          ServicesTab.jsx
          ValueStreamsTab.jsx
          CapabilitiesTab.jsx
          OKRsKPIsTab.jsx
          GovernanceTab.jsx
          RelationshipsTab.jsx
          CostTab.jsx
          ProcessesTab.jsx
      person/
        PersonDetail.jsx
        tabs/
          AboutTab.jsx
          PositionsTab.jsx
          OrgViewTab.jsx
          TeamsCommunitiesTab.jsx
          GovernanceTab.jsx
          OKRsKPIsTab.jsx
          LegalEntityTab.jsx
      role/
        RoleDetail.jsx
        tabs/
          AboutTab.jsx
          PersonTab.jsx
          TeamContextTab.jsx
          OwnershipTab.jsx
          GovernanceTab.jsx
          SponsorshipsTab.jsx
          DelegationsTab.jsx
```

## Build Order

**Team → Person → Role.** Team is the most complex (9 tabs, most edge types) and proves the pattern. Person reuses several tab building blocks from Team. Role is the simplest and snaps together quickly once the other two are in place.

## MVP Scope (Team node first)

- `NodeDetailShell` with Team's header and stat strip (6 hero tiles)
- All 9 tab stubs — placeholder content is fine for tabs 4–9 initially
- `AboutTab` and `MembersTab` fully built out — highest-value sections
- `PersonCard` and `RoleCard` building blocks
- `EdgeListDrawer` — reused across almost every subsequent tab

## Key Assumptions to Validate

- [ ] The shell is stable across all 16 nodes — the stat strip varies significantly per node (4–6 tiles, different data), so the shell must accept a stat strip config array rather than hardcode tiles
- [ ] The relationship map ships as a slot — treat it as a placeholder from day one; it's a separate design workstream
- [ ] Runtime metrics (KPI values, SLA attainment, cycle time) are out of scope until a backend data source is available (§17 gap in spec)

## Not Doing (and Why)

- **Config-driven renderer** — configs break on complex tabs (org tree, cost allocation chart, capability map); the abstraction fights you on every edge case
- **Relationship map** — separate design workstream; ships as a named slot
- **All 16 nodes in parallel** — prove the pattern on 3, then expand
- **Runtime metrics** — needs backend work (§17 gap); static/structural data only for now

## Shared Building Blocks (§18 from spec)

Components that ship once and are composed into every node:

| Component | Used by |
|---|---|
| `EdgeListDrawer` | Every node's relationship tabs |
| `PersonCard` | Team members, Role filled-by, Governance members |
| `RoleCard` | Team roles, Governance seats |
| `ServiceCard` | Team services, Value stream contributors |
| `CostPill` | Cost centre bookings, budget tiles |
| `StatusChip` | All node headers (active / archived / draft / pipeline) |
| `OKRProgressBlock` | Team, Person, Role, OKR nodes |
| `StatStrip` | Every node's at-a-glance section |

## Open Questions

- Does `StatStrip` accept a static config array, or does it need to support async tile data (e.g. live headcount from a query)?
- Should `GovernanceTab` be a shared tab component (Team, Person, and Role all have one with similar structure), or is the content different enough to keep them separate?
- What's the source for activity/history data in `NodeDetailShell` — the node's `history` field, or a separate audit API?
