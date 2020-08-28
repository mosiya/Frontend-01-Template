module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    semi: 'error',
    'no-unused-vars': 'error',
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'create',
      version: 'detect',
      flowVersion: '0.53',
    },
  },
}
