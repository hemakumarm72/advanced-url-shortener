import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    parserOptions: {
      project: './tsconfig.json', // Link to your tsconfig.json file
      tsconfigRootDir: __dirname, // Ensure the path is resolved correctly
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
