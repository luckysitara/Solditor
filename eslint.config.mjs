export default [
  {
    ignores: ['**/dist', '**/node_modules', '**/.wrangler', '**/bolt/build'],
  },
  {
    files: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../'],
              message: `Relative imports are not allowed. Please use '~/' instead.`,
            },
          ],
        },
      ],
    },
  },
];
