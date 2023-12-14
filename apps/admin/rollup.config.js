import pkg from '#package.json' assert { type: 'json' }
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const external = Object.keys(pkg.dependencies).concat(['#package.json'])
const plugins = [json(), typescript()]

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser())
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  external,
  plugins
}
