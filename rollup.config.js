import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: ['index.js', 'helper-finder.js'],
  plugins: [multiEntry()],
  output: { 
    file: 'dist/index.js',
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