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
