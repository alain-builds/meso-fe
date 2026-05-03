# Todo — Value Stream and Capability nodes

- [ ] **Task 1** — main.jsx plumbing  
  Add `openValueStream` + `openCapability` state, extend `openNode` / `navigateTo` / `closeNode`, replace `buildBreadcrumbs` with `TOP_SECTION_IDS` version, extend `EmptyPanel` guard.  
  ✓ Gate: app loads, existing sections unaffected, VS/Cap show EmptyPanel.

- [ ] **Task 2** — Value Stream node (complete)  
  Create `nodes/value-stream/` with `ValueStreamDetail.jsx`, `ValueStreamScreen.jsx`, and 5 tabs (`AboutTab`, `ContributorsTab`, `ProcessesTab`, `CapabilitiesTab`, `KPIsTab`). Add imports + routing to `main.jsx`.  
  ✓ Gate: list renders 3 rows; all 5 tabs show mock data; breadcrumbs + back button work.

- [ ] **Task 3** — Capability node (complete)  
  Create `nodes/capability/` with `CapabilityDetail.jsx`, `CapabilityScreen.jsx`, and 5 tabs (`AboutTab`, `SubCapabilitiesTab`, `OwnersTab`, `ProcessesTab`, `ValueStreamsTab`). Add imports + routing to `main.jsx`.  
  ✓ Gate: list renders 5 rows with level; all 5 tabs show mock data; breadcrumbs + back button work; no regressions.
