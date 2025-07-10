# verified-solidity-source

NPM package to fetch the Solidity source for a contract deployed on any EVM chain

Supports:

* Sourcify
* Etherscan

## Installation

```
npm install verified-solidity-source
```

## Usage

This package exports a single async function that accepts 2 parameters: contract address and chain id.

The first matching result is returned.

```js
import verifiedSource from 'verified-solidity-source';


const sources = await verifiedSource('0x8644C2B4293923BF60c909171F089f4c5F75474c', 11155111);
// { '<filename>': { content: '<solidity source>' }
```

## See Also

* [@nomicfoundation/hardhat-verify](https://www.npmjs.com/package/@nomicfoundation/hardhat-verify) to go the other way and submit sources to block exporers

## License

MIT
