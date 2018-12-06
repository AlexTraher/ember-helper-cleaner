module.exports = {
  'env': {
    'browser': true,
  },
  'extends': ['eslint:recommended', 'plugin:node/recommended'],
  'rules': {
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'node/no-unpublished-require': ['error', { 'allowModules': ['mocha'] }],
    'max-len': ['error', { code: 100 }],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'node/no-unsupported-features/es-syntax': ['never'],
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
};