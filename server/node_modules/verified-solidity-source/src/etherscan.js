export default async function(address, chainId = 1) {
  if(!apiUrls.hasOwnProperty(String(chainId)))
    throw new Error('invalid_etherscan_chain_id');

  // No API key required to fetch source
  const resp = await fetch(
    apiUrls[chainId] +
    '?module=contract' +
    '&action=getsourcecode' +
    '&address=' + address
  );
  const data = await resp.json();
  if(!data.result[0].SourceCode) {
    return null;
  }

  let sources;
  let code = data.result[0].SourceCode;
  // Some Etherscans have double curlies, some don't?
  if(code.indexOf('{{') === 0) {
    code = code.slice(1, -1);
  }
  if(code.indexOf('{') === 0) {
    // Etherscan provided an object with multiple solidity sources
    const inner = JSON.parse(code);
    sources = Object.keys(inner.sources).reduce((out, file) => {
      out[file] = { content: inner.sources[file].content.replaceAll('\r\n', '\n') };
      return out;
    }, {});
  } else {
    // Some Etherscans send just a string if it's one file
    sources = { 'verifier.sol': {content: code.replaceAll('\r\n', '\n')} };
  }
  return sources;
}

const apiUrls = {
  17000: 'https://api-holesky.etherscan.io/api',
  11155111: 'https://api-sepolia.etherscan.io/api',
  1: 'https://api.etherscan.io/api',
  10: 'https://api-optimistic.etherscan.io/api',
  11155420: 'https://api-sepolia-optimistic.etherscan.io/api',
  137: 'https://api.polygonscan.com/api',
  80002: 'https://api-amoy.polygonscan.com/api',
  2442: 'https://api-cardona-zkevm.polygonscan.com/api',
  250: 'https://api.ftmscan.com/api',
  42161: 'https://api.arbiscan.io/api',
  42170: 'https://api.arbiscan.io/api',
  421614: 'https://api-sepolia.arbiscan.io/api',
  100: 'https://api.gnosisscan.io/api',
  42220: 'https://api.celoscan.io/api',
  8453: 'https://api.basescan.org/api'
};
