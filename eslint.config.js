import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  prettier, // Disables ESLint rules that conflict with Prettier
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly'
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error', // Ensures Prettier formatting rules
      'no-console': 'warn', // Warns for console logs
      'no-unused-vars': 'warn', // Warns for unused variables
      eqeqeq: 'error' // Enforces strict equality
    }
  }
];
