import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: ['src/helper-finder.js'],
  plugins: [multiEntry()],
  output: { 
    file: 'lib/index.js',
    format: 'cjs',
    sourceMap: 'inline',
  },
  external: [
    'globby',
    'ember-template-recast',
    'fs',
    'lodash.camelcase',
  ]
};