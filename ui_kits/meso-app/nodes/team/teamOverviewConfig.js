const DEFAULT_LEGAL_ENTITY = 'Acme Inc'

const getTeamOverviewFields = (team, detail) => {
  const fields = []

  // ── Identity ───────────────────────────────────────────────────────────────
  fields.push({ type: 'section',     label: 'Identity', first: true })
  fields.push({ type: 'heading',     value: team.name })
  fields.push({ type: 'description', value: detail.purpose })
  fields.push({ type: 'property', label: 'Node type', value: 'Team',                                  pill: true })
  fields.push({ type: 'property', label: 'Team type', value: detail.teamType.replace(/_/g, ' '),      pill: true, pillVariant: 'teal' })
  if (team.status) {
    const statusLabel = team.status === 'active' ? 'Active' : team.status === 'inactive' ? 'Inactive' : team.status
    fields.push({ type: 'property', label: 'Status', value: statusLabel, pill: true })
  }

  // ── Ownership ──────────────────────────────────────────────────────────────
  fields.push({ type: 'section', label: 'Ownership' })
  if (detail.legalEntity && detail.legalEntity !== DEFAULT_LEGAL_ENTITY) {
    fields.push({ type: 'badge', value: `Managed by ${detail.legalEntity}` })
  }
  fields.push({
    type:   'people',
    people: detail.leads.map(p => ({
      ...p,
      role: p.role ? `${p.role} · Lead` : 'Lead',
    })),
  })

  // ── Structure ──────────────────────────────────────────────────────────────
  if (detail.parent || detail.children?.length) {
    fields.push({ type: 'section', label: 'Structure' })
    fields.push({ type: 'hierarchy', parent: detail.parent, children: detail.children ?? [] })
  }

  // ── Workspace ──────────────────────────────────────────────────────────────
  fields.push({ type: 'section', label: 'Workspace' })
  fields.push({ type: 'links', links: detail.workspaceLinks })
  if (detail.communicationChannels?.length) {
    fields.push({ type: 'channels', channels: detail.communicationChannels })
  }

  // ── Audit ──────────────────────────────────────────────────────────────────
  fields.push({ type: 'section', label: 'Audit' })
  fields.push({ type: 'audit', person: detail.updatedBy, date: detail.updatedAt })

  return fields
}

export { getTeamOverviewFields }
