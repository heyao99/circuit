import hre from 'hardhat';
import solc from 'solc';

export async function compileSol(source) {
  // compile the contract
  const input = {
    language: 'Solidity',
    sources: {
      'TestVerifier.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode.object'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contractName = Object.keys(output.contracts['TestVerifier.sol'])[0];
  const bytecode = output.contracts['TestVerifier.sol'][contractName].evm.bytecode.object;
  const abi = output.contracts['TestVerifier.sol'][contractName].abi;

  // deploy the contract
  const signer = (await hre.ethers.getSigners())[0];
  const ContractFactory = new hre.ethers.ContractFactory(abi, bytecode, signer);
  const contract = await ContractFactory.deploy();
  await contract.waitForDeployment();

  return contract;
}
