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
