# Node Detail — Task List

## Phase 1: Shell & Building Blocks

- [ ] **Task 1** — Build `NodeDetailShell.jsx`, `StatStrip.jsx`, `RelationshipMapSlot.jsx`
  - Header: name, type badge, status chip, breadcrumb, back nav, action buttons (Edit, Share, Export)
  - StatStrip: renders tile array `{ id, label, value, sub? }`
  - Tab nav: active tab underlined in teal, switches content
  - RelationshipMapSlot: dark-card placeholder (same style as old graph view card)
  - Activity log + audit panel as collapsed stubs
  - Verify: renders with hardcoded Team data in main.jsx

- [ ] **Task 2** — Build shared building blocks
  - `shared/PersonCard.jsx` — initials avatar + name + role label + team chip; vacant state
  - `shared/RoleCard.jsx` — role name + master role badge + filled-by or Vacant pill
  - `shared/MemberTable.jsx` — rows: avatar | name | role | status; React.memo on row; keyed by id
  - `shared/EdgeListDrawer.jsx` — inbound/outbound sections; edge type chip; empty state
  - Verify: each renders standalone with sample data

## Phase 2: Team Node

- [ ] **Task 3** — Team node: AboutTab + MembersTab
  - Create `nodes/team/TeamDetail.jsx` with NodeDetailShell + 6 stat tiles:
    1. Headcount (directMemberCount / totalMemberCount; sub: internal · external)
    2. Vacancy rate (unfilled roles %)
    3. Services (provided · consumed)
    4. OKR health (% on track)
    5. Annual cost (placeholder)
    6. Team type (stream_aligned etc.)
  - `nodes/team/tabs/AboutTab.jsx`: purpose, responsibilities, decision authorities table, workspace links, channels
  - `nodes/team/tabs/MembersTab.jsx`: leads row (PersonCards) + member table (MemberTable); vacancy count badge on tab label
  - Update root `TeamDetail.jsx` import or main.jsx import
  - Verify: `npm run dev` → Team → About and Members fully rendered

- [ ] **Task 4** — Team node: 8 remaining tab stubs
  - `ServicesTab.jsx`, `ValueStreamsTab.jsx`, `CapabilitiesTab.jsx`, `OKRsKPIsTab.jsx`,
    `GovernanceTab.jsx`, `RelationshipsTab.jsx`, `CostTab.jsx`, `ProcessesTab.jsx`
  - Each: section header + "Content coming soon · §3.3" placeholder
  - Verify: all 10 tabs navigable, no errors

### Checkpoint A — Team visual review (browser)
- [ ] Header matches spec §3.1
- [ ] Stat strip: 6 tiles with correct labels
- [ ] About and Members tabs match spec §3.3
- [ ] No token violations (no hardcoded hex, no raw px font sizes)

## Phase 3: Person Node

- [ ] **Task 5** — Person node: full vertical slice
  - `shared/ServiceCard.jsx` — name + type badge + status dot + owner chip
  - `nodes/person/PersonDetail.jsx` with NodeDetailShell + 6 stat tiles:
    1. Roles filled (count)
    2. Teams (led · member)
    3. Direct reports (span of control)
    4. Supervisor (name chip)
    5. Governance seats (count)
    6. Communities (led · member)
  - Fully built tabs: `AboutTab.jsx` (aboutMe, pronouns, profiles, social links, channels), `PositionsTab.jsx` (RoleCard + team per position), `TeamsCommunitiesTab.jsx`
  - Stub tabs: `OrgViewTab.jsx`, `GovernanceTab.jsx`, `OKRsKPIsTab.jsx`, `LegalEntityTab.jsx`
  - Wire into main.jsx People nav
  - Verify: People nav → click person → all 7 tabs visible

### Checkpoint B — Person smoke test (browser)
- [ ] PersonDetail renders without layout breaks
- [ ] About and Positions tabs fully rendered
- [ ] No shared component imported from team/ folder

## Phase 4: Role Node

- [ ] **Task 6** — Role node: full vertical slice
  - `nodes/role/RoleDetail.jsx` with NodeDetailShell + 6 stat tiles:
    1. Status (Filled / Vacant / Interim chip)
    2. Services owned (count)
    3. Processes (owned · executed)
    4. Cost centres owned (count)
    5. OKRs (owned · on-track %)
    6. Governance seats (count + chair/standing breakdown)
  - Fully built tabs: `AboutTab.jsx`, `PersonTab.jsx` (PersonCard + vacancy date + prior holders timeline)
  - Stub tabs: `TeamContextTab.jsx`, `OwnershipTab.jsx`, `GovernanceTab.jsx`, `SponsorshipsTab.jsx`, `DelegationsTab.jsx`
  - Wire into main.jsx Roles nav
  - Verify: Roles nav → click role → all 7 tabs visible

### Checkpoint C — Three-node regression (browser)
- [ ] Team → Person → Role navigation without layout breaks
- [ ] Back navigation works from all three detail pages
- [ ] No shared component imported from another node's folder
- [ ] No list-index keys, no hardcoded hex values
- [ ] No console errors or React key warnings
