module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-console': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-const': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
