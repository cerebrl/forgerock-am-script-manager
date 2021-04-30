import greet from '../../../src/hello-world/greet';

describe('Test simple objects with diverse value types', () => {
  it('should return true for exact profile match', () => {
    const greeting = greet('test_user');
    expect(greeting).toBe('Hello, test_user!');
  });
});
