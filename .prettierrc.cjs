// @see http://json.schemastore.org/prettierrc

module.exports = {
  arrowParens: 'always',
  plugins: [require.resolve('prettier-plugin-packagejson')],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}
