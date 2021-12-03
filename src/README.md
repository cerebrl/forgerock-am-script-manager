# Source files directory

This is where you manage your AM script source files. They can be either JavaScript files or TypeScript files.

The result of transpiling these source directories is a single JavaScript file for each directory within `src`. The file will be named from the directory in which the source files were contained.

If you need to add more global types because of TypeScript errors, you can add them to the `global.d.ts` file within this directory.
