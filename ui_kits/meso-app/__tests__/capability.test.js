import { describe, it, expect } from 'vitest'
import { deriveLevel } from '../nodes/capability/capabilityUtils.js'
import { CAPABILITIES, DEFAULT_CAPABILITY } from '../nodes/capability/capabilityData.js'

describe('deriveLevel', () => {
  const all = [
    { id: 'cap-l1',       parentCapabilityId: null      },
    { id: 'cap-l2',       parentCapabilityId: 'cap-l1'  },
    { id: 'cap-l3',       parentCapabilityId: 'cap-l2'  },
    { id: 'cap-l2-other', parentCapabilityId: 'cap-l1'  },
  ]

  it('returns l1 when parentCapabilityId is null', () => {
    expect(deriveLevel({ id: 'cap-l1', parentCapabilityId: null }, all)).toBe('l1')
  })

  it('returns l2 when parent is an L1 capability', () => {
    expect(deriveLevel({ id: 'cap-l2', parentCapabilityId: 'cap-l1' }, all)).toBe('l2')
  })

  it('returns l3 when parent is an L2 capability', () => {
    expect(deriveLevel({ id: 'cap-l3', parentCapabilityId: 'cap-l2' }, all)).toBe('l3')
  })

  it('returns l2 for a second L2 sibling under the same L1', () => {
    expect(deriveLevel({ id: 'cap-l2-other', parentCapabilityId: 'cap-l1' }, all)).toBe('l2')
  })

  it('returns l1 for a root capability not present in the all array', () => {
    expect(deriveLevel({ id: 'cap-new', parentCapabilityId: null }, [])).toBe('l1')
  })

  it('returns l2 when parent exists but has no parent itself', () => {
    const minimal = [{ id: 'root', parentCapabilityId: null }]
    expect(deriveLevel({ id: 'child', parentCapabilityId: 'root' }, minimal)).toBe('l2')
  })
})

describe('CAPABILITIES — SaaS model shape', () => {
  const l1s   = CAPABILITIES.filter(c => !c.parentCapabilityId)
  const l1Ids = new Set(l1s.map(c => c.id))
  const l2s   = CAPABILITIES.filter(c => l1Ids.has(c.parentCapabilityId))
  const l2Ids = new Set(l2s.map(c => c.id))
  const l3s   = CAPABILITIES.filter(c => l2Ids.has(c.parentCapabilityId))

  it('has exactly 8 L1 capabilities', () => {
    expect(l1s).toHaveLength(8)
  })

  it('has at least 50 L2 capabilities', () => {
    expect(l2s.length).toBeGreaterThanOrEqual(50)
  })

  it('has at least 100 L3 capabilities', () => {
    expect(l3s.length).toBeGreaterThanOrEqual(100)
  })

  it('derives l1 for every L1 record', () => {
    expect(l1s.every(c => deriveLevel(c, CAPABILITIES) === 'l1')).toBe(true)
  })

  it('derives l2 for every L2 record', () => {
    expect(l2s.every(c => deriveLevel(c, CAPABILITIES) === 'l2')).toBe(true)
  })

  it('derives l3 for every L3 record', () => {
    expect(l3s.every(c => deriveLevel(c, CAPABILITIES) === 'l3')).toBe(true)
  })

  it('exports DEFAULT_CAPABILITY with id capability-unknown', () => {
    expect(DEFAULT_CAPABILITY.id).toBe('capability-unknown')
  })

  it('every record has the required fields', () => {
    const required = ['id', 'name', 'description', 'parentCapabilityId', 'status',
                      'subCapabilities', 'owners', 'processes', 'valueStreams']
    expect(CAPABILITIES.every(c => required.every(f => f in c))).toBe(true)
  })
})
