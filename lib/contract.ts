import Web3 from 'web3';

// ABI for the AchievementRegistry contract (simplified for illustration)
const AchievementRegistryABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "ocid",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "CompletionRecorded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ocid",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "hasCompleted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ocid",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "recordCompletion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// This is a demo contract address - replace with your actual deployed contract
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Records a tutorial completion on the blockchain
 * 
 * Note: This is a demo function and not actively used in the application.
 * It's provided as an example of how contract interaction would work.
 */
export async function recordCompletion(ocid: string, walletAddress: string) {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3 = new Web3(window.ethereum as any);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const achievementRegistry = new web3.eth.Contract(
        AchievementRegistryABI as any,
        CONTRACT_ADDRESS
      );
      
      const tx = await achievementRegistry.methods
        .recordCompletion(ocid, walletAddress)
        .send({ from: (await web3.eth.getAccounts())[0] });
      
      return tx;
    }
    throw new Error('Ethereum provider not available');
  } catch (error) {
    console.error("Error recording completion:", error);
    throw error;
  }
}

/**
 * Checks if a user has completed the tutorial according to the blockchain
 * 
 * Note: This is a demo function and not actively used in the application.
 * It's provided as an example of how contract interaction would work.
 */
export async function checkCompletion(ocid: string, walletAddress: string) {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3 = new Web3(window.ethereum as any);
      
      const achievementRegistry = new web3.eth.Contract(
        AchievementRegistryABI as any,
        CONTRACT_ADDRESS
      );
      
      return await achievementRegistry.methods
        .hasCompleted(ocid, walletAddress)
        .call();
    }
    return false;
  } catch (error) {
    console.error("Error checking completion:", error);
    return false;
  }
} 