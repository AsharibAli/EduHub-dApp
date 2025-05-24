"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WorkshopProgress from "@/components/WorkshopProgress";
import { Maximize2 } from "lucide-react";

export default function DayThree() {
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
        Practical dApp Development - Day 3
      </h1>

      {/* Video Recording Section */}
      <div className="bg-teal-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">
          Day 3 Recorded Session
        </h2>
        <p className="mb-4">
          Watch the recorded session for Day 3 of our blockchain bootcamp:
        </p>
        <a
          href="https://drive.google.com/drive/folders/1LmezxJSL1cZsRZb9txZHJoKSTeW_nEcH?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Watch Recording
          </Button>
        </a>
      </div>

      {/* Repo Link Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-3">
          Workshop Repository
        </h2>
        <p className="mb-2 text-gray-700">
          All code and resources for this bootcamp are available here:
        </p>
        <a
          href="https://github.com/AsharibAli/decentral-developers-workshop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 underline font-semibold"
        >
          https://github.com/AsharibAli/decentral-developers-workshop
        </a>
      </div>

      {/* Setup Instructions Section */}
      <div className="bg-teal-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-3">
          Setup & Quickstart
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 pl-4">
          <li>
            Install <span className="font-semibold">VS Code</span>.
          </li>
          <li>
            Install <span className="font-semibold">Git</span> (
            <a
              href="https://www.youtube.com/watch?v=8JJ101D3knE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Watch a short tutorial
            </a>
            ).
          </li>
          <li>
            Clone the repo:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              git clone
              https://github.com/AsharibAli/decentral-developers-workshop
            </code>
          </li>
          <li>
            Get Sepolia Testnet Faucets from{" "}
            <a
              href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              here
            </a>
            .
          </li>
        </ol>
        <h3 className="font-semibold text-teal-700 mt-4 mb-2">
          Project Overview
        </h3>
        <p className="mb-2 text-gray-700">
          A starter-Kit featuring Nextjs & Hardhat, designed for building dApps,
          as well as developing, deploying, and testing Solidity smart contracts
          on the Ethereum Sepolia Testnet. This starter kit includes
          pre-installed packages such as create-next-app, hardhat, typescript,
          tailwindcss, shadcn-ui, web3.js, and more.
        </p>
        <h3 className="font-semibold text-teal-700 mt-4 mb-2">
          Quickstart | Nextjs & Hardhat
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 pl-4">
          <li>
            Clone the repository:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              git clone
              https://github.com/asharibali/decentral-developers-workshop.git
            </code>
          </li>
          <li>
            cd into the directory:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              cd decentral-developers-workshop
            </code>
          </li>
        </ol>
        <h3 className="font-semibold text-teal-700 mt-4 mb-2">
          Smart Contracts
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 pl-4">
          <li>
            Go to <code className="bg-gray-100 px-2 py-1 rounded">backend</code>{" "}
            folder:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">cd backend</code>
          </li>
          <li>
            Install dependencies:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">npm install</code>
          </li>
          <li>
            Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code>{" "}
            file in <code>backend</code> and add your Metamask private key:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              ACCOUNT_PRIVATE_KEY=0x734...
            </code>
          </li>
          <li>
            Write your contracts in{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">./contracts/</code>{" "}
            directory, replacing <code>Greeter.sol</code> with your own.
          </li>
          <li>
            Compile contracts:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              npx hardhat compile
            </code>
          </li>
          <li>
            Test contracts:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              npx hardhat test
            </code>
          </li>
          <li>
            Deploy contracts to Sepolia:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              npx hardhat run scripts/deploy.ts --network sepolia
            </code>
          </li>
          <li>Copy ABI and contract address to frontend as needed.</li>
        </ol>
        <h3 className="font-semibold text-teal-700 mt-4 mb-2">
          Next.js Client
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 pl-4">
          <li>
            cd into the{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">frontend</code>{" "}
            folder:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">cd frontend</code>
          </li>
          <li>
            Install dependencies:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">npm install</code>
          </li>
          <li>
            Start the development server:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code>
          </li>
        </ol>
      </div>

      {/* DApp Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div
          className="w-full relative cursor-pointer group"
          onClick={() => openFullSize("/bootcamp-day-three-1.png")}
        >
          <Image
            src="/bootcamp-day-three-1.png"
            alt="DApp Before State Update"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity shadow-md"
          />
          <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="text-center mt-2 text-gray-600">
            Before State Update
          </div>
        </div>
        <div
          className="w-full relative cursor-pointer group"
          onClick={() => openFullSize("/bootcamp-day-three-2.png")}
        >
          <Image
            src="/bootcamp-day-three-2.png"
            alt="DApp After State Update"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity shadow-md"
          />
          <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="text-center mt-2 text-gray-600">
            After State Update
          </div>
        </div>
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

      {/* Navigation to Completion */}
      <div className="mt-10 flex justify-end">
        <Link href="/workshop/completion">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Next: Complete Course
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
