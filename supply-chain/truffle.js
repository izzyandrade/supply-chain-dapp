const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: ['insert your private key here'],
          providerOrUrl: 'insert your infura URL here',
          addressIndex: 0,
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/",
        }),
      network_id: '5',
    },
  },
  compilers: {
    solc: {
      version: '>=0.8.7',
    },
  },
};
