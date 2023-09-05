# Arthera Hardhat Template

An example implementation of a simple app that's using the native subscriptions available on Arthera. 

## Motivation

Facilitate the prototyping of decentralized apps to deploy to Arthera Testnet.

## Install

```
npm i
```

## Test

```
npx hardhat test
```

## Deploy

Create a `.env` file:

```
cp .env.example .env
```

Add your own private key in the `.env` file, then: 

```
npx hardhat run scripts/deploy.ts --network arthera-testnet
```

## Use

Change the contract address in the `utils.ts` file (line 4), and go subscribe for a dapp plan on Arthera browser wallet: 

[https://wallet-test-v2.arthera.net](https://wallet-test-v2.arthera.net/)

Make sure you're logged in with the same wallet you used to deploy your contract.

You can now whitelist a user:

```
npx hardhat run scripts/whitelist.ts --network arthera-testnet
```

Then connect with that user wallet and:

```
npx hardhat run scripts/dance.ts --network arthera-testnet
```

Remember to set a 100k gas limit when you call the dance function: 

```
await myContract.myFunction({gasLimit:100000})
```

## Versions

- Node [v20.3.0](https://nodejs.org/uk/blog/release/v20.3.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- Hardhat [v2.17.0](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.17.0)
- OpenZeppelin Contracts [v4.9.2](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.9.2)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discordapp.com/users/julienbrg), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).