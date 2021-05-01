<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock AM Script Manager</h2>
  <p align="center">
    <a href="CHANGELOG.md">Change Log</a>
    ·
    <a href="#support">Support</a>
  </p>
<hr/></p>

This is a development toolkit for developing, testing and managing your AM authentication tree scripts. The purpose of this project is to help you develop complex scripts in modern JavaScript or TypeScript with a _modular_ architecture. You also have the availability of the NPM ecosystem to help speed up development.

## Important Things to Know

- This project is provided as-is with no guarantees
- Manage as many of your scripts as you want in one place
- Includes support for modern JavaScript and TypeScript with no additional configuration
- Includes build system with automated unit and integration tests
- Includes the availability of the NPM ecosystem (use with care [FAQ: 1])
- Does _not_ include support for modern, native Object/Array/String methods (but, polyfills can be added [FAQ: 2])
- Produces copy-and-paste scripts ready for use in AM

## Project Overview

- The AM-ready scripts can be found in `dist/<your-script>.js`
- Source code can be found in the `src/<your-script>/` directory and can be as modular as one desires
- The top-level JavaScript file is `src/<your-script>/index.{js,ts}`
- Tests can be placed in `test/<your-script>/` directory along with mock data
- Simple templates can be found for getting started different types of AM scripts in `templates/`
- The build system used is Babel or TypeScript and Rollup
- Testing is provided by Jest
- Linting [FAQ: 3] is provided by ESLint
- Each directory has its own README.md for more detailed information

<!---------------------------------------------------------------------------------------------------------->
<!-- Requirements -->

## Requirements

- Node v14 or higher
- NPM v6 or higher

<!---------------------------------------------------------------------------------------------------------->
<!-- Installation -->

## Installation

```sh
git clone <project>
cd <project>
npm install
npm run build
```

The `install` command installs all the development tooling and any dependencies you include for your source code. The `build` command will lint [FAQ: 3] the source code, unit test the source code, transpile [FAQ: 4] and bundle the output, and then run an integration test on the final script.

<!---------------------------------------------------------------------------------------------------------->
<!-- Getting Started -->

## Getting Started

For each script you'd like to manage, follow the below steps:

1. Simply create a new directory for your project under `src/`
2. The top-level file needs to be named either `index.js` or `index.ts`
3. Create an identically named directory for your new script's tests under `test/`
4. Within this `test/` directory, create two (or three) directories:

    - `src/` for your unit tests against the source files
    - `dist/` for your integration tests against the built file
    - `data/` _optional_, if you want a place to put mock data

### Best Practices

If you're used to writing large JavaScript files within older environments that don't provide proper support for modern engineering patterns, this development toolkit will introduce some mind bending concepts. But, they are revolutionary in writing organized, testable, efficient code, so are absolutely worth learning.

#### Rule One: Isolate global API access to index file

Isolating your global or environment API access to just your index file, can help keep the rest of your code cleaner and easier to test. Access the global APIs for everything that you need within your script, and then pass all of this data into your modular functions.

```js
// `index.js`

// Collect ALL of your data from the global API
const input = sharedState.get('some-env-data').asString();
const moreInput = sharedState.get('more-env-data').asString();

// Pass required data as input to your function,
// capturing output as a result of the function
const output = dataOperations(input, moreInput);
```

#### Rule Two: Minimize code and logic in your index file

Building on Rule One, leave the index file for global API access and assigning final result to the global outcome variable. This means moving your functions and logic into modules (aka files) to separate pure functions from the global API access and side-effects of the index file.

```js
// `index.js`

// Move your logic and processing to modules.
// Import the functions into your index file.
import { yourFunction } from 'your-function';

// Collect your input from the global API ...
// Run functions against input ...
const finalResult = yourFunction(input);
// Assign final result to outcome
outcome = finalResult;
```

```js
// `your-function.js`

// export your function
export const yourFunction = (input) => {
  // operate on input, producing output
  return output;
}
```

#### Rule Three: Think in units of functionality

To improve code organization and testability, it's a good habit to break your code up into small, focused units of responsibility. Your index file represents the responsibility of your script to act against the environment or global API. The modules (aka files) that your index file imports functionality from represent collections of functionality. Each function within a module represents a unit of work.

This is where unit testing gets its name. Each unit can be tested in isolation with little hassle.

```text
- index.js
  - imports module.js
- module.js
  - imports helpers.js
  - exported function
  - exported function
- helpers.js
  - exported function
  - exported function
```

#### Rule Four: Write pure, stateless functions

If you haven't noticed, these rules are borrowing from two common engineering philosophies: Unix and Functional Programming. This rule is a focus on the latter. Pure, stateless functions are functions that operate _only_ on the input the function receives as its arguments and returns the results of the operations. The execution of the function should not access or operate on anything external to the function, especially globals, and should not result in any side-effects or mutations to anything external, especially globals.

This ensures the functionality is easy to test and predictable: given a set of inputs, you can always expect a set of outputs. This makes writing unit tests ridiculously simple requiring no setup or mocking other than just the data you will use to pass into the function.

```js
// `thing.test.js` (a unit test file)

// Import your unit(s) to test
import { yourFunction } from '../../../src/your-script/your-function';

it('should return "true", if x, y and z', () => {
  const input = { /* ... */ };
  const output = yourFunction(input);
  const expected = 'true';
  expect(output).toBe(expected);
});
```

#### Rule Five: Leverage test-driven development

Before you react to this rule, it's not enforced by this toolkit at all. You are free to write tests however you desire, but the beauty of this toolkit is that it makes test-driven development (TDD) super easy.

TDD is essentially writing the test first, defining the result you want from your code. Then, writing the code to pass the test. For more on how to to this, [visit the README.md in the testing directory](test/README.md).

#### Rule Six: Enjoy!

Breath deep, embrace new things and enjoy writing modern JavaScript like a cool kid. Trust me, it's worth it :)

### Building Your AM-ready Script

After developing your script, you can build the AM-ready output with the below command:

```sh
npm run build
```

This command will lint [FAQ: 3], unit test the source code, transpile [FAQ: 4] and bundle the output, and then run integration tests on the final script. You can find this output script within the `dist/` directory. This script is what you'll copy and paste into AM's script editor. You can create the output without running the tests by using this command: `npm run bundle`.

#### Build tools

Rollup is the library used for the bundling. You can find more information on it here: http://rollupjs.org.

Babel is the library used to transpile [FAQ: 4] your modern JavaScript down to the appropriate version for Rhino (JS runtime used in AM). You can find more about Babel here: https://babeljs.io. As-is, this configuration will not support the new, native Object/Array/String methods without a polyfill [FAQ: 2].

Alternatively, you can use TypeScript as a type-safe language that transpiles/compiles to the appropriate version of JavaScript for Rhino. You can find more about TypeScript here: https://typescriptlang.org. Similar to Babel, polyfills are required for certain methods.

##### Using TypeScript (optional)

The purpose of using TypeScript is to create a more "type safe" environment and add an additional layer of static code analysis to your source code. It's best to think of TypeScript as JavaScript with types, and not as an entirely different language. Technically, TypeScript is a superset of JavaScript, if that helps the argument.

It does add a layer of complexity to authoring JavaScript, but if you're used to type-safe languages, TypeScript may feel more familiar to you. If types is an entirely foreign concept to you, there will be a learning curve, be warned.

There are two types of, well, types in this project. There are the local types that you write in your source code and there are global types that are found in the `globals.d.ts` file at the root of the project.

#### Static Code Analysis

There are two layers to static code analysis in the context of this project. The first you get for free by way of ESLint. It's called "linting" and is a type of static code analysis, but is less robust than what you might find in other languages.

The second layer is added by TypeScript and is entirely optional. The combination of linting along with TypeScript is very powerful and can make writing JavaScript feel more like writing in more traditional programming languages.

<!---------------------------------------------------------------------------------------------------------->
<!-- Testing -->

## Testing

Jest is the test framework used. You can find more information about it here: https://jestjs.io.

You can run unit tests on the source code as well as integration tests for the final script:

```sh
# Run unit tests against the source code
npm run test

# Run the integration test against the bundled script
npm run test:bundle
```

For convenience, you can also run a `watch` command, and it will watch for source file changes and automatically run the unit tests associated with the changed source file:

```sh
npm run watch
```

### Integration Testing

Integration testing – within this context means testing the built file – is a bit different than how unit testing works. To test the integration of you built code with the global APIs, we need to mock the APIs to simulate their function. The mocking for the global APIs can be found in the `test.config.js` file at the root of the project.

You can [find more information about mocking globals in Jest's documentation](https://jestjs.io/docs/configuration#globals-object). This is not the only method for mocking globals, but it keeps your integration tests clean. If you prefer to use a different method, you are welcome to use it.

> NOTE: It's important to remember not to test the same functionality in the integration test as you did in the unit test. Just do some simple sanity testing that ensures a few use cases flow through the code correctly. If you wrote good unit tests, trust that they are doing their job.

<!---------------------------------------------------------------------------------------------------------->
<!-- FAQ -->

## FAQ

### 1. NPM ecosystem risks

The NPM ecosystem can be extremely valuable as an entire library of functionality is one command away. Though, "with great power comes great responsibility" (or something like that). There's a few rules to using NPM:

1. Ensure you really need it (does the value of the module outweigh the cost of additional risk )
2. Know what you're importing (is it from a trusted enterprise, or some unknown individual?)
3. Pay attention to file size (NPM modules can be huge, so be mindful of size)
4. Security, security, security (see #2)

### 2. Why no polyfills?

For this sample script, we didn't see enough need for the new, native Object/Array/String methods to offset the cost of the additional code output. So, we didn't include the polyfills. But, if you see the need for them, you can easily add them by following these instructions: https://babeljs.io/docs/en/babel-polyfill.

### 3. What the heck is "linting"?

Linting is a type of static code analysis, but is less robust than what you might find in other languages. It basically pattern matches patterns that are known for being problematic in JavaScript and report them.

### 4. What the heck is "transpiling"?

Transpiling is similar to compiling, and the two are often used interchangeably in the JavaScript community. Technically, transforming a language to a different version of the same language is transpiling (aka "down-leveling"). Compiling is transforming one language into an entirely different language.

### 5. My project is acting weird. How do I fix it?

If the script isn't working in AM or the integration tests are failing, make sure you are running the `bundle` or `build` command. It's easy to make a code change and forget to build the output before using or testing.

If that's not the problem, try running the available `clean` commands in the `package.json`. The more aggressive version, `npm run clean:danger`, removes many things related to NPM and related dependencies. Once it's done, you'll need to rerun the `install` and `build` command.

<!---------------------------------------------------------------------------------------------------------->
<!-- SUPPORT -->

## Support

There is no support for this project. Please use at your own risk, but if you find this helpful, do let us know.

## Version History

[Our version history can be viewed by visiting our CHANGELOG.md](CHANGELOG.md).

<!---------------------------------------------------------------------------------------------------------->
<!-- COLLABORATION -->

## Contributing

If you would like to contribute to this project you can fork the repository, clone it to your machine and get started. You are welcome to PR your changes to this repo. Though, we make no guarantee that it will be merged.

<!---------------------------------------------------------------------------------------------------------->
<!-- LEGAL -->

## Disclaimer

> **This code is provided by ForgeRock on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not represent or warrant or make any guarantee regarding the use of this code or the accuracy, timeliness or completeness of any data or information relating to this code, and ForgeRock hereby disclaims all warranties whether express, or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and any warranty of non-infringement. ForgeRock shall not have any liability arising out of or related to any use, implementation or configuration of this code, including but not limited to use for any commercial purpose. Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein ForgeRock resides or in which ForgeRock conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

<!---------------------------------------------------------------------------------------------------------->
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

&copy; Copyright 2020 ForgeRock AS. All Rights Reserved.

[forgerock-logo]: https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg "ForgeRock Logo"
