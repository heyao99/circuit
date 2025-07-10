import { getAddress } from 'viem';

export default async function(contractAddress, chainId = 1, matchType = 'full_match') {
  const baseUrl = `https://repo.sourcify.dev/contracts/${matchType}/${chainId}/${getAddress(contractAddress)}/`;
  const response = await fetch(baseUrl + 'metadata.json');
  
  // Check if the response is successful
  if (!response.ok) {
    if(response.status === 404) return null;
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  // Parse the response JSON
  const data = await response.json();

  // Extract/load the Solidity source code
  const soliditySource = data.sources;
  for(let file of Object.keys(soliditySource)) {
    if(!('content' in soliditySource[file])) {
      const fileResponse = await fetch(baseUrl + 'sources/' + file);
      soliditySource[file].content = await fileResponse.text();
    }
  }

  // Returning the Solidity source code
  return soliditySource;
}
