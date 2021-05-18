module.exports = {
  'env': {
    'node': true,
    'es6': true,
  },
  'extends': 'eslint:recommended',
  'globals': {
    'process': true,
  },
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  'rules': {
    'space-before-function-paren': ['error', 'always'],
    'indent': ['error', 2],
    'no-console': 'error',
    'no-tabs': 'error',
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'prefer-const': ['warn', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false,
    }],
    'linebreak-style': 0,
    'no-var': 'error',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'require-await': 'error',
  },
};
