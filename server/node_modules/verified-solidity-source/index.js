import sourcify from './src/sourcify.js';
import etherscan from './src/etherscan.js';

export default async function(address, chainId = 1) {
  for(let fetcher of [sourcify, etherscan]) {
    const response = await fetcher(address, chainId);
    if(response) return response;
  }
  return null;
}
