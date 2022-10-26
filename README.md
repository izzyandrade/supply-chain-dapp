# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system.

## Diagrams

Inside this repository you can find a folder named "diagrams", there you will find the diagrams I have built to when architecturing this project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/izzyandrade/supply-chain-dapp
```

Change directory to `supply-chain` folder and install all requisite npm packages (as listed in `package.json`):

```
cd supply-chain
npm install
```

Launch Truffle Development:

```
truffle develop
```

Inside truffle development console, you can run a few commands:

```
compile
```

This will create the smart contract artifacts in folder `build\contracts`.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
migrate
```

Test smart contracts:

```
test
```

All tests should pass.

In a separate terminal window, go to the frontend folder, install dependencies, and launch the DApp:

```
cd frontend
npm install
npm start
```

## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

- Solidity
- Ganache-cli
- Truffle

(Goerli Network)

## Contracts and Transactions

Buyer Role:

- TX Hash: 0x8879cc19f698591666d8775a8d95eb1f9bf479c3b4f5497c12703eb593634fbc
- Contract Address: 0x35a7D843155B8EC1dfcE46eeD0a6508dB7ED1C9a

Pharma Role:

- TX Hash: 0x45e30acd515b3a7fbcb6e70b2ff56478710067df1f1b3161ddc4cc9ef01abddf
- Contract Address: 0x949c1f0B909FD976Da5C5bf05E94719Ce0Dc2c22

Regulator Role:

- TX Hash: 0xebabb9807c88d7a04a6f1ab91f611d993d4a8aa8bb5ef500b48a329f1c6f894d
- Contract Address: 0xF4eAC352421927DF4d94805A32201E9b45020C96

Supply Chain:

- TX Hash: 0x0ebee3929adc3516f1f2f793ecce201070584eb548159afdfd53197e424b997e
- Contract Address: 0xeFbf60EeBCFC9B063301845c4296b86740a6202C

Ownable:

- TX Hash: 0xfdfda42a34f737d995e70965451842d55bf539c3896b278ca44f9493bad712ff
- Contract Address: 0x4C4D9EaeC39A9334D966Af909fCb469cDA8EB34C

## Libraries

- react: used to build the frontend
- react-router-dom: React library used to handle navigation inside the app
- web3: used to communicate with Ethereum and Metamask
- styled-components: styling library for React JS that allows you to create an pre-styled component for better code reading
- @truffle/hdwallet-provider: used to configure Truffle with correct network and account addresses to use
