# Todo — Business Capability Map (Visual Column Layout)

- [ ] **Task 1** — Replace capability data with full SaaS model  
  Rewrite `capabilityData.js`: 8 L1 + ~56 L2 + ~130 L3. Same record shape. DEFAULT_CAPABILITY unchanged.  
  ✓ Gate: 8 L1s, 50+ L2s, 100+ L3s in array; `deriveLevel` returns correct level for spot-checked records.

- [ ] **Task 2** — Build CapabilityMap component (L1 + L2)  
  Create `CapabilityMap.jsx`: horizontal scroll row, one 220px column per L1, teal L1 header, white L2 cards with hover shadow. All items clickable → `onOpenCapability`.  
  ✓ Gate: 8 teal headers visible; L2 cards below each; clicking L1 and L2 opens CapabilityDetail.

- [ ] **Task 3** — Add L3 nested items inside L2 cards  
  Extend `CapabilityMap.jsx`: L3 items listed inside L2 cards with `colorVars.stone` hover. Each item individually clickable.  
  ✓ Gate: L3 items visible; clicking opens CapabilityDetail showing "L3" level badge.

- [ ] **Task 4** — Wire CapabilityMap into CapabilityScreen + verify  
  Replace `<table>` with `<CapabilityMap>` in `CapabilityScreen.jsx`. Remove unused imports. Run tests.  
  ✓ Gate: map renders (no table); `npm run test` green; click L1/L2/L3 → correct detail; back works; no regressions.
