module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'digitalbazaar'
  ],
  parserOptions: {
    // required for BigInt support
    ecmaVersion: 2020
  }
};
