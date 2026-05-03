/**
 * Derives the L1/L2/L3 hierarchy level of a capability from its parentCapabilityId depth.
 * - null parentCapabilityId → l1
 * - parent has null parentCapabilityId → l2
 * - parent has a parentCapabilityId → l3
 * Max depth per graph.go is L3.
 */
function deriveLevel(cap, all) {
  if (!cap.parentCapabilityId) return 'l1'
  const parent = all.find(c => c.id === cap.parentCapabilityId)
  if (!parent?.parentCapabilityId) return 'l2'
  return 'l3'
}

export { deriveLevel }
