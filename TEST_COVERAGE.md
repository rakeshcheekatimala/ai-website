# Test Coverage Report

This document provides an overview of the testing setup and current coverage for the AI Website project.

## Test Setup

### Testing Stack
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom matchers for DOM assertions

### Configuration
- `jest.config.js` - Main Jest configuration with Next.js integration
- `jest.setup.ts` - Global test setup and polyfills

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage report
yarn test:coverage

# View HTML coverage report
open coverage/index.html
```

## Current Coverage (87.53%)

### Components (83.64% coverage)
- ✅ **AskAgentButton** - 100% (modal open/close, dynamic loading)
- ✅ **Card** - 100% (rendering, links)
- ✅ **ChatModal** - 100% (chat functionality, starter questions, keyboard shortcuts)
- ✅ **ExperienceTimeline** - 100% (experience rendering, tags, highlights)
- ✅ **Footer** - 100% (navigation, social links, copyright)
- ✅ **Header** - 95% (navigation, mobile menu, sound toggle)
- ⚠️ **LocationBanner** - 47% (basic rendering, needs more map interaction tests)
- ✅ **SocailLinks** - 100% (all social links)

### Pages (100% coverage for tested pages)
- ✅ **Home** (`app/page.tsx`) - 100%
- ✅ **About** (`app/about/page.tsx`) - 100%
- ✅ **Blog** (`app/blog/page.tsx`) - 100%
- ✅ **Projects** (`app/projects/page.tsx`) - 100%
- ✅ **Work** (`app/work/page.tsx`) - 100%
- ✅ **Blog Post** (`app/blog/[slug]/page.tsx`) - 100%
- ✅ **Project Detail** (`app/projects/[slug]/page.tsx`) - 100%
- ⚠️ **Layout** (`app/layout.tsx`) - 0% (not tested)

### API Routes (94.64% coverage)
- ✅ **Chat** (`/api/chat`) - 98% (rate limiting, message handling, error cases)
- ✅ **Geolocation** (`/api/geolocation`) - 88% (IP detection, distance calculation, fallbacks)
- ✅ **Posts** (`/api/posts`) - 100%
- ✅ **Hello** (`/api/hello`) - 100%

### Library/Utilities (95.2% coverage)
- ✅ **mdx.ts** - 100% (post fetching, slug generation, MDX compilation)
- ✅ **mock-data.ts** - 85% (project and post data)

### Data (100% coverage)
- ✅ **experiences** - 100% (experience data validation)

## Test Categories

### Unit Tests
- Component rendering and props
- Utility functions
- Data structures
- Event handlers

### Integration Tests
- API route handlers
- Database/external API interactions
- Multi-component interactions

### Key Test Scenarios Covered

#### Components
- ✅ Rendering with various props
- ✅ User interactions (clicks, keyboard events)
- ✅ State management
- ✅ Conditional rendering
- ✅ Accessibility attributes
- ✅ External link attributes

#### API Routes
- ✅ Success responses
- ✅ Error handling
- ✅ Rate limiting
- ✅ IP detection and fallbacks
- ✅ Data validation
- ✅ Environment variable checks

#### Pages
- ✅ Server-side data fetching
- ✅ Dynamic routing
- ✅ Static generation
- ✅ Not found scenarios

## Areas for Improvement

1. **LocationBanner** - Add tests for:
   - Map initialization
   - Marker placement
   - Arc drawing logic
   - Great circle calculation

2. **Header** - Add tests for:
   - Sound playback
   - localStorage persistence edge cases

3. **Layout** - Add tests for:
   - Root layout rendering
   - Metadata generation

4. **ChatModal** - Consider adding:
   - Message streaming tests
   - Error state handling

## Test File Organization

```
project-root/
├── components/
│   ├── AskAgentButton.tsx
│   ├── AskAgentButton.test.tsx
│   ├── Card.tsx
│   ├── Card.test.tsx
│   └── ...
├── app/
│   ├── page.tsx
│   ├── page.test.tsx
│   ├── api/
│   │   ├── chat/
│   │   │   ├── route.ts
│   │   │   └── route.test.ts
│   │   └── ...
│   └── ...
├── lib/
│   ├── mdx.ts
│   ├── mdx.test.ts
│   └── ...
└── experiences/
    ├── index.ts
    └── index.test.ts
```

## Best Practices

1. **Co-location** - Test files live next to the code they test
2. **Mocking** - External dependencies (APIs, modules) are mocked
3. **Isolation** - Each test is independent and can run in any order
4. **Descriptive names** - Test names clearly describe what they verify
5. **Arrange-Act-Assert** - Tests follow AAA pattern
6. **Coverage thresholds** - Aim for >80% coverage on critical paths

## CI/CD Integration

To integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: yarn test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Maintenance

- Run `yarn test:coverage` before committing changes
- Update tests when modifying components or logic
- Add tests for new features before implementation (TDD)
- Review coverage reports regularly to identify gaps
