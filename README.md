<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock AM Script Manager</h2>
  <p align="center">
    <a href="https://github.com/ForgeRock/forgerock-am-script-manager/blob/master/CHANGELOG.md">Change Log</a>
    ·
    <a href="#support">Support</a>
  </p>
<hr/></p>

This is a development toolkit for customizing your AM authentication tree scripts. The purpose of this project is to help you develop complex scripts in modern JavaScript with modular architecture. You also have the availability of the NPM ecosystem to help speed up development.

There are a few things to note:

- This project is provided as-is with no guarantees
- Using the build system with automated tests during development is recommended
- Use the NPM ecosystem with care. Importing external dependencies can bloat the output and/or introduce unwanted side-effects.
- If you want to use new/modern, native Object/Array/String methods, you will have to add the necessary polyfills. [FAQ: 1]

## Project Overview

- The AM-ready script that can be copied and pasted into AM can be found here `dist/`
- Source code can be found in the `src/<your-script>` directory and can be as modular as one desires
- The top-level JavaScript file is `src/<your-script>/index.{js|ts}`
- Tests can be found in the `test/` directory along with sample device profiles
- The build system used is Babel and Rollup
- Test framework is Jest

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- Requirements -->

## Requirements

- Node v13.10 or higher
- NPM v6 or higher

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- Instructions -->

## Instructions

After cloning this repo locally, install the needed dependencies and build the project:

```
npm install
npm run build
```

The `build` command will test the source code, "compile" and bundle the output, and then run a test on the final script.

## Ways To Use This Project

1. Copy the file contents of `dist/<your-script>.js` and paste it into AM
2. Modify `src/index.js` to use the metadata match without the location match or vice versa
3. Simply create a new directory for your project under `src` with the top-level file named `index`

## Using the Development Toolkit

After finalizing your changes, you can build the unified script with the below command:

```
npm run build
```

This will test the source code, "compile" and bundle the output, and then run a test on the final script. You can find this output script within the `dist/` directory. This script is what you'll copy and paste into AM's script editor for the Device Match node.

For convenience, you can also run a watch command, and it will watch for source file changes and test your code and build the output upon changes:

```
npm run watch
```

### Build tools

Rollup is the library used for the bundling. You can find more information on it here: http://rollupjs.org.

Babel is the library used to transpile your modern JavaScript down to the appropriate version for Rhino (JS runtime used in AM). You can find more about Babel here: https://babeljs.io/. As-is, this build step will not support the new, native Object/Array/String methods without a polyfill [FAQ: 1].

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- Testing -->

## Testing

You can run tests on the source code as well as a test for the final script:

```
# Test source code
npm run test

# Test bundled script
npm run test:bundle
```

_(You may notice a `test.config.js` in the root of the project. This is only used for testing the bundled script (not the source code), so it can inject the appropriate globals that the script expects.)_

Jest is the test framework used. You can find more information about it here: https://jestjs.io.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- FAQ -->

## FAQ

### 1. Why no polyfills?

For this sample script, we didn't see enough need for the new, native Object/Array/String methods to offset the cost of the additional code output. So, we didn't include the polyfills. But, if you see the need for them, you can easily add them by following these instructions: https://babeljs.io/docs/en/babel-polyfill.
<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- SUPPORT -->

## Support

If you encounter any issues, be sure to check our **[Troubleshooting](https://backstage.forgerock.com/knowledge/kb/article/a83789945)** pages.

Support tickets can be raised whenever you need our assistance; here are some examples of when it is appropriate to open a ticket (but not limited to):

* Suspected bugs or problems with ForgeRock software.
* Requests for assistance - please look at the **[Documentation](https://sdks.forgerock.com)** and **[Knowledge Base](https://backstage.forgerock.com/knowledge/kb/home/g32324668)** first.

You can raise a ticket using **[BackStage](https://backstage.forgerock.com/support/tickets)**, our customer support portal that provides one stop access to ForgeRock services.

BackStage shows all currently open support tickets and allows you to raise a new one by clicking **New Ticket**.

## Version History

[Our version history can be viewed by visiting our CHANGELOG.md](https://github.com/ForgeRock/forgerock-javascript-sdk/blob/master/CHANGELOG.md).

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- COLLABORATION -->

## Contributing

If you would like to contribute to this project you can fork the repository, clone it to your machine and get started.

<!-- Note: Found elsewhere, but is Java-only //-->
Be sure to check out our [Coding Style and Guidelines](https://wikis.forgerock.org/confluence/display/devcom/Coding+Style+and+Guidelines) page.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LEGAL -->

## Disclaimer

> **This code is provided by ForgeRock on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not represent or warrant or make any guarantee regarding the use of this code or the accuracy, timeliness or completeness of any data or information relating to this code, and ForgeRock hereby disclaims all warranties whether express, or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and any warranty of non-infringement. ForgeRock shall not have any liability arising out of or related to any use, implementation or configuration of this code, including but not limited to use for any commercial purpose. Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein ForgeRock resides or in which ForgeRock conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

&copy; Copyright 2020 ForgeRock AS. All Rights Reserved.

[forgerock-logo]: https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg "ForgeRock Logo"
