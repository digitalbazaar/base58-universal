module.exports = {
  plugins: ['@babel/plugin-transform-modules-commonjs'],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 12
        },
      },
    ],
  ],
};
