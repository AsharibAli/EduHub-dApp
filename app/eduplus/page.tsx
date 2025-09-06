"use client";

import React from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BadgeClaimer from "@/components/BadgeClaimer";
import { hasClaimedCredential } from "@/utils/credentialStorage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function EduPlusPage() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const isConnected = isInitialized && authState?.isAuthenticated;

  // Get OCID for checking completion status
  const ocId = ocAuth?.getAuthState()?.OCId || "";

  // Check if user has completed both requirements
  const hasBootcampCredential = ocId
    ? hasClaimedCredential(ocId, "bootcamp")
    : false;
  const hasTutorialCredential = ocId
    ? hasClaimedCredential(ocId, "tutorial")
    : false;
  const hasEduPlusBadge = ocId ? hasClaimedCredential(ocId, "eduplus") : false;

  const canClaimBadge = hasBootcampCredential && hasTutorialCredential;

  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 my-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-teal-700 hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-teal-800 mt-2">
              EduPlus Badge
            </h1>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">E+</span>
              </div>
              <h2 className="text-2xl font-semibold text-teal-700 mb-2">
                EduPlus Achievement Badge
              </h2>
              <p className="text-gray-600">
                Earn this badge by completing the 'Intro to Blockchain' and
                'Intro to OCID & OCA' guides on EduHub, then mint verifiable
                credentials on-chain to prove your learning.
              </p>
            </div>

            {!isConnected ? (
              <div className="text-center bg-amber-50 p-6 rounded-lg border border-amber-200">
                <p className="text-amber-700 mb-4">
                  Please connect your OCID to check your eligibility for the
                  EduPlus badge.
                </p>
                <Link href="/user">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Connect OCID
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                {/* Requirements Check */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-teal-700 mb-4">
                    Requirements Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      {hasBootcampCredential ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mr-3" />
                      )}
                      <span
                        className={
                          hasBootcampCredential
                            ? "text-green-700"
                            : "text-red-600"
                        }
                      >
                        Complete Blockchain Workshop
                      </span>
                      {!hasBootcampCredential && (
                        <Link href="/workshop/day-one" className="ml-2">
                          <Button variant="outline" size="sm">
                            Start Workshop
                          </Button>
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center">
                      {hasTutorialCredential ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mr-3" />
                      )}
                      <span
                        className={
                          hasTutorialCredential
                            ? "text-green-700"
                            : "text-red-600"
                        }
                      >
                        Complete OCID & OCA Tutorial
                      </span>
                      {!hasTutorialCredential && (
                        <Link
                          href="/tutorial/ocid/introduction"
                          className="ml-2"
                        >
                          <Button variant="outline" size="sm">
                            Start Tutorial
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badge Claiming Section */}
                {canClaimBadge && !hasEduPlusBadge ? (
                  <BadgeClaimer
                    badgeType="eduplus"
                    title="🎉 Congratulations! You're eligible for the EduPlus Badge"
                    description="You've completed both the Blockchain Workshop and OCID & OCA Tutorial. Claim your EduPlus badge now!"
                    showBothOptions={true}
                  />
                ) : hasEduPlusBadge ? (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                      EduPlus Badge Already Claimed!
                    </h3>
                    <p className="text-green-600">
                      You have already claimed your EduPlus badge. Check your
                      profile to view it.
                    </p>
                    <div className="mt-4">
                      <a
                        href={`https://id.opencampus.xyz/public/credentials?username=${ocId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline font-medium"
                      >
                        View Your Badges →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Complete Requirements First
                    </h3>
                    <p className="text-gray-600 mb-4">
                      To earn the EduPlus badge, you need to complete both the
                      Blockchain Workshop and the OCID & OCA Tutorial, and claim
                      their respective credentials.
                    </p>
                    <div className="flex gap-4 justify-center">
                      {!hasBootcampCredential && (
                        <Link href="/workshop/day-one">
                          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                            Start Workshop
                          </Button>
                        </Link>
                      )}
                      {!hasTutorialCredential && (
                        <Link href="/tutorial/ocid/introduction">
                          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                            Start Tutorial
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Badge Benefits */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">
                    EduPlus Badge Benefits
                  </h3>
                  <ul className="list-disc list-inside text-blue-600 space-y-2">
                    <li>Verifiable proof of blockchain and Web3 knowledge</li>
                    <li>1,000 Yuzu points when claimed to wallet (Season 3)</li>
                    <li>Recognition in the Open Campus ecosystem</li>
                    <li>
                      Access to exclusive EduHub community features (coming
                      soon)
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
