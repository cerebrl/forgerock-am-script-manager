import greet from '../../../src/hello-world/greet';

it('should result in greeting with name', () => {
  const greeting = greet('test_user');
  expect(greeting).toBe('Hello, test_user!');
});
