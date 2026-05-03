const RECORD_IDS      = new Set(['people', 'roles', 'teams', 'services', 'processes', 'governance-bodies'])
const TOP_SECTION_IDS = new Set(['value-streams', 'capabilities'])

function buildBreadcrumbs(active, openNode, closeNode) {
  const label    = active.charAt(0).toUpperCase() + active.slice(1).replace(/-/g, ' ')
  const nodeName = openNode?.name ?? openNode?.roleName

  if (openNode && RECORD_IDS.has(active)) return [
    { label: 'Records', onClick: null      },
    { label: label,     onClick: closeNode },
    { label: nodeName,  onClick: null      },
  ]
  if (openNode) return [
    { label: label,    onClick: closeNode },
    { label: nodeName, onClick: null      },
  ]
  if (RECORD_IDS.has(active)) return [
    { label: 'Records', onClick: null },
    { label: label,     onClick: null },
  ]
  if (TOP_SECTION_IDS.has(active)) return [
    { label: label, onClick: null },
  ]
  return []
}

export { RECORD_IDS, TOP_SECTION_IDS, buildBreadcrumbs }
