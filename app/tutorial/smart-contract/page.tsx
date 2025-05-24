/* eslint-disable react/no-unescaped-entities */

"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function SmartContractPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Smart Contract Integration
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Introduction to EDU Chain Smart Contracts
        </h2>

        <p className="text-gray-700 mb-4">
          Smart contracts can enhance your OCID and OCA integration by providing
          on-chain verification, record-keeping, and additional functionality.
          In this section, we&apos;ll explore how to create and integrate a
          smart contract on the EDU Chain.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Note:</strong> EDU Chain is compatible with the Ethereum
            Virtual Machine (EVM), so you can use standard Solidity and Ethereum
            development tools.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Achievement Registry Smart Contract
        </h2>

        <p className="text-gray-700 mb-4">
          For this tutorial, we've created an Achievement Registry contract that
          tracks tutorial completions and OCA credential claims on the
          blockchain. Let's examine the key components:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AchievementRegistry {
    address public owner;
    
    // Mapping from OCID to completion status
    mapping(string => mapping(address => bool)) public completions;
    
    // Mapping to track which users have claimed their OCA
    mapping(string => mapping(address => bool)) public ocaClaimed;
    
    // Events
    event TutorialCompleted(string ocid, address wallet, uint256 timestamp);
    event OCACredentialClaimed(string ocid, address wallet, uint256 timestamp);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Records a user's completion of the tutorial
     * @param ocid The Open Campus ID of the user
     * @param wallet The wallet address of the user
     */
    function recordCompletion(string memory ocid, address wallet) external onlyOwner {
        require(bytes(ocid).length > 0, "OCID cannot be empty");
        require(wallet != address(0), "Invalid wallet address");
        require(!completions[ocid][wallet], "Tutorial already completed");
        
        completions[ocid][wallet] = true;
        emit TutorialCompleted(ocid, wallet, block.timestamp);
    }
    
    /**
     * @dev Checks if a user has completed the tutorial
     * @param ocid The Open Campus ID of the user
     * @param wallet The wallet address of the user
     * @return Whether the user has completed the tutorial
     */
    function hasCompleted(string memory ocid, address wallet) external view returns (bool) {
        return completions[ocid][wallet];
    }
    
    /**
     * @dev Records that a user has claimed their OCA credential
     * @param ocid The Open Campus ID of the user
     * @param wallet The wallet address of the user
     */
    function recordOCAClaim(string memory ocid, address wallet) external onlyOwner {
        require(bytes(ocid).length > 0, "OCID cannot be empty");
        require(wallet != address(0), "Invalid wallet address");
        require(completions[ocid][wallet], "Must complete tutorial first");
        require(!ocaClaimed[ocid][wallet], "OCA already claimed");
        
        ocaClaimed[ocid][wallet] = true;
        emit OCACredentialClaimed(ocid, wallet, block.timestamp);
    }
    
    /**
     * @dev Checks if a user has claimed their OCA credential
     * @param ocid The Open Campus ID of the user
     * @param wallet The wallet address of the user
     * @return Whether the user has claimed their OCA credential
     */
    function hasClaimedOCA(string memory ocid, address wallet) external view returns (bool) {
        return ocaClaimed[ocid][wallet];
    }
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-teal-600 mt-6 mb-3">
          Key Features
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>User Tracking:</strong> Maps OCID and wallet address to
              completion status
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>Event Emission:</strong> Logs tutorial completions and OCA
              claims on the blockchain
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>Security:</strong> Uses onlyOwner modifier to restrict
              sensitive functions
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>Validation:</strong> Includes necessary checks to ensure
              data integrity
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Deploying the Smart Contract
        </h2>

        <p className="text-gray-700 mb-4">
          To deploy the Achievement Registry contract to EDU Chain, you&apos;ll
          need to follow these steps:
        </p>

        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            <li>
              <strong>Set up a development environment</strong>
              <p className="ml-6 mt-1">
                Use Hardhat or Truffle for a streamlined development experience.
              </p>
              <div className="bg-gray-100 p-2 rounded text-sm ml-6 mt-1">
                <pre>
                  npm install --save-dev hardhat
                  @nomicfoundation/hardhat-toolbox
                </pre>
              </div>
            </li>

            <li>
              <strong>Configure your deployment settings</strong>
              <p className="ml-6 mt-1">
                Update your Hardhat configuration to target the EDU Chain
                network.
              </p>
              <div className="bg-gray-100 p-2 rounded text-sm ml-6 mt-1">
                <pre>{`// hardhat.config.js
module.exports = {
  networks: {
    educhain: {
      url: "https://rpc.educhain.dev",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43514
    }
  },
  solidity: "0.8.19"
}`}</pre>
              </div>
            </li>

            <li>
              <strong>Deploy the contract</strong>
              <p className="ml-6 mt-1">
                Create a deployment script and run it with Hardhat.
              </p>
              <div className="bg-gray-100 p-2 rounded text-sm ml-6 mt-1">
                <pre>{`// scripts/deploy.js
async function main() {
  const AchievementRegistry = await ethers.getContractFactory("AchievementRegistry");
  const achievementRegistry = await AchievementRegistry.deploy();
  await achievementRegistry.deployed();
  console.log("AchievementRegistry deployed to:", achievementRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});`}</pre>
              </div>

              <div className="bg-gray-100 p-2 rounded text-sm ml-6 mt-2">
                <pre>npx hardhat run scripts/deploy.js --network educhain</pre>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Important:</strong> Store your contract address securely
            after deployment. You&apos;ll need it to interact with the contract
            from your frontend application.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Integrating with the Frontend
        </h2>

        <p className="text-gray-700 mb-4">
          To interact with your deployed contract from the frontend, you&apos;ll
          need Web3.js or Ethers.js. Let&apos;s see how to set up the contract
          interaction utilities:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// lib/contract.ts
import Web3 from 'web3';

// ABI for the AchievementRegistry contract (simplified for illustration)
const AchievementRegistryABI = [
  /* Contract ABI here */
];

// Replace with your deployed contract address
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

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
}`}</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Using the Contract in Your Application
        </h2>

        <p className="text-gray-700 mb-4">
          Now that you have your contract deployed and utilities set up, you can
          use them in your application components. Here's an example of how to
          record a tutorial completion:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// Example component using the contract
import { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { recordCompletion } from "@/lib/contract";

function CompletionClaim() {
  const { ocAuth } = useOCAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [txHash, setTxHash] = useState("");
  
  const handleRecordCompletion = async () => {
    setIsRecording(true);
    try {
      const authState = ocAuth.getAuthState();
      const ocid = authState.OCId;
      const walletAddress = authState.ethAddress;
      
      if (!ocid || !walletAddress) {
        throw new Error("Missing OCID or wallet address");
      }
      
      const tx = await recordCompletion(ocid, walletAddress);
      setTxHash(tx.transactionHash);
      
      // Additional logic after successful recording
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsRecording(false);
    }
  };
  
  return (
    <div>
      <button 
        onClick={handleRecordCompletion} 
        disabled={isRecording}
      >
        {isRecording ? "Recording..." : "Record Completion"}
      </button>
      
      {txHash && (
        <div>
          <p>Transaction recorded!</p>
          <a 
            href={\`https://explorer.educhain.dev/tx/\${txHash}\`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on EDU Chain Explorer
          </a>
        </div>
      )}
    </div>
  );
}`}</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Advanced Smart Contract Features
        </h2>

        <p className="text-gray-700 mb-4">
          You can extend your smart contract with additional features to enhance
          your application:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Token-Gated Access
            </h3>
            <p className="text-gray-700">
              Implement functions that provide special access or features to
              users who have completed specific achievements or hold certain
              credentials.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Achievement Badges as NFTs
            </h3>
            <p className="text-gray-700">
              Extend your contract to mint NFT badges for different
              achievements, creating a visual representation of accomplishments
              that users can showcase.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              On-Chain Verification
            </h3>
            <p className="text-gray-700">
              Create functions that can verify the authenticity of an OCA
              credential directly on-chain, enabling other smart contracts to
              integrate with your achievement system.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 mt-8">
          <p className="text-blue-700">
            <strong>Best Practice:</strong> When working with smart contracts,
            always thoroughly test your code on a testnet before deploying to
            the main EDU Chain. Consider getting a security audit for complex
            contracts that handle sensitive data or transactions.
          </p>
        </div>
      </div>

      <TutorialNavigation />
    </div>
  );
}
