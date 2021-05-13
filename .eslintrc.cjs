module.exports = {
  root: true,
  extends: [
    'eslint-config-digitalbazaar'
  ],
  env: {
    node: true
  },
  ignorePatterns: ['dist/'],
  rules: {
    'jsdoc/check-examples': 'off'
  }
};
