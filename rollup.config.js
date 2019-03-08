import typescript from 'rollup-plugin-typescript2'
import {uglify} from 'rollup-plugin-uglify'
import pkg from './package.json'

const commonPlugins = [
  typescript()
]

const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
}

const umdConfig = {
  ...baseConfig,
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'utils'
  },
  plugins: [
    ...commonPlugins,
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      }
    })
  ]
}

const esmConfig = {
  ...baseConfig,
  output: {
    file: pkg.module,
    format: 'es'
  },
  plugins: [
    ...commonPlugins
  ]
}

export default [umdConfig, esmConfig]
