module.exports = {
  'env': {
    'node': true,
    'amd': true,
  },
  'extends': ['eslint:recommended', 'plugin:node/recommended'],
  'rules': {
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'node/no-unpublished-require': ['error', { 'allowModules': ['mocha'] }]
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  overrides: [
    // node files
    {
      files: [
        'tests/dummy/**/*.js',
      ],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
      },
      env: {
        browser: true,
        node: false
      },
      rules: {
        'node/no-unsupported-features/es-syntax': ['never']
      }
    },
    {
      files: [
        'helper-finder.js',
        'index.js'
      ],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
      },
      rules: {
        'node/no-unsupported-features/es-syntax': ['never']
      }
    }
  ]

};