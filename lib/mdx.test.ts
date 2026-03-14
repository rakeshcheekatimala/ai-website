import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllPosts, getPostBySlug, getAllPostSlugs } from './mdx'

// Mock fs module
jest.mock('fs')
jest.mock('gray-matter')

// Mock next-mdx-remote
jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: jest.fn().mockResolvedValue({
    content: '<div>Compiled MDX Content</div>',
  }),
}))

const mockFs = fs as jest.Mocked<typeof fs>
const mockMatter = matter as jest.MockedFunction<typeof matter>

describe('mdx', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllPosts', () => {
    it('returns all posts sorted by date (newest first)', async () => {
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.mdx',
        'not-mdx.txt',
      ] as any)

      mockFs.readFileSync
        .mockReturnValueOnce('content1' as any)
        .mockReturnValueOnce('content2' as any)

      mockMatter
        .mockReturnValueOnce({
          data: {
            title: 'Post 1',
            slug: 'post-1',
            date: '2024-01-01',
            excerpt: 'Excerpt 1',
          },
          content: '',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Post 2',
            slug: 'post-2',
            date: '2024-02-01',
            excerpt: 'Excerpt 2',
          },
          content: '',
        } as any)

      const posts = await getAllPosts()

      expect(posts).toHaveLength(2)
      expect(posts[0].slug).toBe('post-2') // Newer post first
      expect(posts[1].slug).toBe('post-1')
      expect(posts[0].title).toBe('Post 2')
    })

    it('filters out non-mdx files', async () => {
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'readme.md',
        'image.png',
      ] as any)

      mockFs.readFileSync.mockReturnValue('content' as any)

      mockMatter.mockReturnValue({
        data: {
          title: 'Post 1',
          slug: 'post-1',
          date: '2024-01-01',
          excerpt: 'Excerpt 1',
        },
        content: '',
      } as any)

      const posts = await getAllPosts()

      expect(posts).toHaveLength(1)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1)
    })
  })

  describe('getPostBySlug', () => {
    it('returns post with compiled content when slug exists', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('file content' as any)

      mockMatter.mockReturnValue({
        data: {
          title: 'Test Post',
          slug: 'test-post',
          date: '2024-01-01',
          excerpt: 'Test excerpt',
        },
        content: '# Test Content',
      } as any)

      const post = await getPostBySlug('test-post')

      expect(post).not.toBeNull()
      expect(post?.title).toBe('Test Post')
      expect(post?.slug).toBe('test-post')
      expect(post?.content).toBeDefined()
    })

    it('returns null when slug does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false)

      const post = await getPostBySlug('non-existent')

      expect(post).toBeNull()
      expect(mockFs.readFileSync).not.toHaveBeenCalled()
    })
  })

  describe('getAllPostSlugs', () => {
    it('returns array of all post slugs', async () => {
      mockFs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      mockFs.readFileSync.mockReturnValue('content' as any)

      mockMatter
        .mockReturnValueOnce({
          data: { title: 'Post 1', slug: 'post-1', date: '2024-01-01', excerpt: 'Excerpt 1' },
          content: '',
        } as any)
        .mockReturnValueOnce({
          data: { title: 'Post 2', slug: 'post-2', date: '2024-02-01', excerpt: 'Excerpt 2' },
          content: '',
        } as any)

      const slugs = await getAllPostSlugs()

      expect(slugs).toEqual(['post-2', 'post-1'])
      expect(slugs).toHaveLength(2)
    })
  })
})
