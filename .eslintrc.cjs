module.exports = {
    env: {
      es2021: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended' // Enables Prettier rules in ESLint
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'eqeqeq': 'error'
    }
  };
  