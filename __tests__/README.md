# Integration Tests

This directory contains integration tests that verify multiple components or systems working together.

## Test Files

### `home-page.integration.test.tsx`
Tests the complete home page rendering with all child components integrated:
- Hero section with CTAs
- Social links integration
- Location banner integration
- External vs internal link handling

### `api-flow.integration.test.ts`
Tests API endpoints working together:
- Multiple API responses
- Status code consistency
- Data structure validation
- IP handling across endpoints

## Running Integration Tests

```bash
# Run all integration tests
yarn test __tests__/integration

# Run specific integration test
yarn test __tests__/integration/home-page.integration.test.tsx

# Run with coverage
yarn test:coverage __tests__/integration
```

## Writing Integration Tests

Integration tests should:
1. Test multiple units working together
2. Mock only external dependencies (APIs, databases)
3. Verify data flow between components
4. Test realistic user scenarios

### Example Pattern

```typescript
// Mock external dependencies only
jest.mock('../../lib/api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'test' })
}))

// Test components working together
it('displays data from API in component', async () => {
  const page = await PageComponent()
  render(page)
  
  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
```

## Best Practices

- Keep integration tests focused on specific flows
- Use realistic test data
- Test error scenarios
- Verify state changes across components
- Test navigation and routing
