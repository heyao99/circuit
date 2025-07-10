# snarkjs-groth16-multi-verifier

Combine multiple similar groth16 Solidity verifier contracts into one contract

Inspired by [Semaphore v4](https://semaphore.pse.dev)

## Installation for development

> [!NOTE]
> Requires [pnpm package manager](https://pnpm.io)! The tests will fail using yarn.

```
$ git clone https://github.com/circuitscan/snarkjs-groth16-multi-verifier
$ cd snarkjs-groth16-multi-verifier
$ pnpm i
$ pnpm test
```

## Usage

A single `mergeVerifiers` function is exposed

```js
import { readFileSync } from 'node:fs';

import { mergeVerifiers } from 'snarkjs-groth16-multi-verifier';

const mergedSol = mergeVerifiers(
    // First argument is an array of Groth16 verifier contracts output by SnarkJS
    [
        readFileSync('./test/contracts/semaphorev4-1.sol', 'utf8'),
        readFileSync('./test/contracts/semaphorev4-2.sol', 'utf8'),
    ],
    // Second argument is the offset for the verifyProof() function
    // A value of one means the first verifier in the array is index 1.
    1
);
```

## License

MIT
