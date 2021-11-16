import { SigningRequest } from '@polkadot/extension-base/background/types'
import { atom, onStart } from 'nanostores'
import { subscribeSigningRequests } from '../messaging/uiActions'

// [
//   {
//     account: {
//       address: '5FKmibvGwaP4HPAfwvmEHUYTwCfEv6oHJ2psAvBc2NLVrbRr',
//       genesisHash:
//         '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
//       name: 'Qqq',
//       isExternal: true,
//       whenCreated: 1631806811497,
//     },
//     id: '1631807962840.2',
//     request: {
//       payload: {
//         specVersion: '0x00002382',
//         transactionVersion: '0x00000005',
//         address: '5FKmibvGwaP4HPAfwvmEHUYTwCfEv6oHJ2psAvBc2NLVrbRr',
//         blockHash:
//           '0xbf220f228f0a4562525a070d610f4e74d9a08779f7482c5abc18c4ea27a7fb70',
//         blockNumber: '0x0070da29',
//         era: '0x9502',
//         genesisHash:
//           '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
//         method:
//           '0x0403008eb591f1deaaeb4901fcabbbd3a809eccb421aca906c38dcb5bf9dad8145d04e0700e8764817',
//         nonce: '0x00000000',
//         signedExtensions: [
//           'CheckSpecVersion',
//           'CheckTxVersion',
//           'CheckGenesis',
//           'CheckMortality',
//           'CheckNonce',
//           'CheckWeight',
//           'ChargeTransactionPayment',
//         ],
//         tip: '0x00000000000000000000000000000000',
//         version: 4,
//       },
//     },
//     url: 'https://polkadot.js.org/apps/#/accounts',
//   },
// ]
export const signRequestsStore = atom<SigningRequest[]>([])

onStart(signRequestsStore, () => {
  subscribeSigningRequests(signRequestsStore.set).catch(console.error)
})
