"use client";

import React from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EOABadgeClaimer from "@/components/EOABadgeClaimer";
import { hasClaimedCredential } from "@/utils/credentialStorage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function EduPlusPage() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const isConnected = isInitialized && authState?.isAuthenticated;
  const ocId = ocAuth?.getAuthState()?.OCId || "";

  const hasBootcampCredential = ocId
    ? hasClaimedCredential(ocId, "bootcamp")
    : false;
  const hasTutorialCredential = ocId
    ? hasClaimedCredential(ocId, "tutorial")
    : false;
  const hasEduPlusBadge = ocId ? hasClaimedCredential(ocId, "eduplus") : false;
  const canClaimBadge = hasBootcampCredential && hasTutorialCredential;

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              EduPlus Badge
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Connect your OCID to begin your journey
            </p>
            <Link href="/user">
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Connect OCID
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (hasEduPlusBadge) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
        <Header />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Congratulations! 🎉
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Your EduPlus badge has been earned
            </p>
            <div className="space-y-4">
              <a
                href={`https://id.opencampus.xyz/public/credentials?username=${ocId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 w-full text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  View Your Badge
                </Button>
              </a>
              <Link href="/">
                <Button
                  variant="outline"
                  className="px-8 py-4 w-full text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors duration-200"
          >
            ← Back
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EduPlus Badge
          </h1>
          <p className="text-gray-600 text-lg">
            Complete both requirements to earn your badge
          </p>
        </div>

        <div className="space-y-8">
          {/* Requirements Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="space-y-3">
              <div
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  hasBootcampCredential
                    ? "bg-green-50 border-green-200 shadow-green-100"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  {hasBootcampCredential ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <XCircle className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-900">
                      Blockchain Workshop
                    </span>
                    <p className="text-sm text-gray-500">
                      3-day comprehensive course
                    </p>
                  </div>
                </div>
                {!hasBootcampCredential && (
                  <Link href="/workshop/day-one">
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Start
                    </Button>
                  </Link>
                )}
              </div>

              <div
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  hasTutorialCredential
                    ? "bg-green-50 border-green-200 shadow-green-100"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  {hasTutorialCredential ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <XCircle className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-900">
                      OC Ecosystem Guide
                    </span>
                    <p className="text-sm text-gray-500">
                      OCID, OCA & OCB fundamentals
                    </p>
                  </div>
                </div>
                {!hasTutorialCredential && (
                  <Link href="/oc-ecosystem-guide/oc-ecosystem/introduction">
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Start
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* How Badge Claiming Works Section */}
          <div className="relative">
            {/* Main Content */}
            <div className="relative bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-2xl">🍊</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-800">
                      How Badge Claiming Works
                    </p>
                    <p className="text-sm text-orange-600">
                      Complete process for Yuzu Season 3 eligibility
                    </p>
                  </div>
                </div>{" "}
                <div className="space-y-3">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 flex items-start">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        Complete Requirements
                      </p>
                      <p className="text-xs text-orange-700">
                        Finish both Blockchain Workshop and OC Ecosystem Guide
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 flex items-start">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        Connect MetaMask Wallet
                      </p>
                      <p className="text-xs text-orange-700">
                        Link your wallet to receive the on-chain badge
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 flex items-start">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        Badge Minted to Wallet
                      </p>
                      <p className="text-xs text-orange-700">
                        Verifiable credential issued directly to your address
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 flex items-start">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        Track Yuzu Points
                      </p>
                      <p className="text-xs text-orange-700">
                        Monitor your Season 3 progress on the dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Badge */}
          {canClaimBadge ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Claim!</h3>
                <p className="opacity-90">You've completed both requirements</p>
              </div>
              <div className="p-6">
                <EOABadgeClaimer
                  badgeType="eduplus"
                  title=""
                  description="Connect your MetaMask wallet to receive your EduPlus badge"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Complete Requirements
              </h3>
              <p className="text-gray-600">
                Finish both learning paths above to unlock your badge
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
