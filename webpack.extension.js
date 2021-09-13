// eslint-disable-next-line @typescript-eslint/no-var-requires
const createConfig = require('./webpack.shared.js')

module.exports = createConfig(
  { extension: './src/extension.ts' },
  {
    '@polkadot/wasm-crypto-wasm/data.js': require.resolve(
      '@polkadot/wasm-crypto-wasm/empty'
    ),
  }
)
