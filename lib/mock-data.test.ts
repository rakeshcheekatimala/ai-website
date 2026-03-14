// Mock mdx to avoid ESM/next-mdx-remote issues in Jest
jest.mock('./mdx', () => ({
  getAllPosts: jest.fn().mockResolvedValue([]),
}))

import { mockProjects, getMockProjects, type Project } from './mock-data'

describe('mock-data', () => {
  describe('mockProjects', () => {
    it('exports an array of projects', () => {
      expect(Array.isArray(mockProjects)).toBe(true)
      expect(mockProjects.length).toBeGreaterThan(0)
    })

    it('each project has required fields', () => {
      mockProjects.forEach((project: Project) => {
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('slug')
        expect(project).toHaveProperty('summary')
        expect(typeof project.title).toBe('string')
        expect(typeof project.slug).toBe('string')
        expect(typeof project.summary).toBe('string')
      })
    })
  })

  describe('getMockProjects', () => {
    it('returns mockProjects', async () => {
      const result = await getMockProjects()
      expect(result).toEqual(mockProjects)
    })
  })
})
