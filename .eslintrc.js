module.exports = {
  extends: 'eslint:recommended',
  parser: '@babel/eslint-parser',
  globals: {
    console: 'readonly',
    deviceProfilesDao: 'readonly',
    logger: 'readonly',
    module: 'writable',
    outcome: 'writable',
    process: 'readonly',
    require: 'readonly',
    sharedState: 'readonly',
  },
  root: true,
  overrides: [{
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    files: ['*.ts'],
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
  }]
};
