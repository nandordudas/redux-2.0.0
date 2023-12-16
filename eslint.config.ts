import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    react: true,
  },
  {
    files: ['**/*.ts'],
    rules: {
      'complexity': ['error', 5],
      'import/order': ['error', {
        'alphabetize': { caseInsensitive: true, order: 'asc' },
        'groups': ['external', 'builtin', ['sibling', 'parent'], 'index', 'object'],
        'newlines-between': 'always',
        'pathGroups': [
          { group: 'external', pattern: '~/**', position: 'after' },
        ],
      }],
      'perfectionist/sort-objects': 'error',
    },
  },
)
