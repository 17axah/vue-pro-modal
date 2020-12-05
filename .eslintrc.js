module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'template-curly-spacing' : 'off',
    'indent': [
      'error',
      2,
      {
        'ignoredNodes': ['TemplateLiteral']
      }
    ]
  },
};
