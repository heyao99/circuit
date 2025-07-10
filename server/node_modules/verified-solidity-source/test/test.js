import {strictEqual} from 'node:assert';

import sourcify from '../src/sourcify.js';
import etherscan from '../src/etherscan.js';
import verifiedSource from '../index.js';

describe('verified-solidity-source', () => {
  it('gets same response from all', async () => {
    // null on 404
    await assertSame('0x5ed4a410a612f2fe625a8f3cb4d70f197ff8c8cf', 1);

    // single-file contracts
    await assertSame('0x5ed4a410a612f2fe625a8f3cb4d70f197ff8c8be', 1);

    // multi-file contracts
    await assertSame('0x8644C2B4293923BF60c909171F089f4c5F75474c', 11155111);
  });
});

async function assertSame(testAddress, chainId) {
  const results = [];
  results.push(await verifiedSource(testAddress, chainId));
  results.push(await sourcify(testAddress, chainId));
  await delay(5500); // Prevent 429s from no etherscan API key
  results.push(await etherscan(testAddress, chainId));

  if(results[0] === null) {
    for(let i = 1; i<results.length; i++) {
      strictEqual(results[i], null);
    }
    return;
  }

  const fileCount = Object.keys(results[0]).length;
  for(let i = 1; i<results.length; i++) {
    strictEqual(Object.keys(results[i]).length, fileCount);
    if(fileCount === 1) {
      // filenames won't match if it's a single file
      const res0File0 = Object.keys(results[0])[0];
      const resIFile0 = Object.keys(results[i])[0];
      strictEqual(res0File0.content, resIFile0.content);
    } else {
      // filenames must match if it's multi-file
      for(let file of Object.keys(results[0])) {
        strictEqual(results[0][file].content, results[i][file].content);
      }
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
