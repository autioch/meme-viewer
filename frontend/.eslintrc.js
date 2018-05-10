module.exports = {
  extends: [
    'react-app',
    'qb'
  ],
  plugins: ['react'],
  parserOptions: {
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
    'no-process-env': ['off'],
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'h' }],
    'react/jsx-uses-vars': ['error']
  }
};
