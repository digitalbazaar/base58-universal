# base58-universal ChangeLog

## 2.0.0 -

## Added
- Add default exports to help with some import patterns in other module and
  CommonJS code.

### Changed
- **BREAKING**: Update Node.js requirement to v12. Due to modern test tools
  dropping older Node.js version support. The code itself may still work with
  older Node.js versions.
- Set package `type` to `module`.
- Add package `exports` for `import` and `require`.
- Change `.js` to `.cjs` as needed.
- Move testing from Travis CI to GitHub Actions.
- Update dependencies.
- Switch tests to ESM.

## 1.0.0 - 2020-01-24

- Initial version.
- See git history.
