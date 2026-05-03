import { describe, it, expect } from 'vitest'
import { deriveLevel } from '../nodes/capability/capabilityUtils.js'

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
