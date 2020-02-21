module.exports = {
    'root': true,
    'extends': ['eslint:recommended'],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'script'
    },
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
        'mocha': true
    },
    'rules': {
      'no-console': [
          'error',
          {
              'allow': ['warn', 'error', 'info']
          }
      ],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
  }
}
