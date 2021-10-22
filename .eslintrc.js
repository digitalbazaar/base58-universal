module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'digitalbazaar'
  ],
  parserOptions: {
    // required for BigInt support
    ecmaVersion: 2020
  }
};
