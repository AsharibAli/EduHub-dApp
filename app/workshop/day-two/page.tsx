"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WorkshopProgress from "@/components/WorkshopProgress";
import { Maximize2 } from "lucide-react";

export default function DayTwo() {
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

  const openFullSize = (src: string) => {
    setFullSizeImage(src);
  };

  const closeFullSize = () => {
    setFullSizeImage(null);
  };

  return (
    <div className="space-y-8">
      {/* Workshop Progress */}
      <WorkshopProgress />

      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Building Blockchain dApps - Day 2
      </h1>

      {/* Video Recording Section */}
      <div className="bg-teal-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">
          Day 2 Recorded Session
        </h2>
        <p className="mb-4">
          Watch the recorded session for Day 2 of our blockchain bootcamp:
        </p>
        <a
          href="https://drive.google.com/drive/folders/1LCMO0Sr0B5SiSLpS4DdhcUbGRG-GpDpq?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Watch Recording
          </Button>
        </a>
      </div>

      {/* Day 2 Banner - resize to be smaller but not as small as day-one images */}
      <div
        className="w-full max-w-3xl mx-auto relative cursor-pointer mb-10 group"
        onClick={() => openFullSize("/bootcamp-day-two.jpg")}
      >
        <Image
          src="/bootcamp-day-two.jpg"
          alt="Bootcamp Day Two"
          width={900}
          height={500}
          className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity shadow-md"
        />
        <div className="absolute bottom-3 right-3 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>

      {/* Main content sections */}
      <div className="space-y-12">
        {/* Introduction to Building dApps */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Introduction to Building Decentralized Applications (dApps)
          </h2>
          <p className="text-gray-700 mb-4">
            Decentralized Applications (dApps) combine traditional frontend
            technologies with backend logic that runs on a blockchain. Unlike
            conventional web applications that rely on centralized servers,
            dApps leverage the power of blockchain to create trustless,
            transparent, and censorship-resistant applications.
          </p>
          <p className="text-gray-700 mb-4">
            Today, we'll explore the core components of a blockchain dApp, the
            technologies involved, and how they interact with each other to
            create powerful decentralized solutions.
          </p>
        </section>

        {/* Component Architecture */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            dApp Component Architecture
          </h2>

          <div className="bg-teal-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">
              Frontend
            </h3>
            <p className="text-gray-700 mb-3">
              The frontend is the user-facing part of a dApp. It's typically
              built using web technologies like:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-3 pl-4">
              <li>HTML, CSS, and JavaScript for basic structure and styling</li>
              <li>
                Modern frameworks/libraries such as React, Vue, or Angular
              </li>
              <li>UI component libraries for rapid development</li>
              <li>Web3 libraries to connect with blockchain and wallets</li>
            </ul>
            <p className="text-gray-700">
              The frontend handles user interactions, form submissions, and
              displaying data from the blockchain. It communicates with the
              blockchain via special libraries and wallet connections.
            </p>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">
              Ethereum Blockchain Backend
            </h3>
            <p className="text-gray-700 mb-3">
              Ethereum is one of the most popular blockchain platforms for
              building dApps. It provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-3 pl-4">
              <li>
                A decentralized computing platform for running smart contracts
              </li>
              <li>
                The Ethereum Virtual Machine (EVM) that executes code across the
                network
              </li>
              <li>
                A state management system that keeps track of all accounts and
                data
              </li>
              <li>
                Consensus mechanism to validate and add transactions to the
                blockchain
              </li>
              <li>
                Native cryptocurrency (Ether) for transaction fees and value
                transfer
              </li>
            </ul>
            <p className="text-gray-700">
              The Ethereum blockchain serves as a decentralized database and
              computation layer for your dApp. All transaction data and smart
              contract states are stored on-chain, making them transparent and
              immutable.
            </p>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">
              Smart Contracts
            </h3>
            <p className="text-gray-700 mb-3">
              Smart contracts are self-executing programs that run on the
              blockchain. They represent the core logic of your dApp:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-3 pl-4">
              <li>
                Written in languages like Solidity (for Ethereum) or Rust (for
                Solana)
              </li>
              <li>Execute automatically when predefined conditions are met</li>
              <li>
                Store data on the blockchain in a transparent and tamper-proof
                way
              </li>
              <li>Define rules for how users can interact with your dApp</li>
              <li>Eliminate the need for intermediaries in transactions</li>
            </ul>
            <p className="text-gray-700">
              Smart contracts are the backbone of your dApp's business logic.
              They define the rules, manage state, and execute transactions in a
              trustless environment.
            </p>
          </div>
        </section>

        {/* Key Technologies and Tools */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Essential Technologies and Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Ethers.js / Web3.js
              </h3>
              <p className="text-gray-700 mb-3">
                These JavaScript libraries enable frontend applications to
                interact with the Ethereum blockchain:
              </p>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>Connect to Ethereum nodes and networks</li>
                <li>Create and manage wallet connections</li>
                <li>Read data from smart contracts</li>
                <li>Send transactions to smart contracts</li>
                <li>Listen for blockchain events</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Hardhat / Truffle
              </h3>
              <p className="text-gray-700 mb-3">
                Development environments for building, testing, and deploying
                smart contracts:
              </p>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>Local blockchain environments for testing</li>
                <li>Tooling for compiling smart contracts</li>
                <li>Testing frameworks for contract validation</li>
                <li>Deployment scripts for various networks</li>
                <li>Plugins for additional functionality</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                MetaMask
              </h3>
              <p className="text-gray-700 mb-3">
                A browser extension and mobile app that serves as an Ethereum
                wallet and gateway to dApps:
              </p>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>Allows users to manage Ethereum accounts</li>
                <li>Securely stores private keys</li>
                <li>Signs transactions and messages</li>
                <li>Connects dApps to the Ethereum blockchain</li>
                <li>Supports multiple networks and custom RPC endpoints</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                RPC (Remote Procedure Call)
              </h3>
              <p className="text-gray-700 mb-3">
                JSON-RPC endpoints allow applications to communicate with
                blockchain nodes:
              </p>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>API for interacting with blockchain nodes</li>
                <li>Enables reading blockchain data</li>
                <li>Facilitates transaction submission</li>
                <li>Available as public endpoints or self-hosted</li>
                <li>
                  Services like Infura and Alchemy provide reliable RPC access
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">
              Oracles
            </h3>
            <p className="text-gray-700 mb-3">
              Blockchain oracles connect smart contracts with external,
              real-world data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-3 pl-4">
              <li>Bridge between blockchain and external data sources</li>
              <li>Provide real-world information to smart contracts</li>
              <li>Enable contracts to react to external events</li>
              <li>
                Services like Chainlink provide decentralized oracle networks
              </li>
              <li>
                Critical for dApps that need off-chain data (prices, weather,
                sports results, etc.)
              </li>
            </ul>
            <p className="text-gray-700">
              Oracles solve the "oracle problem" - smart contracts' inability to
              access data outside the blockchain, enabling more complex and
              real-world use cases for dApps.
            </p>
          </div>
        </section>

        {/* dApp Development Workflow */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            dApp Development Workflow
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-4 pl-4">
            <li className="font-semibold">
              <span className="font-normal">
                Design the smart contracts that will handle your dApp's core
                logic
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Implement and test smart contracts in a local development
                environment
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Deploy contracts to a testnet for further testing and validation
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Build a frontend application that interacts with your smart
                contracts
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Integrate wallet connection (like MetaMask) for user
                authentication
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Test the full application flow with real blockchain interactions
              </span>
            </li>
            <li className="font-semibold">
              <span className="font-normal">
                Deploy both the frontend and smart contracts to production
              </span>
            </li>
          </ol>
        </section>

        {/* Challenges and Considerations */}
        <section>
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Challenges and Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Technical Challenges
              </h3>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>
                  Smart contract immutability - code can't be changed after
                  deployment
                </li>
                <li>Gas optimization for cost-effective execution</li>
                <li>Managing asynchronous blockchain interactions</li>
                <li>Handling transaction failures and reverts</li>
                <li>Complex testing requirements</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                User Experience Considerations
              </h3>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li>Transaction fees and wait times</li>
                <li>Wallet setup and management for new users</li>
                <li>Data loading states and confirmations</li>
                <li>Error handling and user feedback</li>
                <li>Bridging Web2 user expectations with Web3 realities</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Learning Resources Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-3">
          Learning Resources
        </h2>
        <ul className="list-disc list-inside text-gray-700 pl-4">
          <li>
            <a
              href="https://www.youtube.com/watch?v=6aF6p2VUORE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Blockchain Full Course - Hindi / Urdu
            </a>
          </li>
          <li>
            <a
              href="https://updraft.cyfrin.io/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Multiple Free Courses on Blockchain - Updraft
            </a>
          </li>
          <li>
            <a
              href="https://www.hackquest.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Web3 Programming for Everyone - HackQuest
            </a>
          </li>
          <li>
            <a
              href="https://www.hackquest.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Together We Rise In Web3 - RiseIn
            </a>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <Link href="/workshop/day-one">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            ← Back to Day 1
          </Button>
        </Link>
        <Link href="/workshop/day-three">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Continue to Day 3
          </Button>
        </Link>
      </div>

      {/* Full-size image modal */}
      {fullSizeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeFullSize}
        >
          <div className="relative max-w-5xl max-h-screen">
            <button
              onClick={closeFullSize}
              className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
            <Image
              src={fullSizeImage}
              alt="Full size image"
              width={1200}
              height={800}
              className="max-h-screen w-auto h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
