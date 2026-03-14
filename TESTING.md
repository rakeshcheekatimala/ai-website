# Testing Documentation

## Overview

This project has comprehensive test coverage using Jest and React Testing Library. The test suite includes unit tests, integration tests, and API route tests.

## Quick Start

```bash
# Install dependencies
yarn install

# Run all tests
yarn test

# Run tests in watch mode (for development)
yarn test:watch

# Run tests with coverage report
yarn test:coverage

# View HTML coverage report in browser
open coverage/index.html
```

## Test Statistics

- **Total Test Files**: 24
- **Total Tests**: 115
- **Overall Coverage**: 87.53%
- **Test Suites**: 24 passed

### Coverage Breakdown

| Category | Coverage | Details |
|----------|----------|---------|
| **Components** | 83.64% | 8/9 components fully tested |
| **Pages** | 100% | All main pages tested |
| **API Routes** | 96.5% | All endpoints tested |
| **Libraries** | 95.2% | Utility functions tested |
| **Data** | 100% | Experience data validated |

## Test Structure

```
project-root/
├── __tests__/
│   └── integration/          # Integration tests
│       ├── home-page.integration.test.tsx
│       └── api-flow.integration.test.ts
├── components/
│   ├── *.tsx                 # Component source
│   └── *.test.tsx            # Component unit tests
├── app/
│   ├── page.tsx
│   ├── page.test.tsx
│   ├── api/
│   │   └── */route.test.ts  # API route tests
│   └── */page.test.tsx       # Page component tests
├── lib/
│   └── *.test.ts             # Utility function tests
└── experiences/
    └── index.test.ts         # Data validation tests
```

## Test Categories

### 1. Unit Tests (Components)

**Tested Components:**
- ✅ `AskAgentButton` - Modal trigger and state management
- ✅ `Card` - Props rendering and links
- ✅ `ChatModal` - Chat interface, keyboard shortcuts, message handling
- ✅ `ExperienceTimeline` - Experience rendering with highlights and tags
- ✅ `Footer` - Navigation and copyright
- ✅ `Header` - Navigation, mobile menu, sound toggle
- ✅ `LocationBanner` - Geolocation display and map integration
- ✅ `SocailLinks` - Social media links

**Example Test:**
```typescript
// components/Card.test.tsx
it('renders the card with title and description', () => {
  render(<Card title="Test" description="Desc" href="/link" />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})
```

### 2. Unit Tests (Pages)

**Tested Pages:**
- ✅ Home page (`/`)
- ✅ About page (`/about`)
- ✅ Blog listing (`/blog`)
- ✅ Blog post detail (`/blog/[slug]`)
- ✅ Projects listing (`/projects`)
- ✅ Project detail (`/projects/[slug]`)
- ✅ Work page (`/work`)

### 3. Integration Tests (API Routes)

**Tested Endpoints:**
- ✅ `POST /api/chat` - AI chat with rate limiting
- ✅ `GET /api/geolocation` - IP-based location detection
- ✅ `GET /api/posts` - Blog posts API
- ✅ `GET /api/hello` - Health check

**Example Test:**
```typescript
// app/api/geolocation/route.test.ts
it('returns mock location for localhost', async () => {
  const request = { headers: new Headers({ 'x-forwarded-for': '127.0.0.1' }) }
  const response = await GET(request)
  const data = await response.json()
  expect(data.city).toBe('Hyderabad')
})
```

### 4. Integration Tests (Full Flow)

**Tested Scenarios:**
- ✅ Home page with all components
- ✅ API endpoint interactions
- ✅ Multi-IP geolocation handling

## Key Testing Patterns

### 1. Mocking External Dependencies

```typescript
// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => () => MockComponent)

// Mock external APIs
global.fetch = jest.fn()

// Mock environment variables
process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
```

### 2. Testing Async Components

```typescript
// For Next.js Server Components
const page = await HomePage()
render(page)
```

### 3. Testing API Routes

```typescript
// Use @jest-environment node for API routes
/**
 * @jest-environment node
 */
import { GET } from './route'
```

### 4. Testing User Interactions

```typescript
// Click events
fireEvent.click(screen.getByRole('button'))

// Keyboard events
fireEvent.keyDown(input, { key: 'Enter' })

// Wait for async updates
await waitFor(() => {
  expect(screen.getByText('Result')).toBeInTheDocument()
})
```

## Coverage Highlights

### High Coverage Areas (>90%)
- ✅ All page components (100%)
- ✅ Most API routes (96.5%)
- ✅ Core components (Card, Footer, SocailLinks, ChatModal)
- ✅ MDX utilities (100%)

### Areas for Improvement (<80%)
- ⚠️ `LocationBanner` (46.75%) - Complex map logic needs more tests
- ⚠️ `Header` (95.17%) - Sound playback edge cases
- ⚠️ `layout.tsx` (0%) - Root layout not tested

## Testing Best Practices

### 1. Test Organization
- Co-locate tests with source files
- Use descriptive test names
- Group related tests with `describe` blocks

### 2. Test Independence
- Each test should run independently
- Clean up mocks between tests
- Avoid shared state

### 3. Mocking Strategy
- Mock external dependencies (APIs, modules)
- Mock complex child components
- Keep mocks simple and focused

### 4. Assertions
- Test behavior, not implementation
- Use semantic queries (`getByRole`, `getByLabelText`)
- Verify accessibility attributes

## Common Issues & Solutions

### Issue: `scrollIntoView is not a function`
**Solution:** Added mock in `jest.setup.ts`
```typescript
Element.prototype.scrollIntoView = jest.fn()
```

### Issue: `Request is not defined` in API tests
**Solution:** Use `@jest-environment node` for API route tests

### Issue: Next.js dynamic imports not working
**Solution:** Mock `next/dynamic` to return component synchronously

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## Future Enhancements

1. **E2E Tests** - Add Playwright/Cypress for full browser testing
2. **Visual Regression** - Add screenshot comparison tests
3. **Performance Tests** - Add bundle size and lighthouse score tests
4. **Accessibility Tests** - Add axe-core for a11y testing
5. **Coverage Threshold** - Enforce minimum coverage in CI (e.g., 85%)

## Useful Commands

```bash
# Run specific test file
yarn test path/to/file.test.tsx

# Run tests matching pattern
yarn test --testNamePattern="ChatModal"

# Update snapshots (if using)
yarn test -u

# Run tests with verbose output
yarn test --verbose

# Run tests for changed files only
yarn test --onlyChanged
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
