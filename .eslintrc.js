module.exports = {
  extends: 'qb',
  plugins: ['react'],
  parserOptions: {
    "ecmaVersion": 2017,
    ecmaFeatures: {
      jsx: true
    }
  },
  'rules': {
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'all',
      'ignoreRestSiblings': false,
      'argsIgnorePattern': 'req'
    }],
    'id-length': ['error', {min: 2, exceptions: ['h']}],
    'id-blacklist': ['off'],
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'h' }],
    'react/jsx-uses-vars': ['error'],
    'no-magic-numbers': ['off']
  }
};
