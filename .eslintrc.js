module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'semistandard',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      1,
      'single'
    ],
    'semi': [
      1,
      'never'
    ],
    'no-console': 1,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': [
      'off'
    ]
  },
  'globals': {
    'describe': true,
    'it': true,
    'docker': true,
    'after': true,
    'before': true,
    'beforeEach': true,
    'afterEach': true
  }
}
