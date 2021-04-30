import greet from '../../../src/hello-world/greet';

describe('Test greeting mechanism', () => {
  it('should result in greeting with name', () => {
    const greeting = greet('test_user');
    expect(greeting).toBe('Hello, test_user!');
  });
});
