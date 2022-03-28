[![GitLab Status](https://gitlab.parity.io/parity/parity-signer-companion/badges/main/pipeline.svg)](https://gitlab.parity.io/parity/parity-signer-companion/pipelines)

# Parity Signer Companion

The extension helps you to sign transactions with keys you store in the [Parity Signer](https://www.parity.io/technologies/signer/). To start using, you should go to the Signer and import keys.

Without the Signer the extension is useless. If you want to create and store keys without any device, look at [Polkadot{.js} extension](https://github.com/polkadot-js/extension).

## Installation

#### https://parity.link/signer-companion redirects to the correct extension automatically

[Chrome Web Store](https://chrome.google.com/webstore/detail/parity-signer-companion/damllfnhhcbmclmjilomenbhkappdjgb/)<br/>
[Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/parity-signer-companion/)

## Development

We whitelist dependency lifecycle scripts (eg. "postinstall") via [@lavamoat/allow-scripts](https://github.com/LavaMoat/LavaMoat/tree/main/packages/allow-scripts) so you should install dependencies running `yarn setup` instead of just `yarn`.

To start developing run in your terminal:
```bash
yarn setup
yarn dev
```

Then open `./build` folder in your browser as an unpacked extension. To refresh the extension after code changes reopen it's popup or refresh page if the extension runs as a webpage.

## Acknowledgements

The extension based on [Polkadot{.js} extension](https://github.com/polkadot-js/extension). Thanks to the contributers.

