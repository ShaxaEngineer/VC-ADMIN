/* eslint-disable no-undef */
module.exports = {
  createOldCatalogs: false,
  // Save the \_old files

  indentation: 2,
  // Indentation of the catalog files

  keepRemoved: false,
  // Keep keys from the catalog that are no longer in code

  // see below for more details
  lexers: {
    js: ['JsxLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },

  // lineEnding: 'auto',
  // Control the line ending. See options at https://github.com/ryanve/eol

  locales: ['uz', 'en', 'ru', 'kril'],
  // An array of the locales in your applications

  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: ['src/**/*.{js,jsx,ts,tsx}', 'src/components/**/*.{js,jsx,ts,tsx}'],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file

  sort: true,
  // Whether to sort the catalog

  // useKeysAsDefaultValue: false,
  // fallbackKeys: true,
  // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
  // The option `defaultValue` will not work if this is set to true

  verbose: true,
  // Display info about the parsing including some stats
  // Display info about the parsing including some stats
  keySeparator: false, // Disable key separation
  namespaceSeparator: false, // Disable namespace separation
};
