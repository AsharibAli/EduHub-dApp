"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WorkshopProgress from "@/components/WorkshopProgress";
import { Maximize2 } from "lucide-react";

export default function DayOne() {
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

  const openFullSize = (src: string) => {
    setFullSizeImage(src);
  };

  const closeFullSize = () => {
    setFullSizeImage(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Workshop Progress */}
      <WorkshopProgress />

      {/* Instructor Section */}
      <div className="bg-teal-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-4">
          Meet Your Instructors
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Asharib Ali */}
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start">
            <Image
              src="/asharib-pic.jpeg"
              alt="Asharib Ali"
              width={80}
              height={80}
              className="rounded-full mb-3 sm:mb-0 sm:mr-4 object-cover flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-teal-700 text-sm sm:text-base">
                Asharib Ali
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">
                Founder @ EduHub | Trainer at GIAIC
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 mt-1">
                <a
                  href="https://x.com/0xAsharib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:underline touch-manipulation"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/in/asharibali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:underline touch-manipulation"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          {/* Khizar Bakhtiar */}
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start">
            <Image
              src="/khizar-pic.jpg"
              alt="Khizar Bakhtiar"
              width={80}
              height={80}
              className="rounded-full mb-3 sm:mb-0 sm:mr-4 object-cover flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-teal-700 text-sm sm:text-base">
                Khizar Bakhtiar
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">
                Co-Builder @EduHub | Blockchain Engineer @ArmUp
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 mt-1">
                <a
                  href="https://x.com/Khizarbakhtiar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:underline touch-manipulation"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/in/khizarbakhtiar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:underline touch-manipulation"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-4 sm:mb-6 leading-tight">
        Introduction to Blockchain - Day 1
      </h1>

      {/* Video Recording Section */}
      <div className="bg-teal-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3 sm:mb-4">
          Day 1 Recorded Session
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          Watch the recorded session for Day 1 of our blockchain bootcamp:
        </p>
        <a
          href="https://drive.google.com/drive/folders/14RTGoJwQhE2hyjtTaY7aVIIvWGyJFo2P?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto touch-manipulation">
            Watch Recording
          </Button>
        </a>
      </div>

      {/* Main content with each section and image */}
      <div className="space-y-8 sm:space-y-12">
        {/* Blockchain Architecture Section */}
        <section className="border-b border-gray-200 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div
              className="w-full lg:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/blockchain-architecture.webp")}
            >
              <Image
                src="/blockchain-architecture.webp"
                alt="Blockchain Architecture"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-3">
                Blockchain Architecture
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  Blockchain architecture isn't complicated once you break it
                  down.
                </p>
                <p>
                  At its core, it's a secure and decentralized way of keeping
                  records.
                </p>
                <p>Once something's recorded, it can't be changed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blocks Section */}
        <section className="border-b border-gray-200 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div
              className="w-full lg:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/blocks.webp")}
            >
              <Image
                src="/blocks.webp"
                alt="Blockchain Blocks"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-3">
                Blocks
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>Blockchain is made up of blocks.</p>
                <p>
                  Each block has transactions, data like money transfers or
                  contract changes.
                </p>
                <p>Once a block is full, it's added to the chain.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hashing Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/hashing.webp")}
            >
              <Image
                src="/hashing.webp"
                alt="Hashing"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">Hashing</h2>
              <p className="text-gray-700 mb-2">Every block has a hash.</p>
              <p className="text-gray-700 mb-2">
                A hash is like a unique fingerprint for each block.
              </p>
              <p className="text-gray-700 mb-2">
                Change the block? The hash changes.
              </p>
              <p className="text-gray-700">The whole chain gets messed up.</p>
            </div>
          </div>
        </section>

        {/* Consensus Mechanisms Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/consensus-mechanism.webp")}
            >
              <Image
                src="/consensus-mechanism.webp"
                alt="Consensus Mechanisms"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Consensus Mechanisms
              </h2>
              <p className="text-gray-700 mb-2">
                How does blockchain decide what goes in?
              </p>
              <p className="text-gray-700 mb-2">
                That's where consensus mechanisms come in.
              </p>
              <p className="text-gray-700 mb-2">There are two types of CM's:</p>
              <ul className="list-disc list-inside text-gray-700 mb-2 pl-4">
                <li>
                  Proof of Work (PoW): Miners solve puzzles to add blocks.
                </li>
                <li>
                  Proof of Stake (PoS): Validators are picked based on how much
                  crypto they lock up.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Decentralization Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/decentralization.webp")}
            >
              <Image
                src="/decentralization.webp"
                alt="Decentralization"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Decentralization
              </h2>
              <p className="text-gray-700 mb-2">No central authority.</p>
              <p className="text-gray-700 mb-2">
                Thousands of computers (nodes) keep copies of the blockchain.
              </p>
              <p className="text-gray-700">
                For a new block to be added, most nodes have to agree.
              </p>
            </div>
          </div>
        </section>

        {/* Smart Contracts Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/smart-contracts.webp")}
            >
              <Image
                src="/smart-contracts.webp"
                alt="Smart Contracts"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Smart Contracts
              </h2>
              <p className="text-gray-700 mb-2">
                These are self-executing contracts.
              </p>
              <p className="text-gray-700 mb-2">No middleman.</p>
              <p className="text-gray-700">
                Once conditions are met, the contract runs itself.
              </p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/security.webp")}
            >
              <Image
                src="/security.webp"
                alt="Security"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Security
              </h2>
              <p className="text-gray-700 mb-2">
                Blockchain is secure by design.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-2 pl-4">
                <li>Immutable: Once it's in, it's in.</li>
                <li>Encrypted: Only the right people can read the data.</li>
                <li>Distributed: No single point of failure.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-World Uses Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/real-world-usecases.webp")}
            >
              <Image
                src="/real-world-usecases.webp"
                alt="Real-World Uses"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Real-World Uses
              </h2>
              <p className="text-gray-700 mb-2">
                Blockchain isn't just for crypto.
              </p>
              <p className="text-gray-700 mb-2">It's used for:</p>
              <ul className="list-disc list-inside text-gray-700 mb-2 pl-4">
                <li>Supply chains: Tracking products.</li>
                <li>Healthcare: Securing medical data.</li>
                <li>Voting: Making elections fair.</li>
                <li>NFTs: Proving ownership of digital assets.</li>
              </ul>
              <p className="text-gray-700">Sky is the limit…!</p>
            </div>
          </div>
        </section>

        {/* Scaling Section */}
        <section className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 relative cursor-pointer flex-shrink-0 group"
              onClick={() => openFullSize("/scaling.webp")}
            >
              <Image
                src="/scaling.webp"
                alt="Scaling"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-teal-700/80 text-white p-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">Scaling</h2>
              <p className="text-gray-700 mb-2">Blockchain needs to scale.</p>
              <p className="text-gray-700">
                Layer 2 solutions help process more transactions without slowing
                things down.
              </p>
            </div>
          </div>
        </section>

        {/* Final Section */}
        <section>
          <div className="md:ml-[calc(33.33%+1.5rem)]">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              Final Word
            </h2>
            <p className="text-gray-700 mb-2">
              Blockchain is a decentralized ledger.
            </p>
            <p className="text-gray-700 mb-2">
              It's secure, transparent, and tamper-proof.
            </p>
            <p className="text-gray-700 mb-2">
              It's already revolutionizing industries.
            </p>
            <p className="text-gray-700 mb-2">And the best part?</p>
            <p className="text-gray-700 font-semibold">
              It's just getting started.
            </p>
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

      {/* Navigation buttons */}
      <div className="flex justify-between mt-12">
        <div></div> {/* Empty div for spacing */}
        <Link href="/workshop/day-two">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Continue to Day 2
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
