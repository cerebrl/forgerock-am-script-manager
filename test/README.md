# Testing Directory

This directory is for testing both the source and transpiled files. Each directory requires the same name as the source directory of your project. Within each directory, a `src` and `dist` directory is required. You can also have an optional directory for mock data.

For example:

```
/test
|-my-script/
  |-dist/
  |-data/
  |-src/
```

The purpose is to primarily test the source files, but you should have a few simple tests to validate the built, transpiled file is also functional.

## Unit Testing

Unit testing is the idea of testing code at an atomic level. A unit is analogous to a simple function that takes input via arguments and returns the result of the operation. Units should be pure, stateless functions, which makes testing them very easy as your test just calls the function passing input data and you capture the returned data from the function. Then you compare what you received versus what you expected.

```js
import greet from '../../../src/hello-world/greet';

it('should result in greeting with name', () => {
  const greeting = greet('test_user');
  expect(greeting).toBe('Hello, test_user!');
});
```

Unit tests should be contained within the `test/<your-script>/src/` directory and should not test the index file.

### Integration Testing

Integration testing – within this context means testing the built file – is a bit different than how unit testing works. To test the integration of you built code with the global APIs, we need to mock the APIs to simulate their function. The mocking for the default/common global APIs can be found in the `test/java-globals.js` file at the root of the project.

Any additional global APIs that need to be provided should be done in the `beforeAll` function within your integration test. You'll have to recreate the structure of the API. Here's an example:

```js
beforeAll(() => {
  global.sharedState = {
    get: (path) => {
      switch (path) {
        case 'username':
          return { asString: () => 'test_user' };
      }
    }
  };
});
```

The above is the mock for this global API provided by the Java environment:

```js
const username = sharedState.get('username').asString();
```

You can [find more information about mocking common global APIs in Jest's setupFiles documentation](https://jestjs.io/docs/configuration#setupfiles-array) and more information about [mocking unique global APIs within the beforeEach](https://jestjs.io/docs/api#beforeeachfn-timeout). The ensure the global APIs are available to the script, make sure to asynchrounously import the script you want to test within the test itself.

So, don't do this:

```js
import '../../../dist/hello-world';

beforeAll(() => {
  /* mock APIs */
});

describe('Test the built script', () => {
  it('matching profiles should match with "true"', () => {
    expect(outcome).toBe('Hello, test_user!');
  });
});
```

Do this instead:

```js
beforeAll(() => {
  /* mock APIs */
});

describe('Test the built script', () => {
  it('matching profiles should match with "true"', async () => {
    await import('../../../dist/hello-world');
    expect(outcome).toBe('Hello, test_user!');
  });
});
```

> NOTE: It's important to remember not to test the same functionality in the integration test as you did in the unit test. Just do some simple high-level testing that ensures a few use cases flow through the code correctly. If you wrote good unit tests, trust that they are doing their job.

## Test-Driven Development

10 simple steps to better code:

1. Build the skeleton of your script (see Using This Project section)
2. Within your index file, write your code to collect your data from the global APIs and think about the expected values for the `outcome` global variable assignment
3. Now, the fun part: instead of immediately writing logic, write a unit test!

    ```js
    // `test/<your-script>/src/` with a `.test.js` or `.test.ts` extension
    // Don't import anything yet

    // Write the test so the code reads "it should do x when y is z"
    it('should do x when y is z', () => {
      // Write the input set that represents a use case
      const input = /* string, object, array, whatever */;
      // Write output as `null` for the time being
      const output = null;
      // Define your expectation
      const expected = /* string, object, array, whatever */;
      // Now, write your assertion
      expect(output).toBe(expected);
    });
    ```

4. Run the following command: `npm run watch` (leaving this terminal window open)
5. This test will fail, and that's perfect!
6. Now, create the module (aka file) you will import in your source directory
7. Write the exported function within the source module and have it return false
8. Import this new exported function from your source directory into your unit test and replace add the function to your `output` assignment

    ```js
    import { yourFunction } from '../../../src/your-script/your-module.js';

    it('should do x when y is z', () => {
      const input = /* string, object, array, whatever */;
      const output = yourFunction(input);
      const expected = /* string, object, array, whatever */;
      expect(output).toBe(expected);
    });
    ```

9. Notice how the unit test reruns upon changes; it will still fail as you are still missing the necessary logic, and that's good (a falsifiable test is important)
10. Now, all you need to do is write the logic in your source file until you get a passing test. Voila, TDD!
