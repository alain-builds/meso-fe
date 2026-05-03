# AboutTab.jsx — Team Node — Task List

> Plan: `tasks/plan.md`

---

## Phase 1: Foundation

- [x] **T1** — Add soft-variant color tokens
  - `tokens/colors.ts`: add `blueSoft`, `indigoSoft`, `amberSoft` to `colors` (raw) and `colorVars` (CSS var refs)
  - `colors_and_type.css`: add `--blue-soft`, `--indigo-soft`, `--amber-soft` to `:root` and both dark blocks
  - Verify: `colorVars.blueSoft === 'var(--blue-soft)'`

- [x] **T2** — Update DEFAULTS mock data in `TeamDetail.jsx`
  - Replace `decisionAuthorities` with `{authorityType, description, domainId}` shape (4 entries: decides, approves, advises, ratifies)
  - Add `domains: []` (3 entries)
  - Add `ownedCapabilities: []` (4 entries — 2 roots, 2 children; 1 with co-owner)
  - Update `valueStreams` to `businessOutcomes[]` shape (remove singular `businessOutcome`)
  - Verify: all 5 existing tabs render without errors after change

  **CP2:** All 5 tabs clean. ✓

---

## Phase 2: Component blocks (all in AboutTab.jsx)

- [x] **T3** — Foundation + Decision Authorities block
  - Add `colorVars` to import; remove `Icon` import
  - Fix `SectionHeading` to `typeScale.labelA` (10px, 600, 0.10em, uppercase)
  - Fix `SectionCard` to use `colorVars.white`
  - Add `AUTHORITY_ORDER` and `CHIP_VARIANTS` constants
  - Add `AuthorityChip` file-local sub-component (fixed 80px width, `colorVars.*` bg + text)
  - Remove MetricsBar, WorkspaceLinks, Channels sections
  - Implement Decision Authorities block: sort → chip | description | domain pill, row separator
  - Verify: 4 rows in correct order; correct chip colours; domain pills resolve

  **CP3:** Decision Authorities renders correctly. ✓

- [x] **T4** — Capabilities Owned block
  - Add tree-construction logic (`ownedIds`, `capRoots`, `childrenOf`) inside `AboutTab`
  - Add `CapabilityRow` sub-component (defined inside `AboutTab`; closes over `childrenOf`)
  - Implement Capabilities Owned `SectionCard` with tree rendering and empty state
  - Verify: 2 root nodes, 2 children; Observability shows co-owner annotation; CI/CD Pipeline shows no annotation

  **CP4:** Capabilities tree renders with correct indentation. ✓

- [x] **T5** — Value Streams block
  - Implement Value Stream Contribution `SectionCard` (stone-background inset rows, not nested cards)
  - `businessOutcomes.slice(0,2).join(' · ')` with 2-line clamp
  - Empty state for empty array
  - Verify: 2 rows visible; outcomes text clamps to 2 lines on overflow

  **CP5:** Value stream rows render; outcomes clamped. ✓
