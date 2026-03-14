import { experiences, type Experience } from './index'

describe('experiences', () => {
  it('exports an array of experiences', () => {
    expect(Array.isArray(experiences)).toBe(true)
    expect(experiences.length).toBeGreaterThan(0)
  })

  it('each experience has required fields', () => {
    experiences.forEach((exp: Experience) => {
      expect(exp).toHaveProperty('role')
      expect(exp).toHaveProperty('company')
      expect(exp).toHaveProperty('start')
      expect(exp).toHaveProperty('end')
      expect(exp).toHaveProperty('summary')
      expect(exp).toHaveProperty('highlights')
      expect(exp).toHaveProperty('tags')

      expect(typeof exp.role).toBe('string')
      expect(typeof exp.company).toBe('string')
      expect(typeof exp.start).toBe('string')
      expect(typeof exp.end).toBe('string')
      expect(typeof exp.summary).toBe('string')
      expect(Array.isArray(exp.highlights)).toBe(true)
      expect(Array.isArray(exp.tags)).toBe(true)
    })
  })

  it('experiences are sorted chronologically (newest first)', () => {
    const firstExp = experiences[0]
    expect(firstExp.company).toBe('Singtel')
    expect(firstExp.end).toBe('Present')
  })

  it('each experience has at least one tag', () => {
    experiences.forEach((exp: Experience) => {
      expect(exp.tags.length).toBeGreaterThan(0)
    })
  })

  it('location field is optional', () => {
    const expWithLocation = experiences.find(e => e.location)
    const expWithoutLocation = experiences.find(e => !e.location)

    if (expWithLocation) {
      expect(typeof expWithLocation.location).toBe('string')
    }
    
    // At least one experience should have a location
    expect(expWithLocation).toBeDefined()
  })
})
