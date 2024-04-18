module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import'],
  rules: {
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'prefer-spread': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'prefer-object-spread': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'dot-notation': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    "indent": ["error", 2],
    'semi': ['error', 'always'],
  },
};

  
// module.exports = {
//   'env': {
//     'browser': true,
//     'es2021': true
//   },
//   'extends': [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react/recommended'
//   ],
//   'overrides': [
//     {
//       'env': {
//         'node': true
//       },
//       'files': [
//         '.eslintrc.{js,cjs}'
//       ],
//       'parserOptions': {
//         'sourceType': 'script'
//       }
//     }
//   ],
//   'parser': '@typescript-eslint/parser',
//   'parserOptions': {
//     'ecmaVersion': 'latest',
//     'sourceType': 'module'
//   },
//   'plugins': [
//     '@typescript-eslint',
//     'react'
//   ],
//   'rules': {
//     'indent': [
//       'error',
//       2
//     ],
//     'linebreak-style': [
//       'error',
//       'unix'
//     ],
//     'quotes': [
//       'error',
//       'single'
//     ],
//     'semi': [
//       'error',
//       'always'
//     ],
//     'react/jsx-uses-react': 'off',
//     'react/react-in-jsx-scope': 'off'
//   }
// };
