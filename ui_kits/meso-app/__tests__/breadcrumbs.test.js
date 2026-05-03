import { describe, it, expect } from 'vitest'
import { buildBreadcrumbs } from '../shared/breadcrumbs.js'

const noop = () => {}

describe('buildBreadcrumbs', () => {
  // ── Records sections ──────────────────────────────────────────────────

  it('returns Records + section label for a records section with no open node', () => {
    const crumbs = buildBreadcrumbs('people', null, noop)
    expect(crumbs).toEqual([
      { label: 'Records', onClick: null },
      { label: 'People',  onClick: null },
    ])
  })

  it('returns Records + clickable section + node name when a records node is open', () => {
    const crumbs = buildBreadcrumbs('teams', { name: 'Platform Engineering' }, noop)
    expect(crumbs).toHaveLength(3)
    expect(crumbs[0]).toEqual({ label: 'Records', onClick: null })
    expect(crumbs[1].label).toBe('Teams')
    expect(crumbs[1].onClick).toBe(noop)
    expect(crumbs[2]).toEqual({ label: 'Platform Engineering', onClick: null })
  })

  it('uses roleName when node has no name (role nodes)', () => {
    const crumbs = buildBreadcrumbs('roles', { roleName: 'SRE Lead' }, noop)
    expect(crumbs[2]).toEqual({ label: 'SRE Lead', onClick: null })
  })

  it('converts hyphens to spaces in the section label', () => {
    const crumbs = buildBreadcrumbs('governance-bodies', null, noop)
    expect(crumbs[1].label).toBe('Governance bodies')
  })

  // ── Top-level nav sections (value-streams, capabilities) ─────────────

  it('returns single breadcrumb for value-streams list view', () => {
    const crumbs = buildBreadcrumbs('value-streams', null, noop)
    expect(crumbs).toEqual([{ label: 'Value streams', onClick: null }])
  })

  it('returns single breadcrumb for capabilities list view', () => {
    const crumbs = buildBreadcrumbs('capabilities', null, noop)
    expect(crumbs).toEqual([{ label: 'Capabilities', onClick: null }])
  })

  it('returns section + node name (no Records prefix) when a value stream is open', () => {
    const crumbs = buildBreadcrumbs('value-streams', { name: 'Customer Onboarding' }, noop)
    expect(crumbs).toHaveLength(2)
    expect(crumbs[0].label).toBe('Value streams')
    expect(crumbs[0].onClick).toBe(noop)
    expect(crumbs[1]).toEqual({ label: 'Customer Onboarding', onClick: null })
  })

  it('returns section + node name (no Records prefix) when a capability is open', () => {
    const crumbs = buildBreadcrumbs('capabilities', { name: 'Data Analytics' }, noop)
    expect(crumbs).toHaveLength(2)
    expect(crumbs[0].label).toBe('Capabilities')
    expect(crumbs[0].onClick).toBe(noop)
    expect(crumbs[1]).toEqual({ label: 'Data Analytics', onClick: null })
  })

  // ── Unknown / non-nav sections ────────────────────────────────────────

  it('returns empty array for an unrecognised section', () => {
    const crumbs = buildBreadcrumbs('canvas', null, noop)
    expect(crumbs).toEqual([])
  })

  it('returns empty array for strategy section', () => {
    const crumbs = buildBreadcrumbs('strategy', null, noop)
    expect(crumbs).toEqual([])
  })
})
