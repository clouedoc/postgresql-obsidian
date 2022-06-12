// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: [ "@rushstack/eslint-config/profile/node", "@rushstack/eslint-config/mixins/friendly-locals" ],  // <---- put your profile string here
  parserOptions: { tsconfigRootDir: __dirname },

}

module.exports = config